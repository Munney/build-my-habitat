const baseUrl = 'https://www.buildmyhabitat.com';

export const metadata = {
  title: 'Your Bearded Dragon Build Receipt',
  description: 'A verified shopping list for your custom Bearded Dragon habitat. Includes 4×2×2 enclosure, UVB, basking heat + thermostat, and safe substrate.',
  alternates: { canonical: `${baseUrl}/summary/bearded-dragon` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'My Custom Bearded Dragon Habitat Build',
    description: 'I just designed a research-backed bearded dragon setup on BuildMyHabitat. Check out my parts list!',
    url: `${baseUrl}/summary/bearded-dragon`,
  },
};

export default function BeardedDragonSummaryLayout({ children }) {
  return <>{children}</>;
}
