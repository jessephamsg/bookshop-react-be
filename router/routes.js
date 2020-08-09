const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const changePassword = require('../controllers/changePassword');
const changeUserProfile = require('../controllers/changeUserProfile');
const booksReview = require('../controllers/booksReview');
const bookControllers = controllers.bookControllers;
const authControllers = controllers.authControllers;
const accountControllers = controllers.accountControllers;

router.get('/', bookControllers.getAll);
router.get('/home', bookControllers.getUniqueCategories);
router.get('/books', bookControllers.getBookData);
router.get('/search', bookControllers.getSearchData);
router.post('/booksreview', booksReview.updateBookReview);
router.get('/books/:index', bookControllers.getBookById);
router.get('/uniqueCat', bookControllers.getUniqueCategories);
router.get('/cat/:catName', bookControllers.getCatListingData);
router.put('/books/checkout', bookControllers.updateBookPurchaseQty);

router.post('/login', authControllers.login);
router.post('/register', authControllers.addUser);
router.post('/login/google', authControllers.addGoogleUser);
router.post('/googleauth', authControllers.googleAuth);
router.post('/changepassword', changePassword.changeLocalPassword);
router.post('/changeUserProfile', changeUserProfile.changeUserProfile)
router.get('/user', authControllers.getUser);
router.get('/logout', authControllers.logout);

router.get('/user/orders', accountControllers.getUserOrderHistory);
router.put('/user', accountControllers.updateUserOrderHistory);


module.exports = router;
