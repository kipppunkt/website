// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          title: 'kipp•punkt',
          plugins: [
              starlightThemeBlack({
                  footerText: '',
              }),
          ],
          components: {
              PageTitle: './src/components/PageTitle.astro',
              SiteTitle: './src/components/SiteTitle.astro',
          },
          customCss: [
              './src/styles/fonts.css',
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
                  label: 'Get started in 5 min',
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
