'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logout = async () => {
	const supabase = createServerActionClient({ cookies });
	const { error } = await supabase.auth.signOut();
	if (!error) redirect('/auth');
};
