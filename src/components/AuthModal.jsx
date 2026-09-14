import { useState } from "react";
import { loginRequest, registroRequest } from "../Services/authApi"; // Ajusta la ruta a tus servicios

export default function AuthModal({ onLoginExitoso }) {
  const [esLogin, setEsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
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
    setCargando(true);

    try {
      if (esLogin) {
        // 1. Enviar petición de Login al Backend
        const data = await loginRequest({
          email: formData.email,
          password: formData.password,
        });

        // 2. Guardar credenciales en LocalStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        // 3. Notificar a App.jsx
        onLoginExitoso(data.usuario);
      } else {
        // 1. Enviar petición de Registro al Backend
        await registroRequest(formData);
        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        
        // Limpiar formulario y pasar a vista de Login
        setEsLogin(true);
        setFormData({ nombre: "", email: "", password: "" });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-lime-950/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-7 w-full max-w-sm shadow-2xl border border-lime-100">
        
        {/* Cabecera del Modal */}
        <div className="text-center mb-6">
          <h2 className="font-bold text-2xl text-lime-950">
            {esLogin ? "Bienvenido" : "Crear Cuenta"}
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            {esLogin
              ? "Ingresa tus credenciales para acceder a tus contactos"
              : "Regístrate para comenzar a organizar tu agenda"}
          </p>
        </div>

        {/* Alerta de Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl mb-4 font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {!esLogin && (
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
          )}

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
              required
              className="w-full bg-lime-50/40 border border-lime-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lime-500 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-bold text-sm py-3 rounded-xl mt-2 transition shadow-lg shadow-lime-500/20 disabled:opacity-50"
          >
            {cargando
              ? "Procesando..."
              : esLogin
              ? "Iniciar Sesión"
              : "Registrarse"}
          </button>
        </form>

        {/* Cambiar entre Login y Registro */}
        <div className="mt-6 text-center pt-4 border-t border-neutral-100">
          <button
            type="button"
            onClick={() => {
              setEsLogin(!esLogin);
              setError(null);
            }}
            className="text-xs text-lime-800 font-semibold hover:underline"
          >
            {esLogin
              ? "¿No tienes una cuenta? Regístrate aquí"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>

      </div>
    </div>
  );
}