import React, { useState } from "react";

interface LoginProps {
    onLoginSuccess: (token: string, userId: number) => void;
    // onLoginSuccess recibirá el token y el userId
}
export default function Login({ onLoginSuccess }: LoginProps) {
    // Estados locales para email y password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Petición POST a /api/login
        fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Invalid credentials");
                }
                return res.json();
            })
            .then((data) => {
                // data.token y data.user vendrán del backend
                onLoginSuccess(data.token, data.user_id);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user_id);
                
            })
            .catch((err) => {
                setError(err.message);
            });
    };
    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500 hover:scale-102 cursor-pointer transition-all"
                >
                    Login
                </button>
            </form>
            </div>
        </div>
    );
} 