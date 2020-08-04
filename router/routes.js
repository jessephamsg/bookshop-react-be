const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const bookControllers = controllers.bookControllers;
const authControllers = controllers.authControllers;

router.get('/', bookControllers.getAll);
router.get('/home', bookControllers.getHomePageData);
router.get('/search', bookControllers.getSearchData);
router.post('/login', authControllers.login)
router.post('/register', authControllers.addUser)
router.post('/login/google', authControllers.addGoogleUser)
router.post('/googleauth', authControllers.googleAuth)
router.get('/user', authControllers.getUser)
router.get('/logout', authControllers.logout)

module.exports = router;
