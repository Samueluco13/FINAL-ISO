import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/buttons.css";

const ButtonUG = ({ children, ruta }) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(ruta)} className="button-nav">
        {children}
        </button>
    );
};

export default ButtonUG;