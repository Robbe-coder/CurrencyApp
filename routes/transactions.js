var express = require('express');
var router = express.Router();
const transactionController = require('../controllers/transactions');

// Routes

//// Get all transactions
// GET /api/transactions
router.get('/', transactionController.getAll);

/// Get all transactions from specific user
// GET /api/transactions/:user-id
//router.get('/usertransactions', transactionController.getUserTransactions);
//// Add new transaction
// POST /api/transactions
router.post('/:id', transactionController.addTransaction);

module.exports = router;