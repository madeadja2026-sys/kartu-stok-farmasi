const CACHE='ngalupolo-kartu-stok-v1';
const FILES=['./','./index.html','./manifest.webmanifest','../icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(e.request.mode==='navigate'||u.pathname.endsWith('/index.html')){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{caches.open(CACHE).then(c=>c.put('./index.html',r.clone()));return r}).catch(()=>caches.match('./index.html')));return}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{caches.open(CACHE).then(c=>c.put(e.request,x.clone()));return x})))});
