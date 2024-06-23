export const Tooltip = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<button type="button" className="group w-fit h-fit absolute -right-6 top-1/2 -translate-y-1/2 peer outline-none focus-visible:outline-slate-8 focus-visible:-outline-offset-4">
				<svg width="24" height="24" viewBox="0 0 24 24" className="stroke-slate-7 fill-none scale-50 group-[:focus]:stroke-slate-11 group-[:hover]:stroke-slate-11 active:scale-75 transition-all duration-500" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M12 8V13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M12 16H12.009" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>
			<p className="absolute pointer-events-none peer-[:focus]:opacity-100 peer-[:hover]:opacity-100 peer-has-[:hover]:pointer-events-auto opacity-0 bottom-6 bg-slateA-6 p-2 backdrop-blur-md rounded-6 w-60 text-slate-11 text-wrap">{children}</p>
		</>
	);
};
