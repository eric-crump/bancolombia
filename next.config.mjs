/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    devIndicators: {
        appIsrStatus: false,
    },
    env:{
        CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
        CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
        CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
        CONTENTSTACK_PREVIEW_TOKEN: process.env.CONTENTSTACK_PREVIEW_TOKEN,
        CONTENTSTACK_REGION: process.env.CONTENTSTACK_REGION,
        CONTENTSTACK_PERSONALIZATION: process.env.CONTENTSTACK_PERSONALIZATION,
        CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH,
        CONTENTSTACK_TERM: process.env.CONTENTSTACK_TERM
    }
};

export default nextConfig;
