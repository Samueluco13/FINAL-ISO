import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import AvisoCard from "../components/AvisoCard.jsx";
import { Popup } from "../components/Popup.jsx";
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import "../styles/avisos.css";

const AvisosPropios = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [avisosPropios, setAvisosPropios] = useState([]);
  const [mostrarPopup,setMostrarPopup] = useState(false);
  const [popupVerificacion, setPopupVerificacion] = useState(false);
  const [reload, setReload] = useState(false);
  const [filters, setFilters] = useState({ nombre: "", tipo: "", disponibilidad: "", costo: "" });
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFilters({ nombre: "", tipo: "", disponibilidad: "", costo: "" });
  }

  const userId = {
    idUsuarioPropietario: currentUser.id
  }

  useEffect(()=> {
    const mostrarPropios = async () => {
      try{
        const propios = await ArrendamientosService.showMines(userId);
        console.log("Lo que devuelve: ", propios);
        console.log("Avisos propios: ", propios.data);

        const avisosFiltrados = propios.data.filter((aviso) => {
          return (
            (!filters.nombre || aviso.nombre.toLowerCase().includes(filters.nombre.toLowerCase())) &&
            (!filters.tipo || aviso.tipo === filters.tipo) &&
            (!filters.disponibilidad || aviso.disponibilidad === filters.disponibilidad) &&
            (!filters.costo ||
              (filters.costo === "0-1000000" && aviso.costo <= 1000000) ||
              (filters.costo === "1000000-2000000" && aviso.costo > 1000000 && aviso.costo <= 2000000) ||
              (filters.costo === "2000000-5000000" && aviso.costo > 2000000 && aviso.costo <= 5000000) ||
              (filters.costo === "5000000+" && aviso.costo > 5000000))
          );
        });
        setAvisosPropios(avisosFiltrados);
      }catch(error){
        console.log(error.propios?.data);
        console.log(error.message);
      }
    }
    mostrarPropios()
  }, [navigate, filters]);
  console.log(avisosPropios);


  const handleDelete = async (nombre) => {
    try{
      console.log("A eliminar", nombre)
      const deleted = await ArrendamientosService.deletePublication(nombre);
      console.log("Ya no", deleted);
      console.log("Eliminado: ", deleted.data);
      setReload(!reload);
    }catch(error){
      console.log(error.response?.data || error.message);
    }
    setMostrarPopup(false);
    setPopupVerificacion(true);
  };


  const handleEdit = (nombre) => {
    navigate(`/editar-aviso?nombre=${nombre}`);
  };

  if (!currentUser || currentUser.tipo !== "propietario") return null;


  
  return (
    <div className="dashboard">
      <h2>Mis Avisos</h2>
      <div className="filters">
        <input
          type="text"
          name="nombre"
          placeholder="Busca por nombre"
          value={filters.nombre}
          onChange={handleFilterChange}
        />
        <select name="tipo" value={filters.tipo} onChange={handleFilterChange}>
          <option value="">Tipo de Inmueble</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="habitacion">Habitación</option>
            <option value="parqueadero">Parqueadero</option>
            <option value="bodega">Bodega</option>
        </select>
        <select name="disponibilidad" value={filters.disponibilidad} onChange={handleFilterChange}>
          <option value="">Disponibilidad</option>
          <option value="disponible">Disponible</option>
          <option value="arrendado">Arrendado</option>
        </select>
        <select name="costo" value={filters.costo} onChange={handleFilterChange}>
          <option value="">Costo Mensual</option>
          <option value="0-1000000">Hasta $1,000,000</option>
          <option value="1000000-2000000">$1,000,000 - $2,000,000</option>
          <option value="2000000-5000000">$2,000,000 - $5,000,000</option>
          <option value="5000000+">$5,000,000+</option>
        </select>
        <button className="btn btn-primary" onClick={handleClear} >Limpiar</button>
      </div>
      {avisosPropios.length === 0 ? (
        <p>No tienes avisos publicados.</p>
      ) : (
        <div className="avisos-list">
          {avisosPropios.map((aviso) => (
            <div key={aviso.id}>
              <AvisoCard
                aviso={aviso}
                onDelete={() => setMostrarPopup(true)}
                onEdit={() => handleEdit(aviso.nombre)}
                onClick={() => navigate(`/aviso/${aviso.nombre}`)}
              />
              {aviso.estado === "procesando" && <p className="aviso-status">En Revisión</p>}
              {aviso.estado === "activo" && <p className="aviso-status">Aprobado</p>}
              {aviso.estado === "desactivado" && <p className="aviso-status">Descativado</p>}
              {aviso.motivoEdicion && <p><strong>Motivo de Edición:</strong> {aviso.motivoEdicion}</p>}
              {aviso.motivoDesactivacion && <p><strong>Motivo de Desactivación:</strong> {aviso.motivoDesactivacion}</p>}
              {mostrarPopup && (
                <Popup
                  text={`¿Seguro que quieres eliminar el aviso ${aviso.nombre}?`}
                  button={
                    <>
                      <button className="btn btn-primary" onClick={() => setMostrarPopup(false)}>Cancelar</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(aviso.nombre)}>Eliminar</button>
                    </>
                  }
                  />
              )}
              {popupVerificacion && (
                <Popup
                  text={`El aviso ${aviso.nombre} fue eliminado`}
                  button={
                    <>
                      <button className="btn btn-primary" onClick={() => setPopupVerificacion(false)}>Ok</button>
                    </>
                  }
                  />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvisosPropios;