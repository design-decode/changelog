import { DefaultTemplate } from '@/app/components/templates/default';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { NavigationButton } from '../back-button';

const supabase = createPagesBrowserClient();

const getPost = async (releaseId: string) => {
	const { data, error } = await supabase.from('releases').select().eq('id', releaseId);
	return { data, error };
};

export default async function PostPage({ params }: { params: { [key: string]: string } }) {
	const { id } = params;
	const { data, error } = await getPost(id);

	return (
		<main className="pt-space-9">
			<section className="mt-space-9 max-w-[727px] mx-auto">
				{data && (
					<>
						<NavigationButton href={`/${data[0].repo}`}>{`Emmanuel's Change Log`}</NavigationButton>

						{/* <DefaultTemplate className="pt-space-9" data={data[0]} /> */}
					</>
				)}
			</section>
		</main>
	);
}
