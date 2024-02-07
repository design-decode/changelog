'use client';

import DefaultTemplate from '../components/templates/default';
import { GitTemplate } from '../components/templates/git';
import DateTemplate from '../components/templates/date';
import { useSearchParams } from 'next/navigation';

import { useCallback, useEffect, useState } from 'react';
import { User, createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
const supabase = createPagesBrowserClient();

export default function Home() {
	const searchParams = useSearchParams();
	const [releases, setReleases] = useState<any[]>([]);

	const getUser = async (): Promise<User | null> => {
		const data = await supabase.auth.getUser();
		return data.data.user;
	};

	const getUserInstallationId = useCallback(async () => {
		const installation_id = (await getUser())?.user_metadata.installation_id;
		return installation_id;
	}, []);

	const getRepo = useCallback(async () => {
		const repoId = searchParams.get('repoId');
		const { data } = await supabase.from('repos').select().eq('id', repoId);
		if (data) return data[0];
	}, [searchParams]);

	const getReleases = useCallback(async () => {
		const { data } = await supabase.auth.getUser();
		const installation_id = await getUserInstallationId();
		const repoDetails = await getRepo();

		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/releases/github', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ owner: data.user?.user_metadata.user_name, repo: repoDetails.name, installation_id })
		});
		const res = await response.json();
		setReleases(res.data);
		return res;
	}, [getRepo, getUserInstallationId]);

	useEffect(() => {
		getReleases();
	}, [getReleases]);

	return (
		<main className="">
			<section className="mt-space-9 max-w-[727px] mx-auto">
				<div className="border-b border-b-slate-3 flex justify-end pb-space-3">
					<button className="">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="#696E77" />
							<path
								d="M1.3335 8.58697V7.41364C1.3335 6.7203 1.90016 6.14697 2.60016 6.14697C3.80683 6.14697 4.30016 5.29364 3.6935 4.24697C3.34683 3.64697 3.5535 2.86697 4.16016 2.5203L5.3135 1.8603C5.84016 1.54697 6.52016 1.73364 6.8335 2.2603L6.90683 2.38697C7.50683 3.43364 8.4935 3.43364 9.10016 2.38697L9.1735 2.2603C9.48683 1.73364 10.1668 1.54697 10.6935 1.8603L11.8468 2.5203C12.4535 2.86697 12.6602 3.64697 12.3135 4.24697C11.7068 5.29364 12.2002 6.14697 13.4068 6.14697C14.1002 6.14697 14.6735 6.71364 14.6735 7.41364V8.58697C14.6735 9.2803 14.1068 9.85364 13.4068 9.85364C12.2002 9.85364 11.7068 10.707 12.3135 11.7536C12.6602 12.3603 12.4535 13.1336 11.8468 13.4803L10.6935 14.1403C10.1668 14.4536 9.48683 14.267 9.1735 13.7403L9.10016 13.6136C8.50016 12.567 7.5135 12.567 6.90683 13.6136L6.8335 13.7403C6.52016 14.267 5.84016 14.4536 5.3135 14.1403L4.16016 13.4803C3.5535 13.1336 3.34683 12.3536 3.6935 11.7536C4.30016 10.707 3.80683 9.85364 2.60016 9.85364C1.90016 9.85364 1.3335 9.2803 1.3335 8.58697Z"
								stroke="#696E77"
								strokeMiterlimit="10"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
				<article className="mt-space-7 flex flex-col gap-space-9">
					{/* <DateTemplate /> */}
					{releases.map(release => (
						<GitTemplate data="release" key={release.id} />
					))}

					{/* <DefaultTemplate />
					<DefaultTemplate />
					<DefaultTemplate /> */}
				</article>
			</section>
		</main>
	);
}
