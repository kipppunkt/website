// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          title: 'kipppunkt',
          components: {
              PageTitle: './src/components/PageTitle.astro',
          },
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

  adapter: cloudflare(),
});
