'use client';

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const supabase = createPagesBrowserClient();

const Header = () => {
	const params = useParams();
	const pathname = usePathname();
	const [userRepos, setUserRepos] = useState<any[]>([]);
	const [activeRepoId] = useState(params.repo);

	const userSupabaseRepos = useCallback(async () => {
		const { data } = await supabase.from('repos').select();
		if (data) setUserRepos(data);
		return data;
	}, []);

	const signout = async () => {
		return await supabase.auth.signOut().then(() => (location.href = `${location.origin}/auth`));
	};

	useEffect(() => {
		userSupabaseRepos();
	}, [userSupabaseRepos]);

	return (
		<header className="fixed h-full left-0 top-0 maxW-[76px] mx-auto pr-[1px] bg-[linear-gradient(180deg,rgba(212,214,215,0.43),rgba(212,214,215,0)_12%),linear-gradient(0deg,rgba(212,214,215,0.43),rgba(212,214,215,0)_12%)] bg-slate-2 z-20">
			<div className="h-full flex items-center flex-col justify-between bg-slate-2 py-space-5">
				<div>
					<svg width="44" height="32" viewBox="0 0 44 32" className="fill-indigo-12" xmlns="http://www.w3.org/2000/svg">
						<path d="M5.32804 26.9375C4.92084 27.0314 4.63894 25.7785 4.67026 23.4606C4.73291 21.55 5.20275 14.9722 6.14243 9.92927C6.36168 8.77033 6.58094 7.73669 6.8002 6.79701C0.69229 6.79701 0.128483 6.82833 0.00319283 6.35849C-0.0594524 6.07659 0.817581 5.70072 1.06816 5.85733C1.38139 6.04527 1.60065 6.13923 2.509 6.13923L6.95681 6.17056C7.95914 2.16126 8.89882 0.532484 9.33733 0.532484C9.58791 0.532484 9.77585 1.28423 9.71321 1.56613C9.61924 1.942 9.49395 1.40952 9.1494 2.16126C9.08675 2.25523 8.42898 3.97797 7.83385 6.17056C8.93014 6.17056 9.33733 6.26452 12.4383 6.26452C15.32 6.26452 16.0717 6.10791 16.1657 6.45246C16.2283 6.82833 14.6935 6.79701 12.3443 6.79701H7.64591C7.36401 7.92462 7.0821 9.11488 6.89417 10.2738C6.61227 11.8086 6.14243 14.5337 5.73523 17.8226C5.48465 19.608 5.17142 24.0558 5.35936 25.5593C5.51597 26.7495 5.76655 26.8748 5.32804 26.9375ZM15.2573 18.9815C17.4499 18.9815 23.8084 16.0372 25.7191 15.0035C25.8757 14.9096 26.5335 14.9409 26.001 15.2854C23.9337 16.6323 17.2933 19.6393 15.226 19.6393C13.6912 19.6393 13.2527 18.7309 13.2527 18.0732C13.2527 17.4154 13.378 17.1022 13.3153 17.0395C13.2213 16.9455 13.0334 16.9769 12.0311 17.5093C11.1227 18.0418 10.1204 18.449 9.80717 18.449C9.36866 18.449 9.05543 18.1671 9.05543 17.9792C9.05543 17.3841 9.4313 16.5697 10.6216 15.6926C11.6239 14.9096 12.2503 14.753 12.7828 14.753C13.5032 14.753 13.9418 15.8806 13.6285 15.8806C13.3153 15.8806 13.2213 15.2541 12.8768 15.2541C12.5636 15.2541 11.9371 15.5047 11.0601 16.0998C10.2457 16.6323 9.61924 17.5407 9.61924 17.7913C9.61924 17.8539 9.65056 17.8852 9.74453 17.8852C10.0264 17.8852 10.5589 17.666 11.4359 17.2274C12.6262 16.6636 13.4093 16.2251 13.7851 16.2251C13.9104 16.2251 14.1923 16.2878 14.1923 16.507C14.1923 16.7576 13.8791 17.3214 13.8791 18.0418C13.8791 18.5743 14.4429 18.9815 15.2573 18.9815ZM23.9337 26.6556C23.5265 26.6869 23.2133 25.4966 23.4012 23.1474C23.7771 17.6033 24.6854 12.811 25.6877 8.45711C27.2225 1.69142 28.0056 0 28.5068 0C28.7887 0 28.8513 0.751743 28.7574 1.03365C28.6634 1.40952 28.2562 2.06729 27.9116 2.81904C27.849 2.97565 27.0033 6.07659 26.4082 8.8643C25.907 11.2135 24.5288 17.6346 23.9963 23.398C23.7457 26.2797 24.2469 26.6242 23.9337 26.6556ZM28.0056 26.6556C27.5984 26.6869 27.2852 25.4966 27.4731 23.1474C27.849 17.6033 28.7574 12.811 29.7597 8.45711C31.2945 1.69142 32.0776 0 32.5787 0C32.8606 0 32.9233 0.751743 32.8293 1.03365C32.7353 1.40952 32.3281 2.06729 31.9836 2.81904C31.9209 2.97565 31.0752 6.07659 30.4801 8.8643C29.9789 11.2135 28.6007 17.6346 28.0683 23.398C27.8177 26.2797 28.3188 26.6242 28.0056 26.6556ZM37.1205 15.5673C36.588 15.5673 35.8363 16.3504 34.7713 17.5093C33.675 18.6996 32.5787 19.7959 31.8583 19.7959C31.4198 19.7959 31.0439 19.3887 31.2318 18.6683C31.4511 17.8852 31.733 16.8829 31.9523 16.2251C32.2028 15.4107 32.0462 15.0662 32.3595 15.0035C32.6727 14.9722 32.798 15.2228 32.798 15.3168C32.798 15.5673 32.704 15.8179 32.4221 16.5383C32.2028 17.1648 31.8896 18.1045 31.827 18.3551C31.7017 18.8875 31.733 19.0755 31.9523 19.0755C32.3281 19.0755 33.4244 18.2924 34.3954 17.1961C35.9616 15.5047 36.494 14.753 37.2458 14.753C38.0289 14.753 38.1855 16.0998 38.2168 17.0708C40.66 15.63 42.9778 14.8156 43.573 14.8156C44.0428 14.8156 44.1681 15.3481 43.7296 15.3481C43.1031 15.3481 40.7226 16.1625 38.2168 17.7599C38.1541 20.6103 37.0892 25.0268 35.6483 27.5952C34.2075 30.1324 32.2968 31.8551 30.6367 31.8551C29.791 31.8551 28.6634 31.2913 28.6634 29.6938C28.6634 27.376 30.5114 23.8678 34.1449 20.1718C35.1785 19.1068 36.4001 18.1984 37.6217 17.4467C37.5903 16.3504 37.5277 15.5673 37.1205 15.5673ZM35.0845 27.1567C36.5567 24.5883 37.559 20.2657 37.6217 18.1358C36.5567 18.8249 35.523 19.6393 34.5834 20.6103C30.7933 24.4316 29.2898 28.0024 29.2898 29.7878C29.2898 30.6962 29.6657 31.26 30.3861 31.26C31.5451 31.26 33.4871 29.9757 35.0845 27.1567Z" />
					</svg>
				</div>

				<div className="flex flex-col gap-space-5">
					<button className={`outline-none px-space-4 relative border-r group/button ${!pathname.includes(activeRepoId + '/settings') ? 'border-r-slate-11' : 'border-r-transparent'}`}>
						<svg
							width="24"
							height="25"
							viewBox="0 0 24 25"
							className={`group-hover/button:stroke-slate-11 group-focus/button:stroke-slate-11 group-focus-within/button:stroke-slate-11 transition-all duration-500 ${!pathname.includes(activeRepoId + '/settings') ? 'stroke-slate-11' : 'stroke-slate-9'}`}
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M21 7.92755V17.9276C21 20.9276 19.5 22.9276 16 22.9276H8C4.5 22.9276 3 20.9276 3 17.9276V7.92755C3 4.92755 4.5 2.92755 8 2.92755H16C19.5 2.92755 21 4.92755 21 7.92755Z"
								strokeWidth="1.5"
								strokeMiterlimit="10"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path d="M14.5 5.42755V7.42755C14.5 8.52755 15.4 9.42755 16.5 9.42755H18.5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M8 13.9276H12" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M8 17.9276H16" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
						</svg>

						<ul className="transition-all duration-500 absolute -right-36 rounded-3 top-0 bg-slate-2 shadow-1 border border-slate-4 opacity-0 -translate-x-1 pointer-events-none group-focus-within/button:opacity-100 group-focus-within/button:translate-x-0 group-focus-within/button:pointer-events-auto group-hover/button:opacity-100 group-hover/button:translate-x-0 group-hover/button:pointer-events-auto">
							{userRepos.map((repo, index) => (
								<li className={`hover:bg-slate-3 transition-all duration-500 ${activeRepoId == repo.id ? 'bg-slate-3' : ''}`} key={index}>
									<Link href={`/${repo.name}`} className="w-full text-left py-space-2 px-space-2 text-1 text-slate-11 flex justify-between items-center group capitalize">
										{repo.name}
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											className={`stroke-slate-11 scale-50 fill-transparent opacity-0 -translate-x-1 transition-all ${activeRepoId == repo.id ? '' : 'group-hover:opacity-100 group-hover:translate-x-0 group-focus:opacity-100 group-focus:translate-x-0'}`}
											xmlns="http://www.w3.org/2000/svg">
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

							<li className="bg-slate-4 group hover:bg-slate-5">
								<Link href={'/setup'} className="w-full text-left py-space-2 px-space-2 text-1 text-slate-11 group-hover:text-slate-12 flex items-center">
									Connect New Repo
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="scale-50 stroke-slate-11 ml-space-1" xmlns="http://www.w3.org/2000/svg">
										<path d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z" strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
										<path
											d="M2 7V21C2 21.83 2.94001 22.3 3.60001 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.28999 22.29C8.67999 22.68 9.32001 22.68 9.71001 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z"
											strokeWidth="1"
											strokeMiterlimit="10"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path d="M6.25 10H11.75" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M9 12.75V7.25" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</Link>
							</li>
						</ul>
					</button>

					<Link href={`/${activeRepoId}/settings`} className={`outline-none group/settings px-space-4 border-r ${pathname.includes(activeRepoId + '/settings') ? 'border-r-slate-11' : 'border-r-transparent'}`}>
						<svg
							width="24"
							height="25"
							viewBox="0 0 24 25"
							className={`group-hover/settings:stroke-slate-11 group-focus/settings:stroke-slate-11 transition-all duration-500 ${pathname.includes(activeRepoId + '/settings') ? 'stroke-slate-11' : 'stroke-slate-9'}`}
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M3 10.0379V15.8079C3 17.9279 3 17.9279 5 19.2779L10.5 22.4579C11.33 22.9379 12.68 22.9379 13.5 22.4579L19 19.2779C21 17.9279 21 17.9279 21 15.8179V10.0379C21 7.9279 21 7.9279 19 6.5779L13.5 3.3979C12.68 2.9179 11.33 2.9179 10.5 3.3979L5 6.5779C3 7.9279 3 7.9279 3 10.0379Z"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path d="M12 15.9276C13.6569 15.9276 15 14.5844 15 12.9276C15 11.2707 13.6569 9.92755 12 9.92755C10.3431 9.92755 9 11.2707 9 12.9276C9 14.5844 10.3431 15.9276 12 15.9276Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</Link>
				</div>

				{/* <button onClick={() => signOut()}>Logout</button> */}
				<button className="flex items-center gap-space-2 text-slate-11 text-1 font-regular" onClick={() => signout()}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M12.1187 12.7805C12.0487 12.7705 11.9587 12.7705 11.8787 12.7805C10.1187 12.7205 8.71875 11.2805 8.71875 9.51047C8.71875 7.70047 10.1787 6.23047 11.9987 6.23047C13.8087 6.23047 15.2787 7.70047 15.2787 9.51047C15.2687 11.2805 13.8787 12.7205 12.1187 12.7805Z"
							stroke="#ADB1B8"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M18.7378 19.3796C16.9578 21.0096 14.5978 21.9996 11.9978 21.9996C9.39781 21.9996 7.03781 21.0096 5.25781 19.3796C5.35781 18.4396 5.95781 17.5196 7.02781 16.7996C9.76781 14.9796 14.2478 14.9796 16.9678 16.7996C18.0378 17.5196 18.6378 18.4396 18.7378 19.3796Z"
							stroke="#ADB1B8"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ADB1B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
			</div>
		</header>
	);
};

export default Header;
