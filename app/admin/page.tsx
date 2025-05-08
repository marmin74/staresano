'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getUserAndData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');
      setUser(user);

      const session = await supabase.auth.getSession();
      const role = session.data.session?.user?.user_metadata?.role;
      if (role !== 'admin') return router.push('/dashboard');

      const { data, error } = await supabase.from('profiles').select('*');
      if (!error) setUsers(data);
    };

    getUserAndData();
  }, []);

  if (!user) return null;

  return (
    <main className="min-h-screen p-6 bg-[#f0fdf4] text-[#355e3b]">
      <h1 className="text-2xl font-bold mb-6">Area Amministratore</h1>
      <table className="w-full table-auto border-collapse bg-white rounded shadow">
        <thead className="bg-[#a8d5ba] text-white">
          <tr>
            <th className="p-2 text-left">Email</th>
            <th className="p-2">Abbonamento</th>
            <th className="p-2">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.subscription ? 'Attivo' : 'Nessuno'}</td>
              <td className="p-2">
                <button className="text-[#a8d5ba]">Modifica</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
