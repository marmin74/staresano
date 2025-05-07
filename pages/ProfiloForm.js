import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ProfiloForm() {
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
      if (!user) return
      setUser(user)
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      if (data) setProfilo(data)
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
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4 text-primary">Il tuo profilo</h2>

      {message && (
        <div className={`mb-4 p-2 rounded text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); salvaProfilo() }} className="space-y-3">
        <input name="full_name" placeholder="Nome completo" value={profilo.full_name} onChange={aggiornaCampo} />
        <input name="birthdate" type="date" value={profilo.birthdate} onChange={aggiornaCampo} />
        <select name="gender" value={profilo.gender} onChange={aggiornaCampo}>
          <option value="">Genere</option>
          <option value="M">Maschio</option>
          <option value="F">Femmina</option>
          <option value="Altro">Altro</option>
        </select>
        <input name="weight" type="number" placeholder="Peso (kg)" value={profilo.weight} onChange={aggiornaCampo} />
        <input name="height" type="number" placeholder="Altezza (cm)" value={profilo.height} onChange={aggiornaCampo} />
        <input name="goal" placeholder="Obiettivo (es. dimagrire)" value={profilo.goal} onChange={aggiornaCampo} />
        <button type="submit" disabled={loading}>
          {loading ? 'Salvataggio...' : 'Salva Profilo'}
        </button>
      </form>
    </div>
  )
}


