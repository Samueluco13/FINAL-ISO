import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import ButtonForm from "../components/ButtonForm.jsx";
import "../styles/forms.css"
import { ArrendamientosService } from "../services/ArrendamientoService.js"

const DeleteProfile = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const deleted = await ArrendamientosService.deleteUser(currentUser.id);
    console.log(deleted);
    logout();
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Eliminar Perfil</h2>
      <p>¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.</p>
      <div className="form-actions">
        <ButtonForm text="Eliminar Perfil" type="button" onClick={handleDelete} />
        <ButtonForm text="Cancelar" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default DeleteProfile;