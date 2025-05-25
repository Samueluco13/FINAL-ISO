import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import NotificationBell from "./NotificationBell.jsx";
import { IoArchive } from "react-icons/io5";
import { NotificationCard } from "./NotificationCard.jsx";
import {ArrendamientosService} from "../services/ArrendamientoService.js";
import "../styles/header.css";

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const mostrarNotis = async () => {
      try {
        const notis = await ArrendamientosService.listNotifications(currentUser.userName);
        console.log("Lo que devuelve: ", notis);
        console.log("Notificaciones: ", notis.data);
        setNotifications(notis.data.reverse());
        console.log(reload);
      } catch (error) {
        console.log(error.notis?.data);
        console.log(error.message);
      }
    }
    mostrarNotis()
  },[navigate, currentUser, reload]);

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

  const handleDeleteNotification = async (id) => {
    try{
      await ArrendamientosService.deleteNotification(id);
      setReload(!reload);
    }catch (error){
      console.log(error.message)
    }
  }
  
  const handleArchiveNotification = async (id) => {
    try{
      const archivar = await ArrendamientosService.archiveNotification(id);
      console.log(archivar);
      console.log(archivar.data);
      setReload(!reload);
    }catch (error){
      console.log(error.message)
    }
  }
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
                      </>
                    )}
                    <li>
                      <button onClick={handleLogout}>Cerrar Sesión</button>
                    </li>
                  </ul>
                )}
              </div>
              <NotificationBell onClick={toggleNotification} count={notifications.length} />
              {isNotificationOpen && (
                <ul className="notification-dropdown">
                  <p className="no-notification archived" onClick={() => navigate("/mis-archivadas")} ><IoArchive/> Archivadas</p>
                  {notifications.length === 0 ? (
                    <p className="no-notification" >No tienes notificaciones</p>
                  ) : (
                    notifications.map((notification) => (
                      <li key={notification.id} className="noti-item">
                        <NotificationCard
                        notification={notification}
                        onDeleteNoti={handleDeleteNotification}
                        onArchiveteNoti={handleArchiveNotification}
                        />
                      </li>
                    ))
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