/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.antaranews.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'klcciconic.com.my',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'www.judethetourist.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'video.cgtn.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'wallpaperaccess.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'cache.marriott.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'cf.bstatic.com',
                pathname: '**'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '**'
            },
        ]
    },
    onDemandEntries: {
        maxInactiveAge: 15 * 60 * 1000, 
        pagesBufferLength: 4,
      }
}

module.exports = {
    ...nextConfig,
    experimental: {
        optimizePackageImports: ['react-icons'],
    },
    modularizeImports: {
        "@mui/material/?(((\\w*)?/?)*)": {
            transform: "@mui/material/{{ matches.[1] }}/{{member}}",
        },
        "@mui/icons-material/?(((\\w*)?/?)*)": {
            transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
        },
    },
};

const withBundleAnalyzer = require

