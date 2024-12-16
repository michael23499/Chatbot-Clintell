import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Nuevo estado para el nombre
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showAlert, setShowAlert] = useState(false); // Controlar la visibilidad de la alerta
  const navigate = useNavigate(); // Cambia esto

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    return () => {
      signUpButton.removeEventListener("click", () => {});
      signInButton.removeEventListener("click", () => {});
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Inicio de sesión exitoso.");
        setMessageType("success");

        // Guardar información del usuario en localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ usuario_id: data.usuario_id, name: data.name })
        );

        navigate("/chat");
      } else {
        setMessage(data.message || "Error desconocido.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error de conexión: " + error.message);
      setMessageType("error");
    }

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!name || !email || !password) {
      setMessage("Por favor, completa todos los campos.");
      setMessageType("error");
      setShowAlert(true);
      return;
    }

    try {
      console.log({ name, email, password });
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registro exitoso. Puedes iniciar sesión ahora.");
        setMessageType("success");
        // Limpiar campos
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message || "Error desconocido.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error de conexión: " + error.message);
      setMessageType("error");
    }

    // Mostrar la alerta
    setShowAlert(true);

    // Desaparecer el mensaje después de 3 segundos
    setTimeout(() => {
      setShowAlert(false);
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  return (
    <div className="login-container">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>Crea tú cuenta</h1>
            {showAlert && message && (
              <div className={`alert ${messageType}`}>{message}</div>
            )}
            <div className="social-container">
              <div className="icon-wrap flex row">
                <a href="https://www.linkedin.com/in/michael-arismendi-689a42234/">
                  <div className="flex icon" id="icon-2">
                    <i className="fa fa-envelope"></i>
                  </div>
                </a>
                <a href="https://www.facebook.com/MichaelArismendi12/">
                  <div className="flex icon" id="icon-3">
                    <i className="fa-brands fa-facebook-square"></i>
                  </div>
                </a>
                <a href="https://www.instagram.com/michael_arismendi/">
                  <div className="flex icon" id="icon-4">
                    <i className="fa-brands fa-google"></i>
                  </div>
                </a>
              </div>
            </div>
            <span>Utiliza tú correo electrónico para registrarte</span>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button type="submit">Crear</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Iniciar Sesión</h1>
            <div className="social-container">
              <div className="icon-wrap flex row">
                <a href="https://www.linkedin.com/in/michael-arismendi-689a42234/">
                  <div className="flex icon" id="icon-2">
                    <i className="fa fa-envelope"></i>
                  </div>
                </a>
                <a href="https://www.facebook.com/MichaelArismendi12/">
                  <div className="flex icon" id="icon-3">
                    <i className="fa-brands fa-facebook-square"></i>
                  </div>
                </a>
                <a href="https://www.instagram.com/michael_arismendi/">
                  <div className="flex icon" id="icon-4">
                    <i className="fa-brands fa-google"></i>
                  </div>
                </a>
              </div>
            </div>
            <span>Ingresa tú cuenta</span>
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="http://localhost:3000/?#">¿Olvidó su Contraseña?</a>
            <button type="submit">Ingresar</button>
            {showAlert && message && (
              <div className={`alert ${messageType}`}>{message}</div>
            )}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>¡Bienvenido de nuevo!</h1>
              <p>
                Para mantenerse conectado con nosotros, inicie sesión con su
                información personal.
              </p>
              <button className="ghost" id="signIn">
                Iniciar Sesión
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>¡Bienvenido!</h1>
              <p>
                Introduce tus datos personales y comienza con nosotros a
                compilar tus metas.
              </p>
              <button className="ghost" id="signUp">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
