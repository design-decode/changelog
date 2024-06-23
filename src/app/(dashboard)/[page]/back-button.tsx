import Link from 'next/link';
import { HTMLAttributes, ReactNode } from 'react';

export const NavigationButton = ({ ...props }: { href: string; children?: ReactNode }) => {
	return (
		<Link prefetch {...props} className="flex group items-center gap-2 border border-slate-6 py-1 pl-3 pr-1 rounded-6 w-fit transition-all duration-500 hover:bg-slate-3 focus:bg-slate-3 outline-none hover:border-slate-8 focus:border-slate-8">
			<svg width="24" height="24" viewBox="0 0 24 24" className="scale-50 stroke-slate-11 group-hover:stroke-slate-12 group-hover:scale-75 left-0 group-hover:-left-1 relative transition-all duration-500" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M15.0038 19.9201L8.48375 13.4001C7.71375 12.6301 7.71375 11.3701 8.48375 10.6001L15.0038 4.08008" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
			<span className="font-light text-2 text-slate-11">{props.children}</span>
		</Link>
	);
};
