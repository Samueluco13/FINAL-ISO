import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonForm from '../components/ButtonForm.jsx';
import { ArrendamientosService } from '../services/ArrendamientoService.js';
import { Popup } from '../components/Popup.jsx';
import ButtonUG from '../components/ButtonUG.jsx';

export const RecuperatePasswordRequest = () => {

    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [mostrarPopup, setMostrarPopup] = useState(false);

    const navigate = useNavigate();

    const handleRecuperarSubmit = async (e) => {
        e.preventDefault();

        const user = {
            userName
        };
        console.log(user)

        if(user){
            // debugger;
            try {
                const response = await ArrendamientosService.emailRecuperate(user);
                console.log("json de retorno", response);
                console.log("Usuario que pide cambio: ", response.data);
                setMostrarPopup(true);
            } catch (error) {
                setError(error.response?.data || error.message);
            }
        } else {
            setError("No hay fokin user pidiendo");
        }
        console.log("Salio");
        setError("");
    };


    return (
    <div className='form-container' >
        <h2>Recuperar Contraseña</h2>
        {error && <p className="error">{error}</p>}
        <form id="form-recuperar" onSubmit={handleRecuperarSubmit}>
            <div className="form-group">
                <label htmlFor="nombre-recuperar">Nombre de Usuario:</label>
                <input
                type="text"
                id="nombre-recuperar"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                />
            </div>
            <ButtonForm text={"Solicitar Recuperación"} type="submit" />
            <p className="link">
                <a onClick={() => navigate("/login")}>Volver al Inicio de Sesión</a>
            </p>
        </form>
        {mostrarPopup && (
            <Popup
            text="Se te ha enviado un correo de recuperación"
            button={<ButtonUG ruta={"/login"} children={"Ok"} />}
            />
        )}
    </div>
    )
}
