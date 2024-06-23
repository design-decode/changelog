'use client';

import { useDebouncedCallback } from 'use-debounce';
import { GridEditor } from './grid-text-editor';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

const supabase = createPagesBrowserClient();

export const TitleDescription = ({ data, onChangeTitle }: { onChangeTitle?: (title: string) => void; data: { title: string; description: string; id: string; bio: string } }) => {
	const debounceText = useDebouncedCallback(
		async ({ value, type }: { value: string; type: 'bio' | 'title' }) => {
			await supabase
				.from('pages')
				.update(type == 'bio' ? { bio: value } : { title: value })
				.eq('id', data.id)
				.select()
				.single();
		},
		700,
		{ maxWait: 2000 }
	);

	return (
		<>
			<input
				className="text-slate-12 text-8 font-bold bg-transparent outline-none"
				defaultValue={data.title}
				onChange={event => {
					// onChangeTitle(event.target.value);
					debounceText({ value: event.target.value, type: 'title' });
				}}
			/>
			<GridEditor body={data.bio} className="bio" onChange={event => debounceText({ type: 'bio', value: event?.editor.getHTML() || '' })} />
		</>
	);
};
