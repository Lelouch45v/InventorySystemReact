const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

router.use(cors());
router.use(express.json());



router.post('/insert-transactions', async (req, res) => {
  try {
    const { invoiceNumber, status, subscription, price, issueDate, dueDate } = req.body;

    // Example validation (very basic)
    if (!invoiceNumber || !status || !subscription || !price || !issueDate || !dueDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTransaction = await pool.query(
      "INSERT INTO transactions (invoiceNumber, status, subscription, price, issueDate, dueDate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [invoiceNumber, status, subscription, price, issueDate, dueDate]
    );

    res.json(newTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
})

router.get('/api/transactions', async (req, res) => {
  try {
    const allTransactions = await pool.query("SELECT * FROM transactions");
    res.json(allTransactions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" }); 
  }
});


module.exports = router;