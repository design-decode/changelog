import { GRID_ITEM } from '@/app/lib/portfolio.interface';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

const LinkIcon = ({ ...props }: HTMLAttributes<SVGElement>) => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" className={`stroke-white fill-none scale-50 ${props.className}`} xmlns="http://www.w3.org/2000/svg">
			<path d="M13 11L21.2 2.80005" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M22.0031 6.8V2H17.2031" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const GridImage = ({ imgDetails, className, onCaptionChange }: { imgDetails: GRID_ITEM; className?: string; onCaptionChange: (text: string) => void }) => {
	return (
		<>
			<Image
				src={(imgDetails.imgSrc as string).includes('http') ? (imgDetails.imgSrc as string) : atob(imgDetails.imgSrc as string)}
				priority
				fill
				sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
				className={`object-cover w-auto h-auto relative rounded-[35px] z-0 ${className}`}
				alt="img"
			/>
			<div>{imgDetails.caption}</div>
			<textarea
				aria-label="caption"
				placeholder="Add caption"
				defaultValue={imgDetails.caption}
				onChange={event => onCaptionChange(event.target.value)}
				className={`${imgDetails.caption ? 'opacity-100' : 'opacity-0'} exempt drop-shadow-sm h-fit group-hover:opacity-100 outline-none resize-none absolute bottom-6 rounded-6 text-2 py-1 px-2 left-2 min-h-10 w-[calc(100%-16px)]`}
			/>
			{imgDetails.imgLink && (
				<Link prefetch href={imgDetails.imgLink as string} className="absolute top-3 right-3 drop-shadow-lg rounded-[100px] bg-slateA-3 backdrop-blur-md" target="_blank" referrerPolicy="no-referrer">
					<LinkIcon />
				</Link>
			)}
		</>
	);
};

const ServerImage = ({ imgDetails }: { imgDetails: GRID_ITEM }) => {
	return (
		<>
			<Image src={imgDetails.imgSrc as string} priority fill sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" className={`object-cover w-auto h-auto relative rounded-[35px] z-0`} alt="img" />

			<p className={`${imgDetails.caption ? 'opacity-100' : 'opacity-0'} bg-white exempt drop-shadow-md h-fit group-hover:opacity-100 outline-none resize-none absolute bottom-6 rounded-6 text-2 py-1 px-2 left-2 max-w-[calc(100%-16px)]`}>{imgDetails.caption}</p>

			{imgDetails.imgLink && (
				<div className="absolute top-3 right-3 drop-shadow-lg rounded-[100px] bg-slateA-3 backdrop-blur-md">
					<LinkIcon />
				</div>
			)}
		</>
	);
};

export const GridImageServer = ({ imgDetails }: { imgDetails: GRID_ITEM }) => {
	return imgDetails.imgLink ? (
		<Link prefetch href={imgDetails.imgLink as string} target="_blank" referrerPolicy="no-referrer">
			<ServerImage imgDetails={imgDetails} />
		</Link>
	) : (
		<ServerImage imgDetails={imgDetails} />
	);
};
