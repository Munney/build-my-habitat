export const metadata = {
  title: 'The HabitatBuilder Standard | Safety & Ethics',
  description: 'We refuse to recommend unsafe products. Learn about our veterinary standards for husbandry, heating safety, and animal enrichment.',
  openGraph: {
    title: 'The HabitatBuilder Standard',
    description: 'We don\'t just sell parts. We enforce veterinary standards to ensure your pet thrives, not just survives.',
    images: ['/og-image.jpg'],
  },
};

export default function AboutLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}