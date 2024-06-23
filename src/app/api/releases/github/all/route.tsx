import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import fs from 'fs';
import { createAppAuth } from '@octokit/auth-app';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import crypto from 'node:crypto';

const privateKey = fs.readFileSync('./tally-product-log.2024-01-31.private-key.pem', 'utf8');

const privateKeyPkcs8 = crypto.createPrivateKey(privateKey).export({
	type: 'pkcs8',
	format: 'pem'
});

export const POST = async (req: Request) => {
	const { repo } = await req.json();

	const supabase = createServerActionClient({ cookies });
	const userData = (await supabase.auth.getUser()).data.user?.user_metadata;

	if (!userData) return NextResponse.json({ error: { messaage: 'User not found' } }, { status: 500 });

	const octokit = new Octokit({
		authStrategy: createAppAuth,
		auth: {
			appId: process.env.NEXT_GITHUB_APP_ID,
			privateKey: privateKeyPkcs8,
			installationId: userData?.installation_id
		}
	});

	try {
		const { data } = await octokit.request('GET /repos/{owner}/{repo}/releases', { owner: userData.user_name, repo, per_page: 10 });
		return NextResponse.json({ data }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
};

// delete request for deleting a release on github
export const DELETE = async (req: Request) => {
	const { repo, release_id } = await req.json();

	if (!release_id || !repo) return NextResponse.json({ error: { messaage: 'Release or repo not found' } }, { status: 500 });

	const supabase = createServerActionClient({ cookies });
	const userData = (await supabase.auth.getUser()).data.user?.user_metadata;

	if (!userData) return NextResponse.json({ error: { messaage: 'User not found' } }, { status: 500 });

	const octokit = new Octokit({
		authStrategy: createAppAuth,
		auth: {
			appId: process.env.NEXT_GITHUB_APP_ID,
			privateKey: privateKeyPkcs8,
			installationId: userData?.installation_id
		}
	});

	try {
		const { data } = await octokit.request('DELETE /repos/{owner}/{repo}/releases/{release_id}', { owner: userData.user_name, repo, per_page: 10, release_id });
		return NextResponse.json({ data }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
};
