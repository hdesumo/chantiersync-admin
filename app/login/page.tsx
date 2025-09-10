'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const r = useRouter();

  const submit = (e: any) => {
    e.preventDefault();
    r.push('/dashboard');
  };

  return (
    <main style={{ padding: 24, maxWidth: 360 }}>
      <h2>Connexion</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginTop: 8, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginTop: 8, padding: 8 }}
        />
        <button type="submit" style={{ marginTop: 12 }}>
          Se connecter
        </button>
      </form>
    </main>
  );
}
