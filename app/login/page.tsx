'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else router.push('/dashboard');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-xl font-bold mb-4 text-[#355e3b]">Accedi al tuo account</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 mb-2 border rounded" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 mb-4 border rounded" />
      <button onClick={handleLogin} className="bg-[#a8d5ba] text-white px-4 py-2 rounded">Accedi</button>
    </main>
  );
}
