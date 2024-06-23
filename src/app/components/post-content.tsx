import { HTMLAttributes, ReactNode } from 'react';
import { parse, transform, renderers } from '@markdoc/markdoc';
import { components, config } from '@/app/lib/config.markdoc';
import React from 'react';

const parseMarkdown = (data: string): ReactNode => {
	const parsed = parse(data);
	return <>{parsed}</>;
};

export const PostContent = ({ postBody }: HTMLAttributes<HTMLElement> & { postBody: string }) => {
	return parseMarkdown(postBody);
};
