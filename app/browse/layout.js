export const metadata = {
  title: 'Browse Verified Habitat Parts',
  description: 'Search our database of vet-approved supplies. Find safe enclosures, heaters, substrates, and decor for Leopard Geckos and Betta Fish.',
  openGraph: {
    title: 'HabitatBuilder Parts Database',
    description: 'Don\'t guess at the pet store. Browse hundreds of verified safe supplies for reptiles and fish.',
    images: ['/og-image.jpg'], 
  },
};

export default function BrowseLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}