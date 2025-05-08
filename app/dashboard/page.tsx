'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/login');
      else setUser(user);
    });
  }, []);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#f0fdf4] p-6 text-[#355e3b]">
      <h1 className="text-2xl font-bold mb-4">Ciao, {user.email}!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">📋 Scheda di Allenamento</div>
        <div className="bg-white rounded-lg shadow p-4">🥗 Dieta e Calorie</div>
        <div className="bg-white rounded-lg shadow p-4">📊 Dashboard</div>
        <div className="bg-white rounded-lg shadow p-4">🧮 Calcolo Deficit Calorico</div>
      </div>
    </main>
  );
}
