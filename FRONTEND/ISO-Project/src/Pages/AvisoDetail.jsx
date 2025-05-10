import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import "../styles/avisos.css";

const AvisoDetail = () => {
  const { nombre } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [aviso, setAviso] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  console.log("Usuario actual", currentUser)
  console.log("Aviso actual ", aviso)
  
  useEffect(() => {
    const getAviso = async () => {
      try{
        const currentAviso = await ArrendamientosService.detailsPublication(nombre);
        console.log("No se que poner: ", currentAviso);
        console.log("Aviso actual: ", currentAviso.data);
        setAviso(currentAviso.data);
      }catch(error){
        console.log(error.response?.data || error.message);
      }
    }
    getAviso();
  }, [nombre, navigate]);

  const handleReport = () => {
    navigate(`/reportar-aviso?nombre=${nombre}`);
  };

  // const handleContact = () => {
  //   const chats = JSON.parse(localStorage.getItem("chats")) || [];

  //   const chatExistente = chats.find((chat) => //Encontrar el chat que:
  //       chat.avisoId === id && //Coincida el id del aviso del chat, con el id del aviso en el que me encuentro
  //       chat.participantes.includes(currentUser.id) && //Además los id de los participantes deben coincidir con el propio...
  //       chat.participantes.includes(aviso.propietarioId) //Y el del dueño del aviso
  //   );
  //   console.log(localStorage.getItem("chats"));
  //   console.log("Current USER ID: ", currentUser.id)
  //   console.log("Propietario id: ", aviso.propietarioId)
    


  //   if(chatExistente){ //Si el chat existe
  //     navigate(`/chat-aviso?id=${chatExistente.id}`); //Me dirije allá
  //     console.log("Id del chat que EXISTE: ", chatExistente.id)
  //   }else{
  //     const nuevoChat = { //Si no existe, lo crea
  //       id: Date.now().toString(),
  //       avisoId: id,
  //       tituloAviso: aviso.nombre,
  //       participantes: [currentUser.id, aviso.idUsuarioPropietario],
  //       msg: []
  //     }
  //     const nuevosChats = [...chats, nuevoChat]; //Después de crearlo, lo junta con los demás que tenga el usuario
  //     localStorage.setItem("chats", JSON.stringify(nuevosChats)) //Lo guarda en el localStorage
  //     navigate(`/chat-aviso?id=${nuevoChat.id}`); //Me dirige al chat recien creado
  //     console.log("Id del chat que NO EXISTE: ", nuevoChat.id)
  //   }
  // }

  if (!aviso) return null;

  return (
    <div className="aviso-detail">
      <h2>{aviso.nombre}</h2>
      {aviso.estado === "procesando" && <p className="aviso-status">En Revisión</p>}
      {aviso.visible === false && (
        <p className="aviso-status aviso-status-desactivado">Desactivado</p>
      )}
        <div className="aviso-detail-images">
          {aviso.imagenes && aviso.imagenes.length > 0 ? (
            <>
              <img
                src={aviso.imagenes[currentImage]}
                alt={`${aviso.nombre} ${currentImage + 1}`}
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
                  onClick={() => setCurrentImage((prev) => Math.min(prev + 1, aviso.imagenes.length - 1))}
                  disabled={currentImage === aviso.imagenes.length - 1}
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
          <p><strong>Precio:</strong> ${aviso.costo.toLocaleString()}/mes</p>
          <p><strong>Tipo de Espacio:</strong> {aviso.tipo.charAt(0).toUpperCase() + aviso.tipo.slice(1)}</p>
          {/* <p><strong>Habitaciones:</strong> {aviso.habitaciones || "N/A"}</p>
          <p><strong>Área:</strong> {aviso.area || "N/A"} m²</p>
          <p><strong>Ubicación:</strong> {aviso.ubicacion || "No especificada"}</p> */}
          <p><strong>Descripción:</strong> {aviso.descripcion}</p>
          <p><strong>Condiciones:</strong> {aviso.condiciones || "No especificadas"}</p>
          <p><strong>Disponibilidad:</strong> {aviso.disponibilidad} </p>
          {/* <p><strong>Propietario:</strong> {aviso.propietario}</p> */}
          {aviso.visible === false && aviso.motivoDesactivacion && (
            <p><strong>Motivo de Desactivación:</strong> {aviso.motivoDesactivacion}</p>
          )}
          <div className="aviso-actions">
            {currentUser && (currentUser.tipo === "interesado" || currentUser.tipo === "propietario")
            && aviso.visible === true && aviso.idUsuarioPropietario !== currentUser.id && (
                <>
                  {/* <button className="btn btn-primary" onClick={handleContact}>
                    Contactar
                  </button> */}
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