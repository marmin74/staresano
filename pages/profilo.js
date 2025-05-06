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

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  // Recupera l'utente attualmente loggato
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) caricaProfilo(user.id)
    }
    getUser()
  }, [])

  // Carica il profilo se esiste
  const caricaProfilo = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (data) setProfilo(data)
  }

  // Salva o aggiorna il profilo
  const salvaProfilo = async () => {
    setLoading(true)
    const { error } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        ...profilo,
      })
    setLoading(false)
    if (!error) alert('Profilo salvato!')
  }

  const aggiornaCampo = (e) => {
    const { name, value } = e.target
    setProfilo({ ...profilo, [name]: value })
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Profilo Utente</h1>
      <form onSubmit={(e) => { e.preventDefault(); salvaProfilo() }}>
        <input name="full_name" value={profilo.full_name} onChange={aggiornaCampo} placeholder="Nome completo" /><br />
        <input name="birthdate" type="date" value={profilo.birthdate} onChange={aggiornaCampo} /><br />
        <select name="gender" value={profilo.gender} onChange={aggiornaCampo}>
          <option value="">Genere</option>
          <option value="M">Maschio</option>
          <option value="F">Femmina</option>
          <option value="Altro">Altro</option>
        </select><br />
        <input name="weight" type="number" value={profilo.weight} onChange={aggiornaCampo} placeholder="Peso (kg)" /><br />
        <input name="height" type="number" value={profilo.height} onChange={aggiornaCampo} placeholder="Altezza (cm)" /><br />
        <input name="goal" value={profilo.goal} onChange={aggiornaCampo} placeholder="Obiettivo (es. dimagrire)" /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Salvataggio...' : 'Salva Profilo'}
        </button>
      </form>
    </div>
  )
}
