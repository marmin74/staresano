import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Meals() {
  const [meals, setMeals] = useState([])
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ title: '', calories: '', proteins: '', carbs: '', fats: '', notes: '' })
  const [message, setMessage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserAndMeals = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      fetchMeals(user.id)
    }
    fetchUserAndMeals()
  }, [])

  const fetchMeals = async (userId) => {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) setMeals(data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const addMeal = async () => {
    if (!user) return
    const { error } = await supabase
      .from('meals')
      .insert([{ ...form, user_id: user.id }])
    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Pasto salvato ✅' })
      setForm({ title: '', calories: '', proteins: '', carbs: '', fats: '', notes: '' })
      fetchMeals(user.id)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-primary mb-4">I miei pasti</h1>

      {message && (
        <div className={`mb-4 p-2 rounded text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); addMeal() }} className="space-y-2">
        <input name="title" placeholder="Nome pasto" value={form.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input name="calories" type="number" placeholder="Calorie" value={form.calories} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input name="proteins" type="number" placeholder="Proteine" value={form.proteins} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input name="carbs" type="number" placeholder="Carboidrati" value={form.carbs} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input name="fats" type="number" placeholder="Grassi" value={form.fats} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <textarea name="notes" placeholder="Note" value={form.notes} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-blue-400">Salva pasto</button>
      </form>

      <h3 className="text-xl font-semibold mt-6 mb-2">Pasti salvati</h3>
      <ul className="space-y-2">
        {meals.map(meal => (
          <li key={meal.id} className="border rounded p-3">
            <strong>{meal.title}</strong> – {meal.calories} kcal<br />
            Proteine: {meal.proteins}g – Carboidrati: {meal.carbs}g – Grassi: {meal.fats}g
            {meal.notes && <p className="text-sm italic text-gray-600 mt-1">{meal.notes}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
