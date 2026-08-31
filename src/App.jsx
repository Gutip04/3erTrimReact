import { useState, useEffect } from "react";

import FormularioContacto from "./components/FormularioContacto";
import EditarContactoModal from "./components/EditarContactoModal";
import Saludar from "./components/Saludar";
import Buscador from "./components/Buscador";
const API_URL = "http://localhost:3001/contactos";


export default function App() {


  const [contactos, setContactos] = useState([]);

  const [contactoEditar, setContactoEditar] = useState(null);



  // Cargar contactos al iniciar
  useEffect(() => {

    cargarContactos();

  }, []);



  const cargarContactos = async () => {

    try {

      const response = await fetch(API_URL);


      if (!response.ok) {

        throw new Error("Error al obtener contactos");

      }


      const data = await response.json();


      setContactos(data);


    } catch (error) {

      console.error(error);

      alert("No se pudieron cargar los contactos");

    }

  };





  // Agregar contacto
  const agregarContacto = async (nuevoContacto) => {


    // Validaciones

    if (!nuevoContacto.nombre.trim()) {

      alert("El nombre es obligatorio");

      return;

    }


    if (!nuevoContacto.telefono.trim()) {

      alert("El teléfono es obligatorio");

      return;

    }


    if (!nuevoContacto.correo.includes("@")) {

      alert("Correo inválido");

      return;

    }



    // Evitar duplicados

    const existe = contactos.some(

      (contacto) => contacto.correo === nuevoContacto.correo

    );


    if (existe) {

      alert("Ya existe un contacto con ese correo");

      return;

    }





    try {


      const response = await fetch(API_URL, {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(nuevoContacto)

      });



      if (!response.ok) {

        throw new Error("No se pudo agregar");

      }



      const data = await response.json();



      setContactos((prev) => [...prev, data]);



    } catch(error) {

      console.error(error);

      alert("Error al guardar contacto");

    }


  };







  // Eliminar contacto
  const eliminarContacto = async (id) => {


    try {


      const response = await fetch(`${API_URL}/${id}`, {

        method: "DELETE"

      });



      if (!response.ok) {

        throw new Error("No se pudo eliminar");

      }



      setContactos((prev) =>

        prev.filter(

          (contacto) => contacto.id !== id

        )

      );



    } catch(error) {


      console.error(error);

      alert("Error eliminando contacto");


    }


  };







  // Editar contacto
  const editarContacto = async (id, contactoActualizado) => {


    try {


      if (!contactoActualizado.nombre.trim()) {

        alert("El nombre es obligatorio");

        return;

      }



      const response = await fetch(`${API_URL}/${id}`, {


        method: "PUT",


        headers: {

          "Content-Type": "application/json"

        },


        body: JSON.stringify(contactoActualizado)


      });



      if (!response.ok) {


        throw new Error("No se pudo editar");


      }




      const data = await response.json();




      setContactos((prev) =>

        prev.map((contacto) =>

          contacto.id === id

          ? data

          : contacto

        )

      );



      setContactoEditar(null);



    } catch(error) {


      console.error(error);

      alert("Error actualizando contacto");


    }


  };







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