import { LabelHTMLAttributes } from 'react';

export const Label = ({ children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => {
	return (
		<label htmlFor={props.id} className={`w-fit relative text-slateA-9 text-1 font-light mb-3 whitespace-nowrap block ${props.className}`}>
			{children}
		</label>
	);
};
