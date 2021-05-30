const Transaction = require('../models/Transaction');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

/*const getAll = (req, res) => {
    let token = req.headers.authorization;
    token = token.split("  ")[1];
    let decode = jwt.decode(token).uid;
    res.json({
        "status": "success",
        "message": "Get test",
        "token":token, 
        "decode": decode
    })
}*/

const addTransaction = (req, res) => {
    let token = req.headers.authorization;
    token = token.split("  ")[1];
    let uid = jwt.decode(token).uid;

    let amount = req.body.amount;
    let message = req.body.message;
    let person_to_id = req.body.person_to_id;
    let person_from_id = uid;
    let reason = req.body.reason;

    const newTransaction = new Transaction({
        amount: amount,
        message: message,
        person_to_id: person_to_id,
        person_from_id: person_from_id,
        reason: reason
    });

    User.findById(person_from_id, (err, result) => {
        if(result.amount < amount) {
            res.json({
                "status": "error",
                "error": "You don't have enough coins."
            });
            return;
        }
        
        let newAmount = result.amount - amount;
        User.findByIdAndUpdate(person_from_id, {amount: newAmount}, (err, result) => {

            User.findById(person_to_id, (err, result) => {
                let newAmount = result.amount + amount;
                User.findByIdAndUpdate(person_to_id, {amount: newAmount}, (err, result) => {
                    newTransaction
                    .save()
                    .then(data => {
                        res.json({
                            "status": "success",
                            "data": data
                        });
                    })
                    .catch(err => {
                        res.json({
                            "status": "error",
                            "error": err
                        });
                    });
                });
            });

        });
    });    

}

const getUserTransactions = (req, res) => {
    //const id = req.params.id; 
    let token = req.headers.authorization;
    token = token.split("  ")[1];
    let decode = jwt.decode(token).uid;
    
    Transaction.find({ $or: [{ "person_to_id": decode }, { "person_from_id": decode }] }, (err, doc) => {
        if(doc) {
            res.json({
                "transactions": doc,
                "personid":decode
                
            });
        }
        else {
            res.json({
                "message":"documents where not found",
                "error": err
            });
        }
    });
}

//module.exports.getAll = getAll;
module.exports.addTransaction = addTransaction;
module.exports.getUserTransactions = getUserTransactions;