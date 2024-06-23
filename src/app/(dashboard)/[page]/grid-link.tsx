/* eslint-disable @next/next/no-img-element */
import { GRID_ITEM } from '@/app/lib/portfolio.interface';
import Link from 'next/link';

export const GridLink = ({ details }: { details: GRID_ITEM }) => {
	return (
		<Link prefetch href={details?.link as string} className="flex flex-col h-full p-2 select-none" target="_blank" referrerPolicy="no-referrer" draggable="false">
			<img src={`https://${details?.domain}/favicon.ico`} width={30} height={30} className="rounded-[100px]" alt="link favicon" />
			<div>
				<h4 className="mt-2 text-2 font-bold text-slate-12">{details?.title}</h4>
				<div className="text-1 text-slate-10">{details?.domain}</div>
				{details?.description && <p>{details?.description}</p>}
			</div>

			<svg width="24" height="24" viewBox="0 0 24 24" className="stroke-slateA-8 fill-none scale-50 absolute top-3 right-3" xmlns="http://www.w3.org/2000/svg">
				<path d="M13 11L21.2 2.80005" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M22.0031 6.8V2H17.2031" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</Link>
	);
};
