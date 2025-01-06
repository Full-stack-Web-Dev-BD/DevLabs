// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
const routes = require('./routers'); // Import main router
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all origins
app.use(helmet()); // Add security headers
app.use(morgan('dev')); // Log HTTP requests



// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error(`Database connection error: ${error}`));

// Routes
app.use('/api', routes); // Main API routes
 


app.get("/", (req, res) => {
  const htmlContent = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0;">
      <div style="text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fff; max-width: 400px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
        <h1 style="color: #FC4B3E; font-size: 30px; margin-bottom: 20px;">Welcome to DevUnicornLabs</h1>
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
        10X Your Sales with DevUnicornLabs  Bangladesh's Top Web Design Company!
        </p>
        <a href="https://devunicornlabs.com" target="_blank">
        <button  style="padding: 10px 20px; font-size: 16px; background-color: #FC4B3E; color: #fff; border: none; border-radius: 5px; cursor: pointer; text-transform: uppercase;">
          Visit Our Website
        </button>
        </a>
      </div>
    </div>
  `;
  return res.send(htmlContent);
});


// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ message: 'Server error' });
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
