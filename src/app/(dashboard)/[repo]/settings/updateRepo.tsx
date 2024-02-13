import { DialogHTMLAttributes, FormEvent, MouseEventHandler, Ref } from 'react';
import Input from '../../../components/input';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

const supabase = createPagesBrowserClient();

const UpdateRepoModal = ({ repoName, reference, closeModal, ...props }: DialogHTMLAttributes<HTMLDialogElement> & { repoName: string; closeModal: any; reference: Ref<HTMLDialogElement> }) => {
	const onUpdateRepoDetails = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const { error } = await supabase.from('repos').update(formData).eq('name', repoName);
		if (!error) closeModal();
	};

	return (
		<dialog {...props} ref={reference} className="backdrop:bg-slateA-2 backdrop:bg-opacity-0 backdrop:backdrop-blur-sm w-[450px] p-space-6 rounded-5 border border-grayA-3 bg-gray-1 transition-all backdrop:transition-all">
			<h2 className="pb-space-5 text-5 font-bold text-gray-12">Repository Details</h2>

			<form onSubmit={onUpdateRepoDetails} className="">
				<Input id="domain_url" name="domain_url" label="Domain URL" type="url" className="mb-space-5" placeholder="Enter domain URL" />
				<Input id="primary_color" name="primary_color" label="Primary color" type="color" className="mb-space-5" placeholder="Primary color" />

				<div className="flex gap-space-3 justify-end">
					<button className="py-space-2 px-space-3 text-1 font-medium bg-transparent text-gray-11 border border-grayA-8 rounded-3" type="button" onClick={closeModal}>
						Cancel
					</button>
					<button className="py-space-2 px-space-3 text-1 font-medium bg-gray-12 text-gray-1 rounded-3">Update Details</button>
				</div>
			</form>
		</dialog>
	);
};

export { UpdateRepoModal };
