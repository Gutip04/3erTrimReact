import { useState } from "react";
import { registroRequest } from "../Services/authApi";

export default function RegisterForm({ irALogin }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // 1. Validar longitud mínima de la contraseña
    if (formData.password.length < 8) {
      return setError("La contraseña debe tener al menos 8 caracteres");
    }

    // 2. Validar que ambas contraseñas coincidan
    if (formData.password !== formData.confirmarPassword) {
      return setError("Las contraseñas no coinciden");
    }

    setCargando(true);

    try {
      // Enviamos solo los datos requeridos por el backend (sin confirmarPassword)
      await registroRequest({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
      });

      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      irALogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-lime-950/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-7 w-full max-w-sm shadow-2xl border border-lime-100">
        
        <div className="text-center mb-6">
          <h2 className="font-bold text-2xl text-lime-950">Crear Cuenta</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Regístrate para comenzar a organizar tu agenda
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl mb-4 font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-lime-950 mb-1">
              Nombre Completo
            </label>
            <input
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
              required
              className="w-full bg-lime-50/40 border border-lime-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lime-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-lime-950 mb-1">
              Correo Electrónico
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
              className="w-full bg-lime-50/40 border border-lime-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lime-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-lime-950 mb-1">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              minLength={8}
              required
              className="w-full bg-lime-50/40 border border-lime-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lime-500 focus:bg-white transition"
            />
            <span className="text-[10px] text-neutral-400 mt-1 block">Mínimo 8 caracteres</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-lime-950 mb-1">
              Confirmar Contraseña
            </label>
            <input
              name="confirmarPassword"
              type="password"
              value={formData.confirmarPassword}
              onChange={handleChange}
              placeholder="••••••••"
              minLength={8}
              required
              className="w-full bg-lime-50/40 border border-lime-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lime-500 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-bold text-sm py-3 rounded-xl mt-2 transition shadow-lg shadow-lime-500/20 disabled:opacity-50"
          >
            {cargando ? "Procesando..." : "Registrarse"}
          </button>
        </form>

        <div className="mt-6 text-center pt-4 border-t border-neutral-100">
          <button
            type="button"
            onClick={irALogin}
            className="text-xs text-lime-800 font-semibold hover:underline"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </div>

      </div>
    </div>
  );
}