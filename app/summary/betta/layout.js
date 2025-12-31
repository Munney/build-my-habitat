export const metadata = {
  title: 'Your Betta Fish Build Receipt',
  description: 'A verified shopping list for your custom Betta aquarium setup. Includes safety checks for heater wattage, filter flow, and tank size.',
  openGraph: {
    title: 'My Custom Betta Habitat Build',
    description: 'I just designed a vet-approved aquarium setup on HabitatBuilder. Check out my parts list!',
    images: ['/betta.jpg'], // Uses the blue betta image for the preview card
  },
};

export default function BettaSummaryLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}