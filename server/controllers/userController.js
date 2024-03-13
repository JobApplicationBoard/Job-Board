const db = require('../models/jobModels');

const userController = {};

userController.getUser = (req, res, next) => {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  const query = `
  INSERT INTO users (username, password)
  VALUES ($1, $2) 
  RETURNING *
  `;

  db.query(query, [username, password])
    .then((result) => {
      console.log('I am result from database: ', result);
      res.locals.newUser = result.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'userController.createUser: ERROR',
        err,
        message: {
          err: 'Error occurred in userController.createUser. Check server logs for more details.',
        },
      });
    });
};

userController.login = (req, res, next) => {
  const { username, password } = req.body;
  const query = `
    SELECT * 
    FROM users 
    WHERE username = $1
    `;
  console.log('I am username: ', username);
  console.log('I am password: ', password);

  db.query(query, [username])
    .then((result) => {
      console.log('I am result from database: ', result);
      if (result.rows.length === 0 && password !== result.rows.password) {
        return res
          .status(401)
          .json({ error: 'Cannot find user or invalid password' });
      }
      const user = result.rows[0];
      res.locals.user = user;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController.login: ${err}`,
        status: 500,
        message: { err: 'An error occurred during login process' },
      });
    });
};

userController.verifyUser = (req, res, next) => {};

userController.deleteUser = (req, res, next) => {
  const { username, password } = req.body;
  const query = `
  
  `;
};

module.exports = userController;
