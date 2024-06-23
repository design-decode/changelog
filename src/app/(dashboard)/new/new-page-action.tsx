'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createPage = async (event: FormData) => {
	const supabase = createServerActionClient({ cookies });

	const pageData: any = {
		name: event.get('page-name'),
		page_slug: (event.get('page-name') as string)
			.replace(/ /g, '-')
			.replace(/[^a-zA-Z0-9-]/g, '')
			.toLowerCase(),
		title: event.get('page-title') || event.get('page-name'),
		description: event.get('page-description'),
		type: event.get('page-type'),
		template: event.get('page-template'),
		site: event.get('page-site'),
		bio: event.get('page-description')
	};

	if (event.get('page-id')) pageData.id = event.get('page-id');

	const { data, error } = await supabase.from('pages').upsert(pageData, { onConflict: 'id' }).select().single();

	const file = event.get('page-meta-image') as File;
	if (error || !file) return { data, error };

	const fileName = `${event.get('page-name')}.${file.name.split('.').pop()}`;
	const { data: imageData, error: imageError } = await supabase.storage.from('meta-images').upload(fileName, file, { upsert: true });

	if (imageError) return { data, error: imageError };
	const { data: imageURL } = supabase.storage.from('meta-images').getPublicUrl(imageData?.path);

	const { data: updateData, error: updateError } = await supabase.from('pages').update({ meta_image: imageURL.publicUrl }).eq('id', data.id).select().single();
	if (updateError) return { error: updateError, data };
	return { data: updateData };
};
