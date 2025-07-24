/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    // Allow access from network IP
    experimental: {
        allowedRevalidateHeaderKeys: [],
    },
};

export default nextConfig;
