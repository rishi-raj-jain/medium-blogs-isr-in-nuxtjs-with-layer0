const { Router } = require("@layer0/core/router");
const { nuxtRoutes } = require("@layer0/nuxt");

module.exports = new Router()
  .match("/service-worker.js", ({ serviceWorker }) => {
    serviceWorker(".nuxt/dist/client/service-worker.js");
  })
  .get("/:slug", ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24 * 365, // keep the incrementally generated page for a year
        staleWhileRevalidateSeconds: 1 // revalidate the data on page every hour
      }
    });
  })
  .use(nuxtRoutes);