'use client';

import { useRouter } from 'next/navigation';
import Header from '../components/header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const auth: any = { data: typeof window !== 'undefined' ? window.localStorage.getItem('TALLY_USER') : '' };
	const authDetails = auth?.data ? JSON.parse(auth.data) : null;

	if (authDetails) {
		const expirationDate = new Date(authDetails.sessions.expires_at);
		const isTokenExpired = expirationDate < new Date();

		if (isTokenExpired) {
			localStorage.clear();
			router.push('/login');
		}
	}

	return (
		<>
			<Header></Header>
			{children}
		</>
	);
}
