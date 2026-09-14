import { useEffect, useState } from "react";

import EditarContactoModal from "./components/EditarContactoModal";
import Saludar from "./components/Saludar";
import Buscador from "./components/Buscador";
import FormularioContacto from "./components/FormularioContacto";
import UseContactos from "./hooks/UseContactos";
import Header from "./components/Header";
import AuthModal from "./components/AuthModal";


export default function App() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const usuarioGuardado= localStorage.getItem("usuario")
    const tokenGuardado = localStorage.getItem("token")

    if(usuarioGuardado && tokenGuardado){
      try {
        setUsuario(JSON.parse(usuarioGuardado))
      } catch (error) {
        localStorage.clear()
      }
    }
  },[])

  const { 
    contactos,
    cargando,
    agregarContacto, 
    eliminarContacto,
    editarContacto,
    contactoEditar,
    setContactoEditar } = UseContactos(usuario)


    // cerrar sesion
    const handleLogout = () =>{
      localStorage.removeItem("token")
      localStorage.removeItem("usuario")
      alert("sesion cerrada exitosamente")
      window.location.reload();
    }

    if(!usuario){
      return <AuthModal onLoginExitoso={(usr) => setUsuario(usr) } />
    }

  return (

    <main className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Barra superior con info del usuario y Logout */}
        <div className="flex justify-between items-center bg-white border border-lime-100 p-4 rounded-xl shadow-sm mb-6">
          <div>
            <p className="text-xs text-lime-700 font-semibold">Sesión iniciada como:</p>
            <h2 className="text-sm font-bold text-lime-950">{usuario.nombre} ({usuario.email})</h2>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-semibold text-xs px-3 py-1.5 rounded-lg transition"
          >
            Cerrar Sesión
          </button>
        </div>

        <Saludar />
        <Header/>
        <FormularioContacto
          onAgregar={agregarContacto}
        />

        <section className="py-3">
          <Buscador
            datos={contactos}
            onDelete={eliminarContacto}
            onEdit={setContactoEditar}
          />
        </section>

        <EditarContactoModal
          isOpen={Boolean(contactoEditar)}
          contacto={contactoEditar}
          onClose={() => setContactoEditar(null)}
          onGuardar={editarContacto}
        />
      </div>
    </main>

  );


}