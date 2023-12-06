import Image from 'next/image';
import SampleImage from '../../../../public/img/sample1.png';
import Avatar from '../../../../public/img/avatar.png';
import Link from 'next/link';
import Tag from '../tag';

export default function DefaultTemplate() {
	return (
		<div className="flex gap-space-7 w-full">
			<div className="text-2 text-slate-11 font-regular w-[88px] sticky top-0">May 17, 2023</div>
			<div className="max-w-[600px] border-b border-b-indigoA-4 pb-space-4">
				<div className="flex justify-between">
					<Tag name="bug fix" />

					<button>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14 3.98696C11.78 3.76696 9.54667 3.65363 7.32 3.65363C6 3.65363 4.68 3.72029 3.36 3.85363L2 3.98696" fill="#C62A2F" />
							<path d="M5.66675 3.31331L5.81341 2.43998C5.92008 1.80665 6.00008 1.33331 7.12675 1.33331H8.87341C10.0001 1.33331 10.0867 1.83331 10.1867 2.44665L10.3334 3.31331" stroke="#C62A2F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M12.5657 6.09308L12.1324 12.8064C12.059 13.8531 11.999 14.6664 10.139 14.6664H5.85904C3.99904 14.6664 3.93904 13.8531 3.86571 12.8064L3.43237 6.09308" stroke="#C62A2F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M6.8855 11H9.1055" stroke="#C62A2F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M6.33325 8.33331H9.66659" stroke="#C62A2F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</div>

				<h2 className="text-slate-12 text-5 font-bold mb-space-4">New: Events Transformation</h2>
				<p className="font-regular text-1.1 text-slate-11 mb-space-4">
					This is where our enhanced insider reports pages come in handy. The improved filtering and color-coded symbols allow you to track and interpret this insider trading activity more easily, leading to more informed investment decisions. As always, we strive to
					equip you with the most accurate and accessible financial information, so you can invest confidently.
				</p>
				<Image src={SampleImage} alt="sample1" className="w-full mb-space-4" />
				<p className="font-regular text-1.1 text-slate-11 mb-space-4">
					This is where our enhanced insider reports pages come in handy. The improved filtering and color-coded symbols allow you to track and interpret this insider trading activity more easily, leading to more informed investment decisions. As always, we strive to
					equip you with the most accurate and accessible financial information, so you can invest confidently.
				</p>

				<div className="mt-space-6 flex justify-between items-center">
					<ul className="flex">
						<li>
							<Image src={Avatar} alt="github picture" priority width={32} height={32} placeholder="blur" />
						</li>
						<li className="-ml-2">
							<Image src={Avatar} alt="github picture" priority width={32} height={32} placeholder="blur" />
						</li>
					</ul>

					<Link className="text-slate-12 flex gap-space-1 items-center font-regular text-1 h-space-6 px-space-3 rounded-6 bg-slate-4 border border-slate-8" href={'./'}>
						Read more
						<svg width="16" height="16" viewBox="0 0 16 16" className="fill-slate-11" xmlns="http://www.w3.org/2000/svg">
							<rect width="16" height="16" fill="white" fillOpacity="0.01" />
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M6.59408 4.46063C6.78153 4.27317 7.08545 4.27317 7.2729 4.46063L10.4729 7.66063C10.5629 7.75065 10.6135 7.87274 10.6135 8.00004C10.6135 8.12735 10.5629 8.24944 10.4729 8.33946L7.2729 11.5394C7.08545 11.7269 6.78153 11.7269 6.59408 11.5394C6.40663 11.352 6.40663 11.0481 6.59408 10.8607L9.45467 8.00004L6.59408 5.13946C6.40663 4.952 6.40663 4.64809 6.59408 4.46063Z"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</div>
	);
}
