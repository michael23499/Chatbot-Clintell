import React from "react"; // Importar React
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importar componentes de enrutamiento
import Login from "./components/Login"; // Importar el componente de inicio de sesión
import Chat from "./components/Chat"; // Importar el componente de chat

// Componentes principales de la aplicación
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App; // Exportar el componente App
