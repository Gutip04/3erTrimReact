import { getAuthHeaders } from "./authApi";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_CONTACTO = `${BASE_URL}/contactos`;

export async function obtenerContactos(){
    try{
        const response = await fetch(API_CONTACTO,{
            headers: getAuthHeaders()
        })

        if(!response.ok) {
            throw new error("Error al obtener los contactos")
        }

        const data = await response.json()

        
        
        return data

    } catch(error){
        console.log("Error de la Api", error);
        
    }


}


export async function  crearContacto(nuevoContacto) {
        
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


    try{
        const response = await fetch(API_CONTACTO, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(nuevoContacto)
        }
    )

        if(!response.ok){
            throw new Error("No se pudo agregar")
        }

        const data = await response.json()
        
        return data
        
    }
    catch(error){
        console.log(error);
        alert("Error al guardar contacto")

    }
        
    





    }



export async function borrarContacto(id) {
    
    if(!id){
        return alert("No existe este ID")
    }
    
    try{
        const response = await fetch(`${API_CONTACTO}/${id}`, {
            method : "DELETE",
            headers: getAuthHeaders()
        })

        if(!response.ok){
            throw new Error("No se pudo Eliminar al contacto")
        }

        return response


    }catch(error){
        console.log("Error al eliminar contacto");
           
    }

}


export async function actualizarContacto(id, contactoActualizado) {
    
    try {
        if(!id){
            alert("No existe contacto")
            return 
        }
        if (!contactoActualizado.nombre.trim()) {
            alert("El nombre es obligatorio");
            return
        }
        if (!contactoActualizado.correo.includes("@")) {
            alert("Correo inválido");
            return;
    }
        if (!contactoActualizado.telefono.trim()) {
            alert("El Teefono es obligatorio");
            return 
        }
        if (!contactoActualizado.etiqueta.trim()) {
            alert("La etiqueta es obligatorio");
            return 
        }

        const responde = await fetch(`${API_CONTACTO}/${id}`, {
            method : "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify(contactoActualizado)
        })

        
        const data = await responde.json()
        if(!responde.ok){
            throw new Error(data.mensaje || "No se pudo actualizar el Contacto")
        }
        
        return data

    } catch (error) {
        console.log("Error al actualizar contacto", error);
        alert("Error al actualizar contacto")
    }
}
