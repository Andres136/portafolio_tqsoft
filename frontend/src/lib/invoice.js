import { jsPDF } from "jspdf";
import api from './api'

// Genera la factura en el cliente. La confirmación real de pago va en backend.
export function generateInvoice({ orderId, customer, items, total, method, phone, reference }) {
  const doc = new jsPDF();
  const now = new Date();
  doc.setFontSize(18); doc.text("TQSoft - Factura de Pago", 14, 18);
  doc.setFontSize(11);
  doc.text(`Fecha: ${now.toLocaleString()}`, 14, 28);
  doc.text(`Factura N°: ${orderId}`, 14, 34);
  doc.text("Cliente:", 14, 44);
  doc.text(`${customer.name}`, 14, 50);
  doc.text(`${customer.email}`, 14, 56);

  let y = 70;
  doc.setFontSize(12); doc.text("Detalle", 14, y); y += 8;
  items.forEach((it, idx) => {
    doc.text(`${idx + 1}. ${it.name}`, 14, y);
    doc.text(`$${it.price.toLocaleString()}`, 196, y, { align: "right" }); y += 8;
  });
  doc.line(14, y, 196, y); y += 8;
  doc.text("Total:", 150, y); doc.text(`$${total.toLocaleString()}`, 196, y, { align: "right" }); y += 12;

  doc.text("Método de pago:", 14, y); doc.text(`${method} (${phone})`, 60, y); y += 8;
  if (reference) { doc.text("Referencia:", 14, y); doc.text(`${reference}`, 60, y); y += 8; }

  doc.setFontSize(10); y += 8;
  doc.text("Gracias por tu compra. Soporte: tiquealapeandres6@gmail.com", 14, y);
  return doc;
}

export const createPaymentIntent = (payload) => api.post('/payments/', payload)
export const confirmPayment = (id, data) => api.post('/payments/' + id + '/confirm/', data)
export const getPaymentByReference = (reference) => api.get('/payments/by-reference/' + reference + '/')