const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const getUser = (req, res) => {
    if(req.query.name) {
        let name = req.query.name;

        User.find({ name: { $regex: name, $options: "i" } }, (err, user) => {   
            res.json({
                "message": "Searching user...",
                "query": name,
                "user": user
            });
        });

    } else {
        res.json({
            "message": "Please enter a valid query.",
        });
    }
};

const getUserAmount = (req, res) => {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    let decode = jwt.decode(token).uid;

    User.find({"_id":decode},{amount:1}, (err, doc) => {
        if(doc) {
            res.json({
                "transactions": doc,
                
            });
        }
        else {
            res.json({
                "error": err
            });
        }
    });
}
module.exports.getUserAmount = getUserAmount;
module.exports.getUser = getUser;
