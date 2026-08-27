
import { useState, useEffect } from "react";
// import "./input.css";
// import "./output.css";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";
import EditarContactoModal from "./components/EditarContactoModal";
import Saludar from "./components/Saludar"
import Buscador from "./components/Buscador";

// const CONTACTOS_INICIALES = [
//   { id: 1, nombre: "Carolina Pérez", telefono: "300 123 4567", correo: "carolina@sena.edu.co", etiqueta: "Compañera" },
//   { id: 2, nombre: "Julian Pérez", telefono: "350 123 4567", correo: "julian@sena.edu.co", etiqueta: "Profesor" },
//   { id: 3, nombre: "Maria Lopez", telefono: "350 546 4567", correo: "maria@gmail.com", etiqueta: "Amiga" },
//   { id: 4, nombre: "Mario Serna", telefono: "350 123 2387", correo: "marioserna@sena.edu.co", etiqueta: "Director" },
// ];


export default function App() {

  const [contactoEditar, setContactoEditar] = useState(null);

  
  const [contactos, setContactos] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/contactos")
      .then((res) => res.json())
      .then((data) => setContactos(data))
  }, [])

  const agregarContacto = async (contactos) => {
    try {
      const response = await fetch("http://localhost:3001/contactos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactos),
      })

      const data = await response.json()
      return data
    }
    catch (error) {
      console.error("error al agregar el contacto", error);

    }
  }

  const eliminarContacto = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/contactos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el contacto");
      }

      // Actualizar el estado después de eliminar
      setContactos((contactosActuales) =>
        contactosActuales.filter(
          (contacto) => String(contacto.id) !== String(id)
        )
      );

      return true;
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
      return false;
    }
  };

  const editarContacto = async (id, contacto) => {
    try {
      const response = await fetch(`http://localhost:3001/contactos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contacto),
      });

      if (!response.ok) {
        throw new Error("No se pudo editar el contacto");
      }

      const data = await response.json();

      setContactos((contactosActuales) =>
        contactosActuales.map((c) =>
          String(c.id) === String(id) ? data : c
        )
      );

      return data;
    } catch (error) {
      console.error("Error al editar el contacto:", error);
      return null;
    }
  };


  const guardarEdicion = async (contactoActualizado) => {
    try {
      const resultado = await editarContacto(
        contactoActualizado.id,
        contactoActualizado
      );

      if (resultado) {
        setContactoEditar(null);
      }
    } catch (error) {
      console.error("Error al guardar la edición:", error);
    }
  };

  

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


        <section className="py-3">
        <Buscador 
          datos={contactos}
          propiedades={["nombre", "correo", "etiquetas"]}
          onDelete={eliminarContacto}
          onEdit={setContactoEditar}
        />
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

