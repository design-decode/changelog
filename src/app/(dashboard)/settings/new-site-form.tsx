'use client';

import { BrowserPreview } from '@/app/components/browser-preview';
import { FileInput } from '@/app/components/file-input';
import Input from '@/app/components/input';
import { Label } from '@/app/components/label';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export const NewSiteForm = ({ formAction, createPage }: { formAction: (arg0: FormData) => Promise<any>; createPage: (arg0: FormData) => Promise<any> }) => {
	const router = useRouter();
	const [loading, setLoadingState] = useState(false);
	const [siteName, setSiteName] = useState('');
	const [sitePrefix, setSitePrefix] = useState('new-user');
	const [pageFavicon, setPageFavicon] = useState<string | ArrayBuffer | null>('');

	const setMetaImage = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event?.target?.files) return;
		const file = event.target?.files[0];
		const reader = new FileReader();
		reader.onloadend = () => setPageFavicon(reader.result);

		if (file) reader.readAsDataURL(file);
	};

	const submitForm = async (formData: FormData) => {
		setLoadingState(true);
		const { data, error } = await formAction(formData);
		setLoadingState(false);

		if (!error) createHomePage(data.id);
	};

	const createHomePage = async (siteId: string) => {
		const newPageForm = new FormData();
		newPageForm.append('page-name', 'home');
		newPageForm.append('page-description', `I'm Emmanuel Aina; a creator, engineer and designer. Demo.`);
		newPageForm.append('page-title', `Emmanuel's Site`);
		newPageForm.append('page-type', `portfolio`);
		newPageForm.append('page-template', `default`);
		newPageForm.append('page-site', siteId);

		const { data, error } = await createPage(newPageForm);
		if (!error) router.push(`/${data.id}`);
	};

	return (
		<form action={submitForm}>
			<div className="pl-8 border-l border-l-slate-3 mt-10 relative before:[content:url(/img/edit-icon.svg)] before:absolute before:-left-3 before:scale-[.65] before:-top-1">
				<h3 className="text-slate-11 mb-8">Site Details</h3>

				<Input onChange={event => setSiteName(event.target.value)} required label="Site Name" id="site-name" name="site-name" type="text" placeholder="New site name" className="!w-80 mb-6" />
				<Input label="Site Description" id="site-description" name="site-description" type="text" placeholder="New site description" className="!w-80 mb-6" />
				<Input onChange={event => setSitePrefix(event.target.value)} label="Site Prefix" id="site-prefix" name="site-prefix" type="text" placeholder="New site prefix" className="!w-80 mb-6" />

				{/* <Label>Favicon</Label>
				<FileInput onChange={setMetaImage} id="site-favicon" name="site-favicon" className="w-20 h-20 rounded-4" />

				<Label>Social Image</Label>
				<FileInput id="site-meta-image" name="site-meta-image" className="w-48 h-48 rounded-4" /> */}

				<div className="w-96 mt-20">
					<h2 className="text-slate-10 mb-2 text-2 font-medium mt-16">Browser Preview</h2>
					<BrowserPreview prefix={sitePrefix} metaImage={pageFavicon} title={siteName} />
				</div>
			</div>

			<button type="submit" className="bg-slate-11 ml-8 rounded-4 py-1 px-4 text-2 font-medium text-slate-2 mt-20 disabled:opacity-40" disabled={loading}>
				{loading ? 'Creating site...' : 'Create Site'}
			</button>
		</form>
	);
};
