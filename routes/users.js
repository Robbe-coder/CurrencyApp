var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');
const usersController = require('../controllers/users');

/// Get info from specific user based on username
// GET /api/users/:username
router.get('/', usersController.getUser);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
