const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const bookControllers = controllers.bookControllers;

router.get('/', bookControllers.getAll);

module.exports = router;