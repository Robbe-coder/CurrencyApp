const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

const getAll = (req, res) => {
    res.json({
        "status": "success",
        "message": "Get test"
    }).catch(err => {
        res.json({
            "status": "error",
            "error": error
        });
    });
}

const addTransaction = (req, res) => {
    res.json({
        "status": "success",
        "message": "Post test"
    });
}

module.exports.getAll = getAll;
module.exports.addTransaction = addTransaction;