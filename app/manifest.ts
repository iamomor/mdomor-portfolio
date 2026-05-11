import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Muhammad Omor Faruk (iamomor) Portfolio',
    short_name: 'iamomor',
    description: 'Official portfolio of Muhammad Omor Faruk (iamomor).',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/favicon.svg?v=2',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
