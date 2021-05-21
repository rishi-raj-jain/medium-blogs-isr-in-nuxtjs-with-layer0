const { Router } = require("@layer0/core/router");
const { nuxtRoutes } = require("@layer0/nuxt");

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;

module.exports = new Router()
  .match("/service-worker.js", ({ serviceWorker }) => {
    serviceWorker(".nuxt/dist/client/service-worker.js");
  })
  .get("/", ({ cache, setResponseHeader }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24 * 365
      }
    });
    setResponseHeader(
      "Content-Security-Policy",
      ContentSecurityPolicy.replace(/\n/g, "")
    );
    setResponseHeader("Referrer-Policy", "origin-when-cross-origin");
    setResponseHeader("X-Frame-Options", "DENY");
    setResponseHeader("X-Content-Type-Options", "nosniff");
    setResponseHeader("X-DNS-Prefetch-Control", "on");
    setResponseHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()"
    );
  })
  .get("/:slug", ({ cache, setResponseHeader }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24 * 365, // keep the incrementally generated page for a year
        staleWhileRevalidateSeconds: 1 // revalidate the data on page every hour
      }
    });
    setResponseHeader(
      "Content-Security-Policy",
      ContentSecurityPolicy.replace(/\n/g, "")
    );
    setResponseHeader("Referrer-Policy", "origin-when-cross-origin");
    setResponseHeader("X-Frame-Options", "DENY");
    setResponseHeader("X-Content-Type-Options", "nosniff");
    setResponseHeader("X-DNS-Prefetch-Control", "on");
    setResponseHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()"
    );
  })
  .use(nuxtRoutes);
