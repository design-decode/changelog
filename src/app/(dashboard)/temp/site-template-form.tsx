'use server';

import { FormEvent, HTMLAttributes } from 'react';
import Input from '@/app/components/input';
import { BrowserPreview } from '../../components/browser-preview';
import { FileInput } from '@/app/components/file-input';

const onUpdateRepoDetails = async (formData: FormData) => {
	'use server';
	console.log('🚀 ~ onUpdateRepoDetails ~ formData:', formData);
	return formData.get('title');
	// event.preventDefault();
	// const formData = new FormData(event.currentTarget);
	// const { error } = await supabase.from('repos').update(formData).eq('name', repoName);
	// if (!error) closeModal();
};

export const SiteTemplateForm = () => {
	return (
		<li className={`px-space-4 py-8 w-full`}>
			<h1 className="text-4 text-slate-11 mb-4 font-bold">Page settings</h1>
			<p className="text-2 text-slate-10 w-80 mb-7 font-light">You can edit meta details and configuration of this page here.</p>

			<form action={onUpdateRepoDetails}>
				{/* <Input id="title" name="title" label="Page Title" type="text" className="mb-space-5" placeholder="Page Title" />
				<Input id="description" name="description" label="Page description" type="text" className="mb-space-5" placeholder="Page description" /> */}

				<label htmlFor="favicon" className="w-full text-slateA-9 text-1 font-light mb-space-2 whitespace-nowrap">
					Meta image
				</label>
				{/* <FileInput className="w-80 h-48 rounded-4" /> */}

				<label htmlFor="favicon" className="block w-full text-slateA-9 text-1 font-light mb-space-2 mt-10">
					Template
				</label>
				<ul className="flex gap-4">
					<li className="p-4 has-[:checked]:border-slate-12 border focus-within:border-slate-12 hover:border-slate-12 transition-all duration-500 border-slate-3 rounded-5">
						<label className="relative block cursor-pointer" htmlFor="github">
							<input type="radio" className="absolute opacity-0" name="template" id="github" />
							<div className="flex gap-2 mb-3">
								<div className="w-7 bg-slate-7 h-7 rounded-6"></div>
								<div>
									<div className="w-10 bg-slate-7 h-1 rounded-2 mb-2"></div>
									<div className="w-24 bg-slate-7 h-2 rounded-2"></div>
								</div>
							</div>
							<div className="mb-6">
								<div className="w-16 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-full bg-slate-7 h-6 rounded-2"></div>
							</div>
							<div className="mb-6">
								<div className="w-16 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-full bg-slate-7 h-6 rounded-2"></div>
							</div>
							<div className="">
								<div className="w-16 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-full bg-slate-7 h-6 rounded-2"></div>
							</div>
						</label>
					</li>

					<li className="p-4 has-[:checked]:border-slate-12 border focus-within:border-slate-12 hover:border-slate-12 transition-all duration-500 border-slate-3 rounded-5">
						<label className="relative block cursor-pointer" htmlFor="dafault">
							<input type="radio" className="absolute opacity-0" name="template" id="dafault" />
							<div className="flex gap-2 mb-3">
								<div className="w-7 bg-slate-7 h-7 rounded-6"></div>
								<div>
									<div className="w-10 bg-slate-7 h-1 rounded-2 mb-2"></div>
									<div className="w-24 bg-slate-7 h-2 rounded-2"></div>
								</div>
							</div>
							<div className="mb-6">
								<div className="w-16 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-full bg-slate-7 h-6 rounded-2"></div>
							</div>
							<div className="mb-6">
								<div className="w-16 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-full bg-slate-7 h-6 rounded-2"></div>
							</div>
							<div className="">
								<div className="w-16 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-full bg-slate-7 h-6 rounded-2"></div>
							</div>
						</label>
					</li>
				</ul>

				<div className="flex justify-end w-full overflow-hidden">
					<button className="py-1 px-6 mt-10 bg-slate-12 rounded-4 text-slate-9 text-2 font-light" type="submit">
						Save
					</button>
				</div>
			</form>
		</li>
	);
};
