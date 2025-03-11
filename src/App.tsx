import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import CoursesList from './components/CoursesList';
import SubjectsList from './components/SubjectsList';
import AssignmentsList from './components/AssignmentsList';
import SubmissionsList from './components/SubmissionsList';
import MessageList from './components/MessageList';
import Navbar from './components/Navbar';
import Dashboard from "./components/Dashboard";



export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const handleLoginSuccess = (receivedToken: string) => {
      
      setToken(receivedToken);
    
    };
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(() => {
        localStorage.removeItem("token");
        setToken(null);
      })
      .catch((err) => console.error(err));
  };
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        {!token ? (
          <Routes>
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register onRegisterSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <>
            {token && <Navbar onLogout={handleLogout} />}

            <div className="p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<CoursesList />} />
                <Route path="/subjects" element={<SubjectsList />} />
                <Route path="/assignments" element={<AssignmentsList />}
                />
                <Route path="/submissions" element={<SubmissionsList />}
                />
                <Route path="/messages" element={<MessageList />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
} 
