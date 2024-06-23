import Link from 'next/link';
import Tag from '../tag';
import { HTMLAttributes } from 'react';
import { DeleteButton } from '../delete';
import { date } from '../date';

export const DateNormal = ({ data, canEdit, pageId, ...props }: HTMLAttributes<HTMLElement> & { pageId: string; data: any; canEdit?: boolean }) => {
	return (
		<div {...props} className={`flex gap-space-7 w-full mb-10 pb-4 ${props.className}`}>
			<div className="text-2 self-start text-slate-11 font-regular w-[88px] sticky top-10 mt-2">{date(data.created_at)}</div>

			<div className="max-w-[600px] w-full border-b border-b-slate-3 pb-4 relative">
				{data?.tag && <Tag name="bug fix" />}

				<DeleteButton className="absolute" postId={data.id} pageId={pageId} />

				<h2 className="text-slate-11 text-6 font-medium mb-space-6">
					<Link prefetch href={`/${pageId}/${data.title}`} scroll={false}>
						{data.title}
					</Link>
				</h2>

				{/* <PostContent postBody={data.body} /> */}
				<div className="foreign-html line-clamp-6" dangerouslySetInnerHTML={{ __html: data.body }}></div>

				{/* <div className="mt-space-9 flex justify-between items-center"> */}
				{/* <ul className="flex">
						<li>
							<Image src={Avatar} alt="github picture" priority width={32} height={32} placeholder="blur" />
						</li>
						<li className="-ml-2">
							<Image src={Avatar} alt="github picture" priority width={32} height={32} placeholder="blur" />
						</li>
					</ul> */}

				{/* <Link prefetch className="text-slate-12 flex gap-space-1 items-center font-regular text-1 h-space-6 px-space-3 rounded-6 bg-slate-4 border border-slate-8" href={`/${data.repo}/${data.id}`}>
						Read more
						<svg width="16" height="16" viewBox="0 0 16 16" className="fill-slate-11" xmlns="http://www.w3.org/2000/svg">
							<rect width="16" height="16" fill="white" fillOpacity="0.01" />
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M6.59408 4.46063C6.78153 4.27317 7.08545 4.27317 7.2729 4.46063L10.4729 7.66063C10.5629 7.75065 10.6135 7.87274 10.6135 8.00004C10.6135 8.12735 10.5629 8.24944 10.4729 8.33946L7.2729 11.5394C7.08545 11.7269 6.78153 11.7269 6.59408 11.5394C6.40663 11.352 6.40663 11.0481 6.59408 10.8607L9.45467 8.00004L6.59408 5.13946C6.40663 4.952 6.40663 4.64809 6.59408 4.46063Z"
							/>
						</svg>
					</Link> */}
				{/* </div> */}
			</div>
		</div>
	);
};
