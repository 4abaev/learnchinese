import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/*.json', '/*.xls', '/*.webp', '/*.mp4',
                '/*.txt', '/info/oferta/', '/info/privacy/', '/auth/login/',
                '/profile/', '/auth/register/', '/auth/forgot-password/',
                '/profile/subscription/', '/profile/dictionary/',
            ],
        },
    };
};