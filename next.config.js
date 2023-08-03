/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true
    },
    images: {
        domains: ["assets.coingecko.com"],
    },
}

module.exports = nextConfig
