/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['github.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.supabase.co',
				port: ''
			}
		]
	}
};

module.exports = nextConfig;
