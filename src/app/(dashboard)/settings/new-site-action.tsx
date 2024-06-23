'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createSite = async (event: FormData) => {
	const supabase = createServerActionClient({ cookies });

	const { data, error } = await supabase
		.from('sites')
		.upsert({
			name: event.get('site-name'),
			description: event.get('site-description'),
			prefix: event.get('site-prefix')
		})
		.select()
		.single();

	const metaImagefile = event.get('site-meta-image') as File;
	if (!error && metaImagefile) {
		const fileName = `${event.get('site-name')}-site.${metaImagefile.name.split('.').pop()}`;
		const { data: imageData, error: imageError } = await supabase.storage.from('meta-images').upload(fileName, metaImagefile, { upsert: true });
		if (imageData) {
			const { data: imageURL } = supabase.storage.from('meta-images').getPublicUrl(imageData?.path);
			await supabase.from('sites').update({ meta_image: imageURL.publicUrl }).eq('id', data.id);
		}
	}

	const faviconFile = event.get('site-favicon') as File;
	if (!error && faviconFile) {
		const fileName = `${event.get('site-name')}-site.${faviconFile.name.split('.').pop()}`;
		const { data: imageData, error: imageError } = await supabase.storage.from('favicons').upload(fileName, faviconFile, { upsert: true });
		if (imageData) {
			const { data: imageURL } = supabase.storage.from('favicons').getPublicUrl(imageData?.path);
			await supabase.from('sites').update({ favicon: imageURL.publicUrl }).eq('id', data.id);
			return { data, error };
		}
	}

	return { data, error };
};
