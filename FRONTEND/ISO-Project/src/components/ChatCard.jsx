import "../styles/chatCard.css"
import { MdOutlineDelete } from "react-icons/md";

export const ChatCard = ({chat, onChat, onDelete}) => {
    return (
        <div className="chat-card" >
            <div className='chat-card-info'>
                <h4 onClick={() => onChat(chat)} className='chat-card-title' >{chat.avisoNombre}</h4>
                <p><strong>{chat.mensajes.at(-1)?.nombreUsuario || "Sin mensajes"}</strong>: {chat.mensajes.at(-1)?.contenido || "Aún no hay mensajes."}</p>
                {chat.mensajes.at(-1) && (
                    <small>
                        {new Date(chat.mensajes.at(-1)?.fecha).toLocaleString('es-CO', {
                            hour12: false,
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </small>
                )}
            </div>
            <div className="chat-actions">
                {onDelete && (
                    <button className="btn btn-danger" onClick={() => onDelete(chat.id)}>
                        <MdOutlineDelete />
                    </button>
                )}
            </div>
        </div>
    )
}
