import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import AvisoCard from "../components/AvisoCard.jsx";
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import "../styles/avisos.css";

const ValidateAviso = () => {
  const navigate = useNavigate();
  const [validate, setValidate] = useState([]);


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
  }, [])

  const handleValidate = async (id) => {
    // const updatedAvisos = avisos.map((aviso) =>
    //   aviso.id === id ? { ...aviso, estado: "publicado", visible: true } : aviso
    // );
    // setAvisos(updatedAvisos);
    // localStorage.setItem("avisos", JSON.stringify(updatedAvisos));

    // const historial = JSON.parse(localStorage.getItem("historial")) || [];
    // const aviso = avisos.find((a) => a.id === id);
    // historial.push({
    //   id: Date.now().toString(),
    //   accion: "Aviso Validado",
    //   avisoId: id,
    //   titulo: aviso.titulo,
    //   usuario: currentUser.nombre,
    //   fecha: new Date().toISOString(),
    // });
    // localStorage.setItem("historial", JSON.stringify(historial));
    console.log(id)
    try{
      const toValidate = await ArrendamientosService.validatePublication(id);
      console.log("El mas validado: ", toValidate.data);
    }catch(error){
      console.log(error.response?.data || error.message);
    }
  };

  // const handleEditPetition = (id) => {
  //   navigate(`/solicitud-editar-aviso?id=${id}`)
  // };

  const handleDeactivate = (id) => {
    navigate(`/desactivar-aviso?id=${id}`)
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
                <button className="btn btn-primary" onClick={() => handleValidate(aviso.id)}>
                  Validar
                </button>
                {/* <div>
                  <button className="btn btn-warning" onClick={() => handleEditPetition(aviso.id)}>
                    Solicitar Edición
                  </button>
                </div> */}
                <div>
                  <button className="btn btn-danger" onClick={() => handleDeactivate(aviso.id)}>
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