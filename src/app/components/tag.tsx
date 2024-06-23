type type = 'improvement' | 'bug fix' | 'update';

export default function Tag({ name }: { name: type }) {
	const color = (name: type): string => {
		switch (name) {
			case 'improvement':
				return 'indigoA';
			case 'bug fix':
				return 'redA';
			case 'update':
				return 'greenA';

			default:
				return 'indigoA';
		}
	};
	return (
		<div className={`bg-${color(name)}-2 py-space-2 px-space-3 rounded-6 text-${color(name)}-11 w-fit h-fit flex items-center gap-space-1 text-1 font-light mb-space-5`}>
			{name === 'improvement' && (
				<svg width="12" height="12" fill="none" viewBox="0 0 12 12" className="stroke-indigoA-11" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M3.04359 6.63995H4.58859V10.2399C4.58859 11.0799 5.04359 11.2499 5.59859 10.6199L9.38359 6.31995C9.84859 5.79495 9.65359 5.35995 8.94859 5.35995H7.40359V1.75995C7.40359 0.919949 6.94859 0.749949 6.39359 1.37995L2.60859 5.67995C2.14859 6.20995 2.34359 6.63995 3.04359 6.63995Z"
						strokeWidth="0.8"
						strokeMiterlimit="10"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			)}

			{name === 'update' && (
				<svg width="12" height="12" className={`stroke-${color(name)}-11`} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M1.74875 10.2507C2.16375 10.6657 2.83375 10.6657 3.24875 10.2507L9.74875 3.7507C10.1637 3.3357 10.1637 2.6657 9.74875 2.2507C9.33375 1.8357 8.66375 1.8357 8.24875 2.2507L1.74875 8.7507C1.33375 9.1657 1.33375 9.8357 1.74875 10.2507Z"
						strokeOpacity="0.823"
						strokeWidth="0.8"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path d="M9.00391 4.49512L7.50391 2.99512" strokeOpacity="0.823" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M4.25 1.22L5 1L4.78 1.75L5 2.5L4.25 2.28L3.5 2.5L3.72 1.75L3.5 1L4.25 1.22Z" strokeOpacity="0.823" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M2.25 4.22L3 4L2.78 4.75L3 5.5L2.25 5.28L1.5 5.5L1.72 4.75L1.5 4L2.25 4.22Z" strokeOpacity="0.823" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M9.75 6.72L10.5 6.5L10.28 7.25L10.5 8L9.75 7.78L9 8L9.22 7.25L9 6.5L9.75 6.72Z" strokeOpacity="0.823" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			)}

			{name === 'bug fix' && (
				<svg width="12" height="12" viewBox="0 0 12 12" className={`stroke-${color(name)}-11`} fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6 3.875V6.5" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
					<path
						d="M10.5381 4.29002V7.71C10.5381 8.27 10.2381 8.79002 9.75314 9.07502L6.78314 10.79C6.29814 11.07 5.69813 11.07 5.20813 10.79L2.23813 9.07502C1.75313 8.79502 1.45312 8.275 1.45312 7.71V4.29002C1.45312 3.73002 1.75313 3.21 2.23813 2.925L5.20813 1.21C5.69313 0.93 6.29314 0.93 6.78314 1.21L9.75314 2.925C10.2381 3.21 10.5381 3.72502 10.5381 4.29002Z"
						strokeWidth="0.8"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path d="M6 8.1001V8.1501" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			)}
			<span className="capitalize">{name}</span>
		</div>
	);
}
