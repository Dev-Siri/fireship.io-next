/* eslint-disable */
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js");

function main() {
  if (!workbox) return console.log(`No workbox on this browser 😬`);

  workbox.setConfig({ debug: false });

  const defaultStrategy = workbox.strategies.networkFirst({
    cacheName: "fallback",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 128,
        maxAgeSeconds: 7 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  });
  workbox.routing.setDefaultHandler(args => {
    if (args.event.request.method !== "GET") return null;

    return defaultStrategy.handle(args);
  });

  workbox.routing.registerRoute(/.*\.(?:js|css)/g, workbox.strategies.networkFirst());

  workbox.routing.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif|webp)/g, workbox.strategies.cacheFirst());

  workbox.routing.registerRoute(
    ({ event }) => event.request.mode === "navigate",
    workbox.strategies.networkFirst({
      cacheName: "pages",
    })
  );
}
