'use client';
import { useState } from 'react';
import { AccordionButton } from './accordion';
import TemplateSettingIcon from '../../../../../public/img/template-setting.svg';
import { SiteTemplateForm } from './site-template-form';

export const SiteTemplateSection = () => {
	const [isAccordionOpen, toggleAccordion] = useState(false);

	return <SiteTemplateForm />;
};
