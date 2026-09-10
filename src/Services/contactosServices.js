const API_URL = "http://localhost:3001/contactos";

export async function obtenerContactos(){
    try{
        const response = await fetch(API_URL)

        if(!response.ok) {
            throw new error("Error al obtener los contactos")
        }

        const data = await response.json()

        
        
        return data

    } catch(error){
        console.log("Error de la Api", error);
        
    }


}
