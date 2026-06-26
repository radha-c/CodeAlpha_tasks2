import React, { useState } from "react";
import "./Chatbot.css";

import { findBestMatch }
from "../utils/similarity";

function Chatbot() {

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text: "Hello! Ask me anything."
      }
    ]);

  const [input, setInput] =
    useState("");

  const handleSend = () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    const botMessage = {
      sender: "bot",
      text: findBestMatch(input)
    };

    setMessages([
      ...messages,
      userMessage,
      botMessage
    ]);

    setInput("");
  };

  return (
    <div className="chat-container">

      <h1>FAQ Chatbot</h1>

      <div className="chat-box">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "user-message"
                : "bot-message"
            }
          >
            {msg.text}
          </div>
        ))}

      </div>

      <div className="input-area">

        <input
          type="text"
          placeholder="Ask your question..."
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
        />

        <button
          onClick={handleSend}
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default Chatbot;