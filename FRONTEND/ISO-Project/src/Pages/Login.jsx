import "../styles/AuthPages.css";
import Google_Logo from "../assets/Google_Logo.png"
import {FaEye, FaEyeSlash} from "react-icons/fa"
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import {ArrendamientosService} from "../services/ArrendamientoService.js"

const Login = () => {
  const { login, loginGoogle, setCurrentUser, error, setError, recordarme, setRecordarme } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const usuarioRegistrandose ={
      userName: formData.userName,
      password: formData.password
    }

    if (usuarioRegistrandose) {
      try {
        const response = await ArrendamientosService.loginUser(usuarioRegistrandose);
        console.log("json retorno", response);
        console.log("Login exitoso con el backend:", response.data);
        setError("");
        setCurrentUser(response.data)
        login(response.data, recordarme)
        navigate("/");
      } catch (error) {
        setError(error.response?.data || error.message);
      }
    } else {
      setError("No hay fokin user");
    }


    console.log(recordarme)
  };

  const handleGoogleLogin = async () => {
    try {
      await loginGoogle();
      setError("");
    } catch (error) {
      setError("Error al iniciar sesión con Google: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre de Usuario</label>
          <input
            type="text"
            id="nombre"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="contrasena"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="view-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            <div className="form-group checkbox">
              <input
              className="login-checkbox"
              type="checkbox"
              id="recordarme"
              name="recordarme"
              checked={recordarme}
              onChange={(e) => setRecordarme(e.target.checked)}
              />
              <label htmlFor="recordarme">Recordarme</label>
            </div>
          </div>
        </div>
        <div className="btn-login">
          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </div>
      </form>
      <div className="google-container" >
        <button onClick={handleGoogleLogin} className="google-button">
          <img
          src={Google_Logo}
          alt="Google Logo"
          className="google-logo"
          />
        </button>
      </div>
      <div className="login-directions" >
        <p><Link to="/register">¿No tienes cuenta? Regístrate</Link></p>
        <p><Link to="/recuperate-password-request">¿Olvidaste tu contraseña?</Link></p>
      </div>
    </div>
  );
};

export default Login;