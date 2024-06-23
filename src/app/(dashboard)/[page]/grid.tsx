'use client';

import { useState, useEffect, useRef, ChangeEvent, useCallback } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import './styles.css';
import { GridEditor } from './grid-text-editor';
import { useDebouncedCallback } from 'use-debounce';
import { GridImage } from './grid-image';
import { GridLink } from './grid-link';
import { GRID_ITEM, GRID_TYPE } from '@/app/lib/portfolio.interface';
import { GridItemAddLink } from './grid-item-add';
import { createClient } from '@/utils/supabase/client';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const supabase = createClient();

export const Grid = ({ page, portfolioData }: { page?: string; portfolioData: { layout: Layout[]; grid_item: GRID_ITEM[] } }) => {
	const [rowHeight, setRowHeight] = useState(30);
	const gridRef = useRef<HTMLDivElement>(null);
	const [layout, setLayout] = useState<Layout[]>([]);
	const [gridItems, setGridItems] = useState<GRID_ITEM[]>([]);
	const filePicker = useRef<HTMLInputElement>(null);

	const updateRowHeight = () => {
		if (gridRef.current) {
			const width = gridRef.current.offsetWidth;
			const colWidth = Math.round((width - 24 * 5) / 4);
			setRowHeight(colWidth);
		}
	};

	const isLinkEnabled = (gridItem: GRID_ITEM) => {
		return gridItem.type === 'img' || gridItem.type === 'link' ? { linkEnabled: false } : false;
	};

	const onTapEscape = useCallback(() => {
		setGridItems(prevGridItems => {
			const newGridItems = prevGridItems.map(item => {
				const linkEnabled = isLinkEnabled(item);
				return linkEnabled ? { ...item, ...linkEnabled } : item;
			});

			if (JSON.stringify(newGridItems) !== JSON.stringify(prevGridItems)) {
				addGridItemToSupabase(layout, newGridItems);
				return newGridItems;
			}

			return prevGridItems;
		});
	}, []);

	useEffect(() => {
		updateRowHeight();

		setLayout(() => [...portfolioData.layout]);
		setGridItems(() => [...portfolioData.grid_item]);

		const handleKeyDown = (event: { key: string }) => {
			if (event.key === 'Escape') {
				onTapEscape();
			}
		};

		window.addEventListener('keydown', handleKeyDown, false);

		return () => {
			window.removeEventListener('keydown', handleKeyDown, false);
		};
	}, [onTapEscape, portfolioData.grid_item, portfolioData.layout]);

	const addGrid = (type: GRID_TYPE, imgSrc?: string) => {
		let maxX = 0,
			maxY = 0;
		layout.forEach(item => {
			if (item.y > maxY || (item.y === maxY && item.x > maxX)) {
				maxX = item.x;
				maxY = item.y;
			}
		});

		const newX = layout.length ? (maxX + 1) % 4 : 0;
		const newY = layout.length ? (newX === 0 ? maxY + 1 : maxY) : 0;

		const newItem = {
			i: `${type} ${layout.length}`,
			x: newX,
			y: newY,
			w: type === 'title' ? 4 : 1,
			h: 1,
			maxH: 2
		};
		setLayout([...layout, newItem]);

		const newGridItem: GRID_ITEM = { type };
		if (imgSrc) newGridItem.imgSrc = `${btoa(imgSrc as string)}`;
		if (type == 'link') newGridItem.linkEnabled = true;
		setGridItems([...gridItems, newGridItem]);
	};

	const onBreakpointChange = (newBreakpoint: string) => {
		if (newBreakpoint === 'sm') {
			const updatedLayout = layout.map(item => ({
				...item,
				w: item.w > 2 ? 2 : item.w
			}));
			setLayout(updatedLayout);
		}

		if (gridRef.current) {
			const width = gridRef.current.offsetWidth;
			const colWidth = Math.round((width - 24 * 5) / 4);
			setRowHeight(colWidth);
		}
	};

	const onLayoutChange = (newLayout: Layout[], _newLayouts: Layouts) => {
		setLayout(newLayout);
		addGridItemToSupabase(newLayout, gridItems);
	};

	const deleteItem = (itemIndex: number) => {
		const updatedLayout = layout.filter((_item, index) => index !== itemIndex);
		const updatedGrid = gridItems.filter((_item, index) => index !== itemIndex);
		setLayout(updatedLayout);
		setGridItems(updatedGrid);
	};

	const updateGridItemImg = (gridItemIndex: number, imageString: string) => {
		const updatedGridItem: GRID_ITEM = { ...gridItems[gridItemIndex], type: 'img', imgSrc: imageString };
		gridItems[Number(gridItemIndex) || layout.length] = updatedGridItem;
		setGridItems([...gridItems]);
	};

	const pickFile = (event: ChangeEvent<HTMLInputElement>) => {
		const gridItemIndex = event.target.dataset.gridId;
		if (!event?.target?.files) return;
		const file = event.target?.files[0];
		const reader = new FileReader();
		reader.onloadend = async () => {
			// use gridItemIndex to understand how to treat upload, update or create
			if (!gridItemIndex) addGrid('img', reader.result as string);
			else updateGridItemImg(Number(gridItemIndex), btoa(reader.result as string));

			// on either update or create instance, upload file
			const fileName = `${page} ${gridItemIndex || layout.length}.${file.name.split('.').pop()}`;
			// on upload, create file if none existent or replace if it exists.
			const { data: imageUploadData, error: imageUploadError } = await supabase.storage.from('grid_images').upload(fileName, file, { upsert: true, cacheControl: '0' });
			if (imageUploadError) return console.log('upload error', imageUploadError);
			// get image url for storage
			const { data: imageURL } = supabase.storage.from('grid_images').getPublicUrl(imageUploadData?.path);

			// update image string on grid item with upload url
			updateGridItemImg(Number(gridItemIndex) || layout.length, `${imageURL.publicUrl}${gridItemIndex ? '?updated=' + Math.floor(Math.random() * (20 - 1 + 1)) + 1 : ''}`);
			addGridItemToSupabase(layout, gridItems);
		};

		if (file) reader.readAsDataURL(file);
	};

	const addGridItemToSupabase = async (layout: Layout[], gridItem: GRID_ITEM[]) => await supabase.from('portfolios').upsert({ page, layout, grid_item: gridItem }, { onConflict: 'page', ignoreDuplicates: false }).select().single();

	const userIsAuthenticated = async () => !!(await supabase.auth.getUser()).data.user;

	const debounceText = useDebouncedCallback(
		async () => {
			const user = await userIsAuthenticated();
			if (user) await supabase.from('portfolios').update({ grid_item: gridItems }).eq('page', page);
		},
		700,
		{ maxWait: 2000 }
	);

	const enableLinkEdit = (gridItemIndex: number) => {
		gridItems[gridItemIndex] = { ...gridItems[gridItemIndex], domain: '', title: '', description: '', link: '' };
		setGridItems([...gridItems]);
	};

	return (
		<div className="mb-4 w-full" ref={gridRef}>
			<ResponsiveReactGridLayout draggableCancel=".exempt" onLayoutChange={onLayoutChange} margin={[24, 24]} onBreakpointChange={onBreakpointChange} rowHeight={rowHeight} className="layout -left-6" breakpoints={{ lg: 720, md: 427 }} cols={{ lg: 4, md: 2 }}>
				{layout.map((item, index) => (
					<div
						key={index}
						data-grid={item}
						className={`${gridItems[index].linkEnabled ? 'hide-handle' : ''} ${
							gridItems[index].type === 'title' ? 'pt-20 p-0' : 'drop-shadow-sm border border-slate-4 hover:drop-shadow-xl bg-slate-1 p-3'
						} !opacity-100 rounded-[35px] transition-all duration-500 group`}>
						<div className={`${gridItems[index].linkEnabled ? '-top-3' : '-bottom-3'} exempt z-20 left-0 absolute group-hover:opacity-100 opacity-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-500`}>
							<button onClick={() => deleteItem(index)} className="bg-tomato-9 p-2 rounded-6">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`stroke-[#fff] scale-110`} xmlns="http://www.w3.org/2000/svg">
									<path d="M14 3.98696C11.78 3.76696 9.54667 3.65363 7.32 3.65363C6 3.65363 4.68 3.72029 3.36 3.85363L2 3.98696" />
									<path d="M5.66675 3.31331L5.81341 2.43998C5.92008 1.80665 6.00008 1.33331 7.12675 1.33331H8.87341C10.0001 1.33331 10.0867 1.83331 10.1867 2.44665L10.3334 3.31331" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M12.5657 6.09308L12.1324 12.8064C12.059 13.8531 11.999 14.6664 10.139 14.6664H5.85904C3.99904 14.6664 3.93904 13.8531 3.86571 12.8064L3.43237 6.09308" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M6.8855 11H9.1055" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M6.33325 8.33331H9.66659" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>

							{(gridItems[index].type === 'link' || gridItems[index].type === 'img') && (
								<button
									onClick={() => {
										if (gridItems[index].type === 'link') enableLinkEdit(index);
										if (gridItems[index].type === 'img') {
											if (filePicker.current) {
												filePicker.current.click();
												filePicker.current.dataset.gridId = `${index}`;
											}
										}
									}}
									className="bg-slate-12 p-2 rounded-6 ml-1">
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`stroke-slate-1 scale-110`} xmlns="http://www.w3.org/2000/svg">
										<path
											d="M8.84226 2.40015L3.36893 8.19348C3.16226 8.41348 2.96226 8.84681 2.92226 9.14681L2.67559 11.3068C2.58893 12.0868 3.14893 12.6201 3.92226 12.4868L6.06893 12.1201C6.36893 12.0668 6.78893 11.8468 6.99559 11.6201L12.4689 5.82681C13.4156 4.82681 13.8423 3.68681 12.3689 2.29348C10.9023 0.91348 9.78893 1.40015 8.84226 2.40015Z"
											strokeWidth="0.8"
											strokeMiterlimit="10"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path d="M7.927 3.36654C8.21367 5.20654 9.707 6.61321 11.5603 6.79987" strokeWidth="0.8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
							)}

							{gridItems[index].type === 'img' && (
								<button
									onClick={() => {
										gridItems[index] = { ...gridItems[index], linkEnabled: true };
										setGridItems([...gridItems]);
									}}
									className={`${gridItems[index].imgLink ? 'bg-green-10' : 'bg-slate-12'} p-2 rounded-6 ml-1 transition-all duration-500`}>
									<svg width="16" height="16" viewBox="0 0 16 16" className={`${gridItems[index].imgLink ? 'stroke-white' : 'stroke-slate-1'} transition-all duration-500 fill-none scale-110`} xmlns="http://www.w3.org/2000/svg">
										<path d="M9.99487 11.6667H11.0015C13.0149 11.6667 14.6682 10.02 14.6682 8.00004C14.6682 5.98671 13.0215 4.33337 11.0015 4.33337H9.99487" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M5.99992 4.33337H4.99992C2.97992 4.33337 1.33325 5.98004 1.33325 8.00004C1.33325 10.0134 2.97992 11.6667 4.99992 11.6667H5.99992" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M5.33325 8H10.6666" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
							)}
						</div>

						{(gridItems[index].type === 'text' || gridItems[index].type === 'title') && (
							<div className="w-full h-full">
								<GridEditor
									title={gridItems[index].type === 'title'}
									body={gridItems[index].text}
									onChange={event => {
										gridItems[index].text = event?.editor.getHTML();
										setGridItems(gridItems);
										debounceText();
									}}
								/>
							</div>
						)}

						{gridItems[index].type === 'link' && gridItems[index].link && <GridLink details={gridItems[index]} />}

						{gridItems[index].type === 'img' && (
							<GridImage
								onCaptionChange={captionText => {
									gridItems[index] = { ...gridItems[index], caption: captionText };
									setGridItems([...gridItems]);
									debounceText();
								}}
								imgDetails={gridItems[index]}
							/>
						)}

						{gridItems[index].linkEnabled && (
							<GridItemAddLink
								currentLink={gridItems[index].imgLink || gridItems[index].link}
								type={gridItems[index].type as GRID_TYPE}
								setDetails={event => {
									gridItems[index] = gridItems[index].type === 'link' ? { ...gridItems[index], ...event, linkEnabled: false } : { ...gridItems[index], imgLink: event.link, linkEnabled: false };
									setGridItems([...gridItems]);
									addGridItemToSupabase(layout, gridItems);
								}}
							/>
						)}
					</div>
				))}
			</ResponsiveReactGridLayout>

			<ul className="fixed bg-slate-1 drop-shadow-md border border-slate-3 p-3 rounded-6 bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
				<li>
					<button className="bg-orange-10 rounded-4 py-2 px-3 text-1 font-bold text-[#fff]">Share Your Page</button>
				</li>

				<div className="w-[2px] bg-slate-7 h-5 mx-2"></div>

				<li>
					<button className="bg-slate-12 rounded-4 py-2 px-2 hover:scale-110 transition-all duration-500" onClick={() => addGrid('text')}>
						<svg width="16" height="16" viewBox="0 0 16 16" className="stroke-slate-4 fill-none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M6.00004 14.6667H10C13.3334 14.6667 14.6667 13.3334 14.6667 10V6.00004C14.6667 2.66671 13.3334 1.33337 10 1.33337H6.00004C2.66671 1.33337 1.33337 2.66671 1.33337 6.00004V10C1.33337 13.3334 2.66671 14.6667 6.00004 14.6667Z"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path d="M4.66663 5.92697C6.76663 4.8803 9.23329 4.8803 11.3333 5.92697" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M8 10.8665V5.2865" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</li>
				<li>
					<button className="bg-slate-12 rounded-4 py-2 px-2 hover:scale-110 transition-all duration-500" onClick={() => addGrid('link')}>
						<svg width="16" height="16" viewBox="0 0 16 16" className={`stroke-slate-4 transition-all duration-500 fill-none -rotate-45`} xmlns="http://www.w3.org/2000/svg">
							<path d="M9.99487 11.6667H11.0015C13.0149 11.6667 14.6682 10.02 14.6682 8.00004C14.6682 5.98671 13.0215 4.33337 11.0015 4.33337H9.99487" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M5.99992 4.33337H4.99992C2.97992 4.33337 1.33325 5.98004 1.33325 8.00004C1.33325 10.0134 2.97992 11.6667 4.99992 11.6667H5.99992" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M5.33325 8H10.6666" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</li>
				<li>
					<input type="file" ref={filePicker} name="image" id="image" onChange={pickFile} data-grid-id="" className="hidden" aria-label="select image" aria-hidden="true" />
					<button className="bg-slate-12 rounded-4 py-2 px-2 hover:scale-110 transition-all duration-500" onClick={() => (filePicker.current ? filePicker.current.click() : false)}>
						<svg width="16" height="16" viewBox="0 0 16 16" className="stroke-slate-4 fill-none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M5.99992 14.6666H9.99992C13.3333 14.6666 14.6666 13.3333 14.6666 9.99998V5.99998C14.6666 2.66665 13.3333 1.33331 9.99992 1.33331H5.99992C2.66659 1.33331 1.33325 2.66665 1.33325 5.99998V9.99998C1.33325 13.3333 2.66659 14.6666 5.99992 14.6666Z"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M6.00008 6.66667C6.73646 6.66667 7.33341 6.06971 7.33341 5.33333C7.33341 4.59695 6.73646 4 6.00008 4C5.2637 4 4.66675 4.59695 4.66675 5.33333C4.66675 6.06971 5.2637 6.66667 6.00008 6.66667Z"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M1.78125 12.633L5.06792 10.4264C5.59458 10.073 6.35458 10.113 6.82792 10.5197L7.04792 10.713C7.56792 11.1597 8.40792 11.1597 8.92792 10.713L11.7012 8.33305C12.2212 7.88638 13.0612 7.88638 13.5812 8.33305L14.6679 9.26638"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</li>
				<li>
					<button className="bg-slate-12 rounded-4 py-2 px-2 hover:scale-110 transition-all duration-500" onClick={() => addGrid('title')}>
						<svg width="16" height="16" viewBox="0 0 16 16" className="stroke-slate-1 fill-none" xmlns="http://www.w3.org/2000/svg">
							<path
								className="fill-slate-1"
								d="M2.47 5L13.53 5C14.58 5 15 4.69882 15 3.95059L15 2.04941C15 1.30118 14.58 1 13.53 1L2.47 0.999999C1.42 0.999999 1 1.30118 1 2.04941L1 3.95059C1 4.69882 1.42 5 2.47 5Z"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M8.52727 15L13.4727 15C14.5636 15 15 14.4729 15 13.1635L15 9.83647C15 8.52706 14.5636 8 13.4727 8L8.52727 8C7.43636 8 7 8.52706 7 9.83647L7 13.1635C7 14.4729 7.43636 15 8.52727 15Z"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="fill-slate-9 stroke-slate-9"
							/>
							<path
								className="fill-slate-9 stroke-slate-9"
								d="M2.4 15L3.6 15C4.6 15 5 14.4729 5 13.1635L5 9.83647C5 8.52706 4.6 8 3.6 8L2.4 8C1.4 8 1 8.52706 1 9.83647L1 13.1635C1 14.4729 1.4 15 2.4 15Z"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Grid;
