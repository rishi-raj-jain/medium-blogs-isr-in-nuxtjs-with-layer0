const { BUILD_ID } = require('./BUILD_ID')
const { nuxtRoutes } = require('@layer0/nuxt')
const { Router } = require('@layer0/core/router')
const IF_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = new Router()
  .get(
    {
      headers: {
        host: /layer0.link|layer0-perma.link/,
      },
    },
    ({ setResponseHeader }) => {
      setResponseHeader('x-robots-tag', 'noindex')
    }
  )
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
  })
  .match('/manifest.js', ({ cache, serveStatic }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
    })
    serveStatic(`dist/_nuxt/static/${BUILD_ID}/manifest.js`)
  })
  .match('/:path*/manifest.js', ({ cache, serveStatic }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
    })
    serveStatic(`dist/_nuxt/static/${BUILD_ID}/manifest.js`)
  })
  .get('/', ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
    })
  })
  .get('/blogs/:username', ({ serveStatic, cache, renderWithApp }) => {
    cache({
      edge: {
        maxAgeSeconds: 2,
        staleWhileRevalidateSeconds: 60, // serve stale responses for a minute until new content is fetched, in background a new request is looking for new content
      },
      browser: false,
    })
    // if (IF_PRODUCTION)
    //   serveStatic('dist/blogs/:username.html', {
    //     // When the user requests a page that is not already statically rendered, fall back to SSR.
    //     onNotFound: () => renderWithApp(),
    //   })
    // else renderWithApp()
    renderWithApp()
  })
  .get('/api/blogs/:username.json', ({ renderWithApp }) => {
    renderWithApp()
  })
  .use(nuxtRoutes)
  .fallback(({ redirect }) => {
    return redirect('/error')
  })
