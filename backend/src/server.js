import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Start Express Server directly so Render stays active even if DB connection is pending or failing
app.listen(PORT, () => {
  console.log(`⚙️ Server is running at port : ${PORT}`);
  
  // Connect to Database asynchronously
  connectDB()
    .then(() => {
      console.log("✅ Database connection established successfully.");
    })
    .catch((err) => {
      console.error("❌ MONGO DB connection failed initially: ", err.message || err);
    });
});
