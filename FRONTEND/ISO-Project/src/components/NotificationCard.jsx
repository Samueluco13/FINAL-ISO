import React from 'react'
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoArchive } from "react-icons/io5";
import "../styles/notificationCard.css"

export const NotificationCard = ({notification, onSeenteNoti, onDeleteNoti, onArchiveteNoti}) => {
    return (
        <div className="notification-card">
            <h3 className='multiline-text'>Notificación</h3>
            <p className='multiline-text' >Este es el contenido de la notificación.</p>
            <div className='noti-actions' >
                <button onClick={onSeenteNoti} className='btn seen-noti'><IoCheckmarkDoneOutline /></button>
                <button onClick={onDeleteNoti} className='btn delete-noti' ><MdDelete /></button>
                <button onClick={onArchiveteNoti} className='btn archive-noti'><IoArchive /></button>
            </div>
        </div>
    )
}
