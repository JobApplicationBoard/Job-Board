const db = require('../models/jobModels');
const bcrypt = require('bcrypt');

const userController = {};
const saltRounds = 10;

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  const query = `
  INSERT INTO users (username, password)
  VALUES ($1, $2) 
  RETURNING *
  `;

  try {
    console.log('I am password from user: ', password);
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('I am hashed password: ', hash);
    const result = await db.query(query, [username, hash]);
    console.log('I am result from database: ', result);
    const newUser = result.rows[0];
    console.log('I am result.rows[0]: ', newUser);
    res.locals.newUser = newUser;
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.createUser during hashing: ${err}`,
      status: 400,
      message: { err: 'Error occurred in userController.createUser' },
    });
  }
};

userController.login = async (req, res, next) => {
  const { username, password } = req.body;
  const query = `
    SELECT * 
    FROM users 
    WHERE username = $1
  `;

  try {
    const result = await db.query(query, [username]);
    console.log('I am result from login post request: ', result);
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ error: 'Cannot find user or invalid password' });
    }
    const user = result.rows[0];
    console.log('I am result.rows[0]: ', user);
    const match = await bcrypt.compare(password, user.password); //first arguement will be hashed
    if (!match) {
      return res
        .status(401)
        .json({ error: 'Cannot find user or invalid password' });
    }
    res.locals.user = { username: user.username, id: user.user_id }; //Didnt store password in res.locals.user for security
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.login: ${err}`,
      status: 500,
      message: { err: 'An error occurred during the login process' },
    });
  }
};

userController.getUser = (req, res, next) => {};

userController.verifyUser = (req, res, next) => {};

userController.deleteUser = async (req, res, next) => {
  const { username, password } = req.body;
  const query = `
  SELECT user_id, password
  FROM users
  WHERE username = $1
  `;

  try {
    const result = await db.query(query, [username]);
    console.log('I am result from delete post request: ', result);
    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Cannot find user or invalid password' });
    }
    const user = result.rows[0];
    console.log('I am result.rows[0]: ', user);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ error: 'Cannot find user or invalid password' });
    }
    res.locals.deletedUser = { username: user.username, id: user.user_id };

    const deleteQuery = `
    DELETE FROM users
    WHERE user_id = $1
    `;
    const deleteUserResult = await db.query(deleteQuery, [user.user_id]);
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.deleteUser: ${err}`,
      status: 500,
      message: { err: 'An error occurred during the delete user process' },
    });
  }
};

module.exports = userController;
