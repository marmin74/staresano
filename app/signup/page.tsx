'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else router.push('/dashboard');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-xl font-bold mb-4 text-[#355e3b]">Crea un nuovo account</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 mb-2 border rounded" />
      <input type="password" placeholder="Password (min. 8 caratteri)" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 mb-4 border rounded" />
      <button onClick={handleSignup} className="bg-[#a8d5ba] text-white px-4 py-2 rounded">Registrati</button>
    </main>
  );
}
