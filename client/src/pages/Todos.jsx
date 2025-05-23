import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Todos() {
  const { token } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("https://todo-app-3t1o.onrender.com/api/todos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          setError("Failed to fetch todos.");
          return;
        }
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.error("Todo fetching error:", err);
        setError("An error occurred while fetching todos.");
      }
    };

    fetchTodos();
  }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      setError("Todo text cannot be empty.");
      return;
    }

    try {
      const response = await fetch("https://todo-app-3t1o.onrender.com/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to add todo.");
        return;
      }

      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
      setText("");
    } catch (err) {
      console.error("Adding todo error:", err);
      setError("An error occurred while adding todo.");
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const response = await fetch(`https://todo-app-3t1o.onrender.com/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) {
        setError("Failed to update todo.");
        return;
      }

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (err) {
      console.error("Todo update error:", err);
      setError("An error occurred while updating todo.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://todo-app-3t1o.onrender.com/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to delete todo.");
        return;
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Todo deletion error:", err);
      setError("An error occurred while deleting todo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-start justify-center px-4 py-10">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Your Todos</h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded px-4 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleAdd} className="flex gap-3 mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md shadow-sm"
            >
              <span
                onClick={() => handleToggle(todo._id, todo.completed)}
                className={`cursor-pointer text-lg ${
                  todo.completed ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDelete(todo._id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todos;





/*import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Todos() {
  const { token } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  

  useEffect(() => {
	const fetchTodos = async () => {
		try {
		  const response = await fetch('https://todo-app-3t1o.onrender.com/api/todos', {
			headers: { Authorization: `Bearer ${token}` },
		  });
		  if (!response.ok) {
			setError('Failed to fetch todos.');
			return;
		  }
		  const data = await response.json();
		  setTodos(data);
		} catch (err) {
			console.error('Todo fetching error:', err);
		  setError('An error occurred while fetching todos.');
		}
	  };

    fetchTodos();
  }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      setError('Todo text cannot be empty.');
      return;
    }

    try {
      const response = await fetch('https://todo-app-3t1o.onrender.com/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to add todo.');
        return;
      }

      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
      setText('');
    } catch (err) {
		console.error('Adding todo error:', err);
      setError('An error occurred while adding todo.');
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const response = await fetch(`https://todo-app-3t1o.onrender.com/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) {
        setError('Failed to update todo.');
        return;
      }

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? updatedTodo : todo
        )
      );
    } catch (err) {
		console.error('Todo update error:', err);
      setError('An error occurred while updating todo.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://todo-app-3t1o.onrender.com/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError('Failed to delete todo.');
        return;
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
		console.error('Todo deletion error:', err);
      setError('An error occurred while deleting todo.');
    }
  };

  return (
    <div>
      <h2>Your Todos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New Todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ marginTop: '10px' }}>
            <span
              onClick={() => handleToggle(todo._id, todo.completed)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;*/