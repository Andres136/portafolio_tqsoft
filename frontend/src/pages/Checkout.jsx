import { useState } from 'react'
import { createPaymentIntent, confirmPayment } from '../lib/invoice'
import { Link } from 'react-router-dom'

const WA = 'https://wa.me/573108157335'

export default function Checkout(){
  const [method,setMethod]=useState('nequi')
  const [amount,setAmount]=useState(50000)
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [pi,setPi]=useState(null)
  const [msg,setMsg]=useState('')
  const [err,setErr]=useState('')

  async function onCreate(e){
    e.preventDefault(); setErr(''); setMsg('')
    try{
      const data = await createPaymentIntent({ method, amount, payer_name:name, phone })
      setPi(data)
      setMsg('Intento de pago creado. Envía la transferencia y confirma.')
    }catch(ex){ setErr('No se pudo crear el intento de pago') }
  }

  async function onConfirm(){
    if(!pi) return
    try{
      const data = await confirmPayment(pi.id, { notes: 'Pago enviado por el cliente' })
      setPi(data); setMsg('Pago marcado como confirmado. Te contactaremos en breve.')
    }catch{ setErr('No se pudo confirmar.')}
  }

  const payNumber = pi ? (pi.method==='nequi' ? pi.nequi_number : pi.daviplata_number) : '3108157335'

  return (
    <div className="max-w-md mx-auto px-4 py-10 space-y-4">
      <h1 className="text-3xl font-extrabold">Checkout</h1>
      <p className="text-gray-600">Paga con <b>Nequi</b> o <b>Daviplata</b> al número <b>310 815 7335</b>. Este mismo número sirve para <b>información y asesoría</b>.</p>

      <form onSubmit={onCreate} className="space-y-3 bg-white p-4 rounded-2xl border">
        <label className="block">
          <span className="text-sm font-semibold">Método</span>
          <select value={method} onChange={e=>setMethod(e.target.value)} className="w-full px-3 py-2 border rounded-xl">
            <option value="nequi">Nequi</option>
            <option value="daviplata">Daviplata</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Monto (COP)</span>
          <input type="number" min="1000" step="1000" value={amount} onChange={e=>setAmount(Number(e.target.value))} className="w-full px-3 py-2 border rounded-xl"/>
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Tu nombre</span>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full px-3 py-2 border rounded-xl"/>
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Tu celular</span>
          <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full px-3 py-2 border rounded-xl"/>
        </label>
        <button className="w-full px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600">Generar referencia</button>
      </form>

      {err && <p className="text-red-600 text-sm">{err}</p>}
      {msg && <p className="text-green-700 text-sm">{msg}</p>}

      {pi && (
        <div className="bg-white p-4 rounded-2xl border space-y-2">
          <p><b>Referencia:</b> {pi.reference}</p>
          <p><b>Método:</b> {pi.method==='nequi'?'Nequi':'Daviplata'}</p>
          <p><b>Monto:</b> {pi.amount} COP</p>
          <div className="p-3 bg-orange-50 rounded-xl">
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>Abre {pi?.method==='nequi'?'Nequi':'Daviplata'} en tu celular.</li>
              <li>Envía <b>{pi.amount} COP</b> al número <b>{payNumber}</b>.</li>
              <li>Escríbenos por WhatsApp para validar: <a className="text-green-700 underline" href={WA}>310 815 7335</a>.</li>
            </ol>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600">Ya envié el pago</button>
            <a href={WA} className="px-4 py-2 rounded-xl border border-green-600 text-green-700">Necesito ayuda</a>
            <Link to={'/payment-status/' + pi.reference} className="px-4 py-2 rounded-xl border border-orange-500 text-orange-600">Ver estado en la web</Link>
          </div>
        </div>
      )}
    </div>
  )
}