const path = require('path')
const { BUILD_ID } = require('./BUILD_ID')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Turn pre-rendering off
  generate: {
    crawler: false,
    fallback: false,
    exclude: ['/', '/error'],
    // Attach ID to the static assets for serving fresh sources between deploys
    staticAssets: {
      version: BUILD_ID,
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Static Medium [ISG in Nuxt.js with Layer0]',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://nuxtjs.org/favicon.ico',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxt/postcss8', ['@layer0/nuxt/module', { layer0SourceMaps: true }]],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  serverMiddleware: {
    '/api': '~/api',
  },

  loading: '~/components/loading.vue',
}
