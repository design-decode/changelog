'use client';
import { parse, renderers, transform } from '@markdoc/markdoc';

import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import { Editor as TittapEditor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import { Transaction } from '@tiptap/pm/state';
import Placeholder from '@tiptap/extension-placeholder';

const parseMarkdown = (data: string) => {
	const parsed = parse(data);
	const transformed = transform(parsed);

	const reactNode = renderers.html(transformed);
	return reactNode;
};

export const Editor = ({ body, onChange, showMenu }: { body?: any; onChange?: (data?: { editor: TittapEditor; transaction: Transaction }) => void; showMenu?: boolean }) => {
	const changeDummy = () => {};

	const editor = useEditor({
		extensions: [
			StarterKit,
			Placeholder.configure({
				placeholder: 'Your awesome article starts here...'
			})
		],
		content: body || '',
		onUpdate: onChange || changeDummy
	});

	return (
		<>
			{showMenu && editor && (
				<BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
					<button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
						Bold
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
						Italic
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>
						Strike
					</button>
				</BubbleMenu>
			)}

			{showMenu && editor && (
				<FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
					<button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
						H1
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
						H2
					</button>
					<button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
						Bullet List
					</button>
				</FloatingMenu>
			)}

			<EditorContent className="overflow-auto" editor={editor} />
		</>
	);
};
