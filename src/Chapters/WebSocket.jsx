import { useEffect, useState } from "react";

function WebSocket() {
  const [socket, setSocket] = useState();
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000");

    ws.onopen = () => {
      console.log("web socket connection opened");
      setSocket(ws);
    };

    ws.on;

    ws.onmessage = (event) => {
      setMessage((prev) => [...prev, event.data]);
    };

    ws.onerror = (error) => {
      console.log("websocket error:", error);
    };

    ws.onclose = () => {
      console.log("web socket connection closed!");
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSend = () => {
    if (socket && input.trim != "") {
      socket.send(input);
      setMessage((prev) => [...prev, `you: ${input}`]);
      setInput("");
    }
  };
  console.log(message, "message++");
  return (
    <div className="">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button onClick={handleSend}>Send</button>
      {message?.length > 0 && message.map((msg) => <div>{msg}</div>)}
    </div>
  );
}

export default WebSocket;
