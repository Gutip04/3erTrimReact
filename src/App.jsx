import { useState, useEffect } from "react";

import EditarContactoModal from "./components/EditarContactoModal";
import Saludar from "./components/Saludar";
import Buscador from "./components/Buscador";
import FormularioContacto from "./Components/FormularioContacto";
import UseContactos from "./hooks/UseContactos";
const API_URL = "http://localhost:3001/contactos";


export default function App() {

  const { 
    contactos,
     agregarContacto, 
     eliminarContacto,
     editarContacto,
     contactoEditar,
     setContactoEditar } = UseContactos()


  return (

    <main className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <Saludar />

        <header className="text-center my-9">
          <h1 className="font-sans font-extrabold text-3xl text-lime-900">
            Agenda ADSO v2
          </h1>
          <p className="text-neutral-500 font-medium mt-1">
            Gestión de Contactos
          </p>
        </header>

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