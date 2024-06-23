'use client';

import { createClient } from '@/utils/supabase/client';
import { RealtimePostgresChangesPayload } from '@supabase/realtime-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const PagesDropdown = ({ pages }: { pages: { id: string; name: string; page_slug: string }[] }) => {
	const supabase = createClient();
	const [localPages, setPages] = useState<any[]>(pages);

	const handleSubscription = (payload: RealtimePostgresChangesPayload<any>) => {
		if (payload.eventType === 'UPDATE') {
			const pageIndex = localPages.findIndex(page => page.id === payload.old.id);
			if (pageIndex < 0) return;

			localPages[pageIndex] = payload.new;
			setPages([...localPages]);
		}

		if (payload.eventType === 'INSERT') {
			const newest = [...localPages, payload.new];
			setPages(newest);
		}

		if (payload.eventType === 'DELETE') {
			const newPages = localPages.filter(page => page.id !== payload.old.id);
			setPages([...newPages]);
		}
	};

	useEffect(() => {
		setPages(pages);

		const channel = supabase
			.channel('custom-all-channel')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'pages' }, payload => {
				handleSubscription(payload);
			})
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, []);

	return (
		<button className={`dropdown-button flex items-center group py-2`}>
			<div title="Pages" className={`outline-none px-4`}>
				<svg width="24" height="24" viewBox="0 0 24 24" className="stroke-slate-3 fill-none scale-75" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M13.0134 2.92031L18.9134 5.54031C20.6134 6.29031 20.6134 7.53031 18.9134 8.28031L13.0134 10.9003C12.3434 11.2003 11.2434 11.2003 10.5734 10.9003L4.67344 8.28031C2.97344 7.53031 2.97344 6.29031 4.67344 5.54031L10.5734 2.92031C11.2434 2.62031 12.3434 2.62031 13.0134 2.92031Z"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path d="M3 11C3 11.84 3.63 12.81 4.4 13.15L11.19 16.17C11.71 16.4 12.3 16.4 12.81 16.17L19.6 13.15C20.37 12.81 21 11.84 21 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M3 16C3 16.93 3.55 17.77 4.4 18.15L11.19 21.17C11.71 21.4 12.3 21.4 12.81 21.17L19.6 18.15C20.45 17.77 21 16.93 21 16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>

			<div
				className={`group-hover:max-h-[272px] group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:max-h-[272px] group-focus-within:pointer-events-auto opacity-0 overflow-hidden rounded-b-[30px] pointer-events-none -z-10 max-h-0 transition-all duration-500 right-0 pt-6 absolute left-0 -top-[0.15rem]`}>
				<ul id="sites-list" className={`transition-all duration-500 w-full bg-slate-12 pt-8`}>
					{localPages.map((page, index) => (
						<li className={`transition-all duration-500`} key={index}>
							<Link prefetch scroll={false} href={`/${page.page_slug}`} className="w-full text-left py-space-2 px-space-2 text-1 text-slate-2 flex justify-between items-center group capitalize">
								{page.name}
								<svg width="24" height="24" viewBox="0 0 24 24" className={`stroke-slate-3 scale-50 fill-transparent opacity-0 -translate-x-1 transition-all`} xmlns="http://www.w3.org/2000/svg">
									<path
										d="M4 12.0004V8.44038C4 4.02038 7.13 2.21038 10.96 4.42038L14.05 6.20038L17.14 7.98038C20.97 10.1904 20.97 13.8104 17.14 16.0204L14.05 17.8004L10.96 19.5804C7.13 21.7904 4 19.9804 4 15.5604V12.0004Z"
										strokeWidth="1"
										strokeMiterlimit="10"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</Link>
						</li>
					))}

					<li className="bg-slate-12">
						<Link prefetch href={'/new'} className="w-full text-left py-4 px-space-2 text-1 text-slate-8 flex items-center">
							<svg width="24" height="24" viewBox="0 0 24 24" className="stroke-slate-8 fill-none scale-75 mr-1" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M8 12H16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M12 16V8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							Create New Page
						</Link>
					</li>
				</ul>
			</div>
		</button>
	);
};
