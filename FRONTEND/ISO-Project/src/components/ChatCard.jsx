import React from 'react'
import "../styles/chatCard.css"

export const ChatCard = ({chat, onClick, onDelete}) => {
    return (
        <div className="chat-card" >
            <div className='chat-card-info'>
                <h4 onClick={onClick} className='chat-card-title' >{chat.tituloAviso}</h4>
                <p><strong>{chat.ultimoMensaje?.usuario || "Sin mensajes"}</strong>: {chat.ultimoMensaje?.mensajes || "Aún no hay mensajes."}</p>
                {chat.ultimoMensaje && (
                    <small>{new Date(chat.ultimoMensaje.fecha).toLocaleString()}</small>
                )}
            </div>
            <div className="chat-actions">
                {onDelete && (
                    <button className="btn btn-danger" onClick={() => onDelete(chat.id)}>
                        X
                    </button>
                )}
            </div>
        </div>
    )
}
