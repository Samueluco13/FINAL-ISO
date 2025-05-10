import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2025 Sistema de Avisos. Todos los derechos reservados.</p>
        <div className="social-links">
          <a href="#" className="social-link">
            Facebook
          </a>
          <a href="#" className="social-link">
            Twitter
          </a>
          <a href="#" className="social-link">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;