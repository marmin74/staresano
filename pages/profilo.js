import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Profilo() {
  const [profilo, setProfilo] = useState({
    full_name: '',
    birthdate: '',
    gender: '',
    weight: '',
    height: '',
    goal: '',
  })
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      
    }
    fetchUserAndData()
  }, [])

  const salvaProfilo = async () => {
    if (!user) return
    setLoading(true)
    const { error } = await supabase
      .from('users')
      .upsert({ id: user.id, ...profilo })
    setLoading(false)
    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Profilo salvato con successo ✅' })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const aggiornaCampo = (e) => {
    const { name, value } = e.target
    setProfilo(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-primary">Il tuo profilo</h1>

      {message && (
        <div className={`mb-4 p-2 rounded text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); salvaProfilo() }} className="space-y-3">
        <input name="full_name" placeholder="Nome completo" value={profilo.full_name} onChange={aggiornaCampo} className="w-full border px-3 py-2 rounded" />
        <input name="birthdate" type="date" value={profilo.birthdate} onChange={aggiornaCampo} className="w-full border px-3 py-2 rounded" />
        <select name="gender" value={profilo.gender} onChange={aggiornaCampo} className="w-full border px-3 py-2 rounded">
          <option value="">Genere</option>
          <option value="M">Maschio</option>
          <option value="F">Femmina</option>
          <option value="Altro">Altro</option>
        </select>
        <input name="weight" type="number" placeholder="Peso (kg)" value={profilo.weight} onChange={aggiornaCampo} className="w-full border px-3 py-2 rounded" />
        <input name="height" type="number" placeholder="Altezza (cm)" value={profilo.height} onChange={aggiornaCampo} className="w-full border px-3 py-2 rounded" />
        <input name="goal" placeholder="Obiettivo (es. dimagrire)" value={profilo.goal} onChange={aggiornaCampo} className="w-full border px-3 py-2 rounded" />
        <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded hover:bg-blue-400">
          {loading ? 'Salvataggio...' : 'Salva Profilo'}
        </button>
      </form>
    </div>
  )
}

