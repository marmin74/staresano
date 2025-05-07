import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captchaToken, setCaptchaToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const router = useRouter()

  const handleCaptcha = (token) => {
    setCaptchaToken(token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!isLogin && !captchaToken) {
      setMessage({ type: 'error', text: 'Verifica CAPTCHA richiesta' })
      setLoading(false)
      return
    }

    let result
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password })
    } else {
      result = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/dashboard`,
        }
      })
    }

    setLoading(false)

    if (result.error) {
      setMessage({ type: 'error', text: result.error.message })
    } else {
      if (isLogin) {
        setMessage({ type: 'success', text: 'Accesso effettuato ✅' })
        router.push('/dashboard')
      } else {
        setMessage({ type: 'success', text: 'Registrazione completata. Verifica la tua email ✅' })
      }
    }
  }

  const handleResetPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Email di recupero inviata ✅' })
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-primary">
        {isLogin ? 'Accedi' : 'Registrati'} a StareSano
      </h1>

      {message && (
        <div className={`mb-4 p-2 rounded text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {!isLogin && (
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} 6Ldp7DErAAAAABl_VN2xY1MZcxXxXTeOvIWjQW2q
            onChange={handleCaptcha}
          />
        )}

        <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded hover:bg-blue-400">
          {loading ? 'Attendi...' : isLogin ? 'Accedi' : 'Registrati'}
        </button>
      </form>

      {isLogin && (
        <button onClick={handleResetPassword} className="mt-4 text-sm text-blue-600 hover:underline">
          Recupera password
        </button>
      )}

      <div className="mt-4 text-sm text-center">
        {isLogin ? (
          <>Non hai un account? <button onClick={() => setIsLogin(false)} className="text-blue-600 hover:underline">Registrati</button></>
        ) : (
          <>Hai già un account? <button onClick={() => setIsLogin(true)} className="text-blue-600 hover:underline">Accedi</button></>
        )}
      </div>
    </div>
  )
}


