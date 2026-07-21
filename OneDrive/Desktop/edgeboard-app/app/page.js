import Link from 'next/link';

export default function Home() {
  return (
    <main className="wrap" style={{ paddingTop: 100, maxWidth: 480 }}>
      <h1 style={{ fontSize: 30, marginBottom: 12, letterSpacing: '-0.02em' }}>EdgeBoard</h1>
      <p className="dim" style={{ marginBottom: 28 }}>
        Expectancy-gated stock scanning. Sign in to view your scanner.
      </p>
      <Link href="/login" className="btn">Sign in</Link>
    </main>
  );
}
