import React, { useEffect, useState } from "react";
interface Submission {
    id: number;
    assignment_id: number;
    user_id: number;
    submitted_at: string;
    grade: number | null;
}
export default function SubmissionsList() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [assignmentId, setAssignmentId] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/submissions", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => setSubmissions(data))
            .catch(() => setMessage("Error al obtener entregas"));
    }, []);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/submissions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                user_id: 2, // Esto debe cambiarse para tomar el ID delusuario autenticado
                assignment_id: parseInt(assignmentId),
                submitted_at: new Date().toISOString(),
                grade: null,
            }),
        })
            .then((res) => res.json())
            .then(() => setMessage("Tarea entregada con éxito"))
            .catch(() => setMessage("Error al entregar tarea"));
    };
    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Entregas de
                Tareas</h2>
            {message && <p className="text-green-500">{message}</p>}
            <form onSubmit={handleSubmit} className="mb-4 flex space-x2">
                <input
                    type="number"
                    placeholder="ID de la Tarea"
                    className="border p-2 rounded"
                    value={assignmentId}
                    onChange={(e) => setAssignmentId(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white
p-2 rounded">
                    Entregar Tarea
                </button>
            </form>
            <ul className="space-y-2">
                {submissions.map((submission) => (
                    <li key={submission.id} className="p-2 border rounded
bg-white shadow">
                        <strong>ID Tarea:
                            {submission.assignment_id}</strong> - Entregado el{" "}
                        {new
                            Date(submission.submitted_at).toLocaleDateString()} -{" "}
                        {submission.grade !== null ? `Nota:
${submission.grade}` : "Sin nota"}
                    </li>
                ))}
            </ul>
        </div>
    );
} 