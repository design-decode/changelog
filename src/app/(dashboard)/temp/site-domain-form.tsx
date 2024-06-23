import { FormEvent, HTMLAttributes } from 'react';
import Input from '@/app/components/input';
import { BrowserPreview } from '../../components/browser-preview';

export const SiteDomainForm = ({ ...props }: HTMLAttributes<HTMLElement>) => {
	const onUpdateRepoDetails = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		// const { error } = await supabase.from('repos').update(formData).eq('name', repoName);
		// if (!error) closeModal();
	};

	return (
		<div {...props} className={`px-space-8 ${props.className}`}>
			<p className="text-2 text-slate-10 max-w-lg mb-7 font-light">{`You can add a custom domain URL here where you'll like people to visit your site. Example emmanuelaina.dev`}</p>

			<form onSubmit={onUpdateRepoDetails} className="flex items-center">
				<Input id="domain" name="domain" label="New Domain" type="url" className="mb-space-5" placeholder="Enter your site name" />
				<button className="py-space-2 px-space-5 text-1 font-medium bg-gray-12 text-gray-1 rounded-3">Add</button>
			</form>

			<h2 className="text-slate-10 mb-2 text-2 font-medium">Preview</h2>
			<BrowserPreview />

			<div className="border bg-slate-1 border-slate-3 rounded-4 mt-9">
				<div className="px-4 py-6 border-b border-b-slate-3 ">
					<div className="text-slate-11 flex items-center w-full justify-between">
						<h4>
							emmanuel.aveer.site <span className="bg-tomatoA-3 ml-1 py-1 px-2 rounded-6 text-1 text-tomato-11">active</span>
						</h4>
						<button className="bg-slate-11 px-4 py-1 text-1 text-slate-2 rounded-4 font-medium">Edit</button>
					</div>
					<p className="text-slate-9 mt-1 text-1">Set the below record on your DNS provider to continue</p>
				</div>

				<div className="flex">
					<div className="max-w-32 w-full">
						<div className="py-3 px-4 border-r text-slate-9 font-regular text-1 border-r-slate-3 border-b border-b-slate-3">Type</div>
						<div className="py-3 px-4 text-slate-11 border-r border-r-slate-3">CNAME</div>
					</div>
					<div className="max-w-40 w-full">
						<div className="py-3 px-4 border-r text-slate-9 font-regular text-1 border-r-slate-3 border-b border-b-slate-3">Name</div>
						<div className="py-3 px-4 text-slate-11 border-r border-r-slate-3">blog</div>
					</div>
					<div className="w-full">
						<div className="py-3 px-4 border-b text-slate-9 font-regular text-1 border-b-slate-3">Value</div>
						<div className="py-3 px-4 text-slate-11">cname.aveer-dns.com</div>
					</div>
				</div>
			</div>

			<h2 className="text-slate-10 mb-2 text-2 font-medium mt-16">Domains</h2>
			<ul>
				<li className="px-4 py-6 text-slate-11 flex items-center w-full justify-between border bg-slate-1 border-slate-3 rounded-4">
					<h4>
						emmanuel.aveer.site <span className="bg-grassA-3 ml-1 py-1 px-2 rounded-6 text-1 text-grass-11">active</span>
					</h4>
					<button className="bg-slate-11 px-4 py-1 text-1 text-slate-2 rounded-4 font-medium">Edit</button>
				</li>
			</ul>
		</div>
	);
};
