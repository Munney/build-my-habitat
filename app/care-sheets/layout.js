export const metadata = {
  title: 'Pet Care Sheets | Leopard Gecko, Betta Fish & Bearded Dragon',
  description: 'Complete care sheets for Leopard Geckos, Betta Fish, and Bearded Dragons. Temperature, humidity, tank size, diet, and essential care. Download printable care guides.',
  keywords: 'leopard gecko care sheet, betta fish care sheet, bearded dragon care sheet, pet care guide, reptile care sheet, aquarium care guide, bearded dragon temperature, pet care requirements',
  openGraph: {
    title: 'Pet Care Sheets - Complete Care Guides',
    description: 'Downloadable care sheets with all essential information for Leopard Gecko, Betta Fish, and Bearded Dragon care.',
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

