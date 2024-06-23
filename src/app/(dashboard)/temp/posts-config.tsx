'use client';
import { FormEvent, HTMLAttributes, useCallback, useState } from 'react';
import Input from '@/app/components/input';
import { BrowserPreview } from '../../components/browser-preview';
import { FileInput } from '@/app/components/file-input';
import { useSearchParams } from 'next/navigation';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

const supabase = createPagesBrowserClient();

export const PostsGithubConfig = ({ ...props }: HTMLAttributes<HTMLElement>) => {
	const [pageIsLoading, setPageLoader] = useState<boolean>(true);
	const [searchTerm, setSearchTerm] = useState('');
	const searchParams = useSearchParams();
	const routeAction = searchParams.get('setup_action');
	const [installation_id, setInstallationId] = useState(searchParams.get('installation_id'));
	const [askForInstallation, setInstallationStatus] = useState<boolean>(true);
	const [userRepos, setRepos] = useState<any[]>([]);
	const [activeRepo, setActiveRepo] = useState<any>();

	const onUpdateRepoDetails = async (formData: FormData) => {
		console.log('🚀 ~ onUpdateRepoDetails ~ formData:', formData);
	};

	const setupRepo = async (repoDetails: any) => {
		const { error } = await supabase.from('repos').insert({ name: repoDetails.name, private: repoDetails.private });
		console.log('🚀 ~ setupRepo ~ error:', error);

		// if (error) return;

		// const githubReleases = await getReleases(repoDetails.name);
		// await createSupabaseReleases(githubReleases.data, repoDetails.name);

		// router.push(`/setup?state=template&repoId=${repoDetails.name}`);
		// setUiState('template');
		return;
	};

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

	const handleRepoSearch = useCallback((event?: React.ChangeEvent<HTMLInputElement>) => {
		console.log('🚀 ~ PostsGithubConfig ~ event:', event);
	}, []);

	const updateUserInstallationId = useCallback(async () => await supabase.auth.updateUser({ data: { installation_id } }), [installation_id]);

	const initSetup = useCallback(async () => {
		setPageLoader(true);
		if (routeAction == 'install' && installation_id) await updateUserInstallationId();

		const reposResponse = await getRepos();
		if (!reposResponse?.data?.repositories || reposResponse?.data?.repositories?.length == 0) {
			setPageLoader(false);
			return setInstallationStatus(false);
		}
		// await getSupabaseRepos();

		if (reposResponse.error) setInstallationStatus(true);
		if (reposResponse.data?.repositories) {
			setInstallationStatus(false);
			setRepos(reposResponse.data.repositories);
			// setFilteredRepo(reposResponse.data.repositories.slice(0, 4));
		}

		setPageLoader(false);
	}, [getRepos, installation_id, routeAction, updateUserInstallationId]);

	return (
		<li {...props} className={`px-space-4 py-8 ${props.className}`}>
			<h1 className="text-4 text-slate-11 mb-4 font-bold">Github Release Confit</h1>
			<p className="text-2 text-slate-10 max-w-lg mb-7 font-light">Optionally connect this page to a github repo releases, new posts will be automatically streamed to this page</p>

			{/* search repos */}
			<div className="flex items-center bg-slateA-3 border-slate-4 border rounded-2 px-space-1 mb-space-5 has-[:focus]:border-slate-7 has-[:focus]:bg-slateA-4 duration-500 has-[:focus]:shadow-6 transition-all">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="stroke-slate-11 mx-space-2 my-space-2" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.3334 7.33331C13.3334 10.6466 10.6467 13.3333 7.33337 13.3333C4.02004 13.3333 1.33337 10.6466 1.33337 7.33331C1.33337 4.01998 4.02004 1.33331 7.33337 1.33331" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M12.619 13.7932C12.9723 14.8599 13.779 14.9665 14.399 14.0332C14.9657 13.1799 14.5923 12.4799 13.5657 12.4799C12.8057 12.4732 12.379 13.0665 12.619 13.7932Z" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M9.33337 3.33331H13.3334" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M9.33337 5.33331H11.3334" strokeLinecap="round" strokeLinejoin="round" />
				</svg>

				<input
					value={searchTerm}
					onChange={handleRepoSearch}
					type="search"
					name="search"
					alt="search repo"
					placeholder="Search repositories"
					aria-label="search repo"
					className="bg-transparent border-none outline-none w-full my-[6px] mx-space-1 placeholder:text-slateA-11 font-regular text-2"
				/>
			</div>

			{/* list of repos */}
			{!askForInstallation && (
				<ul>
					{userRepos?.map((repo, i) => (
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
								{activeRepo.name === repo.name ? 'Configure' : 'Setup'}

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
		</li>
	);
};
