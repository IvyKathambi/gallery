require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Initialize app
const app = express();


const getMongoURI = () => {
  // Use Render's env var if available, otherwise fallback to config
  let uri = process.env.MONGODB_URI || config.mongoURI[app.settings.env];

 
  if (uri.startsWith('mongodb://') && !uri.includes('mongodb+srv://')) {
    uri = uri.replace('mongodb://', 'mongodb+srv://');
  }

  return uri;
};

mongoose.connect(getMongoURI(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000
})
.then(() => {
  console.log(`Connected to MongoDB at ${mongoose.connection.host}`);
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1); // Exit if DB connection fails
});


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Import routes
app.use('/', require('./routes/index'));
app.use('/image', require('./routes/image'));


app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    dbState: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED'
  });
});

// Server startup
const PORT = 5000;
// const HOST = process.env.HOST || '0.0.0.0'; 

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await mongoose.connection.close(false);
  console.log('MongoDB connection closed');
  server.close(() => {
    console.log('Server shutdown complete.');
    process.exit(0);
  });
});
console.log(`Render assigned PORT: 5000`);
module.exports = app;