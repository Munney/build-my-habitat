import './globals.css';

export const metadata = {
  title: 'EdgeBoard — Signals scored by their actual edge',
  description: 'Expectancy-gated stock scanning across systematic setups.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
