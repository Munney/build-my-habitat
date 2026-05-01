export const metadata = {
  title: 'About BuildMyHabitat | Safety Standards & Ethical Pet Care',
  description: 'Learn about BuildMyHabitat\'s research-backed husbandry standards. We block dangerous products and apply conservative habitat safety rules for leopard gecko and betta fish care.',
  keywords: 'habitat builder about, pet safety standards, ethical pet care, husbandry standards, safe pet habitats, research-backed pet care, leopard gecko safety, betta fish safety',
  openGraph: {
    title: 'The BuildMyHabitat Standard - Safety & Ethics',
    description: 'We don\'t just list parts. We use research-backed husbandry standards and conservative safety rules.',
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