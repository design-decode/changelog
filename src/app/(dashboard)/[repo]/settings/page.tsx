'use client';

import { useRef } from 'react';
import { UpdateRepoModal } from './updateRepo';

export default function Home({ params }: { params: { [keys: string]: string } }) {
	const repoDetailsDialog = useRef<HTMLDialogElement>(null);

	return (
		<main className="">
			<section className="mt-space-9 max-w-[727px] mx-auto">
				<div className="border-b border-b-slate-3 flex pb-space-5 gap-space-3 items-center mb-space-7">
					<h1 className="text-slate-12 font-bold text-4 flex gap-space-2 items-center">
						Preferences <span className="text-slateA-10 font-regular text-3">/</span>
						<span className="text-slateA-10 font-regular text-3"> Repository Name</span>
					</h1>

					<button className="transition-all duration-500 hover:bg-slate-3 focus:bg-slate-3 rounded-2 py-space-1 px-space-2 outline-none">
						<svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.36062 5.0166L3.53396 2.84327C3.79062 2.5866 4.21062 2.5866 4.46729 2.84327L6.64062 5.0166" stroke="#808080" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M6.63938 10.9834L4.46604 13.1567C4.20937 13.4134 3.78938 13.4134 3.53271 13.1567L1.35938 10.9834" stroke="#808080" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</div>

				<ul className="flex flex-col gap-space-4">
					<li>
						<button onClick={() => repoDetailsDialog.current?.showModal()} className="flex gap-space-5 text-left p-space-4 bg-grayA-2 rounded-6 w-full border border-transparent hover:border-gray-4 outline-none focus:border-gray-4 transition-all duration-500">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M1.13307 0.599984C1.13307 0.894533 0.894289 1.13332 0.59974 1.13332C0.30519 1.13332 0.0664062 0.894533 0.0664062 0.599984C0.0664062 0.305434 0.30519 0.0666504 0.59974 0.0666504C0.894289 0.0666504 1.13307 0.305434 1.13307 0.599984ZM1.13307 4.33332V9.66665H12.8664V4.33332H1.13307ZM1.13307 3.26665C0.543974 3.26665 0.0664062 3.74422 0.0664062 4.33332V9.66665C0.0664062 10.2558 0.543974 10.7333 1.13307 10.7333H12.8664C13.4555 10.7333 13.9331 10.2558 13.9331 9.66665V4.33332C13.9331 3.74422 13.4555 3.26665 12.8664 3.26665H1.13307ZM0.59974 13.9333C0.894289 13.9333 1.13307 13.6945 1.13307 13.4C1.13307 13.1055 0.894289 12.8667 0.59974 12.8667C0.30519 12.8667 0.0664062 13.1055 0.0664062 13.4C0.0664062 13.6945 0.30519 13.9333 0.59974 13.9333ZM3.26641 0.599984C3.26641 0.894533 3.02762 1.13332 2.73307 1.13332C2.43852 1.13332 2.19974 0.894533 2.19974 0.599984C2.19974 0.305434 2.43852 0.0666504 2.73307 0.0666504C3.02762 0.0666504 3.26641 0.305434 3.26641 0.599984ZM2.73307 13.9333C3.02762 13.9333 3.26641 13.6945 3.26641 13.4C3.26641 13.1055 3.02762 12.8667 2.73307 12.8667C2.43852 12.8667 2.19974 13.1055 2.19974 13.4C2.19974 13.6945 2.43852 13.9333 2.73307 13.9333ZM5.39974 0.599984C5.39974 0.894533 5.16096 1.13332 4.86641 1.13332C4.57186 1.13332 4.33307 0.894533 4.33307 0.599984C4.33307 0.305434 4.57186 0.0666504 4.86641 0.0666504C5.16096 0.0666504 5.39974 0.305434 5.39974 0.599984ZM4.86641 13.9333C5.16096 13.9333 5.39974 13.6945 5.39974 13.4C5.39974 13.1055 5.16096 12.8667 4.86641 12.8667C4.57186 12.8667 4.33307 13.1055 4.33307 13.4C4.33307 13.6945 4.57186 13.9333 4.86641 13.9333ZM7.53307 0.599984C7.53307 0.894533 7.29429 1.13332 6.99974 1.13332C6.70519 1.13332 6.46641 0.894533 6.46641 0.599984C6.46641 0.305434 6.70519 0.0666504 6.99974 0.0666504C7.29429 0.0666504 7.53307 0.305434 7.53307 0.599984ZM6.99974 13.9333C7.29429 13.9333 7.53307 13.6945 7.53307 13.4C7.53307 13.1055 7.29429 12.8667 6.99974 12.8667C6.70519 12.8667 6.46641 13.1055 6.46641 13.4C6.46641 13.6945 6.70519 13.9333 6.99974 13.9333ZM9.66641 0.599984C9.66641 0.894533 9.42762 1.13332 9.13307 1.13332C8.83852 1.13332 8.59974 0.894533 8.59974 0.599984C8.59974 0.305434 8.83852 0.0666504 9.13307 0.0666504C9.42762 0.0666504 9.66641 0.305434 9.66641 0.599984ZM9.13307 13.9333C9.42762 13.9333 9.66641 13.6945 9.66641 13.4C9.66641 13.1055 9.42762 12.8667 9.13307 12.8667C8.83852 12.8667 8.59974 13.1055 8.59974 13.4C8.59974 13.6945 8.83852 13.9333 9.13307 13.9333ZM11.7997 0.599984C11.7997 0.894533 11.5609 1.13332 11.2664 1.13332C10.9719 1.13332 10.7331 0.894533 10.7331 0.599984C10.7331 0.305434 10.9719 0.0666504 11.2664 0.0666504C11.5609 0.0666504 11.7997 0.305434 11.7997 0.599984ZM11.2664 13.9333C11.5609 13.9333 11.7997 13.6945 11.7997 13.4C11.7997 13.1055 11.5609 12.8667 11.2664 12.8667C10.9719 12.8667 10.7331 13.1055 10.7331 13.4C10.7331 13.6945 10.9719 13.9333 11.2664 13.9333ZM13.9331 0.599984C13.9331 0.894533 13.6942 1.13332 13.3997 1.13332C13.1052 1.13332 12.8664 0.894533 12.8664 0.599984C12.8664 0.305434 13.1052 0.0666504 13.3997 0.0666504C13.6942 0.0666504 13.9331 0.305434 13.9331 0.599984ZM13.3997 13.9333C13.6942 13.9333 13.9331 13.6945 13.9331 13.4C13.9331 13.1055 13.6942 12.8667 13.3997 12.8667C13.1052 12.8667 12.8664 13.1055 12.8664 13.4C12.8664 13.6945 13.1052 13.9333 13.3997 13.9333Z"
									fill="#99A2FF"
								/>
							</svg>

							<div>
								<h4 className="text-3 font-medium text-gray-12">Page Settings</h4>
								<p className="text-1.1 font-medium text-gray-10">repo name • https://google.com • #eeeeee</p>
							</div>
						</button>
					</li>

					<li>
						<button className="flex gap-space-5 text-left p-space-4 bg-grayA-2 rounded-6 w-full border border-transparent hover:border-gray-4 outline-none focus:border-gray-4 transition-all duration-500">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M7.99967 14.6666C11.6816 14.6666 14.6663 11.6819 14.6663 7.99998C14.6663 4.31808 11.6816 1.33331 7.99967 1.33331C4.31778 1.33331 1.33301 4.31808 1.33301 7.99998C1.33301 11.6819 4.31778 14.6666 7.99967 14.6666Z"
									stroke="#18794E"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path d="M5.3347 2H6.00137C4.70137 5.89333 4.70137 10.1067 6.00137 14H5.3347" stroke="#18794E" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M10 2C11.3 5.89333 11.3 10.1067 10 14" stroke="#18794E" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M2 10.6667V10C5.89333 11.3 10.1067 11.3 14 10V10.6667" stroke="#18794E" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M2 5.99972C5.89333 4.69972 10.1067 4.69972 14 5.99972" stroke="#18794E" strokeLinecap="round" strokeLinejoin="round" />
							</svg>

							<div>
								<h4 className="text-3 font-medium text-gray-12">Domain Settings</h4>
								<p className="text-1.1 font-medium text-gray-10">no custom domain set</p>
							</div>
						</button>
					</li>

					<li>
						<button className="flex gap-space-5 text-left p-space-4 bg-grayA-2 rounded-6 w-full border border-transparent hover:border-gray-4 outline-none focus:border-gray-4 transition-all duration-500">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M6.66634 11.3002H4.13967C1.89301 11.3002 1.33301 10.7402 1.33301 8.4935V4.4935C1.33301 2.24683 1.89301 1.68683 4.13967 1.68683H11.1597C13.4063 1.68683 13.9663 2.24683 13.9663 4.4935"
									stroke="#C62A2F"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path d="M6.66699 14.3133V11.3" stroke="#C62A2F" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M1.33301 8.63336H6.66634" stroke="#C62A2F" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M4.49512 14.3132H6.66845" stroke="#C62A2F" strokeLinecap="round" strokeLinejoin="round" />
								<path
									d="M14.6678 8.53321V12.3399C14.6678 13.9199 14.2745 14.3132 12.6945 14.3132H10.3278C8.74783 14.3132 8.35449 13.9199 8.35449 12.3399V8.53321C8.35449 6.95321 8.74783 6.55988 10.3278 6.55988H12.6945C14.2745 6.55988 14.6678 6.95321 14.6678 8.53321Z"
									stroke="#C62A2F"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path d="M11.4967 12.1666H11.5027" stroke="#C62A2F" strokeLinecap="round" strokeLinejoin="round" />
							</svg>

							<div>
								<h4 className="text-3 font-medium text-gray-12">Template Settings</h4>
								<p className="text-1.1 font-medium text-gray-10">Git template</p>
							</div>
						</button>
					</li>
				</ul>
			</section>

			<UpdateRepoModal repoName={params.repo} reference={repoDetailsDialog} closeModal={() => repoDetailsDialog.current?.close()} />
		</main>
	);
}
