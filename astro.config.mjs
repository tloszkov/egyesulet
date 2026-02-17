import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    i18n: {
        defaultLocale: 'ro',
        locales: ['ro', 'hu', 'en'],
        routing: {
            prefixDefaultLocale: false
        }
    }
});
