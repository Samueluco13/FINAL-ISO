import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { ArrendamientosService } from '../services/ArrendamientoService'
import { Popup } from '../components/Popup';
import ButtonUG from '../components/ButtonUG';

export const AvisoReports = () => {
    const {id} = useParams()
    const [reportes, setReportes] = useState([]);
    const [motivo, setMotivo] = useState("");
    const [deactivatePopup, setDeactivatePopup] = useState(false);
    const [keepPopup, setKeepPopup] = useState(false);
    const [reasonDeactivatePopup, setReasonDeactivatePopup] = useState(false);
    const [reasonKeepPopup, setReasonKeepPopup] = useState(false);
    const [reporteDesicion, setReporteDesicion] = useState({});


    useEffect(() => {
        const showReports = async () => {
        try{
            const reports = await ArrendamientosService.showReports(id);
            console.log("Todo el objeto de peticion: ", reports);
            console.log("Todas los reportes: ", reports.data);
            setReportes(reports.data);
        }catch(error){
            console.log(error.reports?.data);
            console.log(error.message);
        }
        }
        showReports();
    }, [])


    const handleResolve = async (reporteId, valido) => {
        const laDesicion = {
            valido,
            desicion: motivo
        }
        console.log("Esto se va a mandar -- ", laDesicion);
        console.log("Debes ser el mismo: ", reporteId);
        try{
            const resolucion = await ArrendamientosService.resolveReport(reporteId, laDesicion);
            console.log("Respuesta: ", resolucion);
            console.log("Resolucion enviada: ", resolucion.data);
            if(valido){
                setDeactivatePopup(true);
            }else{
                setKeepPopup(true)
            }
            setMotivo("");
        }catch(error){
            console.log(error.response?.data || error.message);
        }
    };



    return (
        <div className="dashboard">
        <h2>Revisar Reportes</h2>
        {reportes.length === 0 ? (
            <p>No hay reportes pendientes de revisión.</p>
            ) : (
            <div className="avisos-list">
                {reportes.map((reporte) => (
                <div key={reporte.id} className="aviso-card">
                    <h3>Reporte: {reporte.motivo}</h3>
                    <p>Usuario: {reporte.nombreUsuarioReporte}</p>
                    {reporte.comentarios === "" ? <p>No hay comentarios</p> : <p>Comentarios: {reporte.comentarios}</p>}
                    <div className="aviso-actions">
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            setReporteDesicion(reporte)
                            setReasonDeactivatePopup(true)
                        }} //Para desactivar el aviso
                    >
                        Desactivar Aviso
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setReporteDesicion(reporte)
                            setReasonKeepPopup(true)
                        }} //Para mantener el aviso
                    >
                        Mantener Aviso
                    </button>
                    </div>
                </div>
                ))}
            </div>
            )}
            {reasonDeactivatePopup && (
                <Popup
                text="Ingresa el motivo de desactivación"
                button={
                    <div>
                        {console.log(reporteDesicion)}
                        <button onClick={() => handleResolve(reporteDesicion.id, true)}>
                            Desactivar
                        </button>
                        <button onClick={() => setReasonDeactivatePopup(false)} >
                            Cancelar
                        </button>
                    </div>
                }>
                    <div className="form-group">
                        <textarea
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        />
                    </div>
                </Popup>
            )}
            {reasonKeepPopup && (
                <Popup
                text="Ingresa el motivo de su desicion"
                button={
                    <div>
                        {console.log(reporteDesicion)}
                        <button onClick={() => handleResolve(reporteDesicion.id, false)}>
                            Mantener
                        </button>
                        <button onClick={() => setReasonKeepPopup(false)} >
                            Cancelar
                        </button>
                    </div>
                }>
                    <div className="form-group">
                        <textarea
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        />
                    </div>
                </Popup>
            )}
            {deactivatePopup && (
                <Popup
                    text="La publicacion fue desactivada"
                    button={<ButtonUG ruta={"/revisar-reportes"} children={"Ok"} />}
                />
            )}
            {keepPopup && (
                <Popup
                    text="La publicación no fue desactivada"
                    button={<ButtonUG ruta={"/revisar-reportes"} children={"Ok"} />}
                />
            )}
        </div>
    )
}
