import { useEffect, useState } from "react"
import { actualizarContacto, borrarContacto, crearContacto, obtenerContactos } from "../Services/contactosServices"


function UseContactos(usuario){

    const [contactos, setContactos] = useState([])
    const [contactoEditar, setContactoEditar] = useState(null);
    const [cargando, setCargando] = useState(false)
    



    useEffect(()  =>{
        

        async function obtener() {
            
            if(!usuario){
                setContactos([])
                return
            }

            setCargando(true)

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
                
            }finally{
                setCargando(false)
            }
        }

        obtener()

    }, [usuario])


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
            alert("No se pudo agregar el contacto");
            
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
            alert("No se pudo eliminar el contacto");
            
        }
    }

    async function editarContacto(id, contactoActualizado) {
        
        if(!contactoActualizado || !id) return alert("No hay datos para actualizar")
     
        
        try{
            const data = await actualizarContacto(id,contactoActualizado)

            if (!data || !data.id) {
            throw new Error("Respuesta inválida del servidor");
            }

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
        cargando,
        agregarContacto,
        eliminarContacto,
        editarContacto,
        setContactoEditar,
        contactoEditar
    }




}

export default UseContactos



