import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database first, then start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGO DB connection failed !!! ", err);
    process.exit(1);
  });
