
import { useState,useEffect } from "react";
import "./App.css";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";
import EditarContactoModal from "./components/EditarContactoModal"; 
import Saludar from "./components/Saludar"

const CONTACTOS_INICIALES = [
  { id: 1, nombre: "Carolina Pérez", telefono: "300 123 4567", correo: "carolina@sena.edu.co", etiqueta: "Compañera" },
  { id: 2, nombre: "Julian Pérez", telefono: "350 123 4567", correo: "julian@sena.edu.co", etiqueta: "Profesor" },
  { id: 3, nombre: "Maria Lopez", telefono: "350 546 4567", correo: "maria@gmail.com", etiqueta: "Amiga" },
  { id: 4, nombre: "Mario Serna", telefono: "350 123 2387", correo: "marioserna@sena.edu.co", etiqueta: "Director" },
];


export default function App() {
  const [contactos, setContactos] = useState(() => {
      const contactosGuardados = localStorage.getItem("agenda_contactos");
      if (contactosGuardados) {
        try {
          return JSON.parse(contactosGuardados);
        } catch (error) {
          console.error("Error al leer localStorage:", error);
        }
      }
      return CONTACTOS_INICIALES;
    });

    // Guardar en localStorage cada vez que contactos cambie.
  useEffect(() => {
    localStorage.setItem("agenda_contactos", JSON.stringify(contactos));
  }, [contactos]);


  // Agrega un nuevo contacto al estado.
  const agregarContacto = (nuevo) => {
    // Toma el estado previo y agrega el nuevo con un id generado.
    setContactos((prev) => [...prev, { id: Date.now(), ...nuevo }]);
  };



  // Elimina un contacto por su id.
  const eliminarContacto = (id) => {
    // Filtra todos menos el que coincide con el id a eliminar.
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  const [contactoEditar, setContactoEditar] = useState(null);

  const guardarEdicion = (contactoActualizado) => {
    setContactos((prev) =>
      prev.map((c) => (c.id === contactoActualizado.id ? contactoActualizado : c))
    );
  }





  return (
    <main className="app-container">
        <Saludar />
      <header className="app-header">
        <h1 className="app-title">Agenda ADSO v2</h1>
        <p className="app-subtitle">Gestión de Contactos</p>
      </header>
      
      <FormularioContacto onAgregar={agregarContacto} />
      <section className="lista-contactos">
        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            id={c.id}
            nombre={c.nombre}
            telefono={c.telefono}
            correo={c.correo}
            etiqueta={c.etiqueta}
            onDelete={eliminarContacto}
            onEdit={(contacto) => setContactoEditar(contacto)}
          />
        ))}
      </section>

      <EditarContactoModal
        isOpen={Boolean(contactoEditar)}
        contacto={contactoEditar}
        onClose={() => setContactoEditar(null)}
        onGuardar={guardarEdicion}
      />
    </main>
  );
}