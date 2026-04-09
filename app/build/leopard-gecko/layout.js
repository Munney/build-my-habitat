const baseUrl = "https://www.buildmyhabitat.com";

export const metadata = {
  title: 'Leopard Gecko Setup Builder (Free) | Build a 40-Gallon Habitat',
  description: 'Build a complete leopard gecko setup in minutes. Choose a 40-gallon breeder, safe heating (Halogen/DHP + thermostat), UVB options, and substrate. Get a verified shopping list.',
  keywords: 'leopard gecko setup, leopard gecko tank setup, leopard gecko habitat, leopard gecko enclosure, leopard gecko tank size, leopard gecko heating, leopard gecko substrate, leopard gecko uvb, 40 gallon leopard gecko, leopard gecko beginner setup',
  alternates: {
    canonical: `${baseUrl}/build/leopard-gecko`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Leopard Gecko Setup Builder (Free) | Build a 40-Gallon Habitat',
    description: 'Build a complete leopard gecko setup in minutes. Choose a 40-gallon breeder, safe heating (Halogen/DHP + thermostat), UVB options, and substrate. Get a verified shopping list.',
    images: ['/gecko.jpg'],
    url: `${baseUrl}/build/leopard-gecko`,
  },
};

import SeoSchemaLeopardGeckoBuilder from "../../components/SeoSchemaLeopardGeckoBuilder";

export default function GeckoLayout({ children }) {
  return (
    <>
      <SeoSchemaLeopardGeckoBuilder />
      {children}
    </>
  );
}