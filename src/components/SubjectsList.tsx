import { useEffect, useState } from "react";

interface Subject {
    id: number;
    name: string;
    course_id: number;
    teacher_id: number;
}
export default function SubjectsList() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [error, setError] = useState("");
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/subjects", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => setSubjects(data))
            .catch(() => setError("Error al obtener las asignaturas"));
    }, []);
    return (
        <div className="p-6 bg-gray-100 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Asignaturas</h2>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-2">
                {subjects.map((subject) => (
                    <li key={subject.id} className="p-2 border rounded bg-white shadow">
                        <strong>{subject.name}</strong> - ID Curso:
                        {subject.course_id}
                    </li>
                ))}
            </ul>
        </div>
    );
} 