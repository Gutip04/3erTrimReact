import React from 'react';
// Saludar.jsx

function Saludar() {
  const Curso = "React";
  return (
    <div className="max-w-3xl mx-auto rounded-2xl border border-lime-100 bg-gradient-to-r from-lime-50 via-lime-50/40 to-white shadow-sm px-7 py-5 text-left">
      <h3 className="font-bold text-lg text-lime-900">Hola SENA</h3>
      <h3 className="text-neutral-600 font-medium text-sm mt-1">
        Bienvenido al curso de{" "}
        <span className="font-bold text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full">{Curso}</span>
      </h3>
      <p className="text-xs text-neutral-400 mt-1">Estamos aprendiendo componentes</p>
    </div>
  );
}
export default Saludar;