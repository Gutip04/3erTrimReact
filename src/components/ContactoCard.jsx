export default function ContactoCard({ id, nombre, telefono, correo, etiqueta, onDelete, onEdit }) {
    return (
        <article className="bg-white border border-lime-100 border-l-4 border-l-lime-500 rounded-2xl p-5 shadow-md shadow-lime-900/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-lime-900/10 transition">
            <h3 className="font-bold text-lime-950">{nombre}</h3>
            <p className="text-sm text-neutral-500">{telefono}</p>
            {correo && <p className="text-sm text-neutral-500">{correo}</p>}
            {etiqueta && (
                <p className="inline-block mt-2 text-xs font-semibold bg-lime-100 text-lime-800 px-3 py-1 rounded-full">
                {etiqueta}
                </p>
            )}

            <div className="flex gap-2 mt-4">
                <button
                onClick={() => onDelete(id)}
                className="flex-1 text-sm font-semibold border border-red-100 text-red-500 rounded-lg py-2 hover:bg-red-50 transition"
                >
                Eliminar
                </button>
                <button
                onClick={() => onEdit({ id, nombre, telefono, correo, etiqueta })}
                className="flex-1 text-sm font-semibold border border-lime-200 text-lime-700 rounded-lg py-2 hover:bg-lime-50 transition"
                >
                Editar
                </button>
            </div>
            </article>
            )

}
