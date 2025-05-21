// controllers/todoController.js
import Todo from '../models/todo.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new todo
export const createTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.create({
    user: req.user._id,
    text: req.body.text,
    completed: false,
  });
  res.status(201).json(todo);
});

// @desc    Get all todos for user
export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(todos);
});

// @desc    Update a todo
export const updateTodo = asyncHandler(async (req, res) => {
	const todo = await Todo.findById(req.params.id);
  
	if (!todo) {
	  res.status(404);
	  throw new Error('Todo not found');
	}
  
	if (!todo.user.equals(req.user._id)) {
	  res.status(401);
	  throw new Error('Not authorized');
	}
  
	console.log('Updating Todo ID:', req.params.id);
	console.log('Request Body:', req.body);
  
	const updated = await Todo.findByIdAndUpdate(
	  req.params.id,
	  req.body,
	  { new: true, runValidators: true }
	);
  
	res.status(200).json(updated);
  });

  

// @desc    Delete a todo
export const deleteTodo = asyncHandler(async (req, res) => {
	const todo = await Todo.findById(req.params.id);
  
	if (!todo) {
	  res.status(404);
	  throw new Error('Todo not found');
	}
  
	console.log('todo.user:', todo.user);
	console.log('req.user._id:', req.user._id);
  
	if (!todo.user.equals(req.user._id)) {
	  res.status(401);
	  throw new Error('Not authorized');
	}
  
	await todo.deleteOne();
  
	res.status(200).json({ message: 'Todo deleted' });
  });
  