import {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { ChatCard } from '../components/ChatCard.jsx'
import { Popup } from '../components/Popup.jsx'
import { ArrendamientosService } from "../services/ArrendamientoService.js";

export const ChatList = () => {
    const {currentUser, chatActual, setChatActual} = useContext(AuthContext);
    const navigate = useNavigate();

    const [chatsList, setChatsList] = useState(JSON.parse(localStorage.getItem("chats")) || []);
    const [mostrarPopup, setMostrarPopup] = useState(false);

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

    const handleOnChat = (chat) => {
        setChatActual(chat)
        navigate(`/chat-aviso?id=${chat.id}`)
    }

    const handleDeleteChat = async (id) => {
        try{
            await ArrendamientosService.deleteChat(id);
        }catch(error){
            console.log(error);
        }
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
                                    <button className="btn btn-danger" onClick={() => {handleDeleteChat(chat.id)}}>Eliminar</button>
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

