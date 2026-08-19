export const metadata = {
  title: 'Pet Habitat Research & Scientific Studies | BuildMyHabitat',
  description: 'Evidence-based research on leopard gecko, betta fish, bearded dragon, ball python, and crested gecko care. Peer-reviewed studies on tank size, heating, enrichment, and welfare.',
  keywords: 'leopard gecko research, betta fish research, bearded dragon research, ball python research, crested gecko research, reptile husbandry studies, aquarium research, pet care science, husbandry standards, herpetology research, fish welfare studies',
  openGraph: {
    title: 'BuildMyHabitat Research Library - Science-Based Pet Care',
    description: 'We don\'t guess. We build based on science. Read peer-reviewed research on leopard gecko, betta fish, bearded dragon, ball python, and crested gecko care.',
    images: ['/og-image.jpg'],
  },
};

export default function ResearchLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
