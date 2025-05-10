import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import ButtonForm from "../components/ButtonForm.jsx";
import {Popup} from "../components/Popup.jsx"
import ButtonUG from "../components/ButtonUG.jsx"
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import "../styles/forms.css";

const CreateAviso = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] =  useState("");
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [aviso, setAviso] = useState({
    nombre: "",
    tipo: "casa",
    descripcion: "",
    costo: 0,
    // habitaciones: "",
    // area: "",
    // ubicacion: "",
    condiciones: "",
    imagenes: [],
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    //Para que no exceda los 500 caracteres
    if ((name === "descripcion" || name === "condiciones") && (value.length > 500)){
      setError("No puedes exeder los 500 caracteres")
      return;
    }else{
      setError("");
    }
    //Para quitar los negativos y letras en los inputs
    if(name === "costo"/* || name === "habitaciones" || name === "area"*/){ //Si está leyendo los inputs de números
      const limpio = value.replace(/\D/g, ""); //Se ecnarga de eliminar todo lo que no sea un número
      setAviso((prev) => ({ ...prev, [name]: limpio })); //Reemplaza su value con la entrada filtrada
    }else{
      setAviso((prev) => ({ ...prev, [name]: value })); //Sino lee el value normal
    }
  };


  const handleImageChange = (e) => {
    const maxMB = 5 * 1024 * 1024;
    const files = Array.from(e.target.files); //Crea un arreglo con las imagenes que se vayana gregando
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"]; //Tipos de imagenes permitidos
    const validImages = []; //Arreglo para guardar las imagenes que cumplen con los requisitos

    files.forEach((file) => { //Para cada archivo
      if (!allowedTypes.includes(file.type)) { //Verifica que el tipo de imagen esté entre los permitidos
        setError(`Tipo de archivo no permitido: ${file.name}`);
        return false;
      }

      if(file.size > maxMB) { //Verifica que el tamaño del archivo no exceda los 5MB
        setError(`El tamaño de la imagen ${file.name} es mayor a 5MB`);
        return false;
      }

      validImages.push(file); //Agrega la imagen al arreglo de imagenes validas
    });
    console.log("Imagenes validas: ", validImages)
    if (validImages.length === 0) {
      e.target.value = ""
      return;
    }

    const newImages = [];

    validImages.forEach((file) => { //Para cada archivo que cumple con los requisitos
      const reader = new FileReader(); //Crea un lector de archivo, el cual lee el archivo como si fuera texto
      reader.onloadend = () => {
        newImages.push(reader.result);

        if(newImages.length === validImages.length) { //Cuando todas las imagenes hayan sido leidas
          setAviso((prev) => ({ ...prev, imagenes: [...(prev.imagenes || []), ...newImages] })); //Agrega las imagenes al aviso
        }
      }
      reader.readAsDataURL(file); //Convierte la imagen en DataURL, o sea un Strnig con el contenido codificado
    });
  };
  

  const handleSubmit = async (e) => {
    console.log(aviso)
    e.preventDefault();
    const nuevoAviso = {
      ...aviso,
      disponibilidad: "disponible",
      estado: "procesando",
      idUsuarioPropietario: currentUser.id,
      fechaPublicacion: Date.now(),
      visible: false
    }


    if (nuevoAviso){
      console.log(nuevoAviso)
      try{
        const response = await ArrendamientosService.createPublication(nuevoAviso);
        console.log("Respuesta data: ", response);
        console.log("El aviso que se va a crear: ", response.data);
        setConfirmationPopup(true);
      }catch (error) {
        console.log("1 -- ", error.response.data)
        console.log("2 -- ", error.message)
        setError(error.response?.data || error.message);
      }
    } else {
      setError("No hay fokin aviso para crear");
    }
    // const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
    // avisos.push(newAviso);
    // localStorage.setItem("avisos", JSON.stringify(avisos));

    // const historial = JSON.parse(localStorage.getItem("historial")) || [];
    // historial.push({
    //   id: Date.now().toString(),
    //   accion: "Aviso Creado",
    //   avisoId: newAviso.id,
    //   nombre: newAviso.nombre,
    //   usuario: currentUser.userName,
    //   fecha: new Date().toISOString(),
    // });
    // localStorage.setItem("historial", JSON.stringify(historial));
  };

  return (
    <div className="form-container">
      <h2>Crear Aviso</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tipo">Tipo de Espacio</label>
          <select id="tipo" name="tipo" value={aviso.tipo} onChange={handleChange} >
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="habitacion">Habitación</option>
            <option value="parqueadero">Parqueadero</option>
            <option value="bodega">Bodega</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Título</label>
          <input type="text" id="nombre" name="nombre" value={aviso.nombre} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea id="descripcion" name="descripcion" value={aviso.descripcion} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="costo">Precio Mensual</label>
          <input
            type="tel"
            id="costo"
            name="costo"
            value={aviso.costo}
            onChange={handleChange}
            
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="habitaciones">Habitaciones</label>
          <input type="tel" id="habitaciones" name="habitaciones" value={aviso.habitaciones} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="area">Área (m²)</label>
          <input type="tel" id="area" name="area" value={aviso.area} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="ubicacion">Ubicación</label>
          <input type="text" id="ubicacion" name="ubicacion" value={aviso.ubicacion} onChange={handleChange} />
        </div> */}
        <div className="form-group">
          <label htmlFor="condiciones">Condiciones Adicionales</label>
          <textarea id="condiciones" name="condiciones" value={aviso.condiciones} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="imagenes">Imágenes</label>
          <input type="file" id="imagenes" accept="image/*" multiple onChange={handleImageChange} /> {/*El atributo accept hace que solo le aparezcan disponibles ciertos tipos de archivos al usuario*/}
        </div>
        <div className="form-actions">
          <ButtonForm text="Crear Aviso" type="submit" />
          <ButtonForm text="Cancelar" onClick={() => navigate("/mis-avisos")} />
        </div>
      </form>
      {confirmationPopup && (
        <Popup
          text="Su aviso fue creado"
          button={<ButtonUG ruta={"/mis-avisos"} children={"Ok"} />}
        />
      )}
    </div>
  );
};

export default CreateAviso;