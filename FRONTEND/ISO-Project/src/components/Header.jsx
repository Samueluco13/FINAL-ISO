import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import NotificationBell from "./NotificationBell.jsx";
import { NotificationCard } from "./NotificationCard.jsx";
import "../styles/header.css";

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsNotificationOpen(false);
    setIsMenuOpen(!isMenuOpen);
  }

  const toggleNotification = () => {
    setIsMenuOpen(false);
    setIsNotificationOpen(!isNotificationOpen);
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title" onClick={() => navigate("/")}>
          Sistema de Avisos
        </h1>
        <nav className="header-nav">
          {!currentUser ? (
            <button className="btn btn-primary" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </button>
          ) : (
            <>
              {currentUser.tipo === "propietario" && (
                <button className="btn create-aviso-btn" onClick={() => navigate("/crear-aviso")}>
                  Crear Aviso
                </button>
              )}
              <div className="user-menu">
                <button className="user-menu-button" onClick={toggleMenu}>
                  {currentUser.userName} ({currentUser.tipo})
                  <img
                    src={currentUser?.foto || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
                    alt="Profile picture"
                    className="profile-picture"
                  />
                </button>
                {isMenuOpen && (
                  <ul className="user-menu-list">
                    {currentUser.tipo === "propietario" && (
                      <li>
                        <button onClick={() => navigate("/mis-avisos")}>Mis Avisos</button>
                      </li>
                    )}
                    {(currentUser.tipo === "propietario" || currentUser.tipo === "interesado") && (
                      <>
                        <li>
                          <button onClick={() => navigate("/chats-list")}>Chats</button>
                        </li>
                        <li>
                          <button onClick={() => navigate("/actualizar-perfil")}>Actualizar Perfil</button>
                        </li>
                        <li>
                          <button onClick={() => navigate("/eliminar-perfil")}>Eliminar Perfil</button>
                        </li>
                      </>
                    )}
                    {currentUser.tipo === "administrador" && (
                      <>
                        <li>
                          <button onClick={() => navigate("/validar-aviso")}>Validar Publicaciones</button>
                        </li>
                        <li>
                          <button onClick={() => navigate("/revisar-reportes")}>Revisar Reportes</button>
                        </li>
                        <li>
                          <button onClick={() => navigate("/todos-los-avisos")}>Todos los Avisos</button>
                        </li>
                        {/* <li>
                          <button onClick={() => navigate("/historial")}>Historial</button>
                        </li> */}
                      </>
                    )}
                    <li>
                      <button onClick={handleLogout}>Cerrar Sesión</button>
                    </li>
                  </ul>
                )}
              </div>
              <NotificationBell onClick={toggleNotification} count={count} />
              {isNotificationOpen && (
                <ul className="notification-dropdown">
                  {count === 0 ? (
                    <p>No tienes notificaciones</p>
                  ): (
                    <li>
                      <NotificationCard/>
                    </li>
                  )}
                </ul>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;