export const metadata = {
  title: 'Pet Care Sheets | Leopard Gecko, Betta Fish, Bearded Dragon, Ball Python & Crested Gecko',
  description: 'Complete care sheets for Leopard Geckos, Betta Fish, Bearded Dragons, Ball Pythons, and Crested Geckos. Temperature, humidity, tank size, diet, and essential care guides.',
  keywords: 'leopard gecko care sheet, betta fish care sheet, bearded dragon care sheet, ball python care sheet, crested gecko care sheet, pet care guide, reptile care sheet, aquarium care guide, bearded dragon temperature, pet care requirements',
  openGraph: {
    title: 'Pet Care Sheets - Complete Care Guides',
    description: 'Downloadable care sheets with all essential information for Leopard Gecko, Betta Fish, Bearded Dragon, Ball Python, and Crested Gecko care.',
    images: ['/og-image.jpg'],
  },
};

export default function CareSheetsLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
