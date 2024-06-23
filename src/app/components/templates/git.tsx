import Link from 'next/link';
import Tag from '../tag';
import React, { HTMLAttributes } from 'react';
import { DeleteButton } from '../delete';
import { date } from '../date';

export const GitTemplate = ({ data, canEdit, pageId, ...props }: HTMLAttributes<HTMLElement> & { pageId: string; data: any; canEdit?: boolean }) => {
	return (
		<div {...props} className="flex gap-space-7 w-full mb-10 pb-4">
			<div className="text-2 font-regular w-[88px] self-start sticky top-10 flex flex-col gap-space-4 mt-2">
				<div className="text-slate-11">{date(data.published_at)}</div>
				<div className="text-slate-11 flex items-center gap-space-1">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-slate-11 scale-75" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M4.17038 15.2998L8.70038 19.8298C10.5604 21.6898 13.5804 21.6898 15.4504 19.8298L19.8404 15.4398C21.7004 13.5798 21.7004 10.5598 19.8404 8.6898L15.3004 4.1698C14.3504 3.2198 13.0404 2.7098 11.7004 2.7798L6.70038 3.0198C4.70038 3.1098 3.11038 4.6998 3.01038 6.6898L2.77038 11.6898C2.71038 13.0398 3.22038 14.3498 4.17038 15.2998Z"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path d="M9.49988 12C10.8806 12 11.9999 10.8807 11.9999 9.5C11.9999 8.11929 10.8806 7 9.49988 7C8.11917 7 6.99988 8.11929 6.99988 9.5C6.99988 10.8807 8.11917 12 9.49988 12Z" strokeWidth="1.5" strokeLinecap="round" />
					</svg>
					{data.tag_name}
				</div>
				{/* <div className="text-indigoA-11 flex items-center gap-space-1">
					<svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M10.613 3.99998C10.613 5.44317 9.44307 6.6131 7.99988 6.6131C6.5567 6.6131 5.38677 5.44317 5.38677 3.99998C5.38677 2.5568 6.5567 1.38687 7.99988 1.38687C9.44307 1.38687 10.613 2.5568 10.613 3.99998ZM11.5874 4.53343C11.3294 6.28335 9.82148 7.62644 7.99988 7.62644C6.17828 7.62644 4.67037 6.28335 4.4124 4.53343H0.533333C0.238782 4.53343 0 4.29464 0 4.0001C0 3.70555 0.238782 3.46676 0.533333 3.46676H4.41236C4.67024 1.71674 6.1782 0.373535 7.99988 0.373535C9.82157 0.373535 11.3295 1.71674 11.5874 3.46676H15.4667C15.7612 3.46676 16 3.70555 16 4.0001C16 4.29464 15.7612 4.53343 15.4667 4.53343H11.5874Z"
							fill="#99A2FF"
						/>
					</svg>
					v0.3.5
				</div>
				<div className="text-indigoA-11 flex items-center gap-space-1">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M3.33334 5.3335C4.43791 5.3335 5.33334 4.43807 5.33334 3.3335C5.33334 2.22893 4.43791 1.3335 3.33334 1.3335C2.22877 1.3335 1.33334 2.22893 1.33334 3.3335C1.33334 4.43807 2.22877 5.3335 3.33334 5.3335Z" fill="#99A2FF" />
						<path d="M12.6667 10C13.7712 10 14.6667 9.10457 14.6667 8C14.6667 6.89543 13.7712 6 12.6667 6C11.5621 6 10.6667 6.89543 10.6667 8C10.6667 9.10457 11.5621 10 12.6667 10Z" stroke="#99A2FF" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
						<path
							d="M3.33334 14.6665C4.43791 14.6665 5.33334 13.7711 5.33334 12.6665C5.33334 11.5619 4.43791 10.6665 3.33334 10.6665C2.22877 10.6665 1.33334 11.5619 1.33334 12.6665C1.33334 13.7711 2.22877 14.6665 3.33334 14.6665Z"
							stroke="#99A2FF"
							strokeWidth="0.8"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path d="M10.6667 8.00016H6.00001C4.53334 8.00016 3.33334 7.3335 3.33334 5.3335V10.6668" stroke="#99A2FF" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					v1.3.2
				</div> */}
			</div>

			<div className="max-w-[600px] w-full border-b border-b-slate-3 pb-space-4 relative">
				{data?.tag && <Tag name="bug fix" />}

				{canEdit && <DeleteButton className="absolute" postId={data.id} pageId={pageId} />}

				<h2 className="text-slate-11 text-6 font-bold mb-space-6">
					<Link prefetch href={`/${pageId}/${data.title}`}>
						{data.title}
					</Link>
				</h2>

				<div className="foreign-html line-clamp-6" dangerouslySetInnerHTML={{ __html: data.body }}></div>

				{/* <div className="mt-space-6 flex justify-between items-center">
					<ul className="flex">
						<li>
							<Image src={Avatar} alt="github picture" priority width={32} height={32} placeholder="blur" />
						</li>
						<li className="-ml-2">
							<Image src={Avatar} alt="github picture" priority width={32} height={32} placeholder="blur" />
						</li>
					</ul>

					<Link prefetch className="text-slate-12 flex gap-space-1 items-center font-regular text-1 h-space-6 px-space-3 rounded-6 bg-slate-4 border border-slate-8" href={'./'}>
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
				</div> */}
			</div>
		</div>
	);
};
