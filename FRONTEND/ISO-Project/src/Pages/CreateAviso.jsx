import React, { useState, useContext, useEffect } from "react";
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
  const [ubicacion, setUbicacion] = useState({
    tipo: "",
    casa: "",
    torre: "",
    apartamento: "",
    parqueadero: "",
    bodega: ""
  })
  const [aviso, setAviso] = useState({
    nombre: "",
    tipo: ubicacion.tipo,
    descripcion: "",
    costo: 0,
    condiciones: "",
    imagenes: [],
  });

  useEffect(() => {
    //Toma cada los select para crear el titulo, y elimina vacios
    const partesNombre = [ubicacion.tipo, ubicacion.casa, ubicacion.apartamento, ubicacion.torre, ubicacion.parqueadero, ubicacion.bodega,].filter(Boolean);

    setAviso(prev => ({
      ...prev,
      nombre: partesNombre.join(" ") //Pone en el nombre del aviso lo que se halla tomado de los inputs separando con espacios
    }));
  }, [ubicacion]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    
      setUbicacion((prev) => ({ ...prev, [name]: value }));
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

  const disableSelect = () => {
      if((ubicacion.tipo !== "apartamento") && (ubicacion.tipo !== "habitacion")){
        return true;
      }
      else return false;
  }


  return (
    <div className="form-container">
      <h2>Crear Aviso</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tipo">Tipo de Espacio</label>
          <select id="tipo" name="tipo" value={ubicacion.tipo} onChange={handleChange} >
            <option value=""></option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="habitacion">Habitación</option>
            <option value="parqueadero">Parqueadero</option>
            <option value="bodega">Bodega</option>
          </select>
        </div>
        {/* <div className="form-group">
          <label htmlFor="nombre">Título</label>
          <input type="text" id="nombre" name="nombre" value={aviso.nombre} onChange={handleChange} required/>
        </div> */}
        <div className="form-group"> 
          <label htmlFor="casa">Numero de casa</label>
          <select type="text" id="casa" name="casa" value={ubicacion.casa} onChange={handleChange} disabled={ubicacion.tipo !== "casa"} >
            <option value=""></option>
            <option value="1">Casa 1</option>
            <option value="2">Casa 2</option>
            <option value="3">Casa 3</option>
            <option value="4">Casa 4</option>
            <option value="5">Casa 5</option>
            <option value="6">Casa 6</option>
            <option value="7">Casa 7</option>
            <option value="8">Casa 8</option>
            <option value="9">Casa 9</option>
            <option value="10">Casa 10</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="torre">Torre</label>
          <select type="text" id="torre" name="torre" value={ubicacion.torre} onChange={handleChange} disabled={disableSelect()} >
            <option value=""></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
          </select>
        </div>
        <div className="form-group"> 
          <label htmlFor="apartamento">Numero de Apartamento</label>
          <select type="text" id="apartamento" name="apartamento" value={ubicacion.apartamento} onChange={handleChange} disabled={disableSelect()} >
            <option value=""></option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
            <option value="104">104</option>
            <option value="201">201</option>
            <option value="202">202</option>
            <option value="203">203</option>
            <option value="204">204</option>
            <option value="301">301</option>
            <option value="302">302</option>
            <option value="303">303</option>
            <option value="304">304</option>
            <option value="401">401</option>
            <option value="402">402</option>
            <option value="403">403</option>
            <option value="404">404</option>
          </select>
        </div>
        <div className="form-group"> 
          <label htmlFor="parqueadero">Parqueadero</label>
          <select type="text" id="parqueadero" name="parqueadero" value={ubicacion.parqueadero} onChange={handleChange}  disabled={ubicacion.tipo !== "parqueadero"} >
            <option value=""></option>
            <option value="1">Parqueadero 1</option>
            <option value="2">Parqueadero 2</option>
            <option value="3">Parqueadero 3</option>
            <option value="4">Parqueadero 4</option>
            <option value="5">Parqueadero 5</option>
            <option value="6">Parqueadero 6</option>
            <option value="7">Parqueadero 7</option>
            <option value="8">Parqueadero 8</option>
            <option value="9">Parqueadero 9</option>
            <option value="10">Parqueadero 10</option>
          </select>
        </div>
        <div className="form-group"> 
          <label htmlFor="bodega">Bodega</label>
          <select type="text" id="bodega" name="bodega" value={ubicacion.bodega} onChange={handleChange} disabled={ubicacion.tipo !== "bodega"} >
            <option value=""></option>
            <option value="1">Bodega 1</option>
            <option value="2">Bodega 2</option>
            <option value="3">Bodega 3</option>
            <option value="4">Bodega 4</option>
            <option value="5">Bodega 5</option>
            <option value="6">Bodega 6</option>
            <option value="7">Bodega 7</option>
            <option value="8">Bodega 8</option>
            <option value="9">Bodega 9</option>
            <option value="10">Bodega 10</option>
          </select>
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