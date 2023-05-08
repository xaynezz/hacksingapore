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
        DB_URI: "mongodb://localhost:27017/next13-auth",
    },
};

module.exports = nextConfig;
