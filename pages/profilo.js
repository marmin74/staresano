import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login') // 🔒 se non loggato → redirect
        return
      }

      setUser(user)

      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) setProfilo(data)
      setLoading(false)
    }

    fetchUserAndData()
  }, [])

