import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { isTokenValid } from '@/app/lib/token';
const prisma = new PrismaClient();

export const GET = async (req: Request) => {
	try {
		const isUserTokenValid = await isTokenValid(req.headers.get('authorization'));
		console.log('🚀 ~ file: route.tsx:9 ~ GET ~ isUserTokenValid:', isUserTokenValid);
		if (!isUserTokenValid) return NextResponse.json({ error: 'Token is invalid' }, { status: 401 });

		const users = await prisma.user.findMany({
			include: {
				accounts: true,
				sessions: true
			}
		});
		const sessions = await prisma.session.findMany({
			include: {
				user: true
			}
		});
		return NextResponse.json({ users, sessions }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
};
