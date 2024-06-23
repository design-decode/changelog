'use client';

import { ChangeEvent, InputHTMLAttributes, useEffect, useRef } from 'react';

export const FileInput = ({ onChange, imgSrc, ...props }: InputHTMLAttributes<HTMLInputElement> & { imgSrc?: string }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) inputRef.current.style.backgroundImage = `url(${imgSrc})`;
	}, [imgSrc]);

	const onSetImage = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event?.target?.files) return;
		const file = event.target?.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			if (inputRef.current) inputRef.current.style.backgroundImage = `url(${reader.result})`;
			if (onChange) onChange(event);
		};

		if (file) reader.readAsDataURL(file);
	};

	return (
		<input
			{...props}
			ref={inputRef}
			type="file"
			onChange={onSetImage}
			className={`mb-6 cursor-pointer relative after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:-z-10 bg-cover bg-no-repeat after:bg-slate-3 block rounded-6 text-transparent file:invisible after:[content:url(/img/gallery.svg)] after:flex after:items-center after:justify-center ${props.className}`}
		/>
	);
};
