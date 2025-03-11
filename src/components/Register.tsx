import React, { useState } from "react";
interface RegisterProps {
    // onRegisterSuccess hara un login y recibirá el token
    onRegisterSuccess: (token: string) => void;
}
export default function Register( { onRegisterSuccess }: RegisterProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password}),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al registrar usuario");
                }
                return res.json();
            })
            .then((data) => {
                onRegisterSuccess(data.token);
                setMessage("Usuario registrado con éxito");
            }
            )
            .catch((err) => setMessage(err.message));
    };
    return (
        <div className="max-w-sm mx-auto bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Registro</h2>
            {message && <p className="text-green-500 mb-2">{message}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                    type="text"
                    placeholder="Nombre"
                    className="border p-2 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
}