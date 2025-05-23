import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { validateEmail } from "../utils/validateEmail";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email) || password.trim() === "") {
      setError("Please enter a valid email and password.");
      return;
    }

    try {
      const response = await fetch("https://todo-app-3t1o.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Login failed");
        return;
      }

      const data = await response.json();
      login({ name: data.name, email: data.email, _id: data._id }, data.token);
      navigate("/todos");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-2xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded px-4 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;





/*import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { validateEmail } from "../utils/validateEmail";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email) || password.trim() === "") {
            setError("Please enter a valid email and password.");
            return;
        }

        try {
            const response = await fetch("https://todo-app-3t1o.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Login failed");
                return;
            }

            const data = await response.json();
            login(
                { name: data.name, email: data.email, _id: data._id },
                data.token
            );
            navigate("/todos");
        } catch (err) {
			console.error('Login error:', err);
            setError("An error occurred during login.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;*/
