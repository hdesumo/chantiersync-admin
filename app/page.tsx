import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>chantiersync-partners</h1>
      <p>Skeleton Next.js</p>
      <div style={{ marginTop: 12 }}>
        <Link href="/login">Se connecter →</Link>
      </div>
    </main>
  );
}
