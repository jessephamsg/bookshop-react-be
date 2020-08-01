const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const register = require('../controllers/registerHandler')
const login = require('../controllers/loginHandler')
const getUser = require('../controllers/getUser')
const logout = require ('../controllers/logOutHandler')
const google = require ('../controllers/googleHandler')
const googleAuth = require('../controllers/authenticateGoogle')

const bookControllers = controllers.bookControllers;

router.get('/', bookControllers.getAll);
router.get('/home', bookControllers.getHomePageData);

router.post('/login', login.login)

router.post('/register', register.addUser)

router.post('/login/google', google.addGoogleUser)

router.post('/googleauth', googleAuth.googleAuth)

router.get('/user', getUser.getUser)

router.get('/logout', logout.logout)

module.exports = router;