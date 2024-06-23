import { GRID_ITEM, GRID_TYPE } from '@/app/lib/portfolio.interface';
import { FormEvent, useState } from 'react';

export const GridItemAddLink = ({ setDetails, type, currentLink }: { setDetails: (details: GRID_ITEM) => void; type: GRID_TYPE; currentLink?: string }) => {
	const [link, setLink] = useState<string>(currentLink || '');

	const getDomainName = (urlString: string | URL): string => {
		try {
			const url = new URL(urlString);
			return url.hostname;
		} catch (error) {
			console.error('Invalid URL:', error);
			return `${urlString}`;
		}
	};

	const parseURL = async (event: FormEvent) => {
		event.preventDefault();

		if (type === 'img') return setDetails({ link });

		const splittedLink = link.split('//');

		try {
			const response = await fetch(`https://cors-anywhere.herokuapp.com/${splittedLink[1] || splittedLink[0]}`);
			const html = await response.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');

			const title = doc.querySelector('head > title')?.innerHTML || doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
			const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
			const image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content') || '';
			const domain = getDomainName(link);

			setDetails({ title, description, metaImage: image, domain, link });
			setLink('');
		} catch (error) {
			console.error('Error fetching meta data:', error);
		} finally {
		}
	};

	return (
		<form className="exempt bg-slate-4 w-full flex absolute -bottom-2 z-20 rounded-6 py-2 px-2 items-center left-0 gap-2">
			<input autoFocus className="w-full outline-none text-slate-12 text-2 font-light bg-transparent" defaultValue={link} onChange={e => setLink(e.target.value)} type="url" placeholder="Link here" aria-label="link url" />
			<button className="bg-slate-12 py-1 px-2 rounded-4 text-1 text-slate-1" onClick={parseURL}>
				{link ? 'Add' : 'Paste'}
			</button>
		</form>
	);
};
