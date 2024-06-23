import React from 'react';
import { Post } from '../../components/post';
import { PortfolioPage } from './portfolio';
import { PageSetting } from './setting';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { BlogPage } from './blog-page';

export const revalidate = 0;

export default async function Home({ params }: { params: { [key: string]: string } }) {
	const header = headers();
	const sitePrefix = header.get('host')?.split('.')[0];
	const supabase = createClient();

	const {
		data: { user }
	} = await supabase.auth.getUser();

	const getPageDetails = async (pageId: string) => await supabase.from('pages').select().eq('site', sitePrefix).eq('page_slug', pageId);

	const getPost = async (pageId: string, pageTitle: string) => {
		const { data, error } = await supabase.from('posts').select().eq('page', pageId).limit(1).single();
		if (data) return { data, error };

		const { data: post, error: postError } = await supabase
			.from('posts')
			.upsert({
				title: pageTitle,
				draft: true,
				body: '',
				page: pageId
			})
			.select()
			.single();
		return { data: post, error: postError };
	};

	const getPosts = async (pageId: string) => {
		const { data, error } = await supabase.from('posts').select().eq('page', pageId).order('created_at', { ascending: false });
		return { data, error };
	};

	const getPortfolio = async (pageId: string) => {
		const { data, error } = await supabase.from('portfolios').select().eq('page', pageId).single();
		if (data) return { data, error };

		const { data: post, error: postError } = await supabase
			.from('portfolios')
			.upsert({
				page: pageId
			})
			.select()
			.single();
		return { data: post, error: postError };
	};

	if (params.page == 'undefined') return;

	const { data: pageData, error: pageError } = await getPageDetails(decodeURIComponent(params.page));
	if (pageError || !pageData || !pageData.length) return <div className="w-full h-screen flex items-center justify-center font-bold text-2">Unable to fetch page data</div>;

	const { data, error } = pageData[0].type == 'blog' ? await getPosts(pageData[0].id) : pageData[0].type == 'portfolio' ? await getPortfolio(pageData[0].id) : await getPost(pageData[0].id, pageData[0].title);

	return (
		<main className="w-full mb-16 pt">
			<div className="flex w-full">
				<section className="mt-36 w-full mx-auto max-w-[427px] lg:max-w-[min(100vw,727px)]">
					<div className="">
						{pageData[0].type == 'blog' && data && <BlogPage user={user} params={params} pageData={pageData} blogData={data} />}

						{pageData[0].type == 'post' && data && <Post data={data} />}

						{pageData[0].type == 'portfolio' && data && <PortfolioPage pageData={pageData[0]} portfolioData={data} />}
					</div>
				</section>

				{user && <PageSetting className="w-[441px]" pageData={pageData[0]} />}
			</div>
		</main>
	);
}
