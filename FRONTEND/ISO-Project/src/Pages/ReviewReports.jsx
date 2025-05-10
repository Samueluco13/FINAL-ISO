import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import AvisoCard from "../components/AvisoCard.jsx";
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import "../styles/avisos.css";

const ReviewReports = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [avisosReportados, setAvisosReportados] = useState([]);

  useEffect(() => {
    const reportadas = async () => {
      try{
        const reported = await ArrendamientosService.showReported();
        console.log("Devuelta: ", reported);
        console.log("Todas las reportadas: ", reported.data);
        setAvisosReportados(reported.data);
      }catch(error){
        console.log(error.reported.data)
        console.log(error.message)
      }
    }
    reportadas()
  }, [])


  return (
    <div className="dashboard">
      <h2>Avisos Reportados</h2>
      {avisosReportados.length === 0 ? (
        <p>No hay avisos reportaros.</p>
      ) : (
        <div className="avisos-list">
          {avisosReportados.map((aviso) => (
            <AvisoCard
              key={aviso.id}
              aviso={aviso}
              onClick={() => navigate(`/aviso/${aviso.nombre}`)}
              onViewReports={() => navigate(`/reportes-aviso/${aviso.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewReports;