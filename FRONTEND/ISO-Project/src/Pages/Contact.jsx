import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { ArrendamientosService } from "../services/ArrendamientoService.js";
import { IoCheckmarkDone } from "react-icons/io5";
import "../styles/chat.css";

const Contact = () => {
  const { currentUser, avisoActual, setAvisoActual, chatActual, avisosDisponibles } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const chatId = query.get("id");
  const [mensaje, setMensaje] = useState("");
  const [submitCounter, setSubmitCounter] = useState(0);
  const [listaMensajes, setListaMensajes] = useState([]);

  useEffect(() => {
    const buscarAviso = () => {
    const avisito = avisosDisponibles.find(aviso => aviso.nombre === chatActual.avisoNombre);
    setAvisoActual(avisito)
    }
    buscarAviso()

    const listarMensajes = async () => {
      if(chatActual.participantes[0] === currentUser.userName){ //Cuando entra el interesado
        try{
          const misMensajes = await ArrendamientosService.showMessages(avisoActual.idUsuarioPropietario, currentUser.userName, chatActual.participantes[1]);
          console.log("Lista de mensajes: ", misMensajes.data);
          setListaMensajes(misMensajes.data)      
        }catch(error){
          console.log(error.misMensajes?.data);
          console.log(error.message);
          console.log(error);
        }
      }else if(chatActual.participantes[1] === currentUser.userName){ //Cuando entra el propietario
        try{
          const misMensajes = await ArrendamientosService.showMessages(currentUser.id, chatActual.participantes[0], currentUser.userName);
          console.log("Lista de mensajes: ", misMensajes.data)
          setListaMensajes(misMensajes.data);
        }catch(error){
          console.log(error.misMensajes?.data);
          console.log(error.message);
        }
      }
    }
    listarMensajes()
    console.log(submitCounter);


    const mensajesEnVisto = async () => {
      if(chatActual.participantes[0] === currentUser.userName){
        try{
          const vistos = await ArrendamientosService.seenMessages(avisoActual.idUsuarioPropietario, currentUser.userName, chatActual.participantes[1]);
          console.log(vistos)
          console.log("Los vistos: ", vistos.data)
        }catch(error){
          console.log(error.vistos?.data);
          console.log(error.message);
          console.log(error);
        }
      }else if (chatActual.participantes[1] === currentUser.userName){
        try{
          const vistos = await ArrendamientosService.seenMessages(currentUser.id, chatActual.participantes[0], currentUser.userName);
          console.log(vistos)
          console.log("Los vistos: ", vistos.data)
        }catch(error){
          console.log(error.vistos?.data);
          console.log(error.message);
          console.log(error);
        }
      }
    }
    mensajesEnVisto()
  }, [currentUser, chatId, navigate, submitCounter]);
  
  const newMessage = {
    participantes: [chatActual.participantes[0]],
    mensajes: [{
      nombreUsuario: currentUser.userName,
      contenido: mensaje,
      fecha: Date.now(),
      hora: Date.now(),
      visto: false
    }]
  };
  
  

  const handleSubmit = (e) => {
    console.log(newMessage)
    e.preventDefault();
    if (!mensaje.trim()) return;
    const crearMensaje = async () => {
      
      try{
        await ArrendamientosService.createMessage(avisoActual.idUsuarioPropietario, newMessage)
        setSubmitCounter(prev => prev + 1);
      }catch(error){
        console.log(error.mensaje?.data);
        console.log(error.message);
      }
    }
    crearMensaje();
    setMensaje("");
  };

  let elOtro
  if(currentUser.userName !== chatActual.participantes[1]){ //Si mi nombre NO es el del sueño
    elOtro = chatActual.participantes[1] //Se guarda el nombre del sueño en la variable del otro participante del chat
  }else{ //En caso contrario (mi nombre SI sea el del dueño)
    elOtro = chatActual.participantes[0] //Se guarda el nombre del usuario interesado en la variable del otro participante del chat
  }

  console.log(listaMensajes)
  
  if (!avisoActual) return null;

  return (
    <div className="chat">
      <h3>{chatActual.avisoNombre}</h3> 
      <h4>{elOtro}</h4>
      <hr />
      <div className="mensajes">
        {listaMensajes && listaMensajes.map((msg, index) => (
          <div key={index} className={`mensaje ${msg.nombreUsuario === currentUser.userName ? "enviado" : "recibido"}`} >
            <p>{msg.contenido}</p>
            <small>
              {new Date(msg.fecha).toLocaleString('es-CO',{
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
              <IoCheckmarkDone className={msg.visto ? "seen" : null}/>
            </small>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button className="btn btn-primary" type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;