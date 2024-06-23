import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { randomString } from '../../utils/rondom';
import { headers } from 'next/headers';
export const revalidate = 0;

const supabase = createClient();

const SiteError = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center font-bold text-2 flex-col gap-4">
			<p className="text-2 text-slate-12 font-regular">Unable to fetch site details, please reload page</p>
		</div>
	);
};

export default async function Home({ ...props }: { params: { [key: string]: string } }) {
	const header = headers();
	const sitePrefix = header.get('host')?.split('.')[0];

	// get user auth details
	// const {
	// 	data: { user }
	// } = await supabase.auth.getUser();

	// function for: all users must have one site data, if they don't have, create one automatically
	// const getSiteData = async () => {
	// 	const sitesResponse = await supabase.from('sites').select('prefix').eq('user', user?.id);

	// 	if (sitesResponse.error || sitesResponse.data.length) return sitesResponse;

	// 	const res = await supabase
	// 		.from('sites')
	// 		.insert({ name: `${user?.user_metadata.full_name}'s Site`, prefix: `${user?.user_metadata.full_name.replace(/\s+/g, '-').toLowerCase()}-${randomString()}` })
	// 		.select('prefix');
	// 	return res;
	// };
	// const { data: siteData, error: siteError } = await getSiteData();

	// if site method returned any error, show error component
	// if (siteError) return <SiteError />;

	// Since there is a site for user, get user's default page
	const { data, error } = await supabase.from('pages').select('page_slug').eq('site', sitePrefix).eq('default', true);

	// function for: automatically create new portfolio page for user if user does not have a page yet
	const createDefaultPage = async () => {
		const res = await supabase.from('pages').insert({ name: 'Home', page_slug: 'home', site: sitePrefix, description: 'Portfolio page description', type: 'portfolio', template: 'default', title: 'My portfolio', default: true }).select('page_slug');
		return res;
	};

	// if user does not have any page, automatically create default portfolio page and open it.
	if (!error && !data.length) {
		const { data: newPage, error: newPageError } = await createDefaultPage();
		return !newPageError ? redirect(`/${newPage[0].page_slug}`) : <SiteError />;
	}

	// code for page empty state
	// <div className="w-full h-screen flex items-center justify-center font-bold text-2 flex-col gap-4">
	// 	<p className="text-2 text-slate-12 font-regular">You do not have any page yet</p>
	// 	<Link prefetch className="bg-slate-12 py-2 px-4 text-2 drop-shadow-md rounded-4 font-regular" href={`/new`}>
	// 		Create Page
	// 	</Link>
	// </div>

	// if user has a page, automatically redirect them to the default page.
	if (!error && data.length) redirect(`/${data[0].page_slug}`);

	// if any error, show error component;
	return <SiteError />;
}
