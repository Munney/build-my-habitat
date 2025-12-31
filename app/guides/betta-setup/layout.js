export const metadata = {
  title: 'Betta Fish Setup Guide | Tank, Heater & Filter Requirements',
  description: 'Don\'t put your Betta in a bowl. Read our complete guide on tank size (5+ gallons), nitrogen cycling, gentle filtration, and heating for tropical fish.',
  keywords: ['betta fish setup', 'betta tank size', 'cycling a betta tank', 'best filter for betta', 'aquarium heater guide'],
  openGraph: {
    title: 'The Ultimate Betta Fish Care Guide',
    description: 'Bettas are tropical animals, not decorations. Learn how to build a proper 5-gallon+ habitat.',
    images: ['/betta.jpg'],
  },
};

export default function BettaGuideLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}