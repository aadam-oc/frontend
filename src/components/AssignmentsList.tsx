import { useEffect, useState } from "react";
interface Assignment {
    id: number;
    title: string;
    due_date: string;
    subject_id: number;
}
export default function AssignmentsList() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [error, setError] = useState("");
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/assignments", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => setAssignments(data))
            .catch(() => setError("Error al obtener las tareas"));
    }, []);
    return (
        <div className="p-6 bg-gray-100 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Tareas</h2>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-2">
                {assignments.map((assignment) => (
                    <li key={assignment.id} className="p-2 border rounded bg-white shadow">
                        <strong>{assignment.id}. {assignment.title}</strong> - Fecha de
                        entrega: {assignment.due_date}
                    </li>
                ))}
            </ul>
        </div>
    );
} 
