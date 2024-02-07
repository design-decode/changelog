// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { PrismaClient } from '@prisma/client';
// import crypto from 'crypto';
// import { add, formatISO } from 'date-fns';
// import jwt from 'jsonwebtoken';

// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(
// 	'https://moovjpjsujaxvzqjhkar.supabase.co',
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb3ZqcGpzdWpheHZ6cWpoa2FyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjE2MDY4MiwiZXhwIjoyMDA3NzM2NjgyfQ.3KpMEKytET57n6OPQKGZb8YNW7YjNqWCHah4USa2bN8'
// );

// type GITHUB_AUTH = {
// 	access_token: string;
// 	expires_in: number;
// 	refresh_token: string;
// 	refresh_token_expires_in: number;
// 	scope: any;
// };

// const prisma = new PrismaClient();

// const generateToken = (userDetails: { userId: string; accountId: string }): string => {
// 	const secret = process.env.JWT_SECRET as string;
// 	return jwt.sign(userDetails, secret, { expiresIn: '28800s' });
// };

// const getGithubUser = async (access_token: string) => {
// 	try {
// 		const response = await axios.get('https://api.github.com/user', {
// 			headers: {
// 				Authorization: `Bearer ${access_token}`,
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json'
// 			}
// 		});

// 		return response.data;
// 	} catch (error) {
// 		return error;
// 	}
// };

// const getGithubToken = async (code: string) => {
// 	try {
// 		const response = await axios.post(
// 			'https://github.com/login/oauth/access_token',
// 			JSON.stringify({
// 				client_id: process.env.GITHUB_CLIENT_ID,
// 				client_secret: process.env.GITHUB_CLIENT_SECRET,
// 				code
// 			}),
// 			{
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Accept: 'application/json'
// 				}
// 			}
// 		);

// 		return response.data;
// 	} catch (error) {
// 		return error;
// 	}
// };

// const createUser = async (user: any, auth: GITHUB_AUTH) => {
// 	try {
// 		const newUserId = crypto.randomBytes(8).toString('hex');
// 		const newAccountId = crypto.randomBytes(8).toString('hex');

// 		await prisma.user.create({
// 			data: {
// 				email: user.email,
// 				name: user.name,
// 				image: user.avatar_url,
// 				user_id: newUserId,
// 				accounts: {
// 					create: {
// 						provider_user_id: `${user.id}`,
// 						provider: 'github',
// 						...auth,
// 						account_id: newAccountId,
// 						user_name: user.login
// 					}
// 				},
// 				sessions: {
// 					create: {
// 						session_token: generateToken({ userId: newUserId, accountId: newAccountId }),
// 						expires_at: formatISO(add(new Date(), { seconds: auth.expires_in }))
// 					}
// 				}
// 			}
// 		});

// 		return;
// 	} catch (error) {
// 		console.log('🚀 ~ file: route.tsx:93 ~ createUser ~ error:', error);
// 		return error;
// 	}
// };

// const updateUserDetails = async (dbUser: { user_id: string; accounts: { account_id: string }[]; sessions: { session_token: string } | null }, githubUser: any, githubAuth: GITHUB_AUTH) => {
// 	const newToken = generateToken({ userId: dbUser.user_id, accountId: dbUser.accounts[0].account_id });

// 	try {
// 		const res = await prisma.user.update({
// 			where: {
// 				email: githubUser.email
// 			},
// 			data: {
// 				accounts: {
// 					update: {
// 						where: {
// 							account_id: dbUser.accounts[0].account_id
// 						},
// 						data: {
// 							...githubAuth
// 						}
// 					}
// 				},
// 				sessions: {
// 					update: {
// 						where: {
// 							session_token: dbUser.sessions?.session_token
// 						},
// 						data: {
// 							expires_at: formatISO(add(new Date(), { seconds: githubAuth.expires_in })),
// 							session_token: newToken
// 						}
// 					}
// 				}
// 			}
// 		});

// 		return;
// 	} catch (error) {
// 		console.log('🚀 ~ file: route.tsx:131 ~ updateUserDetails ~ error:', error);
// 		return error;
// 	}
// };

// // const initUserUser = async (user: any, auth: GITHUB_AUTH) => {
// // 	try {
// // 		const dbUser = await prisma.user.findUnique({
// // 			where: {
// // 				email: user.email
// // 			},
// // 			include: {
// // 				accounts: true,
// // 				sessions: true
// // 			}
// // 		});

// // 		if (!dbUser?.user_id) await createUser(user, auth);
// // 		else await updateUserDetails(dbUser, user, auth);

// // 		const userDetails = await prisma.user.findUnique({
// // 			where: {
// // 				email: user.email
// // 			},
// // 			select: {
// // 				user_id: true,
// // 				name: true,
// // 				email: true,
// // 				image: true,
// // 				sessions: {
// // 					select: {
// // 						session_token: true,
// // 						expires_at: true
// // 					}
// // 				}
// // 			}
// // 		});

// // 		return userDetails;
// // 	} catch (error: any) {
// // 		console.log('🚀 ~ file: route.tsx:84 ~ initUserUser ~ error:', error);
// // 		throw new Error(error);
// // 	}
// // };

// export async function POST(req: Request) {
// 	try {
// 		const { code } = await req.json();
// 		if (!code) return NextResponse.json({ message: 'Error: no code found', status: 400 }, { status: 400 });

// 		const userAuth = await getGithubToken(code);
// 		if (!userAuth?.access_token) return NextResponse.json({ message: userAuth?.error_description, status: 400 }, { status: 400 });

// 		const githubUser = await getGithubUser(userAuth.access_token);
// 		if (!githubUser.email) return NextResponse.json({ message: 'Error: no email found', status: 400 }, { status: 400 });

// 		// const user = await initUserUser(githubUser, userAuth);
// 		const { data, error } = await supabase.auth.admin.generateLink({
// 			type: 'magiclink',
// 			email: githubUser.email,
// 			options: {
// 				data: {
// 					name: githubUser.name
// 				}
// 			}
// 		});

// 		return NextResponse.json({ data, status: 'success' }, { status: 200 });
// 	} catch (error) {
// 		return NextResponse.json({ error }, { status: 500 });
// 	}
// }
