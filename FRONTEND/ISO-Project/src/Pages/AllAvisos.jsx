import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvisoCard from "../components/AvisoCard.jsx";
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import "../styles/avisos.css";

const AllAvisos = () => {
  const navigate = useNavigate();
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    const todosAvisos = async () => {
      try {
        const response = await ArrendamientosService.showAllPublications();
        setAvisos(response.data);
        console.log("Avisos:", response.data);
      } catch (error) {
        console.error("Error fetching avisos:", error);
      }
    }
    todosAvisos();
  }, []);


  return (
    <div className="dashboard">
      <h2>Todos los Avisos</h2>
      {avisos.length === 0 ? (
        <p>No hay avisos disponibles.</p>
      ) : (
        <div className="avisos-list">
          {avisos.map((aviso) => (
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

export default AllAvisos;