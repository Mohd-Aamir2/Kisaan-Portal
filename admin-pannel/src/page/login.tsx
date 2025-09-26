import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appcontext";
import toast from "react-hot-toast";

const AuthPage = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext must be used within AppContextProvider");

  const { token, setToken, username, setUsername, email, setEmail, role, setRole } = context;

  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("manager");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin
        ? "http://localhost:4000/api/admin/login"
        : "http://localhost:4000/api/admin/signup";

      const body = isLogin
        ? { email, password }
        : { username, email, password, role };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Request failed");

      if (!isLogin) {
        toast.success("Signup successful! Please login.");
        setIsLogin(true);
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("manager");
        return;
      }

      // ✅ Login successful
      setToken(data.token);
      setUsername(data.username);
      setEmail(data.email);
      setRole(data.role);

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Admin Login" : "Admin Signup"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded p-2 mb-3"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2 mb-3"
          required
        />

        {!isLogin && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded p-2 mb-3"
          >
            <option value="manager">Manager</option>
            <option value="associate">Associate</option>
            <option value="developer">Developer</option>
            <option value="cyber">Cyber</option>
            <option value="notification-manager">Notification Manager</option>
            <option value="feedback-manager">Feedback Manager</option>
          </select>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {loading ? (isLogin ? "Logging in..." : "Signing up...") : isLogin ? "Login" : "Signup"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" onClick={toggleMode} className="text-green-600 font-semibold">
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
