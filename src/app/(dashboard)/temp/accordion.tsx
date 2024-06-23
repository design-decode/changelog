import { ReactNode } from 'react';
import Image from 'next/image';

export const AccordionButton = ({ toggleAccordion, children, showAccordionContent, label, icon, className }: { toggleAccordion: () => void; children: ReactNode; showAccordionContent: boolean; label: string; icon: any; className?: string }) => {
	return (
		<section className="bg-grayA-2 rounded-6 border border-transparent hover:border-gray-4 ">
			<button onClick={toggleAccordion} className={`flex justify-between w-full text-left items-center outline-none focus:border-gray-4 transition-all duration-500 py-space-5 px-space-4 ${showAccordionContent ? 'pb-7' : ''} ${className}`}>
				<div className="flex items-center gap-space-5">
					<Image src={icon} alt="icon" priority />

					<h4 className="text-3 font-medium text-gray-12">{label}</h4>
				</div>

				<div className="border border-slate-10 rounded-4 w-6 h-6 flex items-center justify-center">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`stroke-slate-10 scale-50 transition-all duration-500 ${showAccordionContent ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg">
						<path d="M19.9181 8.9502L13.3981 15.4702C12.6281 16.2402 11.3681 16.2402 10.5981 15.4702L4.07812 8.9502" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
			</button>

			{children}
		</section>
	);
};
