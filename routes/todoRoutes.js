// routes/todoRoutes.js
import express from 'express';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from '../controllers/todoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateTodo } from '../validators/todoValidator.js';

const router = express.Router();

router.route('/')
  .post(protect, validateTodo, createTodo)
  .get(protect, getTodos);

router.route('/:id')
  .put(protect, validateTodo, updateTodo)
  .delete(protect, deleteTodo);

export default router;
