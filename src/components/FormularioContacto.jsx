import { useState } from "react";

export default function FormularioContacto( { onAgregar } ) {
    const [ form, setForm] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        etiqueta: ""
         
    })

    // Actualiza un campo del formulario cuando el usuario escribe.
    const onChange = (e) => {
        // Extrae nombre del input y valor actual.
        const { name, value } = e.target

        // Copia estado anterior y reemplaza solo el campo modificado.
        setForm((f) => ( { ...f, [name]: value}))
    }

      // Controla el envío del formulario.
    const onSubmit = (e) => {
        e.preventDefault()

        if(!form.nombre.trim() || !form.telefono.trim()) {
            alert("Completa almenos Nombre y Telefono")
            return
        }

    // Envía los datos al componente padre para agregarlos a la lista.
        onAgregar(form)
    // Limpia el formulario después de guardar.
        setForm( {nombre: "", correo: "", telefono: "", etiqueta: ""})

        
    }

    return (
        <form
        onSubmit={onSubmit}
        className="grid grid-cols-2 gap-3 bg-white border border-lime-100 rounded-2xl p-6 shadow-md shadow-lime-900/5"
        >
        <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={onChange}
            className="col-span-1 bg-lime-50/40 border border-lime-100 rounded-lg px-3 py-2.5 text-sm text-lime-950 placeholder-neutral-400 outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
        />
        <input
            name="telefono"
            placeholder="Telefono"
            value={form.telefono}
            onChange={onChange}
            className="col-span-1 bg-lime-50/40 border border-lime-100 rounded-lg px-3 py-2.5 text-sm text-lime-950 placeholder-neutral-400 outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
        />
        <input
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={onChange}
            className="col-span-1 bg-lime-50/40 border border-lime-100 rounded-lg px-3 py-2.5 text-sm text-lime-950 placeholder-neutral-400 outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
        />
        <input
            name="etiqueta"
            placeholder="Etiqueta"
            value={form.etiqueta}
            onChange={onChange}
            className="col-span-1 bg-lime-50/40 border border-lime-100 rounded-lg px-3 py-2.5 text-sm text-lime-950 placeholder-neutral-400 outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
        />
        <button
            type="submit"
            className="col-span-2 bg-gradient-to-br from-lime-400 to-lime-600 text-lime-950 font-bold text-sm rounded-lg py-3 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-400/40 transition"
        >
            Agregar contacto
        </button>
        </form>
  );
}
    


 











