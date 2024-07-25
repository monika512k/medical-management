const express = require('express');
require('dotenv/config');
require('./database/db').connect();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Serve static files from the main directory
app.use(express.static(path.join(__dirname, '/')));

// Serve images
app.use('/images', express.static(path.resolve('./images')));

// API Routes
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);


// Handle React routing, return all requests to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
