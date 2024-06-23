type HeadingProps = {
	children: any;
	level: number;
};

export default function Heading({ children, level }: HeadingProps) {
	switch (level) {
		case 1:
			return (
				<h1 id={children} className="text-slate-12 text-6 font-medium mb-space-5 relative before:absolute before:-pt-32px before:content-[url('/doc-icons/hashtag.svg')]">
					{children}
				</h1>
			);
		case 2:
			return (
				<h2 id={children} className="text-slate-12 text-5 font-medium mb-space-4 mt-32px">
					{children}
				</h2>
			);
		case 3:
			return (
				<h3 id={children} className="text-slate-12 text-3 font-medium mb-space-4 mt-32px">
					{children}
				</h3>
			);
		case 4:
			return (
				<h4 id={children} className="text-slate-12 text-2 font-medium mb-space-4 mt-32px">
					{children}
				</h4>
			);
		case 5:
			return (
				<h5 id={children} className="text-slate-12 text-1 font-medium mb-space-3 mt-32px">
					{children}
				</h5>
			);
		case 6:
			return (
				<h6 id={children} className="text-slate-12 text-1 font-medium mb-space-3 mt-32px">
					{children}
				</h6>
			);
		default:
			<div id={children} className="text-slate-12 text-1 font-medium pb-space-3 mt-32px">
				{children}
			</div>;
	}
}
