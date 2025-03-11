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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        console.log("Token:", token);
        const assignmentIdFinal = parseInt(assignmentId, 10);
        console.log("Parsed assignment ID:", assignmentIdFinal);
        const submitionDate = new Date();
        const formattedDate = `${submitionDate.getFullYear()}-${(submitionDate.getMonth() + 1).toString().padStart(2, '0')}-${submitionDate.getDate().toString().padStart(2, '0')}`;
        console.log("Fecha formateada:", formattedDate);
        const grade = null;
        console.log("Grade:", grade);
        const user_idFinal = 1;
        console.log("localStorage User ID:", localStorage.getItem("userId"));
        console.log("User ID:", user_idFinal);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/submissions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    "user_id": user_idFinal,
                    "assignment_id": assignmentIdFinal,
                    "submitted_at": formattedDate,
                    "grade": grade
                }),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                // Si la respuesta no es OK, trata de extraer el mensaje de error
                const errorData = await response.json();
                console.error("Error en la API:", errorData);
                throw new Error(errorData.message || "Error al entregar tarea.");
            } else {
                fetch("http://127.0.0.1:8000/api/submissions", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                    .then((res) => res.json())
                    .then((data) => setSubmissions(data))
                    .catch(() => setMessage("Error al obtener entregas"));
            }

            setMessage("Tarea entregada con éxito");
            setAssignmentId(""); // Limpiar el input después de un éxito

        } catch (error) {
            console.error("Error al entregar tarea:", error);
            setMessage("Error al entregar tarea.");
        }
    };
    return (
        <div className="p-6 bg-gray-100 rounded shadow">
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
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Entregar Tarea
                </button>
            </form>
            <ul className="space-y-2">
                {submissions.map((submission) => (
                    <li key={submission.id} className="p-2 border rounded bg-white shadow">
                        <strong>ID Tarea:
                            {submission.assignment_id}</strong> - Entregado el{" "}
                        {new
                            Date(submission.submitted_at).toLocaleDateString()} -{" "}
                        {submission.grade !== null ? `Nota: ${submission.grade}` : "Sin nota"}
                    </li>
                ))}
            </ul>
        </div>
    );
} 