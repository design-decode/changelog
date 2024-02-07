'use client';

import { HtmlProps } from 'next/dist/shared/lib/html-context';
import LoaderBg from '../../../public/img/colors_loader.png';
import './loader.scss';
import { HTMLAttributes } from 'react';

const Loader = (props: HTMLAttributes<'div'>) => {
	return (
		<div {...{ props }} className={'fixed top-0 left-[57px] right-0 bottom-0 z-10 flex items-center justify-center ' + props.className} style={{ background: `url(${LoaderBg.src}) no-repeat center` }}>
			<div className="absolute w-full h-full bg-slateA-2 bg-opacity-0 backdrop-blur-xl"></div>
			<div className="loader">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				{/* <span></span>
				<span></span>
				<span></span>
				<span></span> */}
				{/* <span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span> */}
			</div>
		</div>
	);
};

export { Loader };
