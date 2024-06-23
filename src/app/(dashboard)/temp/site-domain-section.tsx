'use client';
import { useState } from 'react';
import { AccordionButton } from './accordion';
import { SiteInfoForm } from './site-info-form';
import { SiteDomainForm } from './site-domain-form';
import DomainSettingIcon from '../../../../../public/img/domain-setting.svg';

export const SiteDomainSection = () => {
	const [isAccordionOpen, toggleAccordion] = useState(false);

	return (
		<AccordionButton showAccordionContent={isAccordionOpen} label="Domain Settings" icon={DomainSettingIcon} toggleAccordion={() => toggleAccordion(!isAccordionOpen)}>
			<SiteDomainForm className={`overflow-hidden transition-all duration-500 ${isAccordionOpen ? 'max-h-[96rem] pb-8' : 'max-h-0'}`} />
		</AccordionButton>
	);
};

{
	/* <button className="flex gap-space-5 text-left p-space-4 bg-grayA-2 rounded-6 w-full border border-transparent hover:border-gray-4 outline-none focus:border-gray-4 transition-all duration-500">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M7.99967 14.6666C11.6816 14.6666 14.6663 11.6819 14.6663 7.99998C14.6663 4.31808 11.6816 1.33331 7.99967 1.33331C4.31778 1.33331 1.33301 4.31808 1.33301 7.99998C1.33301 11.6819 4.31778 14.6666 7.99967 14.6666Z"
									stroke="#18794E"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path d="M5.3347 2H6.00137C4.70137 5.89333 4.70137 10.1067 6.00137 14H5.3347" stroke="#18794E" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M10 2C11.3 5.89333 11.3 10.1067 10 14" stroke="#18794E" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M2 10.6667V10C5.89333 11.3 10.1067 11.3 14 10V10.6667" stroke="#18794E" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M2 5.99972C5.89333 4.69972 10.1067 4.69972 14 5.99972" stroke="#18794E" strokeLinecap="round" strokeLinejoin="round" />
							</svg>

							<div>
								<h4 className="text-3 font-medium text-gray-12">Domain Settings</h4>
								<p className="text-1.1 font-medium text-gray-10">no custom domain set</p>
							</div>
                        </button> */
}
