import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import ButtonForm from "../components/ButtonForm.jsx";
import {Popup} from "../components/Popup.jsx"
import ButtonUG from "../components/ButtonUG.jsx"
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import "../styles/forms.css";

const ReportAviso = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const avisoNombre = query.get("nombre");

  const [aviso, setAviso] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [error, setError] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [comentarios, setComentarios] = useState("");

  useEffect(() => {
      const getAviso = async () => {
        try{
          const currentAviso = await ArrendamientosService.detailsPublication(avisoNombre);
          setAviso(currentAviso.data);
        }catch(error){
          console.log(error.response?.data || error.message);
        }
      }
      getAviso();
    }, [avisoNombre, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reporte = {
      idUsuario: currentUser.id,
      nombreUsuarioReporte: currentUser.userName,
      idPublicacion: aviso.id,
      motivo,
      comentarios,
      fecha: Date.now(),
      hora: new Date().toISOString(),
      desicion: "",
      valido: false
    }

    if(motivo !== ""){
      try{
        await ArrendamientosService.reportPublication(avisoNombre, reporte);
        setMostrarPopup(true);
      }catch(error){
        console.log(error.response?.data || error.message);
      }
    }else{
      setError("Seleccione un motivo para su reporte");
    }
  };

  if (!aviso) return null;

  return (
    <div className="form-container">
      <h2>Reportar Aviso: {aviso.titulo}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="motivo">Motivo del Reporte</label>
          <select
            id="motivo"
            name="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            >
            <option value="">Seleccione un motivo</option>
            <option value="fraude">Fraude</option>
            <option value="contenido-inapropiado">Contenido Inapropiado</option>
            <option value="informacion-falsa">Información Falsa</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comentarios">Comentarios</label>
          <textarea
            id="comentarios"
            name="comentarios"
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <ButtonForm text="Enviar Reporte" type="submit" />
          <ButtonForm text="Cancelar" onClick={() => navigate("/")} />
        </div>
      </form>
      {mostrarPopup && (
        <Popup
          text="Reporte enviado exitosamente"
          button={<ButtonUG ruta={"/"} children={"Ok"} />}
        />
      )}
    </div>
  );
};

export default ReportAviso;