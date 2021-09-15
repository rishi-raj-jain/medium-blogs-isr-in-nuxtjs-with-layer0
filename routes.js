const { Router } = require('@layer0/core/router')
const { nuxtRoutes } = require('@layer0/nuxt')

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
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
    serveStatic('dist/blogs/:username.html', {
      // When the user requests a page that is not already statically rendered, fall back to SSR.
      onNotFound: () => renderWithApp(),
    })
  })
  .get('/api/blogs/:username.json', ({ serveStatic, cache, renderWithApp }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24, // cache at the edge for 24 hours
      },
    })
    serveStatic('dist/blogs/:username.json', {
      // When the user requests data that is not already statically rendered, fall back to SSR.
      onNotFound: () => renderWithApp(),
    })
  })
  .use(nuxtRoutes)
  .fallback(({ redirect }) => {
    return redirect('/error')
  })
