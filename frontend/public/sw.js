const CACHE_NAME = "sri-creations-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/offline.html",
  "/logo-images/AF.png",
  "/logo-images/Capcut.png",
  "/logo-images/LR.png",
  "/logo-images/PA.jpg",
  "/logo-images/PR.png",
  "/icon-192.png",
  "/icon-256.png",
  "/icon-384.png",
  "/icon-512.png"
];

// Install Event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching static baseline assets");
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event with dynamic runtime asset caching
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // We only intercept requests that are from our origin or standard CDNs
  if (url.origin !== self.location.origin && !request.url.includes("googleapis") && !request.url.includes("gstatic")) {
    return;
  }

  // Caching Strategy:
  // For document/page requests (e.g. navigate requests): Network First, falling back to cache. If fails, serve offline.html
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match("/offline.html");
          });
        })
    );
    return;
  }

  // For static assets, CSS, JS, fonts, and images: Cache First, falling back to network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || (response.type !== "basic" && !request.url.includes("google"))) {
          return response;
        }

        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      });
    })
  );
});

// Sync Event for background form submission
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-inquiries") {
    console.log("[Service Worker] Syncing queued contact forms");
    event.waitUntil(
      self.registration.showNotification("Sri Creations Sync", {
        body: "New project inquiry synced successfully.",
        icon: "/icon-192.png",
        badge: "/icon-192.png"
      })
    );
  }
});

// Push Notification listener
self.addEventListener("push", (event) => {
  let data = { title: "Sri Creations", body: "New portfolio update is available!" };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: "Sri Creations", body: event.data.text() };
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      vibrate: [100, 50, 100],
      data: {
        url: self.location.origin
      }
    })
  );
});

// Notification Click listener
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});
