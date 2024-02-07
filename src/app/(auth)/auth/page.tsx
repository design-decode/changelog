'use client';

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
const supabase = createPagesBrowserClient();

const AuthPage = () => {
	async function signInWithGithub() {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: { redirectTo: 'http://localhost:3000/setup' }
		});
	}

	return (
		<main className="flex flex-col justify-center items-center mt-[200px] max-w-[281px] mx-auto text-center gap-space-6">
			<div>
				<h2 className="font-medium text-3 text-slate-12">Welcome to Tally</h2>
				<p className="text-slate-11 text-1 mt-space-1">Get started with making your Github product log even prettier.</p>
			</div>

			<button onClick={() => signInWithGithub()} className="flex items-center border border-slate-7 rounded-2 px-space-2 h-8 w-fit gap-space-2">
				<svg width="16" height="16" viewBox="0 0 16 16" className="fill-slate-12" xmlns="http://www.w3.org/2000/svg">
					<rect width="16" height="16" fillOpacity="0.01" />
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M7.99934 0.266663C3.7295 0.266663 0.266724 3.72899 0.266724 8.00025C0.266724 11.4165 2.48235 14.3153 5.55536 15.3383C5.94229 15.4091 6.08328 15.1703 6.08328 14.9652C6.08328 14.7814 6.07663 14.2954 6.07284 13.6501C3.92177 14.1173 3.46792 12.6133 3.46792 12.6133C3.11613 11.7199 2.60911 11.482 2.60911 11.482C1.90697 11.0026 2.66229 11.012 2.66229 11.012C3.43849 11.0667 3.84677 11.8092 3.84677 11.8092C4.53657 12.9907 5.65696 12.6494 6.09753 12.4514C6.16779 11.952 6.36765 11.6111 6.58841 11.4179C4.87126 11.2223 3.06582 10.5591 3.06582 7.59577C3.06582 6.7512 3.36728 6.0614 3.86196 5.52067C3.7822 5.32507 3.51682 4.53889 3.93791 3.47403C3.93791 3.47403 4.58688 3.26609 6.06429 4.26637C6.68098 4.09499 7.34278 4.00954 8.00029 4.00621C8.65734 4.00954 9.31866 4.09499 9.9363 4.26637C11.4128 3.26609 12.0608 3.47403 12.0608 3.47403C12.4828 4.53889 12.2174 5.32507 12.1382 5.52067C12.6338 6.0614 12.9329 6.7512 12.9329 7.59577C12.9329 10.5667 11.1245 11.2205 9.40221 11.4117C9.67946 11.6506 9.92681 12.1224 9.92681 12.844C9.92681 13.8775 9.9173 14.7117 9.9173 14.9652C9.9173 15.1722 10.0569 15.4129 10.449 15.3374C13.5196 14.3124 15.7334 11.416 15.7334 8.00025C15.7334 3.72899 12.2706 0.266663 7.99934 0.266663Z"
						fillOpacity="0.797"
					/>
				</svg>
				<div className="text-slate-12 text-2">Get started with Github</div>
			</button>
		</main>
	);
};

export default AuthPage;
