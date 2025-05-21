export default function validateEnv() {
	if (!process.env.MONGO_URI) {
	  throw new Error('MONGO_URI not defined in .env');
	}
	if (!process.env.JWT_SECRET) {
	  throw new Error('JWT_SECRET not defined in .env');
	}
  }
  
  