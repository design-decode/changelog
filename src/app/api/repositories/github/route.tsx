import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import fs from 'fs';
import { createAppAuth } from '@octokit/auth-app';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const privateKey = fs.readFileSync('./tally-product-log.2024-01-31.private-key.pem', 'utf8');

export const GET = async () => {
	const supabase = createServerActionClient({ cookies });
	const userData = (await supabase.auth.getUser()).data.user?.user_metadata;

	const octokit = new Octokit({
		authStrategy: createAppAuth,
		auth: {
			appId: process.env.NEXT_GITHUB_APP_ID,
			privateKey: privateKey,
			installationId: userData?.installation_id
		}
	});

	try {
		const { data } = await octokit.rest.apps.listReposAccessibleToInstallation({ per_page: 200 });
		return NextResponse.json({ data }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
};
