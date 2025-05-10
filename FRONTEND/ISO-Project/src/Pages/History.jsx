import React from "react";
import "../styles/avisos.css";

const History = () => {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];

  return (
    <div className="dashboard">
      <h2>Historial de Acciones</h2>
      {historial.length === 0 ? (
        <p>No hay acciones registradas.</p>
      ) : (
        <div className="history-list">
          {historial.map((entry) => (
            <div key={entry.id} className="history-entry">
              <p><strong>Acción:</strong> {entry.accion}</p>
              {entry.avisoId && <p><strong>Aviso:</strong> {entry.titulo} (ID: {entry.avisoId})</p>}
              <p><strong>Usuario:</strong> {entry.usuario}</p>
              <p><strong>Fecha:</strong> {new Date(entry.fecha).toLocaleString()}</p>
              {entry.motivo && <p><strong>Motivo:</strong> {entry.motivo}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;