import { useMemo, useState } from "react"
import ContactoCard from "./ContactoCard"

export default function Buscador({datos = [], propiedades = [], onDelete, onEdit }){
    const [busqueda, setBusqueda] = useState("")
    const [orden, setOrden] = useState("asc");

    const resultados = useMemo(() =>{
    // 1. Filtrado
    let lista = datos;
    if (busqueda.trim()) {
      const termino = busqueda.toLowerCase();
      lista = datos.filter((item) =>
        item.nombre != null && String(item.nombre).toLowerCase().includes(termino)
      );
    }

    // 2. Ordenamiento (Crea una copia con [...] para no mutar los props)
    if (orden === "ninguno") return lista;

    return [...lista].sort((a, b) => {
      const nombreA = (a.nombre || "").toLowerCase();
      const nombreB = (b.nombre || "").toLowerCase();

      if (orden === "asc") {
        return nombreA.localeCompare(nombreB);
      } else {
        return nombreB.localeCompare(nombreA);
      }
    });
  }, [busqueda, datos, propiedades, orden]);


    
// Función para alternar el sentido del orden
  const alternarOrden = () => {
    if (orden === "asc") setOrden("desc");
    else if (orden === "desc") setOrden("asc");
  };

  return (
    <div className="space-y-6">
      {/* Contenedor de Búsqueda y Botón de Ordenar */}
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

      {/* Grid con los contactos filtrados y ordenados */}
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