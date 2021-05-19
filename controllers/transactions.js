const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

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
    let amount = req.body.amount;
    let message = req.body.message;
    let person_to_id = req.body.person_to_id;
    let person_from_id = req.body.person_from_id;
    let reason = req.body.reason;

    const newTransaction = new Transaction({
        amount: amount,
        message: message,
        person_to_id: person_to_id,
        person_from_id: person_from_id,
        reason: reason
    });
    
    newTransaction
        .save()
        .then(data => {
            res.json({
                "status": "success",
                "data": data
            })
        })
        .catch(err => {
            res.json({
                "status": "error",
                "error": error
            });
        });
}

module.exports.getAll = getAll;
module.exports.addTransaction = addTransaction;