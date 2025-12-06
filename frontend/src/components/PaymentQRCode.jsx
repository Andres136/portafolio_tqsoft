import { useEffect, useRef } from "react";
import QRCode from "qrcode";

// QR informativo con método, número y monto. (La verificación real se hace en backend)
export default function PaymentQRCode({ method, phone, amount, reference }) {
  const ref = useRef(null);
  const text = `PAGO:${method}|TEL:${phone}|MONTO:${amount}|REF:${reference || "N/A"}`;

  useEffect(() => {
    if (!ref.current) return;
    QRCode.toCanvas(ref.current, text, { margin: 1 }, (err) => err && console.error(err));
  }, [text]);

  return (
    <div className="space-y-2">
      <canvas ref={ref} className="rounded-xl border border-black/10" />
      <div className="text-xs text-black/70">
        Método: <b>{method}</b> — Tel: <b>{phone}</b> — Monto: <b>${amount?.toLocaleString?.() || amount}</b><br/>
        Ref: <b>{reference || "N/A"}</b>
      </div>
    </div>
  );
}
