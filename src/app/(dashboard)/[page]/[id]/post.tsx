import { NavigationButton } from '../back-button';
import { Editor } from './editor';

export const Post = async ({ post, className }: { post: any; className?: string }) => {
	return (
		<section className={`mt-40 mx-auto ${className}`}>
			<NavigationButton href={`/${post.page}`} />

			<input value={post?.title} className="bg-transparent text-slate-12 outline-none block w-full text-8 leading-9 font-bold mb-9" placeholder="Post title goes here" type="text" />
			{post && <Editor body={post.body} />}
		</section>
	);
};
