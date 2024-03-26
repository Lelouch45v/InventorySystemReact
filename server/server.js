const express = require('express'); // Import Express
const cors = require('cors'); // Import CORS
const { Pool } = require('pg'); // Import Pool from pg
const pool = require('./db');
const transactionRoutes = require('./routes/Transactions');


const app = express();
const PORT = process.env.PORT || 3000;



// Middlewares
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.use(transactionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the pool if it's needed in other parts of your application
module.exports = pool;
