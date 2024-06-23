import { InputHTMLAttributes } from 'react';
import { Label } from './label';
import { Tooltip } from './tooltip';

const Input = ({ label, onChange, tooltip, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; tooltip?: string }) => {
	return (
		<div className={`w-full ${props.className}`}>
			{label && (
				<Label>
					{label}
					{tooltip && <Tooltip>{tooltip}</Tooltip>}
				</Label>
			)}

			<input
				type="text"
				{...props}
				onChange={event => (onChange ? onChange(event) : false)}
				className="bg-slateA-3 border-slate-4 border rounded-2 px-space-1 h-space-6 text-1.1 text-slate-12 w-full outline-none placeholder:text-slateA-11 font-regular focus:bg-slateA-4 focus:border-slate-7 duration-500 focus:shadow-6 transition-all"
			/>
		</div>
	);
};

export default Input;
