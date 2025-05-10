import React from "react";
import "../styles/Popup.css";

export const Popup = ({ text, button, children }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Aviso</h2>
        <p>{text}</p>
        {children}
        {button}
      </div>
    </div>
  );
};