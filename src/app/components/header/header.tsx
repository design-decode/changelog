'use server';

import Link from 'next/link';
import { LogoutButton } from '../logout-button';
import { PageSettingsButton } from '../page-settings-button';
import { PagesDropdown } from './pages-dropdown';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/client';

const Header = async () => {
	const supabase = createClient();
	const header = headers();
	const sitePrefix = header.get('host')?.split('.')[0];

	const { data, error } = await supabase.from('pages').select().eq('site', sitePrefix);

	return (
		<nav className="flex items-center fixed left-1/2 z-20 -translate-x-1/2 top-8">
			<div className="flex items-center group/nav bg-slate-12 rounded-[30px] relative z-20">
				{data && <PagesDropdown pages={data} />}

				<Link prefetch href={`/settings`} title="Open settings" className={`group/settings px-4 py-2`}>
					<svg width="24" height="25" viewBox="0 0 24 25" className={`group-hover/settings:stroke-slate-3 group-focus/settings:stroke-slate-3 transition-all duration-500 scale-75 stroke-slate-3`} fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M3 10.0379V15.8079C3 17.9279 3 17.9279 5 19.2779L10.5 22.4579C11.33 22.9379 12.68 22.9379 13.5 22.4579L19 19.2779C21 17.9279 21 17.9279 21 15.8179V10.0379C21 7.9279 21 7.9279 19 6.5779L13.5 3.3979C12.68 2.9179 11.33 2.9179 10.5 3.3979L5 6.5779C3 7.9279 3 7.9279 3 10.0379Z"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path d="M12 15.9276C13.6569 15.9276 15 14.5844 15 12.9276C15 11.2707 13.6569 9.92755 12 9.92755C10.3431 9.92755 9 11.2707 9 12.9276C9 14.5844 10.3431 15.9276 12 15.9276Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</Link>

				<LogoutButton />
			</div>

			<PageSettingsButton />
		</nav>
	);
};

export default Header;
