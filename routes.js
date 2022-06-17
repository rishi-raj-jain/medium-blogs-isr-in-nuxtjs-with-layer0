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
  .match('/manifest.js', ({ serveStatic }) => {
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
        maxAgeSeconds: 60 * 60 * 24 * 365, // keep the incrementally generated page for a year
        staleWhileRevalidateSeconds: 1, // revalidate the data on page every second
      },
      browser: false,
    })
    if (IF_PRODUCTION)
      serveStatic('dist/blogs/:username.html', {
        // When the user requests a page that is not already statically rendered, fall back to SSR.
        onNotFound: () => renderWithApp(),
      })
    else renderWithApp()
  })
  .get('/api/blogs/:username.json', ({ serveStatic, cache, renderWithApp }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24, // cache at the edge for 24 hours
      },
    })
    if (IF_PRODUCTION)
      serveStatic('dist/blogs/:username.json', {
        // When the user requests data that is not already statically rendered, fall back to SSR.
        onNotFound: () => renderWithApp(),
      })
    else renderWithApp()
  })
  .use(nuxtRoutes)
  .fallback(({ redirect }) => {
    return redirect('/error')
  })
