'use client';

import Header from '../../components/header';
import Template1 from '../../../../public/img/template1.png';
import Image from 'next/image';
import Input from '../../components/input';
import Link from 'next/link';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { User, UserResponse } from '@supabase/supabase-js';
import { Loader } from '@/app/components/page-loader';
import { useRouter } from 'next/navigation';

const supabase = createPagesBrowserClient();
type SETUP_STATES = 'repo' | 'template' | 'details';

export default function Home() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const repoId = searchParams.get('repoId');
	const [installation_id, setInstallationId] = useState(searchParams.get('installation_id'));

	const [uiState, setUiState] = useState<SETUP_STATES>((searchParams.get('state') as SETUP_STATES) || 'repo');
	const [askForInstallation, setInstallationStatus] = useState<boolean>(true);
	const routeAction = searchParams.get('setup_action');
	const [userRepos, setRepos] = useState<any[]>([]);
	const [supabaseRepos, setSupabaseRepos] = useState<any[]>([]);
	const [pageIsLoading, setPageLoader] = useState<boolean>(true);

	const [searchTerm, setSearchTerm] = useState('');
	const [filteredRepo, setFilteredRepo] = useState(userRepos);
	const [repoDetailsForm, setRepoDetailsForm] = useState<{ primary_color: string; domain_url: string }>({ primary_color: '#eeeeee', domain_url: '' });

	const updateUserInstallationId = useCallback(async () => await supabase.auth.updateUser({ data: { installation_id } }), [installation_id]);

	// const getUser = async (): Promise<User | null> => {
	// 	const data = await supabase.auth.getUser();
	// 	return data.data.user;
	// };

	const getRepos = useCallback(async () => {
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/repositories/github', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		return data;
	}, []);

	const handleRepoSearch = useCallback(
		(event?: React.ChangeEvent<HTMLInputElement>) => {
			if (!event) return setFilteredRepo(userRepos.slice(0, 5));
			setSearchTerm(event.target.value.toLowerCase());
			setFilteredRepo(userRepos.filter(repo => Object.values(repo).some((value: any) => value?.toString().toLowerCase().includes(event.target.value.toLowerCase()))));
		},
		[userRepos]
	);

	const handleRepoDetailsInput = (event: React.ChangeEvent<HTMLInputElement>) => setRepoDetailsForm({ ...repoDetailsForm, [event.target.id]: event.target.value });

	const handleRepoDetailSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { error } = await supabase.from('repos').update(repoDetailsForm).eq('name', repoId);
		if (!error) return router.push(`/${repoId}`);
	};

	const getReleases = useCallback(async (repoName: string) => {
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/releases/github/all', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ repo: repoName })
		});
		const res = await response.json();
		return res;
	}, []);

	const createSupabaseReleases = async (releases: any[], repo: string) => {
		const supabaseReleases = releases.map(release => ({ name: release.name, assets_url: release.assets_url, draft: release.draft, prerelease: release.prerelease, github_link: release.html_url, body: release.body, tag_name: release.tag_name, repo }));
		await supabase.from('releases').insert(supabaseReleases);
		return;
	};

	const setupRepo = async (repoDetails: any) => {
		const { data: repoData } = await supabase.from('repos').insert({ name: repoDetails.name }).select();

		if (!repoData) return;

		const githubReleases = await getReleases(repoDetails.name);
		await createSupabaseReleases(githubReleases.data, repoDetails.name);

		router.push(`/setup?state=template&repoId=${repoDetails.name}`);
		setUiState('template');
		return;
	};

	const updateRepoTemplate = async (templateId: number) => {
		await supabase.from('repos').update({ template_id: templateId }).eq('name', repoId);
		router.push(`?state=details&repoId=${repoId}`);
		setUiState('details');
	};

	const getSupabaseRepos = useCallback(async () => {
		const { data } = await supabase.from('repos').select();
		if (data) setSupabaseRepos(data);
		return;
	}, []);

	// check if user has existing repo on supabase
	const userSupabaseRepos = async () => {
		const { data } = await supabase.from('repos').select();
		return data;
	};

	const initSetup = useCallback(async () => {
		setPageLoader(true);
		if (routeAction == 'install' && installation_id) await updateUserInstallationId();

		const reposResponse = await getRepos();
		if (!reposResponse?.data?.repositories || reposResponse?.data?.repositories?.length == 0) {
			setPageLoader(false);
			return setInstallationStatus(false);
		}
		await getSupabaseRepos();

		if (reposResponse.error) setInstallationStatus(true);
		if (reposResponse.data?.repositories) {
			setInstallationStatus(false);
			setRepos(reposResponse.data.repositories);
			setFilteredRepo(reposResponse.data.repositories.slice(0, 4));
		}

		setPageLoader(false);
	}, [getRepos, getSupabaseRepos, installation_id, routeAction, updateUserInstallationId]);

	const isRepoExistingSupabase = (repoName: string): boolean => {
		const repoExists = supabaseRepos.find(repo => repo.name == repoName);
		return !!repoExists;
	};

	useEffect(() => {
		initSetup();
	}, [initSetup]);

	return (
		<main className="">
			<Header></Header>

			<div className={'transition-all duration-500 opacity-' + (pageIsLoading ? '100 pointer-events-auto' : '0 pointer-events-none')}>
				<Loader />
			</div>

			<section className="mt-space-9 max-w-[600px] mx-auto relative">
				{uiState && uiState === 'repo' && (
					<>
						<div className="mb-space-7 text-center">
							<h1 className="text-4 text-slate-12 font-medium">Select a repository</h1>
							<p className="mt-space-2 max-w-[280px] mx-auto text-slate-11 text-1 font-regular">Welcome Select the repository you’ll like to keep a log of it’s release change changes.</p>
						</div>

						{/* search repos */}
						<div className="flex items-center bg-slateA-3 border-slate-4 border rounded-2 px-space-1  mb-space-5 has-[:focus]:border-slate-7 has-[:focus]:bg-slateA-4 duration-500 has-[:focus]:shadow-6 transition-all">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="stroke-slate-11 mx-space-2 my-space-2" xmlns="http://www.w3.org/2000/svg">
								<path d="M13.3334 7.33331C13.3334 10.6466 10.6467 13.3333 7.33337 13.3333C4.02004 13.3333 1.33337 10.6466 1.33337 7.33331C1.33337 4.01998 4.02004 1.33331 7.33337 1.33331" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M12.619 13.7932C12.9723 14.8599 13.779 14.9665 14.399 14.0332C14.9657 13.1799 14.5923 12.4799 13.5657 12.4799C12.8057 12.4732 12.379 13.0665 12.619 13.7932Z" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M9.33337 3.33331H13.3334" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M9.33337 5.33331H11.3334" strokeLinecap="round" strokeLinejoin="round" />
							</svg>

							<input
								type="search"
								alt="search repo"
								placeholder="Search repositories"
								aria-label="search repo"
								className="bg-transparent border-none outline-none w-full my-[6px] mx-space-1 placeholder:text-slateA-11 font-regular text-2"
								value={searchTerm}
								onChange={handleRepoSearch}
							/>
						</div>

						{/* install github app */}
						{askForInstallation && (
							<div className="bg-slateA-3 border border-slateA-5 rounded-2 flex items-center justify-center p-9 gap-space-5 flex-col">
								<p className="text-1 text-slate-12 w-80 text-center">Install Github App to connect your desired repository and automatically create your changelog</p>

								<a href="https://github.com/apps/tally-product-log/installations/new?setup_url=http://localhost:3000/setup" className="flex items-center bg-slateA-2 border-slateA-8 border gap-space-1 justify-center rounded-3 px-space-2 h-space-5">
									<svg width="16" height="16" viewBox="0 0 16 16" className="fill-slate-12" xmlns="http://www.w3.org/2000/svg">
										<rect width="16" height="16" fillOpacity="0.01" />
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M7.99934 0.266663C3.7295 0.266663 0.266724 3.72899 0.266724 8.00025C0.266724 11.4165 2.48235 14.3153 5.55536 15.3383C5.94229 15.4091 6.08328 15.1703 6.08328 14.9652C6.08328 14.7814 6.07663 14.2954 6.07284 13.6501C3.92177 14.1173 3.46792 12.6133 3.46792 12.6133C3.11613 11.7199 2.60911 11.482 2.60911 11.482C1.90697 11.0026 2.66229 11.012 2.66229 11.012C3.43849 11.0667 3.84677 11.8092 3.84677 11.8092C4.53657 12.9907 5.65696 12.6494 6.09753 12.4514C6.16779 11.952 6.36765 11.6111 6.58841 11.4179C4.87126 11.2223 3.06582 10.5591 3.06582 7.59577C3.06582 6.7512 3.36728 6.0614 3.86196 5.52067C3.7822 5.32507 3.51682 4.53889 3.93791 3.47403C3.93791 3.47403 4.58688 3.26609 6.06429 4.26637C6.68098 4.09499 7.34278 4.00954 8.00029 4.00621C8.65734 4.00954 9.31866 4.09499 9.9363 4.26637C11.4128 3.26609 12.0608 3.47403 12.0608 3.47403C12.4828 4.53889 12.2174 5.32507 12.1382 5.52067C12.6338 6.0614 12.9329 6.7512 12.9329 7.59577C12.9329 10.5667 11.1245 11.2205 9.40221 11.4117C9.67946 11.6506 9.92681 12.1224 9.92681 12.844C9.92681 13.8775 9.9173 14.7117 9.9173 14.9652C9.9173 15.1722 10.0569 15.4129 10.449 15.3374C13.5196 14.3124 15.7334 11.416 15.7334 8.00025C15.7334 3.72899 12.2706 0.266663 7.99934 0.266663Z"
											fillOpacity="0.797"
										/>
									</svg>

									<div className="text-slate-11 text-2">Install</div>
								</a>
							</div>
						)}

						{/* list of repos */}
						{!askForInstallation && (
							<ul>
								{filteredRepo?.map((repo, i) => (
									<li className="relative flex items-center w-full justify-between border-b border-b-slate-4 pb-space-2 pt-space-6 group" key={i}>
										{/* <div className="absolute group-hover:opacity-100 opacity-0 top-0 left-0 right-0 bottom-0 transition-all duration-500 [background:linear-gradient(90deg,transparent_0%,var(--slate-a2)_5%,var(--slate-a2)_50%,var(--slate-a2)_95%,transparent_100%)] -z-10"></div> */}
										<div className="absolute group-hover:opacity-100 opacity-0 top-0 left-0 right-0 bottom-0 transition-all duration-500 [background:_radial-gradient(at_center_bottom,_var(--slate-a3),_transparent)] -z-10"></div>
										<div className="flex gap-space-2 items-center">
											<div className="text-1 font-regular text-slateA-12">{repo.name}</div>
											{repo.private && (
												<svg width="12" height="12" viewBox="0 0 12 12" className="fill-slateA-11" xmlns="http://www.w3.org/2000/svg">
													<rect width="12" height="12" fillOpacity="0.01" />
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M3.99998 3.70882C3.99998 3.00826 4.19373 2.48433 4.51456 2.13887C4.83145 1.79765 5.31663 1.58265 6.0011 1.58265C6.68594 1.58265 7.17042 1.79723 7.48656 2.13768C7.80668 2.4824 7.99998 3.00568 7.99998 3.70661V4.8H3.99998V3.70882ZM3.19998 4.8V3.70882C3.19998 2.8652 3.43469 2.12604 3.92837 1.59447C4.42599 1.05864 5.14138 0.782654 6.0011 0.782654C6.86064 0.782654 7.57559 1.05788 8.07278 1.59331C8.56606 2.12447 8.79998 2.86318 8.79998 3.70661V4.8H9.59998C10.0418 4.8 10.4 5.15818 10.4 5.6V10.4C10.4 10.8419 10.0418 11.2 9.59998 11.2H2.39998C1.95815 11.2 1.59998 10.8419 1.59998 10.4V5.6C1.59998 5.15818 1.95815 4.8 2.39998 4.8H3.19998ZM2.39998 5.6H9.59998V10.4H2.39998V5.6Z"
														fillOpacity="0.334"
													/>
												</svg>
											)}
											{!repo.private && (
												<svg width="10" height="12" viewBox="0 0 10 12" className="fill-slateA-11" xmlns="http://www.w3.org/2000/svg">
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M4.99886 0C4.06054 0 3.28883 0.311544 2.79 0.954888C2.38994 1.47085 2.19998 2.14594 2.19998 2.9066H2.99998C2.99998 2.2745 3.1575 1.7865 3.42222 1.44509C3.7329 1.04442 4.24119 0.8 4.99886 0.8C5.68544 0.8 6.17066 1.01202 6.48674 1.34898C6.80632 1.68969 6.99998 2.20835 6.99998 2.90881V4.8H1.39998C0.958152 4.8 0.599976 5.15818 0.599976 5.6V10.4C0.599976 10.8418 0.958152 11.2 1.39998 11.2H8.59998C9.04182 11.2 9.39998 10.8418 9.39998 10.4V5.6C9.39998 5.15817 9.04182 4.8 8.59998 4.8H7.79998V2.90881C7.79998 2.06508 7.56518 1.32934 7.07022 0.80168C6.57179 0.270297 5.85646 0 4.99886 0ZM1.39998 5.6H8.59998V10.4H1.39998V5.6Z"
														fillOpacity="0.334"
													/>
												</svg>
											)}
										</div>

										<button className="bg-slate-4 text-slate-11 text-1 font-regular flex items-center gap-space-1 h-space-5 px-space-2 rounded-3" onClick={() => setupRepo(repo)}>
											{isRepoExistingSupabase(repo.name) ? 'Configure' : 'Setup'}
											<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
												<g clipPath="url(#clip0_155_1376)">
													<path d="M8 16H5.43C3.14 16 2 14.86 2 12.57V5.43C2 3.14 3.14 2 5.43 2H10C12.29 2 13.43 3.14 13.43 5.43" className="stroke-slate-6" strokeLinecap="round" strokeLinejoin="round" />
													<path
														d="M18.5703 22H14.0003C11.7103 22 10.5703 20.86 10.5703 18.57V11.43C10.5703 9.14 11.7103 8 14.0003 8H18.5703C20.8603 8 22.0003 9.14 22.0003 11.43V18.57C22.0003 20.86 20.8603 22 18.5703 22Z"
														stroke="#99A2FF"
														strokeLinecap="round"
														className="stroke-slate-11"
														strokeLinejoin="round"
													/>
													<path d="M14.8672 15H18.1272" className="stroke-slate-11" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M16.5 16.63V13.37" className="stroke-slate-11" strokeLinecap="round" strokeLinejoin="round" />
												</g>
												<defs>
													<clipPath id="clip0_155_1376">
														<rect width="24" height="24" fill="white" />
													</clipPath>
												</defs>
											</svg>
										</button>
									</li>
								))}
							</ul>
						)}
					</>
				)}

				{uiState && uiState !== 'repo' && (
					<button className="text-slate-11 flex gap-space-1 absolute top-0 left-0 items-center font-regular text-1 h-space-5 px-space-2">
						<svg width="16" height="16" viewBox="0 0 16 16" className="fill-slate-11" xmlns="http://www.w3.org/2000/svg">
							<rect width="16" height="16" fill="white" fillOpacity="0.01" />
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M9.40597 4.4606C9.59343 4.64806 9.59343 4.95197 9.40597 5.13943L6.54538 8.00001L9.40597 10.8606C9.59343 11.048 9.59343 11.3519 9.40597 11.5394C9.21852 11.7269 8.9146 11.7269 8.72715 11.5394L5.52715 8.33943C5.43714 8.2494 5.38657 8.12731 5.38657 8.00001C5.38657 7.87271 5.43714 7.75062 5.52715 7.6606L8.72715 4.4606C8.9146 4.27314 9.21852 4.27314 9.40597 4.4606Z"
								fillOpacity="0.797"
							/>
						</svg>
						back
					</button>
				)}

				{uiState && uiState === 'template' && (
					<>
						<div className="mb-space-7 text-center">
							<h1 className="text-4 text-slate-12 font-medium">Select page template</h1>
							<p className="mt-space-2 max-w-[317px] mx-auto text-slate-11 text-1 font-regular">Select your preferred template from our list of carefully created templates that fits your brand.</p>
						</div>

						<ul className="flex flex-wrap gap-space-5">
							<li className="max-w-[288px] p-space-2 rounded-3 shadow-2">
								<button onClick={() => updateRepoTemplate(1)}>
									<Image src={Template1} alt="github picture" priority width={272} height={155} />
									<hr className="border-indigoA-3 my-space-2" />
									<h4 className="font-light text-1 text-slate-11">Template name</h4>
								</button>
							</li>
							<li className="max-w-[288px] p-space-2 rounded-3 shadow-2">
								<button onClick={() => updateRepoTemplate(2)}>
									<Image src={Template1} alt="github picture" priority width={272} height={155} />
									<hr className="border-indigoA-3 my-space-2" />
									<h4 className="font-light text-1 text-slate-11">Template name</h4>
								</button>
							</li>
							<li className="max-w-[288px] p-space-2 rounded-3 shadow-2">
								<button onClick={() => updateRepoTemplate(3)}>
									<Image src={Template1} alt="github picture" priority width={272} height={155} />
									<hr className="border-indigoA-3 my-space-2" />
									<h4 className="font-light text-1 text-slate-11">Template name</h4>
								</button>
							</li>
						</ul>
					</>
				)}

				{uiState && uiState === 'details' && (
					<>
						<div className="mb-space-7 text-center">
							<h1 className="text-4 text-slate-12 font-medium">Just a couple of details...</h1>
							<p className="mt-space-2 max-w-[317px] mx-auto text-slate-11 text-1 font-regular">Lastly, please confirm the details below and your change-log page will be good to go.</p>
						</div>

						<form className="max-w-[360px] mx-auto" onSubmit={handleRepoDetailSubmit}>
							<Input id="domain_url" label="Domain URL" type="url" className="mb-space-5" value={repoDetailsForm.domain_url} onChange={handleRepoDetailsInput} placeholder="Enter domain URL" />
							<Input id="primary_color" label="Primary color" type="color" className="mb-space-5" value={repoDetailsForm.primary_color} onChange={handleRepoDetailsInput} placeholder="Primary color" />

							<div className="mb-space-5 group relative">
								<label htmlFor="logo" className="w-full text-slateA-6 text-1 font-light block">
									<div className="mb-space-2 text-slate-10">Website Logo</div>
									<div className="bg-slateA-3 border-slate-4 border rounded-2 max-w-[360px] min-h-[103px] flex items-center justify-center text-center flex-col gap-space-3 group-has-[:focus]:bg-slateA-4 group-has-[:focus]:border-slate-7 duration-500 group-has-[:focus]:shadow-6 transition-all">
										<svg width="16" height="17" viewBox="0 0 16 17" className="fill-slate-8" xmlns="http://www.w3.org/2000/svg">
											<rect width="16" height="16" transform="translate(0 0.5)" fill="white" fillOpacity="0.01" />
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M8.33943 1.7607C8.15198 1.57326 7.84806 1.57326 7.66061 1.7607L4.46061 4.9607C4.27315 5.14816 4.27315 5.45207 4.46061 5.63953C4.64806 5.82697 4.95198 5.82697 5.13943 5.63953L7.52002 3.25894V10.6333C7.52002 10.8984 7.73492 11.1133 8.00002 11.1133C8.26512 11.1133 8.48002 10.8984 8.48002 10.6333V3.25894L10.8607 5.63953C11.0481 5.82697 11.352 5.82697 11.5394 5.63953C11.7269 5.45207 11.7269 5.14816 11.5394 4.9607L8.33943 1.7607ZM2.66663 11.1667C2.96118 11.1667 3.19997 11.4054 3.19997 11.7V13.3C3.19997 13.8907 3.67533 14.3667 4.26274 14.3667H11.7346C12.3231 14.3667 12.8 13.8897 12.8 13.3V11.7C12.8 11.4054 13.0388 11.1667 13.3333 11.1667C13.6278 11.1667 13.8666 11.4054 13.8666 11.7V13.3C13.8666 14.4776 12.9132 15.4334 11.7346 15.4334H4.26274C3.08284 15.4334 2.1333 14.4766 2.1333 13.3V11.7C2.1333 11.4054 2.37208 11.1667 2.66663 11.1667Z"
												fillOpacity="0.788"
											/>
										</svg>

										<p className="text-slate-8 max-w-[240px] mx-auto">Drop logo here or click here to select from file picker</p>
									</div>
								</label>
								<input type="file" id="logo" className="absolute pointer-events-none w-[1px] h-[1px] whitespace-nowrap top-0 left-0 opacity-0 overflow-hidden" />
							</div>

							<div className="flex justify-end">
								<button className="text-slate-2 flex gap-space-1 items-center font-regular text-1 h-space-6 px-space-3 rounded-2 bg-slate-12">
									Complete Setup
									<svg width="16" height="16" viewBox="0 0 16 16" className="fill-slate-8" xmlns="http://www.w3.org/2000/svg">
										<rect width="16" height="16" fill="white" fillOpacity="0.01" />
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M6.59408 4.46063C6.78153 4.27317 7.08545 4.27317 7.2729 4.46063L10.4729 7.66063C10.5629 7.75065 10.6135 7.87274 10.6135 8.00004C10.6135 8.12735 10.5629 8.24944 10.4729 8.33946L7.2729 11.5394C7.08545 11.7269 6.78153 11.7269 6.59408 11.5394C6.40663 11.352 6.40663 11.0481 6.59408 10.8607L9.45467 8.00004L6.59408 5.13946C6.40663 4.952 6.40663 4.64809 6.59408 4.46063Z"
										/>
									</svg>
								</button>
							</div>
						</form>
					</>
				)}
			</section>
		</main>
	);
}
