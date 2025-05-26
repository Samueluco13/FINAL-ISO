import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvisoCard from "../components/AvisoCard.jsx";
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import "../styles/avisos.css";

const ValidateAviso = () => {
  const navigate = useNavigate();
  const [validate, setValidate] = useState([]);
  const [reload, setReload] = useState(false);


  useEffect(() => {
    const toValidate = async () => {
      try{
        const nuevos = await ArrendamientosService.showWaiting();
        console.log("Todo eso: ", nuevos);
        console.log("Avisos a validar: ", nuevos.data);
        setValidate(nuevos.data);
      } catch(error){
        console.log(error.nuevos?.data);
        console.log(error.message);
      }
    }
    toValidate();
  }, [reload])

  const handleValidate = async (id, visible) => {
    console.log(id)
    try{
      const toValidate = await ArrendamientosService.validatePublication(id, visible);
      console.log("El mas validado: ", toValidate.data);
      setReload(!reload);
    }catch(error){
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="dashboard">
      <h2>Validar Avisos</h2>
      {validate.length === 0 ? (
        <p>No hay avisos pendientes de validación.</p>
      ) : (
        <div className="avisos-list">
          {validate.map((aviso) => (
            <div key={aviso.id} className="aviso-card">
              <AvisoCard
                aviso={aviso}
                onClick={() => navigate(`/aviso/${aviso.nombre}`)}
              />
              <div className="aviso-actions">
                <button className="btn btn-primary" onClick={() => handleValidate(aviso.id, true)}>
                  Validar
                </button>
                <div>
                  <button className="btn btn-danger" onClick={() => handleValidate(aviso.id, false)}>
                    Desactivar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ValidateAviso;