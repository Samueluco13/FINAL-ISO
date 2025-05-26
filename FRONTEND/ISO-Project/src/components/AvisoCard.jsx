import React from "react";
import "../styles/avisos.css";

const AvisoCard = ({ aviso, onDelete, onEdit, onReport, onClick, onViewReports }) => {
  return (
    <div className="aviso-card" >
      <h3 onClick={onClick}>{aviso.nombre}</h3>
      {aviso.disponibilidad === "procesando" && (
        <p className="aviso-status">En Revisión</p>
      )}
      <p>{aviso.descripcion}</p>
      <p>Precio: ${aviso.costo}/mes</p>
      <p>Disponibilidad: {aviso.disponibilidad}</p>
      {aviso.imagenes && aviso.imagenes.length > 0 && (
        <img src={aviso.imagenes[0]} alt={aviso.nombre} className="aviso-image" />
      )}
      <div className="aviso-actions">
        {onEdit && (
          <button className="btn btn-primary" onClick={() => onEdit(aviso.id)}>
            Editar
          </button>
        )}
        {onDelete && (
          <button className="btn btn-danger" onClick={() => onDelete(aviso.id)}>
            Eliminar
          </button>
        )}
        {onReport && (
          <button className="btn btn-danger" onClick={() => onReport(aviso.nombre)}>
            Reportar
          </button>
        )}
        {onViewReports && (
          <button className="btn btn-danger" onClick={() => onViewReports(aviso.id)}>
            Ver Reportes
          </button>
        )}
      </div>
    </div>
  );
};

export default AvisoCard;