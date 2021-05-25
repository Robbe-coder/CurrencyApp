const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req,res, next) => {
    let email = req.body.email;
    let username = req.body.username; 
    let password = req.body.password;

    const user = new User({username: username, email: email, amount: 100});
    await user.setPassword(password);
    await user.save().then(result => {
        console.log(result);
        let token = jwt.sign({
            _id: result._id 
        }, "MyVerySecretWord")
        res.json({
            "status": "success",
            "result": result, 
            "data":{
                "token":token
            }
        });
    }).catch(error => {
        console.log(error);
        res.json({
            "status": "error",
            "error": error
        });
    });
}

const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        res.json({
            "status": "success",
            "data": result
        });
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        });
    });
}

module.exports.signup = signup;
module.exports.login = login;