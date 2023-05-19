/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
    env: {
        DB_URI: "mongodb://127.0.0.1:27017",
    },
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'perenual.com',
          },
        ],
        domains: ['edamam-product-images.s3.amazonaws.com'],

      },
};

module.exports = nextConfig;
