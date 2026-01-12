export const metadata = {
  title: 'Betta Fish Tank Setup Builder | Complete Guide & Shopping List',
  description: 'Design a healthy betta fish tank setup. No bowls! Build a 5+ gallon planted aquarium with safe heaters, low-flow filters, and proper betta care. Get your complete shopping list with prices.',
  keywords: 'betta fish tank setup, betta fish setup, betta fish tank size, betta fish care, betta fish habitat, betta fish heater, betta fish filter, betta fish tank requirements, betta fish beginner guide, betta fish planted tank',
  openGraph: {
    title: 'Betta Fish Tank Setup Builder | Complete Guide',
    description: 'Stop using bowls! Build a vet-approved Betta habitat with our compatibility checker. 5+ gallon tanks, safe heaters, and low-flow filters.',
    images: ['/betta.jpg'],
  },
};

export default function BettaLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}