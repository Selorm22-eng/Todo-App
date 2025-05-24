import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ Correct import

function Navbar() {
    const { user, logout } = useContext(AuthContext); // ✅ Correct usage
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-emerald-800 text-white px-8 py-4 shadow-black  border-b-2 border-yellow-600">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo / Home */}
          <div className="text-xl font-bold">
            <Link to="/" className="hover:text-yellow-200 transition">TodoApp</Link>
          </div>
  
          {/* Nav Links */}
          <div className="space-x-4 text-sm sm:text-base">
            {user ? (
              <>
                <Link
                  to="/todos"
                  className="hover:bg-blue-600 px-4 py-2 rounded-md transition"
                >
                  Todos
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-700 hover:bg-gray-200 px-4 py-2 rounded-md transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
        /* <nav>
            <div className="bg-teal-700 text-white  px-4 font-md py-2 text-3xl border-y-2 border-green-950">
            <Link to="/">Home</Link>
            {user ? (
                <>
                    <Link to="/todos">Todos</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" className="px-20">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}
            </div>
        </nav>*/
    );
}

export default Navbar;
