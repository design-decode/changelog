import React from 'react';
import Link from 'next/link';
import { Post } from '@/app/components/post';
import { NavigationButton } from '../back-button';
import { redirect } from 'next/navigation';
import { DeleteButton } from '@/app/components/delete';
import { createClient } from '@/utils/supabase/server';

export const revalidate = 0;

export default async function PostPage({ params, searchParams }: { params: { [key: string]: string }; searchParams: { [key: string]: string } }) {
	const supabase = createClient();

	const {
		data: { user },
		error: userError
	} = await supabase.auth.getUser();

	const getPost = async (postId: string) => {
		const { data: pageData, error: pageError } = await supabase.from('pages').select(`page_slug, id`).eq('page_slug', params.page).eq('user', user?.id);
		if (pageError || !pageData) return { data: pageData, error: pageError };

		const { data, error } = await supabase
			.from('posts')
			.select()
			.or(`title.eq.${decodeURIComponent(postId)},id.eq.${postId}`)
			.single();
		return { data, error };
	};

	const createNewPost = async (pageId: string) => {
		const { data: pageData, error: pageError } = await supabase.from('pages').select(`page_slug, id`).eq('page_slug', pageId).eq('user', user?.id);
		if (pageError || !pageData) return { data: pageData, error: pageError };

		const { data, error } = await supabase.from('posts').insert({ title: '', body: '', page: pageData[0].id, slug: '' }).select().single();
		if (data) redirect(`/${pageData[0].page_slug}/${data.id}`);

		return { data, error };
	};

	const { data, error } = params.id == 'new' ? await createNewPost(params.page) : await getPost(params.id);

	const convertObjectToQueryString = (queryKey: string) => {
		const queryObject = structuredClone(searchParams);
		const queryKeys = Object.keys(queryObject);
		queryKeys.find(key => {
			if (key === queryKey) {
				delete queryObject[queryKey];
			}
		});

		return Object.keys(queryObject)
			.map(key => `${key}=${queryObject[key]}`)
			.join('&');
	};

	return (
		<main className="w-full">
			{/* <header className="flex gap-4 justify-end items-center pl-16 pr-4 py-2 border-b border-b-slate-3">

				<Link
					prefetch
					href={`/${params.page}/${data.title}/?${convertObjectToQueryString('preview')}&preview=${searchParams.preview == 'true' ? 'false' : 'true'}`}
					className="outline-none group/setting transition-all duration-500 hover:bg-slateA-3 focus-within:bg-slateA-3 rounded-4 px-2 py-1"
					title="settings">
					<svg width="24" height="24" viewBox="0 0 24 24" className="group-focus-within/setting:stroke-slate-11 group-hover/setting:stroke-slate-11 stroke-slate-9 transition-all duration-500 scale-75" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M15.5819 11.9999C15.5819 13.9799 13.9819 15.5799 12.0019 15.5799C10.0219 15.5799 8.42188 13.9799 8.42188 11.9999C8.42188 10.0199 10.0219 8.41992 12.0019 8.41992C13.9819 8.41992 15.5819 10.0199 15.5819 11.9999Z"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M12.0037 20.2697C15.5337 20.2697 18.8238 18.1897 21.1138 14.5897C22.0138 13.1797 22.0138 10.8097 21.1138 9.39973C18.8238 5.79973 15.5337 3.71973 12.0037 3.71973C8.47375 3.71973 5.18375 5.79973 2.89375 9.39973C1.99375 10.8097 1.99375 13.1797 2.89375 14.5897C5.18375 18.1897 8.47375 20.2697 12.0037 20.2697Z"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</Link>

				<Link
					prefetch
					href={`/${params.page}/${data.title}/?settings=${searchParams.settings == 'true' ? 'false' : 'true'}&${convertObjectToQueryString('settings')}`}
					className="outline-none group/setting transition-all duration-500 hover:bg-slateA-3 focus-within:bg-slateA-3 rounded-4 px-2 py-1"
					title="settings">
					<svg width="24" height="25" viewBox="0 0 24 25" className="group-focus-within/setting:stroke-slate-11 group-hover/setting:stroke-slate-11 stroke-slate-9 transition-all duration-500 scale-75" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M3 10.0379V15.8079C3 17.9279 3 17.9279 5 19.2779L10.5 22.4579C11.33 22.9379 12.68 22.9379 13.5 22.4579L19 19.2779C21 17.9279 21 17.9279 21 15.8179V10.0379C21 7.9279 21 7.9279 19 6.5779L13.5 3.3979C12.68 2.9179 11.33 2.9179 10.5 3.3979L5 6.5779C3 7.9279 3 7.9279 3 10.0379Z"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path d="M12 15.9276C13.6569 15.9276 15 14.5844 15 12.9276C15 11.2707 13.6569 9.92755 12 9.92755C10.3431 9.92755 9 11.2707 9 12.9276C9 14.5844 10.3431 15.9276 12 15.9276Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</Link>
			</header> */}

			<div className="flex h-[calc(100vh-50px)]">
				<div className="min-w-56 w-full pl-24 overflow-x-auto">
					<section className={`mt-16 mx-auto w-[727px]`}>
						<div className="flex justify-between items-center mb-16">
							<NavigationButton href={`/${params.page}`} />

							{user?.id && <DeleteButton postId={data.id} goBack pageId={params.page} />}
						</div>

						<Post data={data} />
					</section>
				</div>
			</div>
		</main>
	);
}
