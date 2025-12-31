export const metadata = {
  title: 'Leopard Gecko Setup Builder',
  description: 'Configure a complete 40-gallon breeder habitat for your Leopard Gecko. Choose safe substrates, correct heating (Halogen/DHP), and proper UVB lighting.',
  openGraph: {
    title: 'Leopard Gecko Habitat Configurator',
    description: 'Build a vet-approved Leopard Gecko setup in minutes. Price out your tank, heating, and decor.',
    images: ['/gecko.jpg'],
  },
};

export default function GeckoLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}