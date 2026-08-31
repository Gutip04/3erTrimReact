import { useState } from "react";

import ContactoCard from "./ContactoCard";


export default function Buscador({ datos = [], onDelete, onEdit }) {

  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("asc");


  // Filtrar contactos
  let resultados = datos;


  if (busqueda.trim()) {

    const termino = busqueda.toLowerCase();

    resultados = datos.filter((item) =>
      item.nombre &&
      item.nombre.toLowerCase().includes(termino)
    );

  }



  // Ordenar contactos
  resultados = [...resultados].sort((a, b) =>
    orden === "asc"
      ? a.nombre.localeCompare(b.nombre)
      : b.nombre.localeCompare(a.nombre)
  );



  // Cambiar orden A-Z / Z-A
  const alternarOrden = () => {

    setOrden(orden === "asc" ? "desc" : "asc");

  };



  return (

    <div className="space-y-6">


      {/* Buscador y botón ordenar */}

      <div className="flex flex-col sm:flex-row gap-3">


        <input

          type="text"

          placeholder="Buscar por nombre..."

          value={busqueda}

          onChange={(e) => setBusqueda(e.target.value)}

          className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white shadow-sm"

        />



        <button

          onClick={alternarOrden}

          className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-lg border border-neutral-300 transition-colors cursor-pointer"

        >

          <span>Ordenar:</span>


          <span className="font-bold text-lime-700">

            {orden === "asc" ? "A-Z ↑" : "Z-A ↓"}

          </span>


        </button>


      </div>




      {/* Lista de contactos */}

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">


        {resultados.length > 0 ? (


          resultados.map((contacto) => (


            <ContactoCard

              key={contacto.id}

              {...contacto}

              onDelete={onDelete}

              onEdit={onEdit}

            />


          ))


        ) : (


          <p className="col-span-full text-center text-neutral-500 text-sm py-4">

            No se encontraron contactos.

          </p>


        )}


      </section>


    </div>

  );

}