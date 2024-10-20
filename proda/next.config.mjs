/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		SERVER_URL: process.env.SERVER_URL
	}
};

export default nextConfig;
