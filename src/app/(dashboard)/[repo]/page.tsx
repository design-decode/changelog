import DefaultTemplate from '../../components/templates/default';
import { GitTemplate } from '../../components/templates/git';
import DateTemplate from '../../components/templates/date';

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

const supabase = createPagesBrowserClient();

const getReleases = async (repoId: string) => {
	const { data, error } = await supabase.from('releases').select().eq('repo', repoId);
	return { data, error };
};

export default async function Home({ params }: { params: { [key: string]: string } }) {
	const { data, error } = await getReleases(params.repo);

	return (
		<main className="">
			<section className="mt-space-9 max-w-[727px] mx-auto">
				<div className="border-b border-b-slate-3 flex justify-end pb-space-3">
					<button className="" title="settings">
						<svg width="24" height="25" viewBox="0 0 24 25" className="hover:stroke-gray-11 stroke-gray-9 transition-all duration-500 scale-75" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M3 10.0379V15.8079C3 17.9279 3 17.9279 5 19.2779L10.5 22.4579C11.33 22.9379 12.68 22.9379 13.5 22.4579L19 19.2779C21 17.9279 21 17.9279 21 15.8179V10.0379C21 7.9279 21 7.9279 19 6.5779L13.5 3.3979C12.68 2.9179 11.33 2.9179 10.5 3.3979L5 6.5779C3 7.9279 3 7.9279 3 10.0379Z"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path d="M12 15.9276C13.6569 15.9276 15 14.5844 15 12.9276C15 11.2707 13.6569 9.92755 12 9.92755C10.3431 9.92755 9 11.2707 9 12.9276C9 14.5844 10.3431 15.9276 12 15.9276Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</div>

				<article className="mt-space-7 flex flex-col gap-space-9">
					{/* <DateTemplate /> */}
					{data && data.map(release => <GitTemplate data={release} key={release.id} />)}

					{/* <DefaultTemplate />
					<DefaultTemplate />
					<DefaultTemplate /> */}
				</article>
			</section>
		</main>
	);
}
