const baseUrl = 'https://buildmyhabitat.com';

export const metadata = {
  title: 'Bearded Dragon Setup Builder (Free) | Build a 120-Gallon Habitat',
  description: 'Build a complete bearded dragon setup. Choose 4×2×2 enclosure, T5 UVB, basking heat + thermostat, safe substrate, hides, and decor. Get a verified shopping list.',
  keywords: 'bearded dragon setup, bearded dragon tank, bearded dragon enclosure, 4x2x2 bearded dragon, bearded dragon UVB, bearded dragon heating, bearded dragon habitat',
  alternates: {
    canonical: `${baseUrl}/build/bearded-dragon`,
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Bearded Dragon Setup Builder (Free) | Build a 120-Gallon Habitat',
    description: 'Build a complete bearded dragon setup. Choose 4×2×2 enclosure, T5 UVB, basking heat + thermostat, safe substrate, hides, and decor.',
    url: `${baseUrl}/build/bearded-dragon`,
  },
};

export default function BeardedDragonLayout({ children }) {
  return <>{children}</>;
}
