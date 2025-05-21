// validators/todoValidator.js
import { isNonEmpty } from '../utils/validators.js';

export const validateTodo = (req, res, next) => {
  const { text } = req.body;

  if (!isNonEmpty(text)) {
    return res.status(400).json({ message: 'Todo text is required' });
  }

  next();
};
