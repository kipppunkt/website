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
          head: [
              { tag: 'meta', attrs: { property: 'og:image', content: 'https://kipppunkt.com/social-card.png' } },
              { tag: 'meta', attrs: { property: 'og:image:type', content: 'image/png' } },
              { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
              { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
              { tag: 'meta', attrs: { property: 'og:image:alt', content: 'kipp•punkt - AI coding agent orchestration' } },
              { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
              { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://kipppunkt.com/social-card.png' } },
              { tag: 'meta', attrs: { name: 'twitter:image:alt', content: 'kipp•punkt - AI coding agent orchestration' } },
          ],
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
