import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonForm from "../components/ButtonForm.jsx";
import {Popup} from "../components/Popup.jsx"
import ButtonUG from "../components/ButtonUG.jsx"
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import "../styles/forms.css";

const EditAviso = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const avisoNombre = query.get("nombre");
  
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState(null);
  const [confirmationPopup, setConfirmationPopup] = useState(false);

  console.log("Aviso nombre: ", avisoNombre)

  useEffect(() => {
    const getAviso = async () => {
      try{
        const currentAviso = await ArrendamientosService.detailsPublication(avisoNombre);
        console.log("No se que poner: ", currentAviso);
        console.log("Aviso actual: ", currentAviso.data);
        setAviso(currentAviso.data);
      }catch(error){
        console.log(error.response?.data || error.message);
      }
    }
    getAviso();
  }, [avisoNombre, navigate]);


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

  const handlePaste = (e) => {
    const { name } = e.target;

    if (name === "descripcion" || name === "condiciones"){
      const pasted = e.clipboardData.getData("text");
      const totalLength = name.length + pasted.length;
  
      if (totalLength > 500) {
        e.preventDefault();
        const permitido = pasted.slice(0, 500 - name.length);
        setAviso((prev) => prev + permitido);
      }
    }
  };

  const handleImageChange = (e) => {
    const maxMB = 5 * 1024 * 1024; //Se multiplica la primera vez para convertir a MB y la segunda para convertir a MB
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

    const newImages = []; //Nevo arreglo para guarar las imagenes que se van a agregar sin duplicarlas

    validImages.forEach((file) => { //Para cada imagen que cumple con los requisitos
      const reader = new FileReader(); //Crea un lector de archivo, el cual lee el archivo como si fuera texto (en este caso lee imagenes)
      reader.onloadend = () => { //Por cada imagen leida
        newImages.push(reader.result); //Agrega la imagen al arreglo de imagenes nuevas

        if(newImages.length === validImages.length) { //Cuando todas las imagenes hayan sido leidas
          setAviso((prev) => ({ ...prev, imagenes: [...(prev.imagenes || []), ...newImages] })); //Agrega las imagenes al aviso
        }
      }
      reader.readAsDataURL(file); //Convierte la imagen en DataURL, o sea un Strnig con el contenido codificado
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const toEdit = await ArrendamientosService.editPublication(avisoNombre, aviso);
      console.log("Pa editar: ", toEdit);
      console.log("Ediciones: ", toEdit.data);
      setConfirmationPopup(true);
    }catch(error){
      console.log(error.toEdit?.data);
      console.log(error.message);
      console.log(error)
      console.log(error.data)
      setError(error.response.data);
    }
  };

  if (!aviso) return null;

  return (
    <div className="form-container">
      <h2>Editar Aviso</h2>
      {error && <p className="error">{error}</p>}
      {aviso.estado === "desactivado" && aviso.motivoDesactivacion && (
        <p className="aviso-status aviso-status-desactivado">
          Este aviso fue desactivado. Motivo: {aviso.motivoDesactivacion}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tipo">Tipo de Espacio</label>
          <select id="tipo" name="tipo" value={aviso.tipo} onChange={handleChange} disabled>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="habitacion">Habitación</option>
            <option value="parqueadero">Parqueadero</option>
            <option value="bodega">Bodega</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Título</label>
          <input type="text" id="nombre" name="nombre" value={aviso.nombre} onChange={handleChange} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea id="descripcion" name="descripcion" value={aviso.descripcion} onChange={handleChange} onPaste={handlePaste} required />
        </div>
        <div className="form-group">
          <label htmlFor="costo">Precio Mensual</label>
          <input
            type="number"
            id="costo"
            name="costo"
            value={aviso.costo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="condiciones">Condiciones</label>
          <textarea id="condiciones" name="condiciones" value={aviso.condiciones} onChange={handleChange} onPaste={handlePaste} required/>
        </div>
        {/* <div className="form-group">
          <label htmlFor="disponibilidad">Disponibilidad</label>
          <select name="disponibilidad" id="disponibilidad" value={aviso.disponibilidad} onChange={handleChange}>
            <option value="disponible">Disponible</option>
            <option value="procesando">En proceso de arrendamiento</option>
            <option value="arrendado">Arrendado</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div> */}
        <div className="form-group">
          <label htmlFor="imagenes">Imágenes</label>
          <input type="file" id="imagenes" accept="image/*" multiple onChange={handleImageChange} />
          {aviso.imagenes && aviso.imagenes.length > 0 && (
            <div>
              <p>Imágenes actuales:</p>
              {aviso.imagenes.map((img, index) => (
                <img key={index} src={img} alt={`Imagen ${index + 1}`} style={{ width: "100px", margin: "5px" }} />
              ))}
            </div>
          )}
        </div>
        <div className="form-actions">
          <ButtonForm text="Guardar Cambios" type="submit" />
          <ButtonForm text="Cancelar" onClick={() => navigate("/mis-avisos")} />
        </div>
      </form>
      {confirmationPopup && (
        <Popup
          text="Su aviso fue editado"
          button={<ButtonUG ruta={"/mis-avisos"} children={"Ok"} />}
        />
      )}
    </div>
  );
};

export default EditAviso;