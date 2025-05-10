import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvisoCard from "../components/AvisoCard.jsx";
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import "../styles/avisos.css";

const Home = () => {
  const navigate = useNavigate();
  const [filteredAvisos, setFilteredAvisos] = useState([]);
  const [filters, setFilters] = useState({ nombre: "", tipo: "", disponibilidad: "", costo: "" });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFilters({ nombre: "", tipo: "", disponibilidad: "", costo: "" });
  }

  useEffect(() => {

    const listarDisponibles = async () => {
      try{
        const disponibles = await ArrendamientosService.showAvailables();
        console.log("Lo que devuelve: ", disponibles);
        console.log("Avisos disponibles: ", disponibles.data)

        const avisosFiltrados = disponibles.data.filter((aviso) => {
          return (
            (!filters.nombre || aviso.nombre.toLowerCase().includes(filters.nombre.toLowerCase())) &&
            (!filters.tipo || aviso.tipo === filters.tipo) &&
            (!filters.disponibilidad || aviso.disponibilidad === filters.disponibilidad) &&
            (!filters.costo ||
              (filters.costo === "0-1000000" && aviso.costo <= 1000000) ||
              (filters.costo === "1000000-2000000" && aviso.costo > 1000000 && aviso.costo <= 2000000) ||
              (filters.costo === "2000000-5000000" && aviso.costo > 2000000 && aviso.costo <= 5000000) ||
              (filters.costo === "5000000+" && aviso.costo > 5000000))
          );
        });
        setFilteredAvisos(avisosFiltrados);
      } catch (error){
        console.log(error.response?.data);
        console.log(error.message);
        return null;
      }
    }
    listarDisponibles();
    
  }, [filters])
  console.log("Son los que se muestran", filteredAvisos)


  return (
    <div className="dashboard">
      <h2>Avisos de Arriendo</h2>
      <div className="filters">
        <input
          type="text"
          name="nombre"
          placeholder="Busca por nombre"
          value={filters.nombre}
          onChange={handleFilterChange}
        />
        <select name="tipo" value={filters.tipo} onChange={handleFilterChange}>
          <option value="">Tipo de Inmueble</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="habitacion">Habitación</option>
            <option value="parqueadero">Parqueadero</option>
            <option value="bodega">Bodega</option>
        </select>
        <select name="disponibilidad" value={filters.disponibilidad} onChange={handleFilterChange}>
          <option value="">Disponibilidad</option>
          <option value="disponible">Disponible</option>
          <option value="arrendado">Arrendado</option>
        </select>
        <select name="costo" value={filters.costo} onChange={handleFilterChange}>
          <option value="">Costo Mensual</option>
          <option value="0-1000000">Hasta $1,000,000</option>
          <option value="1000000-2000000">$1,000,000 - $2,000,000</option>
          <option value="2000000-5000000">$2,000,000 - $5,000,000</option>
          <option value="5000000+">$5,000,000+</option>
        </select>
        <button className="btn btn-primary" onClick={handleClear} >Limpiar</button>
      </div>
      {filteredAvisos.length === 0 ? (
        <p>No se encontraron avisos</p>
      ) : (
        <div className="avisos-list">
          {filteredAvisos.map((aviso) => (
            <AvisoCard
              key={aviso.id}
              aviso={aviso}
              onClick={() => navigate(`/aviso/${aviso.nombre}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;