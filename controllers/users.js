const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const getUser = (req, res) => {
    if(req.query.username) {
        let username = req.query.username;
        res.json({
            "message": "Searching user...",
            "query": username
        });
    } else {
        res.json({
            "message": "Please enter a valid query.",
        });
    }
};

module.exports.getUser = getUser;