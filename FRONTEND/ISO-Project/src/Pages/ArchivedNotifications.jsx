import { useContext, useEffect, useState } from 'react'
import { ArrendamientosService } from '../services/ArrendamientoService'
import { AuthContext } from '../context/AuthContext';
import { NotificationCard } from '../components/NotificationCard';
import "../Styles/ArchivedNotifications.css"

export const ArchivedNotifications = () => {
    const {currentUser} = useContext(AuthContext)
    const [archivadas, setArchivadas] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const handleShowArchivedNotifications = async () => {
            try{
                const archived = await ArrendamientosService.listArchivedNotifications(true, currentUser.userName);
                console.log("Peticion de las archivadas -- ", archived);
                console.log("Las archivadas: ", archived.data)
                setArchivadas(archived.data);
            }catch (error){
                console.log(error.message);
                console.log(error.archived?.data);
            }
        }
        handleShowArchivedNotifications()
    }, [reload])

    const handleDeleteNotification = async (id) => {
        try{
        await ArrendamientosService.deleteNotification(id);
        setReload(!reload);
        }catch (error){
        console.log(error.message)
        }
    }
    
    return (
        <div className='dashboard' >
            <ul className='archivadas'>
                <h2>Notificaciones Archivadas</h2>
                {archivadas.length === 0 ? (
                    <h3>No tienes notificaciones archivadas</h3>
                ) : (
                    archivadas.map((archivada) => (
                        <li key={archivada.id} className="noti-item">
                            <NotificationCard
                            notification={archivada}
                            onDeleteNoti={handleDeleteNotification}
                            />
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}
