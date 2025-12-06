import { useState } from "react";

export default function SimpleCaptcha({ onVerify }) {
  const [checked, setChecked] = useState(false);

  function handleChange(e) {
    const value = e.target.checked;
    setChecked(value);
    onVerify(value); // avisa al padre (Login) si está marcado
  }

  return (
    <label className="flex items-center gap-2 text-sm text-white mt-3">
      <input
        type="checkbox"
        className="w-4 h-4"
        checked={checked}
        onChange={handleChange}
      />
      <span>No soy un robot</span>
    </label>
  );
}
