import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import "../styles/avisos.css";

const AvisoDetail = () => {
  const { nombre } = useParams();
  const { currentUser, avisoActual, setAvisoActual, setChatActual } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  console.log("Usuario actual", currentUser)
  console.log("Aviso actual ", avisoActual)
  
  useEffect(() => {
    const getAviso = async () => {
      try{
        const currentAviso = await ArrendamientosService.detailsPublication(nombre);
        console.log("No se que poner: ", currentAviso);
        console.log("Aviso actual: ", currentAviso.data);
        setAvisoActual(currentAviso.data);
        console.log(avisoActual)
      }catch(error){
        console.log(error.response?.data || error.message);
      }
    }
    getAviso();
  }, [nombre, navigate]);

  const handleReport = () => {
    navigate(`/reportar-aviso?nombre=${nombre}`);
  };

  const handleContact = () => {
    const infoChat = {
      participantes: [currentUser.userName],
      avisoNombre: avisoActual.nombre,
      mensajes: []
    }

    console.log(infoChat)

    const ingresarAlChat = async () =>{ 
      try{
        console.log(avisoActual.idUsuarioPropietario)
        const nuevoChat = await ArrendamientosService.searchChat(avisoActual.idUsuarioPropietario, infoChat);
        console.log("Respuesta de la peticion: ", nuevoChat)
        console.log("El chat: ", nuevoChat.data)
        setChatActual(nuevoChat.data)
        navigate(`/chat-aviso?id=${nuevoChat.data.id}`);
      }catch(error){
          console.log(error.nuevoChat?.data);
          console.log(error.message);
          console.log(JSON.stringify(error))
          console.log(error)
        }
    }
    ingresarAlChat();
  }

  if (!avisoActual) return null;

  return (
    <div className="aviso-detail">
      <h2>{avisoActual.nombre}</h2>
      {avisoActual.estado === "procesando" && <p className="aviso-status">En Revisión</p>}
      {avisoActual.visible === false && (
        <p className="aviso-status aviso-status-desactivado">Desactivado</p>
      )}
        <div className="aviso-detail-images">
          {avisoActual.imagenes && avisoActual.imagenes.length > 0 ? (
            <>
              <img
                src={avisoActual.imagenes[currentImage]}
                alt={`${avisoActual.nombre} ${currentImage + 1}`}
                className="aviso-detail-image"
              />
              <div className="image-controls">
                <button
                  onClick={() => setCurrentImage((prev) => Math.max(prev - 1, 0))}
                  disabled={currentImage === 0}
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentImage((prev) => Math.min(prev + 1, avisoActual.imagenes.length - 1))}
                  disabled={currentImage === avisoActual.imagenes.length - 1}
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            <div className="aviso-image-placeholder">Sin Imágenes</div>
          )}
        </div>
        <div className="aviso-detail-info">
          <p><strong>Precio:</strong> ${avisoActual.costo.toLocaleString()}/mes</p>
          <p><strong>Tipo de Espacio:</strong> {avisoActual.tipo.charAt(0).toUpperCase() + avisoActual.tipo.slice(1)}</p>
          <p><strong>Descripción:</strong> {avisoActual.descripcion}</p>
          <p><strong>Condiciones:</strong> {avisoActual.condiciones || "No especificadas"}</p>
          <p><strong>Disponibilidad:</strong> {avisoActual.disponibilidad} </p>
          {avisoActual.visible === false && avisoActual.motivoDesactivacion && (
            <p><strong>Motivo de Desactivación:</strong> {avisoActual.motivoDesactivacion}</p>
          )}
          <div className="aviso-actions">
            {currentUser && (currentUser.tipo === "interesado" || currentUser.tipo === "propietario")
            && avisoActual.visible === true && avisoActual.idUsuarioPropietario !== currentUser.id && (
                <>
                  <button className="btn btn-primary" onClick={handleContact}>
                    Contactar
                  </button>
                  <button className="btn btn-danger" onClick={handleReport}>
                    Reportar Aviso
                  </button>
                </>
            )}
          </div>
        </div>
    </div>
  );
};

export default AvisoDetail;