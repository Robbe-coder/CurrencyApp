var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');
const usersController = require('../controllers/users');
const passport =require('../passport/passport');
/// Get info from specific user based on username
// GET /api/users/:username
router.get('/', usersController.getUser);
router.get('/amount',passport.authenticate('jwt', { session: false }), usersController.getUserAmount);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
