import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { add, formatISO } from 'date-fns';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

type GITHUB_AUTH = {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	refresh_token_expires_in: number;
	scope: any;
};

const generateToken = (userDetails: { userId: string; accountId: string }): string => {
	const secret = process.env.JWT_SECRET as string;
	return jwt.sign(userDetails, secret, { expiresIn: '28800s' });
};

const refreshGithubToken = async (refresh_token?: string) => {
	if (!refresh_token) return false;

	try {
		const response = await axios.post(
			'https//github.com/login/oauth/access_token',
			JSON.stringify({
				client_id: process.env.GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				refresh_token,
				grant_type: 'refresh_token'
			}),
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

const getUserRefreshToken = async (email: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email
			},
			select: {
				accounts: {
					select: {
						refresh_token: true
					}
				}
			}
		});

		return user?.accounts[0].refresh_token;
	} catch (error) {
		return error;
	}
};

const updateUserDetails = async (token: string, newToken: GITHUB_AUTH, sessionDetails: jwt.JwtPayload) => {
	Promise.all([
		prisma.session.update({
			where: {
				session_token: token
			},
			data: {
				expires_at: formatISO(add(new Date(), { seconds: newToken.expires_in })),
				session_token: generateToken({ userId: sessionDetails.userId, accountId: sessionDetails.accountId })
			}
		}),
		prisma.account.update({
			where: {
				account_id: sessionDetails.accountId
			},
			data: {
				...newToken
			}
		})
	]);
};

const istokenInDB = async (token: string) => {
	try {
		const session = await prisma.session.findUnique({
			where: {
				session_token: token
			}
		});

		return session?.id ? true : false;
	} catch (error) {
		return error;
	}
};

export const isTokenValid = async (token: string | null) => {
	if (!token) return false;

	try {
		if (!(await istokenInDB(token))) return false;
		const sessionDetails = jwt.decode(token) as jwt.JwtPayload;

		if (!sessionDetails.exp || !sessionDetails.accountId) return false;

		const currentDateTime = new Date();
		const sessionExpiration = new Date(sessionDetails.exp * 1000);
		const isValid = !(currentDateTime > sessionExpiration);

		// this will automatically refresh the token
		// if (isExpired) {
		// 	const userRefreshToken = await getUserRefreshToken(sessionDetails.email) as string;
		// 	if (!userRefreshToken) return false;

		// 	const newToken = await refreshGithubToken(userRefreshToken);
		// 	if (newToken.error) return false;

		//     await updateUserDetails(token, newToken, sessionDetails);

		//     return { isExpired, newToken };
		// }

		return isValid;
	} catch (error) {
		console.log('🚀 ~ file: token.tsx:132 ~ isTokenValid ~ error:', error);
		return error;
	}
};
