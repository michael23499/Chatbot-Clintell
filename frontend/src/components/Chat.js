import React, { useState, useEffect } from "react";
import "./chat.css";

const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState(""); // Estado para el input del usuario

  const handleStartChat = () => {
    setShowChat(true);
    // window.voiceflow.chat.open();
  };

  const handleUserMessage = async (userMessage) => {
    const botResponse = await getBotResponse(userMessage);

    // Extraer la respuesta del bot
    const responseMessage = botResponse.trace.find(item => item.type === "text").payload.message;

    // Guardar en la base de datos
    await saveMessageToDatabase(userMessage, responseMessage);

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: userMessage, bot: responseMessage }
    ]);

    // Limpiar el input después de enviar el mensaje
    setUserInput("");
  };

  const getBotResponse = async (userMessage) => {
    try {
      const response = await fetch("https://general-runtime.voiceflow.com/public/675df55c07b610a31c256f54/state/user/cm4r4luc80000356jh6qfmjgf/interact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: {
            type: "text",
            payload: userMessage
          }
        })
      });

      if (!response.ok) {
        throw new Error("Error al obtener la respuesta del bot");
      }

      const data = await response.json();
      console.log("Respuesta del bot:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      return { trace: [{ type: "text", payload: { message: "Lo siento, hubo un error al obtener la respuesta." } }] };
    }
  };

  const saveMessageToDatabase = async (userMessage, botResponse) => {
    const usuarioId = 1; // Cambia esto según tu lógica de autenticación

    try {
      const response = await fetch('http://localhost:8000/api/guardar_mensaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario_id: usuarioId,
          mensaje: userMessage,
          respuesta: botResponse,
          fecha: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorText = await response.text(); // Obtener el texto de error
        throw new Error(`Error al guardar el mensaje en la base de datos: ${errorText}`);
      }

      console.log('Mensaje guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar el mensaje:', error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.async = true;
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '675df55c07b610a31c256f54' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production'
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    if (userInput.trim()) { // Verificar que el input no esté vacío
      handleUserMessage(userInput);
    }
  };

  return (
    <div className="chat-container">
      {!showChat ? (
        <div className="welcome-block">
          <h1 className="textoclass">{"Bienvenidos a Michael Asistente"}</h1>
          <p className="textosimple">{"Por favor, da clic en el icono inferior derecho para comenzar a sacar provecho de toda mi información y haz todas las preguntas que desees."}</p>
          <button className="buttoncomenzar" onClick={handleStartChat}>
            {"Comenzar"}
          </button>
        </div>
      ) : (
        <div className="chat-interface">
          <p className="textosimple">{"Realiza todas las preguntas que desees."}</p>
          {/* Aquí puedes mapear los mensajes */}
          {messages.map((msg, index) => (
            <div key={index}>
              <p><strong>Usuario:</strong> {msg.user}</p> {/* Cambiado aquí */}
              <p><strong>Michael Asistente:</strong> {msg.bot}</p>
            </div>
          ))}
          <form className="formpart1" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
