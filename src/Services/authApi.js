const API_URL = "http://localhost:5000/api";

// Helper exportado para obtener la cabecera de autenticación
export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

// Iniciar sesión
export async function loginRequest(credenciales) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credenciales),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.mensaje || "Error al iniciar sesión");
  return data;
}

// Registrar usuario
export async function registroRequest(datosUsuario) {
  const response = await fetch(`${API_URL}/auth/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosUsuario),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.mensaje || "Error al registrarse");
  return data;
}