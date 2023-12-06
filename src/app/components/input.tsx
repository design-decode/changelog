import { InputHTMLAttributes } from 'react';

const Input = ({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string }) => {
	return (
		<div className={`w-full ${props.className}`}>
			{label && (
				<label htmlFor={props.id} className="w-full text-slateA-9 text-1 font-light mb-space-2">
					{label}
				</label>
			)}
			<input type="text" {...props} className="border border-slate-10 px-space-1 h-space-6 text-1.1 font-regular placeholder:text-slate-9 text-slate-12 rounded-3 w-full bg-transparent" />
		</div>
	);
};

export default Input;
