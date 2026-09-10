import { useEffect, useState } from "react"
import { obtenerContactos } from "../Services/contactosServices"


function UseContactos(){

    const [contactos2, setContactos] = useState([])




    useEffect(()  =>{

        async function obtener() {
            
            try {
                const data = await obtenerContactos()
                
                
                setContactos(data?.map(d => 
                    (
                        {
                            id: d.id,
                            nombre: d.nombre,
                            telefono: d.telefono,
                            correo: d.correo,
                            etiqueta: d.etiqueta
                        }
                    )
                ))
                

                

            } catch (error) {
                console.log("error al obtener contactos", error);
                
            }
        }

        obtener()

    }, [])

    
    

    return{
        contactos2
    }
}

export default UseContactos


