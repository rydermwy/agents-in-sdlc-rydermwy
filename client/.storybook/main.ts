import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)"
  ],
  "addons": [
    {
      name: "@storybook/addon-svelte-csf",
      options: {
        legacyTemplate: true
      }
    },
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/svelte-vite",
    "options": {}
  }
};
export default config;