import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import fs from 'fs';
import { createAppAuth } from '@octokit/auth-app';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import crypto from 'node:crypto';

const privateKey = fs.readFileSync('./tally-product-log.2024-05-17.private-key.pem', 'utf8');

export const GET = async () => {
	const supabase = createServerActionClient({ cookies });
	const userData = (await supabase.auth.getUser()).data.user?.user_metadata;

	const privateKeyPkcs8 = crypto.createPrivateKey(privateKey).export({
		type: 'pkcs8',
		format: 'pem'
	});

	const octokit = new Octokit({
		authStrategy: createAppAuth,
		auth: {
			appId: process.env.NEXT_GITHUB_APP_ID,
			privateKey: privateKeyPkcs8,
			installationId: userData?.installation_id
		}
	});

	try {
		const { data } = await octokit.rest.apps.listReposAccessibleToInstallation({ per_page: 200 });
		const res = await octokit.request('GET /repos/{owner}/{repo}/releases', { owner: 'horlah', repo: 'docus-test', per_page: 10 });

		return NextResponse.json({ data, res }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
};
