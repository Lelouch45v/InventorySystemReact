const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');
app.use(cors());


router.post('/insert-transactions', async (req, res) => {
  try {
  
    const { invoiceNumber, status, subscription, price, issueDate, dueDate } = req.body;

    // Insert the new transaction into the database
    const newTransaction = await pool.query(
      "INSERT INTO transactions (invoiceNumber, status, subscription, price, issueDate, dueDate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [invoiceNumber, status, subscription, price, issueDate, dueDate]
    );

    // Return the inserted transaction data
    res.json(newTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
    // Here you might want to add more specific error handling
    res.status(500).send("Server Error");
  }
});
router.get('/api/transactions', async (req, res) => {
  try {
    const allTransactions = await pool.query("SELECT * FROM transactions");
    console.log(allTransactions.rows); // Check the data being returned
    res.json(allTransactions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" }); // Ensure this is a JSON response
  }
});


module.exports = router;