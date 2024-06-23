'use client';
import { useCallback, useEffect, useState } from 'react';
import { Editor } from '../(dashboard)/[page]/[id]/editor';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
const supabase = createPagesBrowserClient();

export const Post = ({ data }: { data: { title: string; body: string; page: string; id: string } }) => {
	const [title, setTitle] = useState(data.title);
	const [text] = useDebounce(title, 1000);

	const updateTitle = useCallback(
		async (title: string) => {
			await supabase
				.from('posts')
				.update({
					title
				})
				.eq('id', data.id);
		},
		[data.id]
	);

	useEffect(() => {
		updateTitle(text);
	}, [text, updateTitle]);

	const debounceBody = useDebouncedCallback(
		async value => {
			const res = await supabase
				.from('posts')
				.update({
					body: value
				})
				.eq('id', data.id);
		},
		700,
		{ maxWait: 2000 }
	);

	return (
		<>
			<input onChange={event => setTitle(event.target.value)} defaultValue={data.title} className="bg-transparent text-slate-12 outline-none block w-full text-8 leading-9 font-bold" placeholder="Post title goes here" type="text" />
			<Editor body={data.body} onChange={event => debounceBody(event?.editor.getHTML())} />
		</>
	);
};
