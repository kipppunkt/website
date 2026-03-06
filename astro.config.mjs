// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://kipppunkt.com',
  integrations: [
      starlight({
          title: 'kipp•punkt',
          components: {
              PageTitle: './src/components/PageTitle.astro',
              SiteTitle: './src/components/SiteTitle.astro',
          },
          customCss: [
              './src/styles/fonts.css',
              './src/styles/theme.css',
          ],
          social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/kipppunkt' }],
          sidebar: [
              {
                  label: 'Home',
                  items: [
                      { slug: '' },
                  ],
              },
              {
                  label: 'Start in 5 minutes',
                  autogenerate: { directory: 'get-started' },
              },
              {
                  label: 'Guides',
                  autogenerate: { directory: 'guides' },
              },
              {
                  label: 'Reference',
                  autogenerate: { directory: 'reference' },
              },
              {
                  label: 'Concepts',
                  autogenerate: { directory: 'concepts' },
              },
          ],
      }),
	],

  adapter: cloudflare({
    imageService: 'compile',
  }),
});
