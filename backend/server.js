require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, testConnection } = require('./src/config/database');
const User = require('./src/models/User');
//create express app
 const app = express();

 //middleware
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

 //basic test route
 app.get('/', (req, res)=>{
  res.json({

    message: 'TAKE A CHEF API is running!',
    status: 'success',
    timestamp: new Date().toDateString()
  });
 });

 // Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {
  console.log(` Server is running on http://localhost:${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV}`);
  // Test database connection
  await testConnection();

   // Sync models with database (creates tables)
  await sequelize.sync({ alter: true });
  console.log(' Database models synchronized!'); 
});


module.exports = app;