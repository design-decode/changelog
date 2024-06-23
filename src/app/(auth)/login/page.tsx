'use client';

import { Spinner } from '@/app/components/loader';
import { useState } from 'react';
import { createClient } from '../../../utils/supabase/client';
import Input from '@/app/components/input';
import { useRouter } from 'next/navigation';
const supabase = createClient();

const AuthPage = () => {
	const router = useRouter();
	const [passwordCredentials, setPasswordCredentials] = useState<{ email: string; password: string }>({ email: '', password: '' });
	const [isLoading, toggleLoader] = useState(false);

	async function signInWithGoogle() {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: { redirectTo: 'http://localhost:3000/auth/callback' }
		});
	}

	async function signInWithPassword() {
		toggleLoader(true);
		const { data, error } = await supabase.auth.signInWithPassword(passwordCredentials);
		if (error || !data.user) return;

		toggleLoader(false);
		router.push('/');
	}

	return (
		<main className="mt-[300px] max-w-[381px] mx-auto">
			<div className="mb-8">
				<h2 className="font-medium text-3 text-slate-12">Welcome back</h2>
				<p className="text-slate-11 text-1 mt-space-1">Continue from where you left off.</p>
			</div>

			<form className={``}>
				<div className="">
					<div className="flex items-center gap-4 mb-6">
						<Input onChange={event => setPasswordCredentials({ ...passwordCredentials, email: event.target.value })} type="email" required name="email" id="email" label="Email" className="w-full" />
						<Input onChange={event => setPasswordCredentials({ ...passwordCredentials, password: event.target.value })} type="password" required name="password" id="password" label="Password" className="w-full" />
					</div>

					{!passwordCredentials.email && !passwordCredentials.password && <div className="w-full text-center text-slate-11 text-2 my-4">Or</div>}

					<div className="relative">
						<Spinner className={`left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ${isLoading ? 'opacity-100' : 'opacity-0'}`} />
						<button
							disabled={isLoading}
							onClick={() => (passwordCredentials.email || passwordCredentials.password ? signInWithPassword() : signInWithGoogle())}
							className="relative flex items-center border border-slate-7 rounded-4 text-2 bg-slate-12 px-2 py-2 w-full justify-center gap-2 disabled:opacity-20">
							{passwordCredentials.email || passwordCredentials.password ? (
								<>Login</>
							) : (
								<>
									<svg width="24" height="24" viewBox="0 0 24 24" className="stroke-slate-3 fill-slate-3 scale-75" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M21.6031 10.2H12.2031V13.9H17.7031C17.6031 14.8 17.0031 16.2 15.7031 17.1C14.9031 17.7 13.7031 18.1 12.2031 18.1C9.60313 18.1 7.30313 16.4 6.50313 13.9C6.30313 13.3 6.20312 12.6 6.20312 11.9C6.20312 11.2 6.30313 10.5 6.50313 9.9C6.60313 9.7 6.60312 9.5 6.70312 9.4C7.60312 7.3 9.70312 5.8 12.2031 5.8C14.1031 5.8 15.3031 6.6 16.1031 7.3L18.9031 4.5C17.2031 3 14.9031 2 12.2031 2C8.30312 2 4.90312 4.2 3.30312 7.5C2.60312 8.9 2.20312 10.4 2.20312 12C2.20312 13.6 2.60312 15.1 3.30312 16.5C4.90312 19.8 8.30312 22 12.2031 22C14.9031 22 17.2031 21.1 18.8031 19.6C20.7031 17.9 21.8031 15.3 21.8031 12.2C21.8031 11.4 21.7031 10.8 21.6031 10.2Z"
											strokeWidth="1.5"
											strokeMiterlimit="10"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<div className="text-slate-3 text-2">Login with Google</div>
								</>
							)}
						</button>
					</div>
				</div>
			</form>
		</main>
	);
};

export default AuthPage;
