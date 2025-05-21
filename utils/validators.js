// utils/validators.js

export const isEmail = (email) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(String(email).toLowerCase());
  };
  
  export const isPasswordStrong = (password) => {
	// At least 6 characters (adjust as needed)
	return password && password.length >= 6;
  };
  
  export const isNonEmpty = (value) => {
	return typeof value === 'string' && value.trim() !== '';
  };
  