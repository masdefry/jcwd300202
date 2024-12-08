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
        ]
    }
}

module.exports = nextConfig
