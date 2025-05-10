import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import ButtonForm from "../components/ButtonForm.jsx";
import { Popup } from "../components/Popup.jsx";
import ButtonUG from "../components/ButtonUG.jsx";
import "../styles/forms.css";
import { ArrendamientosService } from "../services/ArrendamientoService.js";

const UpdateProfile = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [foto, setFoto] = useState(currentUser?.foto || "");
  const [formData, setFormData] = useState({
    userName: currentUser?.userName || "",
    telefono: currentUser?.telefono || "",
    email: currentUser?.email || "",
    fechaNacimiento: currentUser?.fechaNacimiento || "",
    foto: currentUser?.foto || ""
  });
  
  console.log(currentUser)

  useEffect(() => {
    const formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatEmail.test(formData.email) && formData.email !== "") {
      setError("El correo no es válido");
    } else {
      setError("");
    }
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    //Para quitar los negativos y letras en el input del telefono
    if(name === "telefono"){ //Si está leyendo a telefono
      const limpio = value.replace(/\D/g, ""); //Se ecnarga de eliminar todo lo que no sea un numero
      setFormData((prev) => ({ ...prev, [name]: limpio })); //Reemplaza su value con la entrada filtrada
    }else{
      setFormData((prev) => ({ ...prev, [name]: value })); //Sino lee el value normal
    }
  };

  
  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
  
    let edad = hoy.getFullYear() - nacimiento.getFullYear(); // Años de diferencia
    const mes = hoy.getMonth() - nacimiento.getMonth(); // Meses de diferencia
  
    //Si no ha lleago su mes de cumpleaños O si es el mes de su cumpleaños pero no ha llegado su día
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--; //Se le resta 1 año a la diferencia de años
    }
    return edad;
  };

  /* 
  PLANTEAR POSIBLE MEJORA EN LOS HANDLECHANGE PARA AGRUPARLOS EN EL ONCHANGE
  */

  const handleDateChange = (fecha) => {
    const edad = calcularEdad(fecha);
    if (edad < 18) {
      setError("Debes ser mayor de edad para registrarte.");
      return;
    }else{
      setError("");
    }
    setFormData({ ...formData, fechaNacimiento: fecha });
  };


  const handleFotoChange = (e) => {
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"]; //Tipos de imagenes permitidos
    const file = e.target.files[0];
    console.log("Peso de la imagen", file.size);

    
    if (!file) return;
    
    if (!allowedTypes.includes(file.type)) { //Si lo que se intenta agregar noc umple con los tipos permitidos
      setError("Formato no permitido. Solo se permiten JPG, JPEG y PNG.");
      e.target.value = ""; // Limpiar el input de archivo
      return;
    }
    
    const maxMB = 5 * 1024 * 1024;

    if(file.size > maxMB){
      setError("La imagen no debe pasar los 5 mb")
      e.target.value = ""; // Limpiar el input de archivo
      return;
    }


    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result)
      setFoto(reader.result);
      // Guarda la imagen en el usuario actual
      setFormData({...formData, foto: reader.result})
      const updatedUser = { ...currentUser, foto: reader.result };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    };
    reader.readAsDataURL(file);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      userName: formData.userName,
      email: formData.email,
      password: currentUser.password,
      foto: formData.foto,
      telefono: formData.telefono
    }

    if (updatedUser){
      try{
        const nuevosDatos = await ArrendamientosService.updateUser(currentUser.id, updatedUser);
        console.log("Todo lo nuevo: ", nuevosDatos);
        setMostrarPopup(true);
        logout();
      }catch (error) {
        setError(error.response?.data || error.message);
      }
    } else {
      setError("No hay fokin user para actualizar");
    }
  };
  

  return (
    <div className="form-container">
      <h2>Actualizar Perfil</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Nombre de Usuario</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Número de Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputfoto">Cambiar Foto de Perfil</label>
          <input
            type="file"
            id="inputfoto"
            accept="image/*"
            onChange={handleFotoChange}
          />
        </div>
        <div className="form-group">
          <p><strong>*Nota: </strong>Para ver reflejados los cambios debes volver a iniciar sesión</p>
        </div>
        <div className="form-actions">
          <ButtonForm text="Guardar Cambios" type="submit" />
          <ButtonForm text="Cancelar" onClick={() => navigate("/")} />
        </div>
      </form>
      {mostrarPopup && (
        <Popup
          text="Usuario modificado exitosamente, inicia de nuevo"
          button={<ButtonUG ruta={"/login"} children={"Ok"} />}
        />
      )}
    </div>
  );
};

export default UpdateProfile;