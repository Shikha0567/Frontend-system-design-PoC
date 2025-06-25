import React, { useEffect, useState } from "react";

const SSE = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/sse");
    eventSource.onmessage = (event) => {
      setMessage((prev) => [...prev, event.data]);
    };
    eventSource.onerror = (error) => {
      console.error("❌ SSE connection error", error);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">📡 Server-Sent Events</h2>
      <ul className="bg-gray-100 p-4 rounded">
        {message.map((msg, idx) => (
          <li key={idx} className="mb-1">
            🕒 {msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SSE;
