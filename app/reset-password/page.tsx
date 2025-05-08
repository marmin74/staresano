'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://staresano.vercel.app/login',
    });
    if (error) setMessage(error.message);
    else setMessage('Controlla la tua email per reimpostare la password.');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-xl font-bold mb-4 text-[#355e3b]">Reimposta Password</h1>
      <input type="email" placeholder="La tua email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 mb-4 border rounded" />
      <button onClick={handleReset} className="bg-[#a8d5ba] text-white px-4 py-2 rounded">Invia Link</button>
      <p className="text-sm text-gray-700 mt-4">{message}</p>
    </main>
  );
}
