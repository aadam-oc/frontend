import React, { useEffect, useState } from "react";
interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    is_read: boolean;
    created_at: string;
}
export default function MessageList() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [receiverId, setReceiverId] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/messages", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => setMessages(data))
            .catch(() => setMessage("Error al obtener mensajes"));
    }, []);
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                receiver_id: parseInt(receiverId),
                content,
            }),
        })
            .then((res) => res.json())
            .then(() => setMessage("Mensaje enviado con éxito"))
            .catch(() => setMessage("Error al enviar mensaje"));
    };
    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Mensajería</h2>
            {message && <p className="text-green-500">{message}</p>}
            <form onSubmit={handleSendMessage} className="mb-4 flex space-x-2">
                <input
                    type="number"
                    placeholder="ID Destinatario"
                    className="border p-2 rounded"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Mensaje"
                    className="border p-2 rounded"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit" className="bg-green-600 text-white p-2 rounded">
                    Enviar
                </button>
            </form>
            <ul className="space-y-2">
                {messages.map((msg) => (
                    <li key={msg.id} className="p-2 border rounded bgwhite shadow">
                        <strong>{msg.sender_id === 2 ? "Yo" : `Usuario
${msg.sender_id}`}</strong>:{" "}
                        {msg.content} - {new
                            Date(msg.created_at).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
} 