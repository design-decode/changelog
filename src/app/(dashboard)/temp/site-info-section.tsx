'use client';
import { useState } from 'react';
import { AccordionButton } from './accordion';
import { SiteInfoForm } from './site-info-form';
import SiteInfoIcon from '../../../../../public/img/site-detail.svg';

export const SiteInfoSection = () => {
	const [isAccordionOpen, toggleAccordion] = useState(false);

	return (
		<AccordionButton showAccordionContent={isAccordionOpen} icon={SiteInfoIcon} label="Site Details" toggleAccordion={() => toggleAccordion(!isAccordionOpen)}>
			<SiteInfoForm className={`overflow-hidden transition-all duration-500 ${isAccordionOpen ? 'max-h-[96rem] pb-8' : 'max-h-0'}`} />
		</AccordionButton>
	);
};
