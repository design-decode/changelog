import { GRID_ITEM } from '@/app/lib/portfolio.interface';
import { Layout } from 'react-grid-layout';
import { GridImageServer } from './grid-image';
import { GridLink } from './grid-link';

export const ServerGrid = ({ page, portfolioData }: { page?: string; portfolioData: { layout: Layout[]; grid_item: GRID_ITEM[] } }) => {
	const gridItems = portfolioData.grid_item;

	const generateGridItemStyles = (layout: any[], cols: number, rowHeight: number, containerWidth: number, margin: [any, any]) => {
		const [marginX, marginY] = margin;
		const colWidth = (containerWidth - marginX * 2 - marginX * (cols - 1)) / cols;

		return layout.map(item => ({
			id: item.i,
			style: {
				left: `${item.x * (colWidth + marginX)}px`,
				top: `${item.y * (rowHeight + marginY)}px`,
				width: `${item.w * colWidth + (item.w - 1) * marginX}px`,
				height: `${item.h * rowHeight + (item.h - 1) * marginY}px`
			}
		}));
	};

	const StaticGrid = ({ layout, cols, rowHeight, width, margin, children }: any) => {
		const gridItems = generateGridItemStyles(layout, cols, rowHeight, width, margin);

		return (
			<div style={{ position: 'relative', width: `${width}px`, height: 'auto' }}>
				{gridItems.map((item, index) => (
					<div key={item.id} style={{ ...item.style, position: 'absolute' }}>
						{children[index]}
					</div>
				))}
			</div>
		);
	};

	return (
		<div>
			<StaticGrid layout={portfolioData.layout} cols={4} rowHeight={151} width={727} margin={[24, 24]}>
				{portfolioData.layout.map((item, index) => (
					<div
						key={item.i}
						className={`${gridItems[index].type === 'title' ? 'pt-20 p-0' : 'border border-slate-4 bg-slate-1'} ${
							gridItems[index].type === 'link' || gridItems[index].imgLink ? 'active:scale-95 hover:brightness-[0.98]' : ''
						} rounded-[35px] transition-all duration-500 h-full relative p-3`}>
						{(gridItems[index].type === 'text' || gridItems[index].type === 'title') && <div className={`${gridItems[index].type === 'text' ? 'p-2' : ''} w-full h-full bio-text line-clamp-6`} dangerouslySetInnerHTML={{ __html: gridItems[index].text || '' }}></div>}

						{gridItems[index].type === 'link' && gridItems[index].link && <GridLink details={gridItems[index]} />}

						{gridItems[index].type === 'img' && <GridImageServer imgDetails={gridItems[index]} />}
					</div>
				))}
			</StaticGrid>
		</div>
	);
};
