'use client';

import Link from 'next/link';
import Tag from '../tag';
import { HTMLAttributes, useEffect, useRef } from 'react';
import { DeleteButton } from '../delete';
import { date } from '../date';

export default function DateTemplate({ data, canEdit, pageId, ...props }: HTMLAttributes<HTMLElement> & { pageId: string; data: any[]; canEdit?: boolean }) {
	const div = useRef<HTMLDivElement>(null);
	const dates = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let options = {
			root: null,
			rootMargin: '0px',
			threshold: [0.6]
		};

		let callback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				const { target, isIntersecting } = entry;

				if (isIntersecting) {
					const elements = dates.current?.children as HTMLCollection;

					for (let index = 0; index < elements.length; index++) {
						const element = dates.current?.children[index];
						element?.classList.remove('translate-y-0', 'text-slate-12', 'font-bold');

						if (index > Number(target.id)) element?.classList.add('translate-y-7');
						if (index < Number(target.id)) element?.classList.add('-translate-y-7');
						if (index == Number(target.id)) {
							dates.current?.children[Number(target.id)].classList.remove('-translate-y-7', 'translate-y-7');
							dates.current?.children[Number(target.id)].classList.add('translate-y-0', 'text-slate-12', 'font-bold');
						}
					}
				}
			});
		};

		let observer = new IntersectionObserver(callback, options);

		if (div.current) for (let i = 0; i < div.current.children.length; i++) observer.observe(div.current.children[i]);
	});

	return (
		<div className="flex gap-space-7 w-full pt-10" {...props}>
			<div ref={dates} className="text-2 self-start font-regular w-[88px] sticky top-80 flex flex-col gap-space-4">
				{data &&
					data.map((post: any) => (
						<div className="text-slate-10 transition-all duration-500" key={post.id}>
							{date(post.created_at)}
						</div>
					))}
			</div>

			<div ref={div} className="flex flex-col gap-space-9">
				{data &&
					data.map((post, index) => (
						<div className="max-w-[600px] border-b border-b-indigoA-4 pb-space-4" id={`${index}`} key={post.id}>
							<div className="flex justify-between relative">
								{post?.tag && <Tag name="improvement" />}

								<DeleteButton className="absolute" postId={post.id} pageId={pageId} />
							</div>

							<h2 className="text-slate-11 text-6 font-medium mb-space-6">
								<Link prefetch href={`/${pageId}/${post.title}`} scroll={false}>
									{post.title}
								</Link>
							</h2>

							<div className="foreign-html line-clamp-6" dangerouslySetInnerHTML={{ __html: post.body }}></div>
						</div>
					))}
			</div>
		</div>
	);
}
