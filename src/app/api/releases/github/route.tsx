import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import fs from 'fs';
import { createAppAuth } from '@octokit/auth-app';

const privateKey = fs.readFileSync('./tally-product-log.2024-01-31.private-key.pem', 'utf8');

export const POST = async (req: Request) => {
	const { installation_id, owner, repo } = await req.json();

	const octokit = new Octokit({
		authStrategy: createAppAuth,
		auth: {
			appId: '676455',
			privateKey: privateKey,
			installationId: installation_id
		}
	});

	try {
		const { data } = await octokit.request('GET /repos/{owner}/{repo}/releases', { owner, repo });
		return NextResponse.json({ data }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
};

export const GET = async (req: Request) => {
	const { installation_id, owner, repo } = await req.json();

	const octokit = new Octokit({
		authStrategy: createAppAuth,
		auth: {
			appId: '676455',
			privateKey: privateKey,
			installationId: installation_id
		}
	});

	try {
		const { data } = await octokit.request('GET /repos/{owner}/{repo}/releases', { owner, repo });
		return NextResponse.json({ data }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
};
