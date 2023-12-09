import React, { useState, useEffect } from "react";
import './Historial.css';
 
const Historial = () => {
  const [historial, setHistorial] = useState(() => {
    // Use a function to calculate the initial state
    const storedHistorial = JSON.parse(localStorage.getItem("historial")) || [];
    return storedHistorial;
  });

  useEffect(() => {
    const storedHistorial = JSON.parse(localStorage.getItem("historial")) || [];
    setHistorial(storedHistorial);
  }, []);
  

  const agregarConsulta = (nuevaConsulta) => {
    // Verificar si la consulta ya existe en el historial
    if (!historial.includes(nuevaConsulta)) {
      // Actualizar el estado y local storage
      const nuevoHistorial = [nuevaConsulta, ...historial];
      setHistorial(nuevoHistorial);
      localStorage.setItem("historial", JSON.stringify(nuevoHistorial));
    }
    
  };

  const limpiarHistorial = () => {
    // Limpiar historial y actualizar el estado
    localStorage.removeItem("historial");
    setHistorial([]);
  };

  return (
    <div className="historial-container">
      <h3 className="historial-title">Historial de Consultas</h3>
      <ul className="historial-list">
        {historial.map((consulta, index) => (
          <li key={index} className="historial-item">{consulta}</li>
        ))}
      </ul>
      <button className="clear-button" onClick={limpiarHistorial}>Limpiar Historial</button>
    </div>
  );
};

export default Historial;

