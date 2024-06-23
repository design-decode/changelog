import { NewPageForm } from './new-page-form';
import { createPage } from './new-page-action';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';

export default async function NewPage() {
	const header = headers();
	const sitePrefix = header.get('host')?.split('.')[0];
	const supabase = createClient();

	return (
		<main className="w-full overflow-x-hidden mb-72">
			<section className="pt-space-9 mt-space-9 max-w-[727px] mx-auto pl-24 pr-8">
				<h1 className="text-5 font-bold text-slate-12">Create New Page</h1>
				<p className="mt-4 text-2 text-slate-11 leading-5 mb-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque quidem aliquid laudantium neque dicta architecto.</p>

				<NewPageForm sitePrefix={sitePrefix} formAction={createPage} />
			</section>
		</main>
	);
}
