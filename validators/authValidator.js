// validators/authValidator.js
import { isEmail, isPasswordStrong, isNonEmpty } from '../utils/validators.js';

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!isNonEmpty(name)) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!isEmail(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  if (!isPasswordStrong(password)) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!isEmail(email) || !isNonEmpty(password)) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  next();
};

