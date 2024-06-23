import Header from '../components/header/header';
import { createClient } from '../../utils/supabase/server';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const supabase = createClient();

	const getUser = async () => {
		const res = await supabase.auth.getUser();
		return res;
	};

	const {
		data: { user }
	} = await getUser();

	return (
		<>
			{user && <Header></Header>}
			{children}
		</>
	);
}
