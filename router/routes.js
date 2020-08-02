const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
// const register = require('../controllers/registerHandler')
// const login = require('../controllers/loginHandler')
// const getUser = require('../controllers/getUser')
// const logout = require ('../controllers/logoutHandler')
// const google = require ('../controllers/googleHandler')
// const googleAuth = require('../controllers/authenticateGoogle')
const bookControllers = controllers.bookControllers;
const authControllers = controllers.authControllers;

router.get('/', bookControllers.getAll);
router.get('/home', bookControllers.getHomePageData);
router.post('/login', authControllers.login)
router.post('/register', authControllers.addUser)
router.post('/login/google', authControllers.addGoogleUser)
router.post('/googleauth', authControllers.googleAuth)
router.get('/user', authControllers.getUser)
router.get('/logout', authControllers.logout)

module.exports = router;
