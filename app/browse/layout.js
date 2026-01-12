export const metadata = {
  title: 'Browse Safe Pet Habitat Supplies | Leopard Gecko & Betta Fish Products',
  description: 'Search our database of vet-approved pet supplies. Find safe tanks, heaters, filters, substrates, and decor for Leopard Geckos and Betta Fish. All products verified for safety and compatibility.',
  keywords: 'leopard gecko supplies, betta fish supplies, reptile products, aquarium products, safe pet supplies, leopard gecko tank, betta fish tank, reptile heating, aquarium heater, pet habitat products',
  openGraph: {
    title: 'HabitatBuilder Parts Database - Verified Safe Supplies',
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