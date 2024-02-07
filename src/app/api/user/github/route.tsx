import { NextResponse } from 'next/server';
import axios from 'axios';

export const POST = async (req: Request) => {
	try {
		const { code } = await req.json();
		if (!code) return NextResponse.json({ message: 'Error: no code found', status: 400 }, { status: 400 });

		const response = await axios.post(
			'https://github.com/login/oauth/access_token',
			JSON.stringify({
				client_id: process.env.GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				code
			}),
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			}
		);
		console.log(response.data);

		const { access_token } = response.data;

		return NextResponse.json({ access_token });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
};
