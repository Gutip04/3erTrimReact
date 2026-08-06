import React from 'react';
import '../Css/Saludar.css'; 

function Saludar() {
    const Curso = "React";
    return (
        <div className="saludar-container">
            <h3 className="saludar-titulo">Hola SENA</h3>
            <h3 className="saludar-subtitulo">
                Bienvenido al curso de <span className="curso-highlight">{Curso}</span>
            </h3>
            <p className="saludar-descripcion">Estamos aprendiendo componentes</p>
        </div>
    )
}

export default Saludar;