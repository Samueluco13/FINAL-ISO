import React from "react";

const FormContainer = ({ children, title, onSubmit }) => {
  return (
    <div className="form-container">
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
};

export default FormContainer;