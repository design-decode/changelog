import { Grid } from './grid';
import { TitleDescription } from './portfolio-details';
import { Avatar } from './avatar-upload';
import { Layout } from 'react-grid-layout';
import { GRID_ITEM } from '@/app/lib/portfolio.interface';
import { createClient } from '@/utils/supabase/server';
import { ServerGrid } from './server.grid';
import Image from 'next/image';

export const revalidate = 0;

export const PortfolioPage = async ({ portfolioData, pageData }: { pageData: { title: string; body: string; id: string; description: string; avatar: string; bio: string }; portfolioData: { layout: Layout[]; grid_item: GRID_ITEM[] } }) => {
	const supabase = createClient();
	const {
		data: { user }
	} = await supabase.auth.getUser();

	return (
		<>
			{user ? (
				<>
					<div className="mb-10">
						<Avatar id={pageData.id} avatar={pageData.avatar} />
						<TitleDescription data={pageData} />
					</div>

					<Grid page={pageData.id} portfolioData={portfolioData} />
				</>
			) : (
				<>
					<div className="mb-10">
						{pageData.avatar && (
							<div className="relative w-44 mb-4 h-44">
								<Image alt="user avatar" src={pageData.avatar} sizes="176" priority className={`rounded-[100px] object-cover center`} fill />
							</div>
						)}

						<h1 className="text-slate-12 text-8 font-bold mb-4">{pageData.title}</h1>
						<div className="bio-text" dangerouslySetInnerHTML={{ __html: pageData.bio || '' }}></div>
					</div>

					<ServerGrid page={pageData.id} portfolioData={portfolioData} />
				</>
			)}
		</>
	);
};
