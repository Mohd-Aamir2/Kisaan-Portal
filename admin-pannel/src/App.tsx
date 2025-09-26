import React, { useEffect, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppContext } from "./context/appcontext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./page/dashboard";
import NotificationsPage from "./page/NotificationPage";
import FeedbackPage from "./page/FeedbackPage";
import UsersPage from "./page/UserPage";
import AdminProfilePage from "./page/adminprofile";
import LoginPage from "./page/login";
import { useNavigate } from "react-router-dom";
function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 const navigate = useNavigate();

   const handlePageChange = (page: string) => {
    setCurrentPage(page);
    navigate(`/${page}`); // yahan URL bhi update hoga
  };

  const context = useContext(AppContext);
  if (!context)
    throw new Error("AppContext must be used within AppContextProvider");

  const { token, setToken } = context;

  // Load token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  };

  // ✅ PrivateRoute helper
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col lg:flex-row">
      {token && (
<Sidebar
  currentPage={currentPage}
  onPageChange={handlePageChange}   // ✅ ab navigate bhi hoga
  isOpen={isSidebarOpen}
  onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
/>
      )}

      <div className="flex-1 lg:pr-64">
        {token && (
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </header>
        )}

        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Private Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <NotificationsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <PrivateRoute>
                  <FeedbackPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UsersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <AdminProfilePage />
                </PrivateRoute>
              }
            />

            {/* Default redirect */}
            <Route
              path="*"
              element={<Navigate to={token ? "/dashboard" : "/login"} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
