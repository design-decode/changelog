'use client';

import { BrowserPreview } from '@/app/components/browser-preview';
import { FileInput } from '@/app/components/file-input';
import Input from '@/app/components/input';
import { Label } from '@/app/components/label';
import { SocialPreview } from '@/app/components/social-preview';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { BlogTemplates, PortfolioTemplates } from './blog-templates';
import { Spinner } from '@/app/components/loader';
import { createClient } from '@/utils/supabase/client';
import { useDebounce } from 'use-debounce';
import { Tooltip } from '@/app/components/tooltip';
import { useFormStatus } from 'react-dom';

const supabase = createClient();

export const NewPageForm = ({
	formAction,
	className,
	data,
	type = 'new',
	sitePrefix,
	hiddenSections
}: {
	hiddenSections?: { preview: boolean; meta: boolean };
	sitePrefix?: string;
	type?: 'new' | 'update';
	formAction: (arg0: any) => Promise<any>;
	className?: string;
	data?: { id: string; site: string; name: string; description: string; meta_image: string; template: string; title: string; type: string };
}) => {
	const router = useRouter();
	const [isLoading, toggleLoader] = useState(false);
	const [loading, setLoadingState] = useState(false);
	const [pageName, setPageName] = useState(data?.description);
	const [pageTitle, setPageTitle] = useState(data?.title);
	const [newName] = useDebounce(pageName, 700);
	const [pageDescription, setPageDescription] = useState(data?.description);
	const [pageType, setPageType] = useState(data?.type);
	const [previewsToggle, setPreviewsToggle] = useState<boolean>();
	const [nameExists, toggleNameExists] = useState<boolean>();
	const [pageMetaImage, setPageMetaImage] = useState<string | ArrayBuffer | undefined | null>(data?.meta_image);

	const setMetaImage = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event?.target?.files) return;
		const file = event.target?.files[0];
		const reader = new FileReader();
		reader.onloadend = () => setPageMetaImage(reader.result);

		if (file) reader.readAsDataURL(file);
	};

	const checkPageName = async (name: string) => {
		toggleLoader(true);
		toggleNameExists(false);
		const { data, error } = await supabase.from('pages').select('name').eq('site', sitePrefix);

		if (!data || error) return;

		// Filter the data manually in case-insensitive manner
		const lowerCaseValue = name.toLowerCase();
		const filteredData = data.filter(item => item.name.toLowerCase() === lowerCaseValue);

		if (filteredData && filteredData.length) toggleNameExists(true);
		if (filteredData && !filteredData.length) toggleNameExists(false);
		toggleLoader(false);
	};

	useEffect(() => {
		if (newName) checkPageName(newName);
	}, [newName]);

	const submitForm = async (formData: FormData) => {
		if (nameExists) return;
		setLoadingState(true);
		const { data: newPageData, error } = await formAction(formData);
		if (error) return;

		if (newPageData.name === data?.name) return router.refresh();
		router.push(`/${newPageData.page_slug}`);
	};

	const SubmitButton = () => {
		const { pending } = useFormStatus();
		return (
			<button disabled={nameExists || isLoading} type="submit" className="bg-slate-11 ml-8 rounded-4 py-1 px-4 text-2 font-medium text-slate-2 mt-20 disabled:opacity-20">
				{type == 'new' ? (pending ? 'Creating page...' : 'Create Page') : pending ? 'Updating page...' : 'Update Page'}
			</button>
		);
	};

	return (
		<form action={submitForm} className={`${className}`}>
			<input type="text" defaultValue={sitePrefix || data?.site} id="page-site" name="page-site" hidden />
			<input type="text" defaultValue={data?.id} id="page-id" name="page-id" hidden />

			<div className="pl-8 border-l border-l-slate-3 mt-10 relative">
				<svg width="24" height="24" viewBox="0 0 24 24" className="stroke-slate-11 fill-slate-1 scale-75 absolute -top-1 -left-3" xmlns="http://www.w3.org/2000/svg">
					<path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round" />
					<path
						d="M16.0379 3.02025L8.15793 10.9003C7.85793 11.2003 7.55793 11.7903 7.49793 12.2203L7.06793 15.2303C6.90793 16.3203 7.67793 17.0803 8.76793 16.9303L11.7779 16.5003C12.1979 16.4403 12.7879 16.1403 13.0979 15.8403L20.9779 7.96025C22.3379 6.60025 22.9779 5.02025 20.9779 3.02025C18.9779 1.02025 17.3979 1.66025 16.0379 3.02025Z"
						strokeWidth="1.0"
						strokeMiterlimit="10"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path d="M14.9062 4.15039C15.5763 6.54039 17.4463 8.41039 19.8463 9.09039" strokeWidth="1.0" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
				</svg>

				<h3 className="text-slate-11 mb-8">Page Details</h3>

				<div className="relative w-fit">
					<Input defaultValue={data?.name} onChange={event => setPageName(event.target.value)} required label="Page Name" id="page-name" name="page-name" type="text" placeholder="Page name" className="!w-80 mb-6" />
					<Spinner className={`-right-7 bottom-1 ${isLoading ? 'opacity-100' : 'opacity-0'}`} />

					<svg width="24" height="24" viewBox="0 0 24 24" className={`fill-none stroke-green-8 scale-75 absolute -right-7 opacity-0 bottom-1 ${pageName && !nameExists && !isLoading ? 'opacity-100' : ''}`} xmlns="http://www.w3.org/2000/svg">
						<path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M7.75 12L10.58 14.83L16.25 9.17004" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					<svg width="24" height="24" viewBox="0 0 24 24" className={`stroke-tomato-6 fill-none scale-75 absolute -right-7 opacity-0 bottom-1 ${pageName && nameExists && !isLoading ? 'opacity-100' : ''}`} xmlns="http://www.w3.org/2000/svg">
						<path
							d="M14.9 2H9.10001C8.42001 2 7.46 2.4 6.98 2.88L2.88 6.98001C2.4 7.46001 2 8.42001 2 9.10001V14.9C2 15.58 2.4 16.54 2.88 17.02L6.98 21.12C7.46 21.6 8.42001 22 9.10001 22H14.9C15.58 22 16.54 21.6 17.02 21.12L21.12 17.02C21.6 16.54 22 15.58 22 14.9V9.10001C22 8.42001 21.6 7.46001 21.12 6.98001L17.02 2.88C16.54 2.4 15.58 2 14.9 2Z"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path d="M8.5 15.5L15.5 8.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M15.5 15.5L8.5 8.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>

				<Input
					tooltip="This is the title of this page as it will apear everywhere. See preview example peblow"
					defaultValue={data?.description}
					onChange={event => setPageTitle(event.target.value)}
					label="Page Title"
					id="page-title"
					name="page-title"
					type="text"
					placeholder="Page description"
					className="!w-80 mb-6"
				/>
				<Input defaultValue={data?.description} onChange={event => setPageDescription(event.target.value)} label="Page Description" id="page-description" name="page-description" type="text" placeholder="Page description" className="!w-80 mb-6" />

				<Label id="page-meta-image">
					Meta image
					<Tooltip>{`Meta image: the image that'll appear whenever your website is shared to any platform, like social media. We recommend a 1200 x 630, less than 8mb`}</Tooltip>
				</Label>
				<FileInput imgSrc={data?.meta_image} onChange={setMetaImage} id="page-meta-image" name="page-meta-image" className="w-48 h-48 rounded-4" />

				<div className="flex items-center gap-4 mt-14">
					<p className="text-slate-11 text-1">Social / Browser Preview</p>
					<div className="relative inline-block w-10 h-5 ease-[cubic-bezier(.47,1.64,.41,.8)] transition-all duration-500 bg-slate-4 rounded-6 group has-[:checked]:bg-slate-8">
						<input onChange={event => setPreviewsToggle(event.target.checked)} type="checkbox" name="toggle" id="toggle" className="absolute w-full h-full appearance-none cursor-pointer" />
						<label htmlFor="toggle" className="group-has-[:checked]:left-6 -left-1 transition-all ease-[cubic-bezier(.47,1.64,.41,.8)] duration-500 absolute block overflow-hidden h-full rounded-6 w-5 border-2 border-slate-1 bg-slate-3 cursor-pointer"></label>
					</div>
				</div>

				<div className={`w-96 overflow-hidden transition-all duration-500 ${previewsToggle ? 'max-h-[1000px]' : 'max-h-0'}`}>
					<h2 className="text-slate-10 mb-2 text-2 font-medium mt-8">Browser Preview</h2>
					<BrowserPreview prefix={sitePrefix || data?.site} title={pageTitle} />

					<h2 className="text-slate-10 mb-2 text-2 font-medium mt-6">Social Preview</h2>
					<SocialPreview prefix={sitePrefix || data?.site} metaImage={pageMetaImage} description={pageDescription} title={pageTitle} />
				</div>
			</div>

			<div className="pl-8 border-l border-l-slate-3 mt-20 relative">
				<svg width="24" height="24" viewBox="0 0 24 24" className="stroke-slate-11 fill-slate-1 scale-75 absolute -top-1 -left-3" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M3.4975 20.5004C4.3275 21.3304 5.6675 21.3304 6.4975 20.5004L19.4975 7.50043C20.3275 6.67043 20.3275 5.33043 19.4975 4.50043C18.6675 3.67043 17.3275 3.67043 16.4975 4.50043L3.4975 17.5004C2.6675 18.3304 2.6675 19.6704 3.4975 20.5004Z"
						strokeWidth="1"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path d="M18.0078 8.99023L15.0078 5.99023" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M8.5 2.44L10 2L9.56 3.5L10 5L8.5 4.56L7 5L7.44 3.5L7 2L8.5 2.44Z" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M4.5 8.44L6 8L5.56 9.5L6 11L4.5 10.56L3 11L3.44 9.5L3 8L4.5 8.44Z" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M19.5 13.44L21 13L20.56 14.5L21 16L19.5 15.56L18 16L18.44 14.5L18 13L19.5 13.44Z" strokeLinecap="round" strokeLinejoin="round" />
				</svg>

				<h3 className="text-slate-11 mb-8">Page Design</h3>

				<Label>Page Type</Label>
				<select
					onChange={event => setPageType(event.target.value)}
					required
					value={pageType}
					disabled={type == 'update'}
					id="page-type"
					className="mb-6 bg-slateA-3 border-slate-4 border rounded-2 px-space-1 h-space-6 text-1.1 text-slate-12 max-w-xs w-full outline-none placeholder:text-slateA-11 font-regular focus:bg-slateA-4 focus:border-slate-7 duration-500 focus:shadow-6 transition-all">
					<option value={''} disabled>
						Select page type
					</option>
					<option value="blog">Blog</option>
					<option value="post">Post</option>
				</select>
				<input type="hidden" name="page-type" value={pageType} />

				<div className={`transition-all duration-500 w-full ${pageType == 'blog' || pageType == 'portfolio' ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
					<Label>Page Template</Label>
					<ul className="flex gap-4 mt-2 overflow-auto no-scrollbar items-stretch">
						{pageType == 'blog' && <BlogTemplates value={data?.template || ''} />}
						{pageType == 'portfolio' && <PortfolioTemplates value={data?.template || ''} />}
					</ul>
				</div>
			</div>

			{/* <div className="w-96 pl-8 border-l border-l-slate-3 mt-20 relative">
				<svg width="24" height="24" viewBox="0 0 24 24" className="stroke-slate-11 fill-slate-1 scale-75 absolute -top-1 -left-3" xmlns="http://www.w3.org/2000/svg">
					<path d="M19 16V6.5C19 5.4 18.1 4.5 17 4.5H12.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M15 2L12 4.5L15 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M5 9V16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M5.25 8.5C7.04493 8.5 8.5 7.04493 8.5 5.25C8.5 3.45507 7.04493 2 5.25 2C3.45507 2 2 3.45507 2 5.25C2 7.04493 3.45507 8.5 5.25 8.5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M5 22C6.65685 22 8 20.6569 8 19C8 17.3431 6.65685 16 5 16C3.34315 16 2 17.3431 2 19C2 20.6569 3.34315 22 5 22Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C17.3431 16 16 17.3431 16 19C16 20.6569 17.3431 22 19 22Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>

				<h3 className="text-slate-11 mb-8">Connect Git Releases</h3>

				<div className="bg-slate-3 border border-slate-4 rounded-4 flex items-center justify-center py-16 w-full gap-space-5 flex-col">
					<p className="text-1 text-slate-12 font-light text-center">Install Github App to connect your desired repository and automatically create a post</p>

					<a href="https://github.com/apps/tally-product-log/installations/new?setup_url=http://localhost:3000/setup" className="flex items-center bg-slateA-2 border-slateA-8 border gap-2 justify-center rounded-3 px-3 h-8">
						<svg width="16" height="16" viewBox="0 0 16 16" className="fill-slate-12" xmlns="http://www.w3.org/2000/svg">
							<rect width="16" height="16" fillOpacity="0.01" />
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M7.99934 0.266663C3.7295 0.266663 0.266724 3.72899 0.266724 8.00025C0.266724 11.4165 2.48235 14.3153 5.55536 15.3383C5.94229 15.4091 6.08328 15.1703 6.08328 14.9652C6.08328 14.7814 6.07663 14.2954 6.07284 13.6501C3.92177 14.1173 3.46792 12.6133 3.46792 12.6133C3.11613 11.7199 2.60911 11.482 2.60911 11.482C1.90697 11.0026 2.66229 11.012 2.66229 11.012C3.43849 11.0667 3.84677 11.8092 3.84677 11.8092C4.53657 12.9907 5.65696 12.6494 6.09753 12.4514C6.16779 11.952 6.36765 11.6111 6.58841 11.4179C4.87126 11.2223 3.06582 10.5591 3.06582 7.59577C3.06582 6.7512 3.36728 6.0614 3.86196 5.52067C3.7822 5.32507 3.51682 4.53889 3.93791 3.47403C3.93791 3.47403 4.58688 3.26609 6.06429 4.26637C6.68098 4.09499 7.34278 4.00954 8.00029 4.00621C8.65734 4.00954 9.31866 4.09499 9.9363 4.26637C11.4128 3.26609 12.0608 3.47403 12.0608 3.47403C12.4828 4.53889 12.2174 5.32507 12.1382 5.52067C12.6338 6.0614 12.9329 6.7512 12.9329 7.59577C12.9329 10.5667 11.1245 11.2205 9.40221 11.4117C9.67946 11.6506 9.92681 12.1224 9.92681 12.844C9.92681 13.8775 9.9173 14.7117 9.9173 14.9652C9.9173 15.1722 10.0569 15.4129 10.449 15.3374C13.5196 14.3124 15.7334 11.416 15.7334 8.00025C15.7334 3.72899 12.2706 0.266663 7.99934 0.266663Z"
								fillOpacity="0.797"
							/>
						</svg>

						<div className="text-slate-11 text-1">Install</div>
					</a>
				</div>
			</div> */}

			<SubmitButton />
		</form>
	);
};
