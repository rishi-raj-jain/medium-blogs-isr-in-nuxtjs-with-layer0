const path = require('path')
const { BUILD_ID } = require('./BUILD_ID')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    crawler: false,
    fallback: false,
    exclude: ['/', '/error'],
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

  tailwindcss: {
    jit: true,
    config: {
      purge: {
        enabled: true,
        content: [
          path.join(__dirname, './pages/**/*.vue'),
          path.join(__dirname, './layouts/**/*.vue'),
          path.join(__dirname, './components/**/*.vue'),
        ],
        options: {
          whitelist: ['html', 'body', 'nuxt-progress'],
        },
      },
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    ['@layer0/nuxt/module', { layer0SourceMaps: true }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  serverMiddleware: {
    '/api': '~/api',
  },

  loading: '~/components/loading.vue',
}
