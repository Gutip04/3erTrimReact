import { useState } from "react";

import ContactoCard from "./ContactoCard";


export default function Buscador({ datos = [], onDelete, onEdit }) {


  const [busqueda, setBusqueda] = useState("");

  const [orden, setOrden] = useState("asc");


  // Paginación

  const [paginaActual, setPaginaActual] = useState(1);

  const contactosPorPagina = 5;



  // ============================
  // FILTRAR CONTACTOS
  // ============================

  let resultados = datos;


  if (busqueda.trim()) {

    const termino = busqueda.toLowerCase();


    resultados = datos.filter((contacto) =>

      contacto.nombre.toLowerCase().includes(termino)

    );

  }



  // ============================
  // ORDENAR CONTACTOS
  // ============================

  resultados = [...resultados].sort((a, b) =>

    orden === "asc"

      ? a.nombre.localeCompare(b.nombre)

      : b.nombre.localeCompare(a.nombre)

  );




  // ============================
  // PAGINACIÓN
  // ============================


  const totalPaginas = Math.ceil(

    resultados.length / contactosPorPagina

  );



  const indiceFinal = paginaActual * contactosPorPagina;


  const indiceInicial = indiceFinal - contactosPorPagina;



  const contactosPagina = resultados.slice(

    indiceInicial,

    indiceFinal

  );





  // Cambiar orden

  const alternarOrden = () => {


    setOrden(

      orden === "asc"

      ? "desc"

      : "asc"

    );


  };





  // Buscar y volver a página 1

  const cambiarBusqueda = (e) => {


    setBusqueda(e.target.value);


    setPaginaActual(1);


  };





  // Página siguiente

  const siguientePagina = () => {


    if (paginaActual < totalPaginas) {

      setPaginaActual(paginaActual + 1);

    }


  };





  // Página anterior

  const paginaAnterior = () => {


    if (paginaActual > 1) {

      setPaginaActual(paginaActual - 1);

    }


  };







  return (

    <div className="space-y-6">





      {/* BUSCADOR Y ORDEN */}


      <div className="flex flex-col sm:flex-row gap-3">



        <input


          type="text"


          placeholder="Buscar por nombre..."


          value={busqueda}


          onChange={cambiarBusqueda}


          className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white shadow-sm"


        />




        <button


          onClick={alternarOrden}


          className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg border"


        >


          Ordenar:


          <span className="font-bold text-lime-700 ml-2">


            {orden === "asc"

              ? "A-Z ↑"

              : "Z-A ↓"

            }


          </span>


        </button>



      </div>







      {/* CONTACTOS */}



      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">



        {contactosPagina.length > 0 ? (



          contactosPagina.map((contacto) => (



            <ContactoCard


              key={contacto.id}


              {...contacto}


              onDelete={onDelete}


              onEdit={onEdit}


            />



          ))



        ) : (



          <p className="col-span-full text-center text-neutral-500">


            No se encontraron contactos.


          </p>



        )}



      </section>







      {/* PAGINACIÓN */}



      {totalPaginas > 1 && (



        <div className="flex justify-center items-center gap-4 mt-6">



          <button


            onClick={paginaAnterior}


            disabled={paginaActual === 1}


            className="px-4 py-2 bg-neutral-200 rounded-lg disabled:opacity-50"


          >


            ⬅ Anterior


          </button>





          <span className="font-medium">


            Página {paginaActual} de {totalPaginas}


          </span>





          <button


            onClick={siguientePagina}


            disabled={paginaActual === totalPaginas}


            className="px-4 py-2 bg-neutral-200 rounded-lg disabled:opacity-50"


          >


            Siguiente ➡


          </button>



        </div>



      )}




    </div>

  );

}