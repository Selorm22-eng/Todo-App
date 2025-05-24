import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-400 to-teal-900 px-4 shadow-inner">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Todo App
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Organize your tasks and boost productivity.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;









/*import React from 'react';

function Home() {
  return (
    <div>
      <h1>Welcome to the Todo App</h1>
      <p>Please login or signup to continue.</p>
    </div>
  );
}

export default Home;*/
