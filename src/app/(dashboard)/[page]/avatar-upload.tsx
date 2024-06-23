'use client';

import { FileInput } from '@/app/components/file-input';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

const supabase = createPagesBrowserClient();

export const Avatar = ({ avatar, id }: { avatar: string; id: string }) => {
	return (
		<>
			<FileInput
				className="w-44 h-44 rounded-[100px]"
				placeholder="Profile avatar"
				imgSrc={avatar}
				onChange={async event => {
					if (!event?.target?.files) return;
					const file = event.target?.files[0];
					const fileName = `${id}-profile-avatar${file.name.split('.').pop()}`;
					const { data, error } = await supabase.storage.from('grid_images').upload(`avatars/${fileName}`, file, { upsert: true, cacheControl: '0' });

					if (error) return console.log('upload error', error);
					// get image url for storage
					const { data: imageURL } = supabase.storage.from('grid_images').getPublicUrl(data?.path);
					await supabase
						.from('pages')
						.update({ avatar: `${imageURL.publicUrl}?updated=${Math.floor(Math.random() * (20 - 1 + 1)) + 1}` })
						.eq('id', id)
						.select()
						.single();
				}}
			/>
		</>
	);
};
