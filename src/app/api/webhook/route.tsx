import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const POST = async (req: Request) => {
	const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});

	try {
		const { action, release, repository } = await req.json();

		// if github webhook event action is delete, get the github release id and delete the release from supabase
		if (action === 'deleted' && release) {
			const { data, error, status } = await supabase.from('releases').delete().eq('id', release.id);
			return NextResponse.json({ data, error }, { status: String(status).includes('20') ? 200 : 500 });
		}

		// if github webhook action is published, create a release on supabase
		if (action === 'published' && release && repository) {
			const { data, error, status } = await supabase.from('releases').insert({
				id: release.id,
				name: release.name,
				assets_url: release.assets_url,
				draft: release.draft,
				prerelease: release.prerelease,
				github_link: release.html_url,
				body: release.body,
				tag_name: release.tag_name,
				repo: repository.name
			});
			return NextResponse.json({ data, error }, { status: String(status).includes('20') ? 200 : 500 });
		}

		// if github webhook event action is edited, get the the github release id and update the release on supabase
		if (action === 'edited' && release) {
			const { data, error, status } = await supabase
				.from('releases')
				.update({
					name: release.name,
					assets_url: release.assets_url,
					draft: release.draft,
					prerelease: release.prerelease,
					github_link: release.html_url,
					body: release.body,
					tag_name: release.tag_name
				})
				.eq('id', release.id);
			console.log('🚀 ~ POST ~ data, error:', data, error);
			return NextResponse.json({ data, error }, { status: String(status).includes('20') ? 200 : 500 });
		}

		return NextResponse.json({ data: 'not implemented' }, { status: 200 });
	} catch (error) {
		console.log('🚀 ~ POST ~ error:', error);
		return NextResponse.json({ error }, { status: 500 });
	}
};
