
import { useState,useEffect } from "react";
// import "./input.css";
// import "./output.css";
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
    <main className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Saludar />
        <header className="text-center my-9">
          <h1 className="font-sans font-extrabold text-3xl text-lime-900 tracking-tight">Agenda ADSO v2</h1>
          <p className="text-neutral-500 font-medium mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-lime-500 mr-2 align-middle"></span>
            Gestión de Contactos
          </p>
        </header>

        <FormularioContacto onAgregar={agregarContacto} />

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-9">
          {contactos.map((c) => (
            <ContactoCard key={c.id} {...c} onDelete={eliminarContacto} onEdit={setContactoEditar} />
          ))}
        </section>

        <EditarContactoModal
          isOpen={Boolean(contactoEditar)}
          contacto={contactoEditar}
          onClose={() => setContactoEditar(null)}
          onGuardar={guardarEdicion}
        />
      </div>
    </main>
  );
}

