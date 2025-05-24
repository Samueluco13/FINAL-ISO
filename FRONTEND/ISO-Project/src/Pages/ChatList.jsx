import {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ChatCard } from '../components/ChatCard'
import { Popup } from '../components/Popup'
import { ArrendamientosService } from "../services/ArrendamientoService.js";

export const ChatList = () => {
    const {currentUser, chatActual, setChatActual} = useContext(AuthContext)
    const navigate = useNavigate();

    const [chatsList, setChatsList] = useState(JSON.parse(localStorage.getItem("chats")) || []);
    const [mostrarPopup, setMostrarPopup] = useState(false)

    const [listaChats, setListaChats] = useState([]);

    useEffect(() => {
        const miLista = async () => {
            try{
                const misChats = await ArrendamientosService.listChats(currentUser.userName);
                console.log("Toda la peticion: ", misChats);
                console.log("Mis chats: ", misChats.data);
                setListaChats(misChats.data);
            }catch(error){
                console.log(error.misChats?.data);
                console.log(error.message);
            }
        }
        miLista();
    }, [currentUser.id]);

    const handleDelete = (id) => {
        const nuevos = chatsList.filter(chat => chat.id !== id)
        setChatsList(nuevos)
        localStorage.setItem("chats", JSON.stringify(nuevos))
        console.log(JSON.parse(localStorage.getItem("chats")))
        setMostrarPopup(false)
    }

    const handleOnChat = (chat) => {
        setChatActual(chat)
        navigate(`/chat-aviso?id=${chat.id}`)
    }


    console.log("ESTE ES -- ", chatActual)
    return (
        <div className="dashboard">
            <h2>Bandeja de Entrada</h2>
            {listaChats.length === 0 ? (
                <p>No tienes conversaciones aún.</p>
                ) : (
                <ul>
                    {listaChats.map(chat => (
                    <div key={chat.id}>
                        <ChatCard
                        chat={chat}
                        onChat={handleOnChat}
                        onDelete={() => setMostrarPopup(true)}
                        />
                        {mostrarPopup && (
                            <Popup
                                text={`¿Seguro que quieres eliminar el chat  del aviso ${chat.tituloAviso}?`}
                                button={
                                <>
                                    <button className="btn btn-primary" onClick={() => setMostrarPopup(false)}>Cancelar</button>
                                    <button className="btn btn-danger" onClick={() => {handleDelete(chat.id)}}>Eliminar</button>
                                </>
                                }
                            />
                        )}
                    </div>
                ))}
                </ul>
        )}
        </div>
    );
}

