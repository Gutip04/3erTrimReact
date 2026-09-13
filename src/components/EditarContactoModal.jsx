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
    onGuardar(formData.id, formData);
    onClose();
  };

  return (
        <div className="fixed inset-0 bg-lime-950/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-7 w-full max-w-sm shadow-2xl shadow-lime-950/25">
        <h2 className="font-bold text-lg text-lime-950 mb-4">Editar Contacto</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
            className="bg-lime-50/40 border border-lime-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
          />
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
            className="bg-lime-50/40 border border-lime-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
          />
          <input
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Correo"
            required
            className="bg-lime-50/40 border border-lime-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
          />
          <input
            name="etiqueta"
            value={formData.etiqueta}
            onChange={handleChange}
            placeholder="Etiqueta"
            required
            className="bg-lime-50/40 border border-lime-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100"
          />
          <div className="flex gap-2 mt-1">
            <button type="submit" className="flex-1 bg-gradient-to-br from-lime-400 to-lime-600 text-lime-950 font-bold text-sm rounded-lg py-2.5 hover:-translate-y-0.5 transition">
              Guardar
            </button>
            <button type="button" onClick={onClose} className="flex-1 border border-lime-100 text-neutral-500 font-semibold text-sm rounded-lg py-2.5 hover:bg-neutral-50 transition">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}