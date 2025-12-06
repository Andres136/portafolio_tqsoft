import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPaymentByReference } from '../lib/invoice'

export default function PaymentStatus(){
  const { reference } = useParams()
  const [pi,setPi] = useState(null)
  const [err,setErr] = useState('')

  async function load(){
    try{ const data = await getPaymentByReference(reference); setPi(data); setErr('') }
    catch{ setErr('Referencia no encontrada') }
  }

  useEffect(()=>{
    load()
    const t = setInterval(load, 7000)
    return ()=> clearInterval(t)
  },[reference])

  if(err){
    return (
      <div className="max-w-md mx-auto px-4 py-10 space-y-3">
        <h1 className="text-2xl font-extrabold">Estado de pago</h1>
        <p className="text-red-600 text-sm">{err}</p>
        <Link to="/checkout" className="px-4 py-2 rounded-xl border border-orange-500 text-orange-600">Volver a Checkout</Link>
      </div>
    )
  }

  if(!pi){
    return <div className="max-w-md mx-auto px-4 py-10">Cargando…</div>
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10 space-y-4">
      <h1 className="text-2xl font-extrabold">Estado de pago</h1>
      <div className="bg-white p-4 rounded-2xl border space-y-2">
        <p><b>Referencia:</b> {pi.reference}</p>
        <p><b>Estado:</b> {pi.status}</p>
        <p><b>Método:</b> {pi.method==='nequi'?'Nequi':'Daviplata'}</p>
        <p><b>Monto:</b> {pi.amount} COP</p>
        <p className="text-xs text-gray-500">Se actualiza automáticamente cada 7s</p>
      </div>
      <div className="flex gap-3">
        <Link to="/checkout" className="px-4 py-2 rounded-xl border border-orange-500 text-orange-600">Ir a Checkout</Link>
        <a href="https://wa.me/573108157335" className="px-4 py-2 rounded-xl bg-green-500 text-white">WhatsApp 310‑815‑7335</a>
      </div>
    </div>
  )
}