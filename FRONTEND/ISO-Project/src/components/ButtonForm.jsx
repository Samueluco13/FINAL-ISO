import React from "react";
import "../styles/buttons.css";

const ButtonForm = ({ text, type = "button", onClick }) => {
  return (
    <button type={type} onClick={onClick} className="button-form">
      {text}
    </button>
  );
};

export default ButtonForm;