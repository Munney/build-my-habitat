export const metadata = {
  title: 'Betta Fish Setup Builder',
  description: 'Design a healthy, planted aquarium for your Betta fish. Select safe heaters, low-flow filters, and proper tank sizes (no bowls!).',
  openGraph: {
    title: 'Betta Fish Aquarium Configurator',
    description: 'Stop using bowls! Build a vet-approved Betta habitat with our compatibility checker.',
    images: ['/betta.jpg'],
  },
};

export default function BettaLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}