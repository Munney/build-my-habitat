export const metadata = {
  title: 'Leopard Gecko Setup Guide | The Ultimate Care Sheet',
  description: 'Stop using dangerous starter kits. Learn the vet-approved way to set up a Leopard Gecko tank: 40-gallon breeder size, halogen heating, safe substrate, and more.',
  keywords: ['leopard gecko setup', 'leopard gecko tank size', 'best substrate for leopard gecko', 'gecko lighting guide', 'reptile husbandry'],
  openGraph: {
    title: 'The Ultimate Leopard Gecko Setup Guide',
    description: 'Forget the 10-gallon tank. Here is the modern, vet-approved standard for thriving geckos.',
    images: ['/gecko.jpg'],
  },
};

export default function GeckoGuideLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}