export const metadata = {
  title: 'Your Leopard Gecko Build Receipt',
  description: 'A verified shopping list for your custom Leopard Gecko habitat. Includes safety checks for heating (Halogen/DHP), safe substrate, and enclosure size.',
  openGraph: {
    title: 'My Custom Leopard Gecko Habitat Build',
    description: 'I just designed a vet-approved reptile setup on HabitatBuilder. Check out my parts list!',
    images: ['/gecko.jpg'], // Uses the green gecko image for the preview card
  },
};

export default function GeckoSummaryLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}