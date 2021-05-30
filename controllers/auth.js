const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {

    let username = req.body.username;
    let name = req.body.name;
    let password = req.body.password;

    if(!username.includes("@student.thomasmore.be")) {
        res.json({
            "status": "error",
            "error": "Not a Thomas More email address."
        });
        return;
    }

    const user = new User({
        username: username,
        name: name,
        amount: 100
    });
    
    await user.setPassword(password);
    await user.save().then(result => {
        console.log(result);
        let token = jwt.sign({
            uid: result._id
        }, "MyVerySecretWord");
        res.json({
            "status": "success",
            "result": result,
            "data": {
                "token": token
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
        /*
        if(!result.user) {
            return res.json({
                "status": "failed",
                "message": "login failed"
            });
        }
        */
        if(!result.error) {
            let token = jwt.sign({
                uid: result.user._id
            }, "MyVerySecretWord");
    
            return res.json({
                "status": "success",
                "data": {
                    "token": token
                }
            });
        } else {
            res.json({
                "status": "error",
                "message": result.error.message
            });
        }


    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        });
    });
}

module.exports.signup = signup;
module.exports.login = login;