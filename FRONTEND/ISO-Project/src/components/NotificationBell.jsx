import { FaBell } from 'react-icons/fa';
// import './NotificationBell.css'; // Asegúrate de importar los estilos

const NotificationBell = ({ count }) => {
    return (
        <div className="noti-container">
        <FaBell className="noti-bell" />
        {count > 0 && <span className="noti-badge">{count}</span>}
        </div>
    );
};

export default NotificationBell;
