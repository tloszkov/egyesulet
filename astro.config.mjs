import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://ospc.ro',
    integrations: [sitemap()],
    i18n: {
        defaultLocale: 'ro',
        locales: ['ro', 'hu', 'en'],
        routing: {
            prefixDefaultLocale: false
        }
    }
});
