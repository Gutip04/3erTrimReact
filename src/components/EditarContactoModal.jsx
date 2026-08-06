import { useState, useEffect } from "react";

export default function EditarContactoModal({ contacto, isOpen, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
    
  });

  // Cargar datos del contacto cuando abre el modal o cambia el contacto seleccionado
  useEffect(() => {
    if (contacto) {
      setFormData(contacto);
    }
  }, [contacto]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Contacto</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
          />
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Correo"
            required
          />
          <input
            type="text"
            name="etiqueta"
            value={formData.etiqueta}
            onChange={handleChange}
            placeholder="Etiqueta"
            required
          />
          <div className="modal-acciones">
            <button type="submit" className="btn-guardar">Guardar</button>
            <button type="button" onClick={onClose} className="btn-cancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}