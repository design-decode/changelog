import { InputHTMLAttributes } from 'react';

const Input = ({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string }) => {
	return (
		<div className={`w-full ${props.className}`}>
			{label && (
				<label htmlFor={props.id} className="w-full text-slateA-9 text-1 font-light mb-space-2">
					{label}
				</label>
			)}
			<input
				type="text"
				{...props}
				className="bg-slateA-3 border-slate-4 border rounded-2 px-space-1 h-space-6 text-1.1 text-slate-12 w-full outline-none placeholder:text-slateA-11 font-regular focus:bg-slateA-4 focus:border-slate-7 duration-500 focus:shadow-6 transition-all"
			/>
		</div>
	);
};

export default Input;
