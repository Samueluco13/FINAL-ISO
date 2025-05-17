import { FaBell } from 'react-icons/fa';

const NotificationBell = ({ count, onClick }) => {
    return (
        <div className="noti-container" onClick={onClick} >
        <FaBell className="noti-bell" />
        {count > 0 && <span className="noti-badge">{count}</span>}
        </div>
    );
};

export default NotificationBell;
