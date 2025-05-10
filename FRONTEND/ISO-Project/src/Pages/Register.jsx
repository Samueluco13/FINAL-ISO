import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonForm from "../components/ButtonForm.jsx";
import { Popup } from "../components/Popup.jsx";
import ButtonUG from "../components/ButtonUG.jsx";
import { useGoogleLogin } from "@react-oauth/google";
import "../styles/AuthPages.css";
import Google_Logo from "../assets/Google_Logo.png"
import { ArrendamientosService } from "../services/ArrendamientoService.js"

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("propietario");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [emailPopup, setEmailPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      setError("Por favor, complete todos los campos");
      return;
    }
    const user = {
      userName,
      email,
      password,
      tipo: rol,
      telefono: ""
    };
    console.log("El usuario es: ", user)

    if (user){
      try{
        const response = await ArrendamientosService.tokenEmail(user);
        console.log("La respuesta", response)
        setEmailPopup(true);
        setError("");
      }catch (error) {
        setError(error.response?.data || error.message);
        console.log(error.nuevos?.data);
        console.log(error.message);
        console.log(error)
      }
    } else {
      setError("No hay fokin user");
    }
  };
  
  const handleRegister = async () => {

    const regUser = {
      userName,
      email,
      password,
      tipo: rol,
      telefono: "",
      token,
      bloqueado: false,
      intentosFallidos: 0
    };
    console.log("Se supone que esto se va a mandar: ",regUser)

    if (regUser){
      try{
        const response = await ArrendamientosService.userRegister(regUser);
        console.log("Usuario para la BD", response)
        navigate("/login")
      }catch (error) {
        setError(error.response?.data || error.message);
        console.log(error.nuevos?.data);
        console.log(error.message);
      }
    } else {
      setError("No hay fokin user para registrar");
    }
    
    setEmailPopup(false);
  }


  const registerGoogle = useGoogleLogin({ //Esta función no devuelve un JWT sino que devuelve un acces_token por lo que no hay que decodificar la res
    
    onSuccess: async (res) => {
      try {
        // Llama a la API de Google para obtener los datos del usuario
        const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${res.access_token}`
          },
          }).then((res) => res.json());
          console.log("La fokin info del user de google: ", userInfo)
        const userData = {
          userName: userInfo.name,
          email: userInfo.email,
          password: userInfo.sub,
          tipo: rol,
          foto: userInfo.picture,
          telefono: "",
          bloqueado: false,
          intentosFallidos: 0
        };
        console.log("Usuario de google que se va a mandar: ", userData);

        if (userData){
          try{
            const response = await ArrendamientosService.googleRegister(userData);
            console.log("Usuario de google ingresado: ", response)
            navigate("/login");
          }catch (error) {
            setError(error.response?.data || error.message);
          }
        } else {
          setError("No hay fokin user de google para registrar");
        }
      } catch (error) {
        console.error("Error en registro con Google:", error);
      }
    },
    onError: () => console.log("Error en el registro"),
});


const handleGoogleRegister = async () => {

  if (!rol) {
    setError("Por favor selecciona un rol antes de registrarte con Google.");
    return;
  }

  try {
    await registerGoogle();
  } catch (error) {
    setError("Error al registrarse con Google: " + error.message);
  }
}

  return (
    <div className="form-container">
      <h2>Registro de Usuario</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre-registro">Nombre de usuario:</label>
          <input
            type="text"
            id="nombre-registro"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Correo-registro">Correo Electrónico:</label>
          <input
            type="text"
            id="Correo-registro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrasena-registro">Contraseña:</label>
          <input
            type="password"
            id="contrasena-registro"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rol-registro">Rol:</label>
          <select
            className="user-rol"
            id="rol-registro"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="propietario">Propietario</option>
            <option value="interesado">Interesado</option>
            {/* <option value="administrador">Administrador</option> */}
          </select>
        </div>
        <ButtonForm type="submit" text={"Continuar"} />
        <div className="google-container" >
        <button onClick={handleGoogleRegister} className="google-button">
          <img
          src={Google_Logo}
          alt="Google Logo"
          className="google-logo"
          />
        </button>
        </div>
        <p className="link">
          ¿Ya tienes una cuenta?{" "}
          <a onClick={() => navigate("/login")}>Inicia Sesión</a>
        </p>
      </form>
      {emailPopup && (
        <Popup
          text="Ingresa el codigo enviado a tu correo"
          button={<button onClick={handleRegister}>
            Registrarme
          </button>}
        >
          <div className="form-group">
            <input type="text"
            placeholder="Token de ingreso"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            />
          </div>
          {error && <p className="error">{error}</p>}
        </Popup>
      )}
      {confirmationPopup && (
        <Popup
          text="Usuario creado exitosamente"
          button={<ButtonUG ruta={"/login"} children={"Ok"} />}
        />
      )}
    </div>
  );
};

export default Register;