import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(req: NextRequest) {
	// const res = NextResponse.next();
	// const supabase = createMiddlewareClient({ req, res });

	// const {
	// 	data: { user }
	// } = await supabase.auth.getUser();

	// if (user && req.nextUrl.pathname === '/auth') {
	// 	return NextResponse.redirect(new URL('/', req.url));
	// }

	// if (!user && req.nextUrl.pathname === '/') {
	// 	return NextResponse.redirect(new URL('/auth', req.url));
	// }

	return await updateSession(req);
}

// Ensure the middleware is only called for relevant paths.
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		'/((?!_next/static|_next/image|favicon.ico).*)'
	]
};
