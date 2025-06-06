import axios from "axios";

const backend = "http://localhost:8080/UAO/INGSOFT/PROYECTO";

export class ArrendamientosService {
    //METODOS DE LOS USUARIOS
    static loginUser(jsonUser) {
        return axios.post(`${backend}/LOGIN`, jsonUser, {
        headers: {
            "Content-Type": "application/json"
        }
        });
    }

    static tokenEmail(jsonEmail){
        return axios.post(`${backend}/ENVIO-EMAIL`, jsonEmail,{
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    static userRegister(jsonRegister) {
        return axios.post(`${backend}/REGISTRO`, jsonRegister,{
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    static updateUser(idUser, jsonUser){
        return axios.put(`${backend}/ACTUALIZAR/${idUser}`, jsonUser,{
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    static deleteUser(idUser){
        return axios.delete(`${backend}/${idUser}`)
    }

    static emailRecuperate(jsonUser){
        return axios.post(`${backend}/recuperate-password-email`, jsonUser,{
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    static recuperatePassword(jsonNewPassword){
        return axios.put(`${backend}/recuperate-password`, jsonNewPassword,{
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    static googleRegister(googleUser){
        return axios.post(`${backend}/REGISTRO-GOOGLE`, googleUser, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }


    //METODOS DE LAS PUBLICACIONES
    static createPublication(jsonPublication){
        return axios.post(`${backend}/PROPIEDAD/CREACION`, jsonPublication,{
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    static detailsPublication(nombrePublicacion){
        return axios.post(`${backend}/PROPIEDAD/${nombrePublicacion}`);
    }

    static editPublication(nombrePublicacion, jsonPublication){
        return axios.put(`${backend}/EDITAR/PROPIEDAD/${nombrePublicacion}`, jsonPublication,{
            headers:{
                "Content-Type": "application/json"
            }
        });
    }

    static deletePublication(nombrePublicacion){
        return axios.delete(`${backend}/ELIMINAR/PROPIEDAD/${nombrePublicacion}`);
    }

    // static validatePublication(idPublication){
    //     return axios.put(`${backend}/PROPIEDAD-VISIBLE/${idPublication}`);
    // }

    static reportPublication(nombrePublication, jsonReport){
        return axios.post(`${backend}/REPORTAR/PROPIEDAD/${nombrePublication}`, jsonReport, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    static showReports(idPublication){
        return axios.get(`${backend}/LISTARREPORTES/${idPublication}`);
    }

    static resolveReport(idReport, jsonDecision){
        return axios.put(`${backend}/PROPIEDAD/APROBAR-REPORTE/${idReport}`, jsonDecision,{
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    static showAllPublications(){
        return axios.get(`${backend}/LISTAR-PROPIEDADES`);
    }

    static showAvailables(){
        return axios.get(`${backend}/LISTAR-DISPONIBLES`);
    }

    static showMines(jsonUserId){
        return axios.post(`${backend}/LISTAR-PROPIEDADES-PROPIAS`, jsonUserId,{
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    static showReported(){
        return axios.get(`${backend}/LISTAR-PROPIEDADES-REPORTADAS`);
    }

    static showAll(){
        return axios.get(`${backend}/LISTAR-PROPIEDADES`);
    }

    static showWaiting(){
        return axios.get(`${backend}/LISTAR-PROPIEDADES-ESPERA`);
    }

    static validatePublication(publicationId, visible){
        return axios.put(`${backend}/PROPIEDAD-VISIBLE/${publicationId}/${visible}`);
    }


    //METODOS DE NOTIFICACIONES
    static listNotifications(userName){
        return axios.post(`${backend}/LISTAR-NOTIFICACIONES/${userName}`);
    }

    static deleteNotification(notificationId){
        return axios.delete(`${backend}/ELIMINAR-NOTIFICACION/${notificationId}`);
    }
    
    static archiveNotification(notificationId){
        return axios.post(`${backend}/ARCHIVAR-NOTIFICACION/${notificationId}`);
    }

    static listArchivedNotifications(boolean, userName){
        return axios.post(`${backend}/LISTAR-NOTIFICACIONES-ARCHIVADAS/${boolean}/${userName}`)
    }


    //METODOS DE MENSAJERIA
    static searchChat(ownerId, jsonChat){
        return axios.post(`${backend}/BUSCAR-CHAT/${ownerId}`, jsonChat,{
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    static listChats(userName){
        return axios.post(`${backend}/LISTAR-CHATS/${userName}`);
    }

    static showMessages(participant1Id, participant2UserName, participant1UserName){
        return axios.post(`${backend}/LISTAR-MENSAJES/${participant1Id}/${participant2UserName}/${participant1UserName}`);
    }
    
    static createMessage(ownerId, jsonMessage){
        return axios.post(`${backend}/CREAR-MENSAJE/${ownerId}`, jsonMessage, {
            headers:{
                "Content-Type": "application/json"
            }
        })
    }
    
    static seenMessages(participant1Id, participant2UserName, participant1UserName){
        return axios.put(`${backend}/VISTO/${participant1Id}/${participant2UserName}/${participant1UserName}`);
    }
    
    static deleteChat(chatId){
        return axios.delete(`${backend}/ELIMINAR-CHAT/${chatId}`);
    }
    
}
