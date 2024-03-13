const express = require('express');

const userController = require('../controllers/userController');

const userRouter = express.Router();

// userRouter.get('/login', (req, res) => {
//   // load structure of login page
//   res.status(200).json('Login successful', res.locals.user)
// });

userRouter.post('/login', userController.login, (req, res) => {
  // load structure of login page
  res.status(200).json({ message: 'Login successful', user: res.locals.user });
});

userRouter.post('/login', userController.verifyUser, (req, res) => {
  // post request for logging in
});

userRouter.get('/register', (req, res) => {
  // load structure of register page
});

userRouter.post('/register', userController.createUser, (req, res) => {
  // post request for registering
  res.status(200).json(res.locals.newUser);
});

module.exports = userRouter;
