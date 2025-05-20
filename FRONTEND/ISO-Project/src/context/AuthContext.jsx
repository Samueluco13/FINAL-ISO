import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { ArrendamientosService } from "../services/ArrendamientoService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
    const [recordarme, setRecordarme] = useState(false);

  const login = (user, recordarme) => {
    setCurrentUser(user);
    if(recordarme){
      localStorage.setItem("currentUser", JSON.stringify(user));
    }
  };


  const loginGoogle = useGoogleLogin({ //Esta función no devuelve un JWT sino que devuelve un acces_token por lo que no hay que decodificar la res
    onSuccess: async (res) => {
        try {
            // Llama a la API de Google para obtener los datos del usuario
            const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: {
                Authorization: `Bearer ${res.access_token}`
              },
            }).then((res) => res.json());
            console.log("Este es el acces_token: ", res)

            //Imprime en consola los datos que necesitamos
            console.log("Has ingresado con Google, tus datos son:", userInfo);
            const userData = {
              userName: userInfo.name,
              correo: userInfo.email,
              password: userInfo.sub,
              foto: userInfo?.picture /*|| "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" */
            };
            if (userData) {
                  try {
                    const response = await ArrendamientosService.loginUser(userData);
                    console.log("json retorno", response);
                    console.log("Login de google exitoso con el backend:", response.data);
                    login(response.data, recordarme)
                    navigate("/");
                  } catch (error) {
                    console.log(error)
                    setError(error.response?.data || error.message);
                  }
                } else {
                  setError("No hay fokin user de google, hay que primero resgistrarse");
                }
        }catch (error) {
        console.log("No has podido ingresar con Google\n", error);
        }
    },
    onError: () => console.log("Error en Login"),
});


  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  //PERSISTENCIA A LA HORA DE RECARGAR PAGINA
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(storedUser)
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout, loginGoogle, error, setError, recordarme, setRecordarme}}>
      {children}
    </AuthContext.Provider>
  );
};