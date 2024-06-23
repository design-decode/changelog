import { ReactNode } from 'react';

export const TemplateText = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex items-center text-slate-9 font-light text-2 mt-2 transition-all duration-500 group-hover:text-slate-12 group-focus-within:text-slate-12 group-has-[:checked]:text-slate-12">
			<svg width="24" height="24" viewBox="0 0 24 24" className="fill-sage-11 scale-75 mr-1 w-0 transition-all duration-500 group-has-[:checked]:w-5" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12 2C6.48608 2 2 6.48608 2 12C2 17.5139 6.48608 22 12 22C17.5139 22 22 17.5139 22 12C22 6.48608 17.5139 2 12 2ZM6.64642 12.3535L7.35358 11.6465C7.54883 11.4512 7.86542 11.4512 8.06067 11.6465L10 13.5858L15.9393 7.64645C16.1346 7.45119 16.4512 7.45119 16.6464 7.64645L17.3536 8.35355C17.5488 8.54881 17.5488 8.8654 17.3536 9.06065L10.3536 16.0607C10.1583 16.2559 9.84174 16.2559 9.64642 16.0607L6.64642 13.0607C6.45117 12.8654 6.45117 12.5488 6.64642 12.3535Z"
				/>
			</svg>
			{children}
		</div>
	);
};

export const PortfolioTemplates = ({ value }: { value: string }) => {
	return (
		<>
			<li className="group">
				<label className="relative block cursor-pointer h-56 overflow-hidden p-4 group-has-[:checked]:border-slate-12 border focus-within:border-slate-12 hover:border-slate-12 transition-all duration-500 border-slate-3 rounded-5" htmlFor="default">
					<input required defaultChecked={value === 'default'} type="radio" value="default" className="absolute opacity-0" name="page-template" id="default" />
					<div className="">
						<div className="mb-5">
							<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
							<div className="w-3 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
						</div>

						<div className="mb-5">
							<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
							<div className="w-3 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
						</div>

						<div>
							<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
							<div className="w-3 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
						</div>
					</div>
				</label>
				<TemplateText>Default</TemplateText>
			</li>

			<li className="group">
				<label className="relative block cursor-pointer h-56 overflow-hidden p-4 group-has-[:checked]:border-slate-12 border focus-within:border-slate-12 hover:border-slate-12 transition-all duration-500 border-slate-3 rounded-5" htmlFor="instagram">
					<input required type="radio" defaultChecked={value === 'instagram'} value="instagram" className="absolute opacity-0" name="page-template" id="instagram" />
					<div className="flex gap-2 mb-3">
						<div className="w-7 bg-slate-11 h-7 rounded-6"></div>
						<div>
							<div className="w-8 bg-slate-11 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-2 rounded-2"></div>
						</div>
					</div>
					<div className="mb-4">
						<div className="w-16 bg-slate-11 h-2 rounded-2 mb-2"></div>
						<div className="w-full bg-slate-7 h-6 rounded-2"></div>
					</div>
					<div className="mb-4">
						<div className="w-16 bg-slate-11 h-2 rounded-2 mb-2"></div>
						<div className="w-full bg-slate-7 h-6 rounded-2"></div>
					</div>
					<div className="">
						<div className="w-16 bg-slate-11 h-2 rounded-2 mb-2"></div>
						<div className="w-full bg-slate-7 h-6 rounded-2"></div>
					</div>
				</label>
				<TemplateText>Instagram</TemplateText>
			</li>

			<li className="group">
				<label className="relative block cursor-pointer p-4 group-has-[:checked]:border-slate-12 border focus-within:border-slate-12 hover:border-slate-12 transition-all duration-500 border-slate-3 rounded-5" htmlFor="bento">
					<input type="radio" value="bento" defaultChecked={value === 'bento'} className="absolute opacity-0" name="page-template" id="bento" />
					<div className="flex gap-2 mb-3">
						<div className="w-9 bg-slate-11 h-9 rounded-2"></div>
						<div className="w-20 bg-slate-7 h-9 rounded-2"></div>
					</div>
					<div className="flex gap-2 mb-3">
						<div className="w-20 bg-slate-7 h-24 rounded-2"></div>
						<div className="w-9 bg-slate-11 h-24 rounded-2"></div>
					</div>
					<div className="flex gap-2">
						<div className="w-9 bg-slate-11 h-9 rounded-2"></div>
						<div className="w-20 bg-slate-7 h-9 rounded-2"></div>
					</div>
				</label>
				<TemplateText>Bento</TemplateText>
			</li>
		</>
	);
};

export const BlogTemplates = ({ value }: { value: string }) => {
	return (
		<>
			<li className="group">
				<label className="relative block cursor-pointer h-56 overflow-hidden p-4 group-has-[:checked]:border-slate-12 border focus-within:border-slate-12 hover:border-slate-12 transition-all duration-500 border-slate-3 rounded-5" htmlFor="default">
					<input required type="radio" defaultChecked={value === 'default'} value="default" className="absolute opacity-0" name="page-template" id="default" />
					<div className="">
						<div className="mb-5">
							<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
							<div className="w-3 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
						</div>

						<div className="mb-5">
							<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
							<div className="w-3 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
						</div>

						<div>
							<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
							<div className="w-3 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
						</div>
					</div>
				</label>
				<TemplateText>Default</TemplateText>
			</li>

			<li className="group">
				<label className="relative block cursor-pointer h-56 overflow-hidden p-4 group-has-[:checked]:border-slate-12 border focus-within:border-slate-12 hover:border-slate-12 transition-all duration-500 border-slate-3 rounded-5" htmlFor="date-normal">
					<input required type="radio" defaultChecked={value === 'date-normal'} value="date-normal" className="absolute opacity-0" name="page-template" id="date-normal" />
					<div className="flex gap-4 mb-3">
						<div className="w-5 bg-slate-9 h-1 rounded-6"></div>
						<div>
							<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
						</div>
					</div>
					<div className="flex gap-4 mb-3">
						<div className="w-5 bg-slate-9 h-1 rounded-6"></div>
						<div>
							<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="w-5 bg-slate-9 h-1 rounded-6"></div>
						<div>
							<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
						</div>
					</div>
				</label>
				<TemplateText>Date</TemplateText>
			</li>

			<li className="group">
				<label className="relative block cursor-pointer h-56 overflow-hidden p-4 group-has-[:checked]:border-slate-12 border focus-within:border-slate-12 hover:border-slate-12 transition-all duration-500 border-slate-3 rounded-5" htmlFor="date-animated">
					<input required type="radio" defaultChecked={value === 'date-animated'} value="date-animated" className="absolute opacity-0" name="page-template" id="date-animated" />
					<div className="flex gap-4 items-center">
						<div>
							<div className="w-5 bg-slate-7 h-1 rounded-6 mb-2"></div>
							<div className="w-5 bg-slate-7 h-1 rounded-6 mb-2"></div>
							<div className="w-5 bg-slate-7 h-1 rounded-6 mb-2"></div>
							<div className="w-5 bg-slate-7 h-1 rounded-6 mb-2"></div>
						</div>
						<div>
							<div className="mb-4">
								<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
								<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							</div>

							<div className="mb-4">
								<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
								<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							</div>

							<div>
								<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
								<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
								<div className="w-24 bg-slate-7 h-1 rounded-2"></div>
							</div>
						</div>
					</div>
				</label>
				<TemplateText>Date Animated</TemplateText>
			</li>

			<li className="group">
				<label className="relative block cursor-pointer h-56 overflow-hidden p-4 group-has-[:checked]:border-slate-12 border focus-within:border-slate-12 hover:border-slate-12 transition-all duration-500 border-slate-3 rounded-5" htmlFor="github">
					<input required type="radio" defaultChecked={value === 'github'} value="github" className="absolute opacity-0" name="page-template" id="github" />
					<div className="flex gap-4 mb-3">
						<div>
							<div className="w-5 bg-slate-7 h-1 rounded-6 mb-1"></div>
							<div className="w-2 bg-slate-7 h-1 rounded-6 mb-1"></div>
							<div className="w-3 bg-slate-7 h-1 rounded-6"></div>
						</div>
						<div>
							<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
						</div>
					</div>
					<div className="flex gap-4 mb-3">
						<div>
							<div className="w-4 bg-slate-7 h-1 rounded-6 mb-1"></div>
							<div className="w-3 bg-slate-7 h-1 rounded-6 mb-1"></div>
							<div className="w-2 bg-slate-7 h-1 rounded-6"></div>
						</div>
						<div>
							<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
						</div>
					</div>
					<div className="flex gap-4">
						<div>
							<div className="w-3 bg-slate-7 h-1 rounded-6 mb-1"></div>
							<div className="w-4 bg-slate-7 h-1 rounded-6 mb-1"></div>
							<div className="w-2 bg-slate-7 h-1 rounded-6"></div>
						</div>
						<div>
							<div className="w-10 bg-slate-11 h-2 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
							<div className="w-24 bg-slate-7 h-1 rounded-2 mb-2"></div>
						</div>
					</div>
				</label>
				<TemplateText>Github Style</TemplateText>
			</li>
		</>
	);
};
