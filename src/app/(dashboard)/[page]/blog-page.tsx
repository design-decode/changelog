import DateTemplate from '@/app/components/templates/date-animated';
import { DateNormal } from '@/app/components/templates/date-normal';
import { DefaultTemplate } from '@/app/components/templates/default';
import { GitTemplate } from '@/app/components/templates/git';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

export const BlogPage = ({ pageData, blogData, params, user }: { user?: User | null; pageData: { template: string; title: string; description: string }[]; blogData: { id: string; template: string }[]; params: { [key: string]: string } }) => {
	return (
		<>
			<div className="flex justify-between pb-16 items-start">
				<div className="max-w-[500px]">
					<h1 className="text-7 font-bold text-slate-12">{pageData[0].title}</h1>
					<p className="mt-4 text-2 text-slate-11">{pageData[0].description}</p>
				</div>

				<div>
					{user && (
						<Link
							prefetch
							scroll={false}
							href={`/${params.page}/new`}
							className="outline-none flex items-center gap-1 bg-slate-12 focus:bg-slate-12 hover:bg-slate-12 focus:text-slate-2 hover:text-slate-2 transition-all duration-500 py-1 pl-3 pr-4 text-2 text-slate-3 rounded-4">
							<svg width="24" height="24" viewBox="0 0 24 24" className="stroke-slate-1 transition-all duration-500 scale-50" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M8 12H16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M12 16V8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							New Post
						</Link>
					)}
				</div>
			</div>

			{!blogData.length && (
				<div className="text-center h-[50vh] flex flex-col items-center justify-center">
					<p className="text-slate-6 text-center font-medium text-2 italic">There are no posts yet.</p>
					{user && (
						<Link prefetch scroll={false} href={`/${params.page}/new`} className="py-2 px-4 rounded-4 text-1 bg-transparent text-slate-12 mt-4">
							Create new post
						</Link>
					)}
				</div>
			)}

			{blogData.length && (
				<>
					{pageData[0].template == 'date-animated' && blogData && <DateTemplate pageId={params.page} canEdit data={blogData} />}
					{pageData[0].template == 'date-normal' && blogData && blogData.map((post: { id: React.Key | null | undefined }) => <DateNormal pageId={params.page} canEdit data={post} key={post.id} />)}
					{pageData[0].template == 'github' && blogData && blogData.map((post: { id: React.Key | null | undefined }) => <GitTemplate pageId={params.page} canEdit data={post} key={post.id} />)}
					{(pageData[0].template == 'default' || !pageData[0].template) && blogData && blogData.map((post: { id: React.Key | null | undefined }) => <DefaultTemplate pageId={params.page} data={post} key={post.id} />)}
				</>
			)}
		</>
	);
};
