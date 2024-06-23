import { SiteDomainSection } from './site-domain-section';
import { SiteInfoSection } from './site-info-section';

export default function Home({ params }: { params: { [keys: string]: string } }) {
	return (
		<main className="pt-space-9">
			<section className="mt-space-9 max-w-[727px] mx-auto">
				<div className="border-b border-b-slate-3 flex pb-space-5 gap-space-3 items-center mb-space-7">
					<h1 className="text-slate-12 font-bold text-4 flex gap-space-2 items-center">
						Preferences <span className="text-slateA-10 font-regular text-3">/</span>
						<span className="text-slateA-10 font-regular text-3"> Repository Name</span>
					</h1>

					<button className="transition-all duration-500 hover:bg-slate-3 focus:bg-slate-3 rounded-2 py-space-1 px-space-2 outline-none">
						<svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.36062 5.0166L3.53396 2.84327C3.79062 2.5866 4.21062 2.5866 4.46729 2.84327L6.64062 5.0166" stroke="#808080" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M6.63938 10.9834L4.46604 13.1567C4.20937 13.4134 3.78938 13.4134 3.53271 13.1567L1.35938 10.9834" stroke="#808080" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</div>

				<ul className="flex flex-col gap-space-4">
					<li>{/* <SiteInfoSection /> */}</li>

					<li>{/* <SiteDomainSection /> */}</li>
				</ul>
			</section>
		</main>
	);
}
