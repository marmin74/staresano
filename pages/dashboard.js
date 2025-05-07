import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile?.role === 'admin') {
        setIsAdmin(true)
        const { data: allUsers } = await supabase
          .from('users')
          .select('id, full_name, email')
          .order('full_name', { ascending: true })
        setUsersList(allUsers)
      }

      setLoading(false)
    }

    fetchUser()
  }, [])

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-primary mb-4">Dashboard</h1>

      {loading && <p>Caricamento in corso...</p>}

      {!loading && !isAdmin && (
        <p className="text-gray-700">Ciao {user?.email}, benvenuto nella tua area personale! ✅</p>
      )}

      {!loading && isAdmin && (
        <>
          <p className="text-gray-700 mb-4">👑 Benvenuto admin <strong>{user.email}</strong></p>
          <h3 className="text-xl font-semibold mb-2">Utenti registrati:</h3>
          <ul className="space-y-2">
            {usersList.map(u => (
              <li key={u.id} className="border p-2 rounded">
                <strong>{u.full_name || '(senza nome)'}</strong><br />
                <span className="text-sm text-gray-600">{u.email || u.id}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
