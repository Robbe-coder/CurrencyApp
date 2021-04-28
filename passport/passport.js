const User = require('../models/User');
const passport = require('passport');
 // CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
    
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());