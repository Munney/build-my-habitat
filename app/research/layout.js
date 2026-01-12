export const metadata = {
  title: 'Pet Habitat Research & Scientific Studies | HabitatBuilder',
  description: 'Evidence-based research on leopard gecko and betta fish care. Peer-reviewed studies on tank size, heating, enrichment, and welfare. Learn the science behind safe pet habitats.',
  keywords: 'leopard gecko research, betta fish research, reptile husbandry studies, aquarium research, pet care science, veterinary standards, herpetology research, fish welfare studies',
  openGraph: {
    title: 'HabitatBuilder Research Library - Science-Based Pet Care',
    description: 'We don\'t guess. We build based on science. Read peer-reviewed research on leopard gecko and betta fish care.',
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