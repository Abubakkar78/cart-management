const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Debugging Logs
console.log('Initializing routes...');
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
console.log('Routes loaded.');

// Error Handling Middleware
app.use(errorHandler);

// MongoDB Connection
console.log('Connecting to MongoDB...');
mongoose
  .connect(process.env.MONGO_URL) // Use the environment variable for MongoDB URL
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));