import React, {useState} from "react";
import {useParams, useSearchParams} from "react-router-dom" 
import ButtonForm from "../components/ButtonForm.jsx";
import { Popup } from "../components/Popup.jsx";
import ButtonUG from "../components/ButtonUG.jsx";
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import "../styles/AuthPages.css";

const RecuperatePassword = () => {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get("user");
  const {token} = useParams();

  const [error, setError] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  
  const formatPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleNuevaContrasenaSubmit = async (e) => {
    e.preventDefault();
    if (!formatPassword.test(nuevaContrasena)) {
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
      return;
    }

    if (nuevaContrasena !== confirmarNuevaContrasena) {
      setError("La contraseña debe coincidir.");
      return;
    }

    const newPassword = {
      userName,
      password: confirmarNuevaContrasena,
      token
    }
    console.log(newPassword)

    if(newPassword){
      try {
        console.log("Entró")
        const response = await ArrendamientosService.recuperatePassword(newPassword);
        console.log("json de retorno", response);
        console.log("Nueva contraseña: ", response.data);
        setMostrarPopup(true);
      } catch (error) {
      setError(error.response?.data || error.message);
      }
    } else {
        setError("No hay fokin user con contraseña nueva");
    }
    console.log("Salio")

    setNuevaContrasena("");
    setConfirmarNuevaContrasena("");
    setError("");
  };

  return (
    <div className="form-container">
      <h2>Recuperar Contraseña</h2>
      {error && <p className="error">{error}</p>}
          <form id="form-nueva-contrasena" onSubmit={handleNuevaContrasenaSubmit}>
            <div className="form-group">
              <label htmlFor="nueva-contrasena">Nueva Contraseña:</label>
              <input
                type="password"
                id="nueva-contrasena"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmar-contrasena">Confirmar Contraseña:</label>
              <input
                type="password"
                id="confirmar-contrasena"
                required
                value={confirmarNuevaContrasena}
                onChange={(e) => setConfirmarNuevaContrasena(e.target.value)}
              />
            </div>
            <ButtonForm text={"Cambiar Contraseña"} type="submit" />
          </form>
          {mostrarPopup && (
            <Popup
              text="Contraseña cambiada exitosamente"
              button={<ButtonUG ruta={"/login"} children={"Ok"} />}
            />
          )}
    </div>
  );
};

export default RecuperatePassword;