import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div className="p-6 bg-gray-100 rounded shadow">
            <h1 className="text-3xl font-bold mb-6">Bienvenido a
                Laredu</h1>
            <div className="grid grid-cols-2 gap-4">
                <Link to="/courses" className="p-4 bg-blue-500 text-white rounded shadow hover:bg-blue-400">
                    📖📖 Ver Cursos
                </Link>
                <Link to="/subjects" className="p-4 bg-green-500 textwhite rounded shadow hover:bg-green-400">
                    📚📚 Ver Asignaturas
                </Link>
                <Link to="/assignments" className="p-4 bg-purple-500 text-white rounded shadow hover:bg-purple-400">
                    📝📝 Ver Tareas
                </Link>
                <Link to="/submissions" className="p-4 bg-yellow-500 text-white rounded shadow hover:bg-yellow-400">
                    📤📤 Ver Entregas
                </Link>
                <Link to="/messages" className="p-4 bg-red-500 text-white rounded shadow hover:bg-red-400">
                    💬💬 Ver Mensajes
                </Link>
            </div>
        </div>
    );
} 