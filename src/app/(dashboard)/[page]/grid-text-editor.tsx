'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import { Editor as TittapEditor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Transaction } from '@tiptap/pm/state';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';

export const GridEditor = ({ body, onChange, title, className }: { className?: string; title?: boolean; body?: any; onChange?: (data?: { editor: TittapEditor; transaction: Transaction }) => void }) => {
	const changeDummy = () => {};

	const editor = useEditor({
		extensions: [
			StarterKit,
			Placeholder.configure({
				placeholder: 'Add text here...'
			})
		],
		onUpdate: onChange || changeDummy,
		content: body || ''
	});

	useEffect(() => {
		if (title) editor?.commands.setHeading({ level: 2 });
		if (!body) editor?.commands.focus();
	}, [body, editor, title]);

	return <EditorContent className={`${className} overflow-auto h-full has-[:focus]:bg-slateA-3 transition-all duration-500 has-[:hover]:bg-slateA-3 rounded-[23px] p-4 ${title ? 'bg-slate-3' : ''}`} editor={editor} />;
};
