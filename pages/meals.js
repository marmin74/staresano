import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Meals() {
  const [meals, setMeals] = useState([])
  const [user, setUser] = useState(null)
  const [newMeal, setNewMeal] = useState({
    title: '',
    calories: '',
    proteins: '',
    carbs: '',
    fats: '',
    notes: ''
  })

  // Recupera l'utente e carica i pasti
  useEffect(() => {
    const fetchUserAndMeals = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        fetchMeals(user.id)
      }
    }
    fetchUserAndMeals()
  }, [])

  const fetchMeals = async (userId) => {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (!error) setMeals(data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewMeal(prev => ({ ...prev, [name]: value }))
  }

  const addMeal = async () => {
    if (!user) return
    const { error } = await supabase
      .from('meals')
      .insert([{ ...newMeal, user_id: user.id }])

    if (!error) {
      alert('Pasto salvato!')
      setNewMeal({ title: '', calories: '', proteins: '', carbs: '', fats: '', notes: '' })
      fetchMeals(user.id)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>I miei pasti 🍽️</h1>

      <h3>Aggiungi nuovo pasto</h3>
      <form onSubmit={(e) => { e.preventDefault(); addMeal() }}>
        <input name="title" placeholder="Nome pasto" value={newMeal.title} onChange={handleChange} /><br />
        <input name="calories" type="number" placeholder="Calorie" value={newMeal.calories} onChange={handleChange} /><br />
        <input name="proteins" type="number" placeholder="Proteine" value={newMeal.proteins} onChange={handleChange} /><br />
        <input name="carbs" type="number" placeholder="Carboidrati" value={newMeal.carbs} onChange={handleChange} /><br />
        <input name="fats" type="number" placeholder="Grassi" value={newMeal.fats} onChange={handleChange} /><br />
        <textarea name="notes" placeholder="Note" value={newMeal.notes} onChange={handleChange} /><br />
        <button type="submit">Salva pasto</button>
      </form>

      <hr />

      <h3>Pasti salvati</h3>
      <ul>
        {meals.map(meal => (
          <li key={meal.id}>
            <strong>{meal.title}</strong> – {meal.calories} kcal  
            <br />
            Proteine: {meal.proteins}g – Carboidrati: {meal.carbs}g – Grassi: {meal.fats}g
            {meal.notes && <p><em>{meal.notes}</em></p>}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
}
