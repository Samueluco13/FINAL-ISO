import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import ButtonForm from "../components/ButtonForm.jsx";
import "../styles/forms.css";

const DesactivarAviso = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const avisoId = query.get("id");

  const [aviso, setAviso] = useState(null);
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
    const foundAviso = avisos.find((a) => a.id === avisoId);
    if (foundAviso) {
      setAviso(foundAviso);
    } else {
      navigate("/");
    }
  }, [avisoId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
    const updatedAvisos = avisos.map((a) =>
      a.id === avisoId ? { ...a, estado: "desactivado", visible: false, motivoDesactivacion: motivo } : a
    );
    localStorage.setItem("avisos", JSON.stringify(updatedAvisos));

    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push({
      id: Date.now().toString(),
      accion: "Aviso Desactivado",
      avisoId: avisoId,
      titulo: aviso.titulo,
      usuario: currentUser.nombre,
      motivo: motivo,
      fecha: new Date().toISOString(),
    });
    localStorage.setItem("historial", JSON.stringify(historial));

    navigate("/");
  };

  if (!aviso) return null;

  return (
    <div className="form-container">
      <h2>Desactivar Aviso: {aviso.titulo}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="motivo">Motivo de Desactivación</label>
          <textarea
            id="motivo"
            name="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <ButtonForm text="Desactivar Aviso" type="submit" />
          <ButtonForm text="Cancelar" onClick={() => navigate("/validar-aviso")} />
        </div>
      </form>
    </div>
  );
};

export default DesactivarAviso;