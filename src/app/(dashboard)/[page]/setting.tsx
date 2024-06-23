'use client';

import { useEffect, useState } from 'react';
import { createPage } from '../new/new-page-action';
import { NewPageForm } from '../new/new-page-form';
import { useSearchParams } from 'next/navigation';

export const PageSetting = ({ pageData, className }: { className?: string; pageData: { id: string; type: string; name: string; description: string; meta_image: string; template: string; site: string; title: string } | undefined }) => {
	const searchParams = useSearchParams();
	const [showSettings, toggleShowSettings] = useState<boolean>(false);

	useEffect(() => {
		toggleShowSettings(searchParams.get('settings') == 'true');
	}, [searchParams]);

	return <NewPageForm type="update" data={pageData} className={`fixed overflow-y-auto h-screen pl-2 pr-4 ${showSettings ? 'right-0' : '-right-[441px]'} top-0 transition-all duration-500 pb-10 ${className}`} formAction={createPage} />;
};
