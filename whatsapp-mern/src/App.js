import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";

import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import axios from "./axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher("126f1214cd5f5ea60828", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app__body">
        <SideBar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
