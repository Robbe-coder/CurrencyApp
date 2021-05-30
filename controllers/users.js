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

module.exports.getUser = getUser;