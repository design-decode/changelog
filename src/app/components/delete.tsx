'use client';
import { useRouter } from 'next/navigation';
import { HTMLAttributes, useState } from 'react';
import { Spinner } from './loader';
import { createClient } from '@/utils/supabase/client';

export const DeleteButton = ({ postId, pageId, goBack, ...props }: HTMLAttributes<HTMLElement> & { postId: string; pageId: string; goBack?: boolean }) => {
	const supabase = createClient();
	const [isLoading, toggleLoader] = useState(false);
	const router = useRouter();

	const deletePost = async () => {
		toggleLoader(true);
		await supabase.from('posts').delete().eq('id', postId);
		goBack ? router.push(`/${pageId}`) : router.refresh();

		setTimeout(() => {
			toggleLoader(false);
		}, 1000);
	};

	return (
		<button {...props} onClick={() => deletePost()} className={`h-fit w-10 p-2 top-0 right-2 flex flex-col justify-center items-center ${props.className}`} disabled={isLoading}>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`absolute stroke-tomato-8 scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`} xmlns="http://www.w3.org/2000/svg">
				<path d="M14 3.98696C11.78 3.76696 9.54667 3.65363 7.32 3.65363C6 3.65363 4.68 3.72029 3.36 3.85363L2 3.98696" />
				<path d="M5.66675 3.31331L5.81341 2.43998C5.92008 1.80665 6.00008 1.33331 7.12675 1.33331H8.87341C10.0001 1.33331 10.0867 1.83331 10.1867 2.44665L10.3334 3.31331" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M12.5657 6.09308L12.1324 12.8064C12.059 13.8531 11.999 14.6664 10.139 14.6664H5.85904C3.99904 14.6664 3.93904 13.8531 3.86571 12.8064L3.43237 6.09308" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M6.8855 11H9.1055" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M6.33325 8.33331H9.66659" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
			</svg>

			<span className="sr-only">delete post</span>

			<Spinner className={` ${isLoading ? 'opacity-100' : 'opacity-0'}`} />
		</button>
	);
};
