'use client';

import { useParams, useSearchParams } from 'next/navigation';

export const PageSettingsButton = () => {
	const params = useParams();
	const searchParams = useSearchParams();

	const openPageSettings = () => {
		history.pushState(null, '', `/${params.page}/?settings=${searchParams.get('settings') == 'true' ? 'false' : 'true'}`);
	};

	return (
		<button onClick={openPageSettings} title="Page settings" className={`bg-slate-12 p-2 rounded-[100px] absolute z-10 transition-all duration-500 ${params.page ? '-right-14 opacity-100 pointer-events-auto' : 'right-0 opacity-0 pointer-events-none'}`}>
			<svg width="24" height="24" viewBox="0 0 24 24" className="fill-none stroke-slate-3 scale-75" xmlns="http://www.w3.org/2000/svg">
				<path d="M22 17.5H15" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M5 17.5H2" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M22 6.5H19" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M9 6.5H2" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M7 14.5H13C14.1 14.5 15 15 15 16.5V18.5C15 20 14.1 20.5 13 20.5H7C5.9 20.5 5 20 5 18.5V16.5C5 15 5.9 14.5 7 14.5Z" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M11 3.5H17C18.1 3.5 19 4 19 5.5V7.5C19 9 18.1 9.5 17 9.5H11C9.9 9.5 9 9 9 7.5V5.5C9 4 9.9 3.5 11 3.5Z" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</button>
	);
};
