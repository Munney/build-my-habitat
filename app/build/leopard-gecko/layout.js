export const metadata = {
  title: 'Leopard Gecko Setup Builder | 40 Gallon Breeder Habitat Guide',
  description: 'Build a complete leopard gecko setup with our free builder. Configure 40-gallon breeder tanks, proper heating (Halogen/DHP), UVB lighting, and safe substrates. Get your verified shopping list.',
  keywords: 'leopard gecko setup, leopard gecko tank setup, leopard gecko habitat, leopard gecko enclosure, leopard gecko tank size, leopard gecko heating, leopard gecko substrate, leopard gecko uvb, 40 gallon leopard gecko, leopard gecko beginner setup',
  openGraph: {
    title: 'Leopard Gecko Habitat Setup Builder | Complete Guide',
    description: 'Build a vet-approved Leopard Gecko setup in minutes. 40-gallon breeder tanks, proper heating, UVB lighting, and safe substrates.',
    images: ['/gecko.jpg'],
  },
};

export default function GeckoLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}