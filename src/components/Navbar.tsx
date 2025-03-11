import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
interface NavbarProps {
    onLogout: () => void;
}
export default function Navbar({ onLogout }: NavbarProps) {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between
items-center shadow-lg">
            <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold">📚📚 Laredu</span>
                <Link className="hover:text-gray-300"
                    to="/courses">Cursos</Link>
                <Link className="hover:text-gray-300"
                    to="/subjects">Asignaturas</Link>
                <Link className="hover:text-gray-300"
                    to="/assignments">Tareas</Link>
                <Link className="hover:text-gray-300"
                    to="/submissions">Entregas</Link>
                <Link className="hover:text-gray-300"
                    to="/messages">Mensajes</Link>
            </div>
            <LogoutButton onLogout={onLogout} />
        </nav>
    );
} 