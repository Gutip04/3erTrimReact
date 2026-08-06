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
        <form onSubmit={onSubmit} className="form-contacto">
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange}></input>
            <input name="telefono" placeholder="Telefono" value={form.telefono} onChange={onChange}></input>
            <input name="correo" placeholder="Correo" value={form.correo} onChange={onChange}></input>
            <input name="etiqueta" placeholder="Etiqueta" value={form.etiqueta} onChange={onChange}></input>
            <button type="submit">Agregar contacto</button>
        </form>
    )


 }











