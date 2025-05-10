import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import ButtonForm from "../components/ButtonForm.jsx";
import "../styles/forms.css";

const PeticionEdicion = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation(); //Permite el acceso a información de la URL
    const query = new URLSearchParams(location.search); //location.search permite el acceso a lo que hay después del "?"
    const avisoId = query.get("id"); //Toma el id de la URL

    const [aviso, setAviso] = useState(null);
    const [motivo, setMotivo] = useState("");

    useEffect(() => { //Para acceder a la solucitud del aviso que corresponde
        const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
        const foundAviso = avisos.find((a) => a.id === avisoId);
        if (foundAviso) {
            setAviso(foundAviso);
        } else {
            navigate("/");
        }
    }, [avisoId, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
        const updatedAvisos = avisos.map((aviso) =>
            aviso.id === avisoId ? { ...aviso, estado: "desactivado", visible: false, motivoEdicion: motivo } : aviso
        );
            localStorage.setItem("avisos", JSON.stringify(updatedAvisos));

            const historial = JSON.parse(localStorage.getItem("historial")) || [];
            historial.push({
            id: Date.now().toString(),
            accion: "Solicitud de edición",
            avisoId: avisoId,
            titulo: aviso.titulo,
            usuario: currentUser.nombre,
            motivo: motivo,
            fecha: new Date().toISOString(),
            });
            localStorage.setItem("historial", JSON.stringify(historial));

            navigate("/validar-aviso");
    };

    if (!aviso) return null;

    return (
        <div className="form-container">
            <h2>Solicitar edición: {aviso.titulo}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="motivo">Motivo de Edición</label>
                    <textarea
                        id="motivo"
                        name="motivo"
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-actions">
                    <ButtonForm text="Solicitar Edición" type="submit" />
                    <ButtonForm text="Cancelar" onClick={() => navigate("/validar-aviso")} />
                </div>
            </form>
        </div>
    );
};

export default PeticionEdicion;