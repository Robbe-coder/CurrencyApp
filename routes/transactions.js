const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactions');

// Routes

//// Get all transactions
// GET /api/transactions
router.get('/', transactionController.getAll);

/// Get all transactions from specific user
// GET /api/transactions/:user-id

//// Add new transaction
// POST /api/transactions
router.post('/', transactionController.addTransaction);

module.exports = router;