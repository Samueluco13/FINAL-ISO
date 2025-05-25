import { format } from 'date-fns';
import { MdDelete } from "react-icons/md";
import { IoArchive } from "react-icons/io5";
import "../styles/notificationCard.css"

export const NotificationCard = ({notification, onDeleteNoti, onArchiveteNoti}) => {
    const formatted = format(new Date(notification.fecha), 'dd/MM/yyyy HH:mm');
    return (
        <div className="notification-card">
            <div className='title-noti'>
                <h3>{notification.tipo}</h3>
                <p>{notification.nombreUsuarioCreador}</p>
                <p>{formatted}</p>
            </div>
            <div className='info-noti'>
                <div className='content-noti'>
                    <p>{notification.contenido}</p>
                </div>
                <div className='noti-actions' >
                    {onDeleteNoti && (
                        <button onClick={() => onDeleteNoti(notification.id)} className='btn delete-noti' ><MdDelete /></button>
                    )}{onArchiveteNoti && (
                        <button onClick={() => onArchiveteNoti(notification.id)} className='btn archive-noti'><IoArchive /></button>
                    )}
                </div>
            </div>
        </div>
    )
}
