import { useRef } from 'react';

export const BrowserPreview = ({ title, metaImage, prefix }: { title?: string; metaImage?: string | ArrayBuffer | null; prefix?: string }) => {
	const divRef = useRef<HTMLInputElement>(null);
	if (divRef.current && metaImage) divRef.current.style.backgroundImage = `url(${metaImage})`;

	return (
		<div className="border bg-slate-1 border-slate-5 rounded-4 overflow-hidden">
			<div className="pt-2 rounded-4 flex items-center ">
				<div className="bg-slate-3 py-2 px-2 rounded-t-4 w-fit ml-4 mr-1 flex items-center gap-2">
					<div className="w-5 h-5 bg-slate-8 rounded-3 bg-cover bg-no-repeat bg-center" ref={divRef}></div>
					<p className="text-slate-11 font-light min-w-20 min-h-5 max-w-48 truncate text-2">{title}</p>
					<svg width="24" height="24" viewBox="0 0 24 24" className="stroke-slate-8 scale-50 rotate-45" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6 12H18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M12 18V6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
				<svg width="24" height="24" viewBox="0 0 24 24" className="stroke-slate-8 scale-50" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6 12H18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M12 18V6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>

			<div className="bg-slate-3 flex gap-2 px-2 py-3 rounded-t-2 rounded-b-4">
				<div className="flex">
					<svg width="24" height="24" className="scale-75 stroke-slate-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.57 5.92969L3.5 11.9997L9.57 18.0697" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M20.5019 12H3.67188" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					<svg width="24" height="24" className="scale-75 stroke-slate-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M3.5 12H20.33" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
				<div>
					<svg width="24" height="24" className="scale-75 stroke-slate-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M14.8881 5.08039C14.0181 4.82039 13.0581 4.65039 11.9981 4.65039C7.20813 4.65039 3.32812 8.53039 3.32812 13.3204C3.32812 18.1204 7.20813 22.0004 11.9981 22.0004C16.7881 22.0004 20.6681 18.1204 20.6681 13.3304C20.6681 11.5504 20.1281 9.89039 19.2081 8.51039"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path d="M16.1244 5.32L13.2344 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M16.1356 5.32031L12.7656 7.78031" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>

				<div className="bg-slate-1 w-full py-1 px-2 text-1 text-slate-11 line-clamp-1 rounded-6">
					https://{prefix || 'emmanuelaina'}.aveer.site/{prefix ? '' : title ? encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase()) : ''}
				</div>
			</div>
		</div>
	);
};
