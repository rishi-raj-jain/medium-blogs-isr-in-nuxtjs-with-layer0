const path = require('path')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    crawler: false
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Static Medium [ISR in Nuxt.js with Layer0]',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        hid: 'og:image',
        name: 'og:image',
        property: 'og:image',
        content: 'http://localhost:3000/cover.png'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        property: 'twitter:image',
        content: 'http://localhost:3000/cover.png'
      },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'title',
        name: 'title',
        property: 'title',
        content: 'Static Medium [ISR in Nuxt.js with Layer0]'
      },
      {
        hid: 'og:title',
        name: 'og:title',
        property: 'og:title',
        content: 'Static Medium [ISR in Nuxt.js with Layer0]'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        property: 'twitter:title',
        content: 'Static Medium [ISR in Nuxt.js with Layer0]'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'A demo showing off ISR in Nuxt.js with Layer0'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content: 'A demo showing off ISR in Nuxt.js with Layer0'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        property: 'twitter:description',
        content: 'A demo showing off ISR in Nuxt.js with Layer0'
      },
      { hid: 'url', name: 'url', content: 'http://localhost:3000/' },
      {
        hid: 'og:url',
        name: 'og:url',
        property: 'og:url',
        content: 'http://localhost:3000/'
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        property: 'twitter:url',
        content: 'http://localhost:3000/'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'http://localhost:3000/favicon.ico'
      }
    ]
  },

  tailwindcss: {
    jit: true,
    config: {
      purge: {
        enabled: true,
        content: [
          path.join(__dirname, './pages/**/*.vue'),
          path.join(__dirname, './layouts/**/*.vue'),
          path.join(__dirname, './components/**/*.vue')
        ],
        options: {
          whitelist: ['html', 'body', 'nuxt-progress']
        }
      }
    }
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
    ['@layer0/nuxt/module', { layer0SourceMaps: true }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  serverMiddleware: {
    '/api': '~/api'
  }
}
