import { useRef } from 'react';

export const SocialPreview = ({ title, description, metaImage, prefix }: { prefix?: string; title?: string; description?: string; metaImage?: string | ArrayBuffer | null }) => {
	const divRef = useRef<HTMLInputElement>(null);
	if (divRef.current && metaImage) divRef.current.style.backgroundImage = `url(${metaImage})`;

	return (
		<div className="border rounded-4 border-slate-5 bg-slate-1 p-2 max-w-lg">
			<div className="w-full h-44 bg-no-repeat bg-cover bg-center rounded-4" ref={divRef}></div>
			<div className="max-w-xs">
				<p className="text-1 truncate text-indigo-7 my-2">{`https://${prefix}.aveer.site/${title ? encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase()) : ''}`}</p>
				<h4 className="text-slate-12 truncate text-3 mb-1">{title}</h4>
				<p className="text-slate-10 truncate text-1.1">{description}</p>
			</div>
		</div>
	);
};
