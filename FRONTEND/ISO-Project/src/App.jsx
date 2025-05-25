import { Route, Routes } from "react-router-dom";
import CreateAviso from "./pages/CreateAviso.jsx";
import EditAviso from "./pages/EditAviso.jsx";
import ValidateAviso from "./pages/ValidateAviso.jsx";
import ReportAviso from "./pages/ReportAviso.jsx";
import ReviewReports from "./pages/ReviewReports.jsx";
import AvisosPropios from "./pages/AvisosPropios.jsx"
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { RecuperatePasswordRequest } from "./pages/RecuperatePasswordRequest.jsx";
import RecuperatePassword from "./pages/RecuperatePassword.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import DeleteProfile from "./pages/DeleteProfile.jsx";
import AllAvisos from "./pages/AllAvisos.jsx";
import Home from "./pages/Home.jsx";
import AvisoDetail from "./pages/AvisoDetail.jsx";
import { AvisoReports } from "./pages/AvisoReports.jsx";
import History from "./pages/History.jsx";
import PeticionEdicion from "./pages/PeticionEdicion.jsx";
import DesactivarAviso from "./pages/DesactivarAviso.jsx";
import Contact from "./pages/Contact.jsx";
import { ChatList } from "./pages/ChatList.jsx";
import {ArchivedNotifications} from "./pages/ArchivedNotifications.jsx"
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./styles/global.css";

const App = () => (
  <AuthProvider>
    <Header />
    <main>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperate-password-request" element={<RecuperatePasswordRequest />} />
        <Route path="/recuperate-password/:token" element={<RecuperatePassword />} />
        <Route
          path="/crear-aviso"
          element={
            <ProtectedRoute allowedRoles={["propietario"]}>
              <CreateAviso />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editar-aviso"
          element={
            <ProtectedRoute allowedRoles={["propietario"]}>
              <EditAviso />
            </ProtectedRoute>
          }
        />
        <Route
          path="/actualizar-perfil"
          element={
            <ProtectedRoute allowedRoles={["propietario", "interesado"]}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/eliminar-perfil"
          element={
            <ProtectedRoute allowedRoles={["propietario", "interesado"]}>
              <DeleteProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/validar-aviso"
          element={
            <ProtectedRoute allowedRoles={["administrador"]}>
              <ValidateAviso />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reportar-aviso"
          element={
            <ProtectedRoute allowedRoles={["propietario", "interesado"]}>
              <ReportAviso />
            </ProtectedRoute>
          }
        />
        <Route
          path="/revisar-reportes"
          element={
            <ProtectedRoute allowedRoles={["administrador"]}>
              <ReviewReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todos-los-avisos"
          element={
            <ProtectedRoute allowedRoles={["administrador"]}>
              <AllAvisos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/historial"
          element={
            <ProtectedRoute allowedRoles={["administrador"]}>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/solicitud-editar-aviso"
          element={
            <ProtectedRoute allowedRoles={["administrador"]}>
              <PeticionEdicion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/desactivar-aviso"
          element={
            <ProtectedRoute allowedRoles={["administrador"]}>
              <DesactivarAviso />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat-aviso"
          element={
            <ProtectedRoute allowedRoles={["propietario", "interesado"]}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats-list"
          element={
            <ProtectedRoute allowedRoles={["propietario", "interesado"]}>
              <ChatList />
            </ProtectedRoute>
          }
        />
        <Route 
        path="/reportes-aviso/:id"
        element={
          <ProtectedRoute allowedRoles={["administrador"]} >
            <AvisoReports />
          </ProtectedRoute>
        }
        />
        <Route path="/aviso/:nombre" element={<AvisoDetail />} />
        <Route
          path="/mis-avisos"
          element={
            <ProtectedRoute allowedRoles={["propietario"]}>
              <AvisosPropios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-archivadas"
          element={
            <ProtectedRoute>
              <ArchivedNotifications />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div className="error">404 - Página no encontrada</div>} />
      </Routes>
    </main>
    <Footer />
  </AuthProvider>
);

export default App;