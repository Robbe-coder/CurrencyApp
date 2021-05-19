const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

const getAll = (req, res) => {
    res.json({
        "status": "success",
        "message": "test"
    }).catch(err => {
        res.json({
            "status": "error",
            "error": error
        });
    });
}

module.exports.getAll = getAll;