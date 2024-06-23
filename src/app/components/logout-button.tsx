'use client';

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
	const supabase = createPagesBrowserClient();
	const router = useRouter();

	return (
		<button
			className="px-4 py-2"
			title="Log out"
			onClick={async () => {
				const { error } = await supabase.auth.signOut();
				if (!error) router.refresh();
			}}>
			<svg width="24" height="24" viewBox="0 0 24 24" className="fill-none stroke-slate-3 scale-75" xmlns="http://www.w3.org/2000/svg">
				<path d="M17.4375 14.62L19.9975 12.06L17.4375 9.5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M9.76562 12.0596H19.9356" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M11.7656 20C7.34562 20 3.76562 17 3.76562 12C3.76562 7 7.34562 4 11.7656 4" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</button>
	);
};
