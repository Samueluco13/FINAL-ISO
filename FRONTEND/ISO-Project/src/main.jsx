import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/AuthPages.css";
import "./styles/buttons.css";
import "./styles/Popup.css";
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = "779705522780-an2ep7plbjsf4o4elij1ujlhm8dvnhc4.apps.googleusercontent.com"

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </GoogleOAuthProvider>
);