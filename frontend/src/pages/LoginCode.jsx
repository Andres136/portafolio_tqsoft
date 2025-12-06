// src/pages/LoginCode.jsx
import { useState } from 'react'
import api from '../lib/api'

export default function LoginCode(){
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState(1)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function requestCode(e){
    e.preventDefault()
    setLoading(true); setMsg('')
    try{
      await api.post('/auth/request-otp/', { email })
      setStep(2); setMsg('Te enviamos un código (revisa bandeja y SPAM).')
    }catch{ setMsg('No pudimos enviar el código. Intenta de nuevo.') }
    finally{ setLoading(false) }
  }

  async function verify(e){
    e.preventDefault()
    setLoading(true); setMsg('')
    try{
      const res = await api.post('/auth/verify-otp/', { email, code })
      localStorage.setItem('access', res.access)
      setMsg('Sesión iniciada ✅')
    }catch{ setMsg('Código incorrecto o vencido.') }
    finally{ setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-6">Login por código (email)</h1>

      {step === 1 && (
        <form onSubmit={requestCode} className="bg-white p-6 rounded-2xl shadow space-y-3">
          <input className="input" type="email" placeholder="tu@email.com"
                 value={email} onChange={e=>setEmail(e.target.value)} required />
          <button disabled={loading} className="btn-primary w-full">
            {loading ? 'Enviando...' : 'Enviar código'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={verify} className="bg-white p-6 rounded-2xl shadow space-y-3">
          <input className="input" inputMode="numeric" pattern="[0-9]*" maxLength={6}
                 placeholder="Código de 6 dígitos" value={code}
                 onChange={e=>setCode(e.target.value)} required />
          <button disabled={loading} className="btn-primary w-full">
            {loading ? 'Verificando...' : 'Verificar y entrar'}
          </button>
          <button type="button" className="btn-primary w-full" onClick={()=>setStep(1)}>
            Reenviar código
          </button>
        </form>
      )}

      {msg && <p className="mt-3 text-orange-600">{msg}</p>}
    </div>
  )
}
