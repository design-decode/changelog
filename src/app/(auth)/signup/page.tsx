'use client';

import Input from '@/app/components/input';
import { createClient } from '../../../utils/supabase/client';
import { Spinner } from '@/app/components/loader';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const supabase = createClient();

const AuthPage = ({ searchParams }: { searchParams: { [key: string]: string } }) => {
	const router = useRouter();
	const [isLoading, toggleLoader] = useState(false);
	const [prefixExists, setPrefixState] = useState(true);
	const [prefix, setPrefix] = useState('');
	const [prefixText] = useDebounce(prefix, 700);
	const [stage, setStage] = useState<'prefix' | 'signup'>('prefix');
	const [passwordCredentials, setPasswordCredentials] = useState<{ email: string; password: string }>({ email: '', password: '' });

	const checkDomainPrefix = async (prefix: string) => {
		toggleLoader(true);
		setPrefixState(false);
		const { data, error } = await supabase.from('sites').select('prefix').eq('prefix', prefix);
		if (data && data.length) setPrefixState(true);
		if (data && !data.length) setPrefixState(false);
		toggleLoader(false);
	};

	const getSiteData = useCallback(
		async (userId: string) => {
			const sitesResponse = await supabase.from('sites').select('prefix').eq('prefix', prefixText).eq('user', userId);

			if (sitesResponse.error || sitesResponse.data.length) return sitesResponse;

			const res = await supabase
				.from('sites')
				.insert({ prefix: `${prefixText}` })
				.select('prefix');
			return res;
		},
		[prefixText]
	);

	useEffect(() => {
		if (prefixText) checkDomainPrefix(prefixText);

		const onOauth = async () => {
			const {
				data: { user }
			} = await supabase.auth.getUser();
			if (!user) return;

			const { data: siteData, error: siteError } = await getSiteData(user?.id);

			toggleLoader(false);
			router.push('/');
		};

		if (searchParams.auth === 'google') onOauth();
	}, [getSiteData, prefixText, router, searchParams.auth]);

	async function signInWithGoogle() {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: { redirectTo: 'http://localhost:3000/auth/callback?next=/signup?auth=google' }
		});
	}

	async function signInWithPassword() {
		toggleLoader(true);
		const { data, error } = await supabase.auth.signUp(passwordCredentials);
		if (error || !data.user) return;

		const { data: siteData, error: siteError } = await getSiteData(data.user?.id);

		toggleLoader(false);
		router.push('/');
	}

	return (
		<main className="mt-[300px] max-w-[381px] mx-auto">
			<div className="mb-8">
				<h2 className="font-medium text-3 text-slate-12">Welcome to Aveer</h2>
				<p className="text-slate-11 text-2 mt-3">{stage == 'prefix' ? 'First, claim your url to get started.' : 'Lastly, signup, just so we identify you uniquely.'}</p>
			</div>

			<div className="relative w-full">
				<form className={`${stage == 'prefix' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-all duration-500 absolute top-0 left-0 w-full`}>
					<div className="flex w-full relative items-center bg-slateA-3 border-slate-4 border rounded-2 px-1 h-8 text-1.1 text-slate-9 has-[:focus]:scale-105 has-[:focus]:bg-slateA-4 has-[:focus]:border-slate-7 duration-500 has-[:focus]:shadow-6 transition-all">
						<div>https://</div>
						<input
							onChange={event => setPrefix(event.target.value.replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, ''))}
							value={prefix}
							autoFocus
							className="bg-transparent w-full text-1.1 text-slate-12 outline-none ml-1 placeholder:text-slateA-8 font-regular"
							placeholder="preferred-prefix"
							type="text"
						/>
						<div className="ml-auto">.aveer.site</div>
						<Spinner className={`-right-7 ${isLoading ? 'opacity-100' : 'opacity-0'}`} />
						<svg width="24" height="24" viewBox="0 0 24 24" className={`fill-none stroke-green-8 scale-75 absolute -right-7 opacity-0 ${prefixText && !prefixExists && !isLoading ? 'opacity-100' : ''}`} xmlns="http://www.w3.org/2000/svg">
							<path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M7.75 12L10.58 14.83L16.25 9.17004" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					<p className={`text-tomato-7 mt-1 font-regular text-1 text-left transition-all duration-500 ${prefixText && prefixExists && !isLoading ? 'opacity-100' : 'opacity-0'}`}>Sorry this link is not available</p>

					<div className="w-full flex gap-4 justify-end mt-6 items-center">
						<Link prefetch className="px-2 py-1 text-slate-10 text-1" href={'/login'}>
							Login
						</Link>
						<button
							disabled={prefixExists}
							onClick={event => {
								event.preventDefault();
								setStage('signup');
							}}
							className="active:scale-95 transition-all duration-500 flex items-center border border-slate-7 rounded-4 bg-slate-12 px-8 py-1 gap-2 disabled:opacity-20">
							<div className="text-slate-3 text-1.1 font-medium">Claim URL</div>
						</button>
					</div>
				</form>

				<form className={`${stage == 'signup' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-all duration-500 absolute top-0 left-0 w-full`}>
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
								className="relative flex items-center border border-slate-7 rounded-4 bg-slate-12 px-2 py-2 w-full justify-center gap-2 disabled:opacity-20">
								{passwordCredentials.email || passwordCredentials.password ? (
									<>Signup</>
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
										<div className="text-slate-3 text-2">Signup with Google</div>
									</>
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		</main>
	);
};

export default AuthPage;
