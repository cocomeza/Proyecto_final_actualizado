import React, { useState, useEffect } from "react";
import Historial from "./components/Historial";
import "./App.css";

const marcas = ["Toyota", "Honda", "Ford"];
const modelos = [
  "Corolla",
  "Etios",
  "Hilux",
  "Fix",
  "Civic",
  "Fiesta",
  "Focus",
  "EcoSport",
  "Ranger",
];
const anios = [2023, 2022, 2021, 2020];
const combustibles = ["Nafta", "Diésel", "Gas"];
const tiposSeguro = ["Básico", "Intermedio", "Completo"];

function App() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [combustible, setCombustible] = useState("");
  const [tipoSeguro, setTipoSeguro] = useState("");
  const [cotizacion, setCotizacion] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const mostrarHistorialHandler = () => {
    setMostrarHistorial(true);
  };

  const mostrarCotizacionHandler = () => {
    setMostrarHistorial(false);
  };

  const calcularCotizacion = () => {
    if (marca && modelo && anio && combustible && tipoSeguro) {
      let cotizacionCalculada = 9000;

      switch (tipoSeguro) {
        case "Básico":
          cotizacionCalculada *= 1.3;
          break;
        case "Intermedio":
          cotizacionCalculada *= 1.5;
          break;
        case "Completo":
          cotizacionCalculada *= 1.7;
          break;
        default:
          break;
      }

      setCotizacion(cotizacionCalculada);
      const consulta = `${marca} ${modelo} ${anio} ${combustible} ${tipoSeguro}`;
      setHistorial((prevHistorial) => [consulta, ...prevHistorial]);
      localStorage.setItem(
        "historial",
        JSON.stringify([consulta, ...historial])
      );
    } else {
      alert(
        "Por favor, seleccione todas las opciones antes de calcular la cotización."
      );
    }
  };

  return (
    <div className="App">
      <h1 className="titulo">Seguros MJM</h1>
      <label>
        Marca:
        <select value={marca} onChange={(e) => setMarca(e.target.value)}>
          <option value="">Seleccione marca</option>
          {marcas.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Modelo:
        <select value={modelo} onChange={(e) => setModelo(e.target.value)}>
          <option value="">Seleccione modelo</option>
          {modelos.map((mod) => (
            <option key={mod} value={mod}>
              {mod}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Año:
        <select value={anio} onChange={(e) => setAnio(e.target.value)}>
          <option value="">Seleccione año</option>
          {anios.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Combustible:
        <select
          value={combustible}
          onChange={(e) => setCombustible(e.target.value)}
        >
          <option value="">Tipo de combustible</option>
          {combustibles.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Tipo de Seguro:
        <select
          value={tipoSeguro}
          onChange={(e) => setTipoSeguro(e.target.value)}
        >
          <option value="">Tipo de seguro</option>
          {tiposSeguro.map((ts) => (
            <option key={ts} value={ts}>
              {ts}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={calcularCotizacion}>Calcular Cotización</button>
      {cotizacion !== null && (
        <div className="cotizacion">
          <h2>Cotización: ${cotizacion}</h2>
        </div>
      )}
      <div className="historial-section">
        {mostrarHistorial ? (
          <div>
            <button onClick={mostrarCotizacionHandler}>
              Mostrar Cotización
            </button>
            <Historial historial={historial} />
          </div>
        ) : (
          <div>
            <button onClick={mostrarHistorialHandler}>Mostrar Historial</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
