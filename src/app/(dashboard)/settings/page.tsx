import { createPage } from '../new/new-page-action';
import { createSite } from './new-site-action';
import { NewSiteForm } from './new-site-form';

export default async function NewSitePage() {
	return (
		<main className="w-full overflow-x-hidden mb-72">
			<section className="pt-space-9 mt-space-9 w-[727px] mx-auto pl-24 pr-8 overflow-auto">
				<h1 className="text-5 font-bold text-slate-12">Your site wide settings</h1>
				<p className="mt-4 text-2 text-slate-11 leading-5 mb-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque quidem aliquid laudantium neque dicta architecto.</p>

				<NewSiteForm formAction={createSite} createPage={createPage} />
			</section>
		</main>
	);
}
