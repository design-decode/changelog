import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (user && req.nextUrl.pathname === '/auth') {
		return NextResponse.redirect(new URL('/', req.url));
	}

	if (!user && req.nextUrl.pathname === '/') {
		return NextResponse.redirect(new URL('/auth', req.url));
	}

	return res;
}
