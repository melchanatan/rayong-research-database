/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    env: {
        BASE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    }
};

export default nextConfig;
