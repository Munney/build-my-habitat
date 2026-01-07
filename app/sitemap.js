export default function sitemap() {
  const baseUrl = 'https://www.buildmyhabitat.com';
  
  const routes = [
    '',
    '/build/betta',
    '/build/leopard-gecko',
    '/browse',
    '/research',
    '/care-sheets',
    '/common-mistakes',
    '/faq',
    '/about',
    '/guides/betta-setup',
    '/guides/leopard-gecko-setup',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/build') ? 0.9 : 0.7,
  }));
}

