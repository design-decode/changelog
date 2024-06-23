import { FormEvent, HTMLAttributes } from 'react';
import Input from '@/app/components/input';
import { FileInput } from '@/app/components/file-input';
import { BrowserPreview } from '../../components/browser-preview';
import { SocialPreview } from '../../components/social-preview';

export const SiteInfoForm = ({ ...props }: HTMLAttributes<HTMLFormElement>) => {
	const onUpdateRepoDetails = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		// const { error } = await supabase.from('repos').update(formData).eq('name', repoName);
		// if (!error) closeModal();
	};

	return (
		<form onSubmit={onUpdateRepoDetails} {...props} className={`px-space-8 ${props.className}`}>
			<h1 className="text-3 font-bold text-slate-11 mb-2">Site Information</h1>
			<p className="text-2 text-slate-10 max-w-lg mb-7 font-light">Website title and description are used to help search engines and users understand what your website is about.</p>
			{/* <p className="text-2 text-slate-10 max-w-lg mb-2">A well composed details with the right wording can improve search engines ranking of your platform.</p> */}
			<Input id="title" name="title" label="Title" type="text" className="mb-space-5" placeholder="Enter your site name" />
			<Input id="description" name="description" label="Description" type="text" className="mb-space-5" placeholder="Short description about your website" />

			<h2 className="text-slate-10 mb-2 text-2 font-medium mt-16">Preview</h2>
			<BrowserPreview />

			<h2 className="text-slate-10 mb-2 text-2 font-medium mt-8">Preview</h2>
			<SocialPreview />

			<h1 className="text-3 font-bold text-slate-11 mb-2 mt-28">Website Images</h1>
			<p className="text-2 text-slate-10 max-w-lg mb-3 font-light">{`Favicon: the icon that'll appear next to your website's title, enabling users to identify your website uniquely.`}</p>
			<p className="text-2 text-slate-10 max-w-lg mb-7 font-light">{`Meta image: the image that'll appear whenever your website is shared to any platform, like social media`}</p>

			<label htmlFor="favicon" className="w-full text-slateA-9 text-1 font-light mb-space-2">
				Favicon
			</label>
			<FileInput id="favicon" className="w-20 h-20" />

			<label htmlFor="favicon" className="w-full text-slateA-9 text-1 font-light mb-space-2">
				Meta Image
			</label>
			<FileInput className="max-w-xl h-48" />

			<div className="flex gap-space-3 mt-20 justify-end">
				<button className="py-space-2 px-space-5 text-1 font-medium bg-gray-12 text-gray-1 rounded-3">Save</button>
			</div>
		</form>
	);
};
