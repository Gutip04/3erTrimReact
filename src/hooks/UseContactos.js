import { useEffect, useState } from "react"
import { actualizarContacto, borrarContacto, crearContacto, obtenerContactos } from "../Services/contactosServices"


function UseContactos(){

    const [contactos, setContactos] = useState([])
    const [contactoEditar, setContactoEditar] = useState(null);
    



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


    async function agregarContacto(nuevoContacto) {
        
        try {
                const existe = contactos.some((c) =>
                    c.correo === nuevoContacto.correo 
                )


            if(existe){
                return alert("Ya existe un contacto con este Correo")
            }
            
            const data = await crearContacto(nuevoContacto)

            setContactos((prev) =>
            [...prev, data]
            )

        } catch (error) {
            console.error("error", error);
            
        }

    }


    async function eliminarContacto(id) {
        try {
            const existe = contactos.find(c =>
                c.id === id
            )
            
            if(!existe){
                return alert("contacto no existe")
            }
            
            const response = await borrarContacto(id)
                        
            if(response.ok){
                alert("Se borro correctamente el contacto")
            }

            setContactos((prev) =>{
                return prev.filter((p) => {
                    return p.id !== id
                })
            })

        } catch (error) {
            console.log("No se pudo eliminar al contacto");
            
        }
    }

    async function editarContacto(id, contactoActualizado) {
        
        if(!contactoActualizado) return alert("No hay datos para actualizar")
     
        
        try{
            const data = await actualizarContacto(id,contactoActualizado)

            setContactos((prev) => {
                return prev.map((contacto) =>{
                    return contacto.id === id
                    ? data
                    : contacto
                })
            })

            setContactoEditar(null)

        }catch(error){
            console.log("error: ",error);
            
        }
    }
    

    return{
        contactos,
        agregarContacto,
        eliminarContacto,
        editarContacto,
        setContactoEditar,
        contactoEditar
    }




}

export default UseContactos



