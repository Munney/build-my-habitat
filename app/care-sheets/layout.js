export const metadata = {
  title: 'Pet Care Sheets | Leopard Gecko & Betta Fish Care Guide',
  description: 'Complete care sheets for Leopard Geckos and Betta Fish. Temperature, humidity, tank size, diet, and all essential care requirements. Download printable care guides.',
  keywords: 'leopard gecko care sheet, betta fish care sheet, pet care guide, reptile care sheet, aquarium care guide, leopard gecko temperature, betta fish temperature, pet care requirements',
  openGraph: {
    title: 'Pet Care Sheets - Complete Care Guides',
    description: 'Downloadable care sheets with all essential information for Leopard Gecko and Betta Fish care.',
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

