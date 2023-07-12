const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller');
const userController = new UserController();

router.post('/signup', userController.UsersSighUp);

module.exports = router;
