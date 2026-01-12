export const metadata = {
  title: 'About HabitatBuilder | Safety Standards & Ethical Pet Care',
  description: 'Learn about HabitatBuilder\'s veterinary standards for pet habitat building. We block dangerous products and enforce research-backed requirements for leopard gecko and betta fish care.',
  keywords: 'habitat builder about, pet safety standards, ethical pet care, veterinary standards, safe pet habitats, research-backed pet care, leopard gecko safety, betta fish safety',
  openGraph: {
    title: 'The HabitatBuilder Standard - Safety & Ethics',
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