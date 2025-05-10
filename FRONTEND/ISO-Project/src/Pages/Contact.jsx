import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/chat.css";

const Contact = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const chatId = query.get("id");
  const [chat, setChat] = useState(null);
  const [aviso, setAviso] = useState(null);
  const [mensajes, setMensajes] = useState("");

  useEffect(() => { //Carga el chat que existia antes o el que se creó a la hora de redirigir hacia esta pagina
    const chats = JSON.parse(localStorage.getItem("chats")) || [];
    const chatExistente = chats.find((chat) => chat.id === chatId); //Busca el chat que tenga un id que coincida con el de la URL

    if (chatExistente) { //Si el chat existe
      setChat(chatExistente); //Lo settea en la variabble de estado
      //Carga los detalles del aviso referenciado al chat que accedimos
      const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
      const foundAviso = avisos.find((a) => a.id === chatExistente.avisoId);

      if (foundAviso) { //Si se encuentra el aviso referenciado
        setAviso(foundAviso); //Lo settea en la variable de estado
      } else { //Si no se encontró el aviso referenciado, manda alerta y redirecciona
        alert("Aviso no encontrado");
        navigate("/");
      }
    } else{ //Si no se encontró el chat manda alerta y redirecciona
      alert("Chat no encontrado")
      navigate("/");
    }
  }, [chatId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mensajes.trim()) return;

    const chats = JSON.parse(localStorage.getItem("chats")) || [];
    const chatEncontrado = chats.find((chat) => chat.id === chatId);

    if (chatEncontrado && chatEncontrado.msg.length > 0 && currentUser.id !== chatEncontrado.participantes[1]) {
      alert("Ya enviaste un mensaje de contacto para este aviso.");
      return;
    }

    const nuevoMensaje = {
      id: Date.now().toString(),
      autorId: currentUser.id,
      usuario: currentUser.nombre,
      mensajes,
      fecha: new Date().toISOString(),
      leidoPor: [currentUser.id]
    };

    if (chatEncontrado) {
      const actualizado = {...chatEncontrado, msg: [...chat.msg, nuevoMensaje]};

      const nuevosChats = chats.map((c) => (c.id === chat.id ? actualizado : c));
      localStorage.setItem("chats", JSON.stringify(nuevosChats));
      setChat(actualizado);
      setMensajes("");
    }
  };

  const otroUsuarioId = chat?.participantes?.find(id => id !== currentUser.id); //Busca el id de la otra persona que participa en el chat
  console.log("El id del otro user: ",otroUsuarioId)
  const usuarios = JSON.parse(localStorage.getItem("users")) || []; //Toma los usuarios guardados
  console.log("Todos los users: ", usuarios)
  const otroUsuario = usuarios.find(user => user.id === otroUsuarioId); //Busca el usuario que tenga el id antes encontrado
  console.log("El otro user entero: ", otroUsuario)

  if (!aviso) return null;

  return (
    <div className="chat">
      <h3>{aviso.titulo}</h3> 
      <h4>{otroUsuario.nombre}</h4>
      <hr />
      <div className="mensajes">
        {chat && chat.msg.map((msg) => (
          <div key={msg.id} className={`mensaje ${msg.autorId === currentUser.id ? "enviado" : "recibido"}`}>
            <p>{msg.mensajes}</p>
            <small>{new Date(msg.fecha).toLocaleString()}</small>
            {msg.leidoPor.includes(aviso.otroUsuarioId) && <span>✓ Leído</span>}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={mensajes}
          onChange={(e) => setMensajes(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button className="btn btn-primary" type="submit">Enviar</button>
      </form>
</div>
  );
};

export default Contact;