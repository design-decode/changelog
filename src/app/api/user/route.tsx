import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function handle(_req: Request, res: Response) {
	try {
		const users = await prisma.user.findMany();
		return NextResponse.json(users);
	} catch (error) {
		return NextResponse.json({ error: `Failed because of ${error}` }, { status: 500 });
	}
}

export { handle as GET, handle as POST };
