const db = require('../models/jobModels');
const bcrypt = require('bcrypt');

const userController = {};
const saltRounds = 10;

userController.getUser = (req, res, next) => {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const query = `
    INSERT INTO users (username, password)
    VALUES ($1, $2) 
    RETURNING *
    `;
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

// userController.login = (req, res, next) => {
//   const { username, password } = req.body;
//   const query = `
//     SELECT *
//     FROM users
//     WHERE username = $1
//     `;
//   console.log('I am username: ', username);
//   console.log('I am password: ', password);

//   db.query(query, [username])
//     .then((result) => {
//       console.log('I am result from database: ', result);
//       if (result.rows.length === 0 && password !== result.rows.password) {
//         return res
//           .status(401)
//           .json({ error: 'Cannot find user or invalid password' });
//       }
//       const user = result.rows[0];
//       res.locals.user = user;
//       return next();
//     })
//     .catch((err) => {
//       return next({
//         log: `Error in userController.login: ${err}`,
//         status: 500,
//         message: { err: 'An error occurred during login process' },
//       });
//     });
// };

userController.login = async (req, res, next) => {
  const { username, password } = req.body;

  const query = `
    SELECT * 
    FROM users 
    WHERE username = $1
  `;

  try {
    const result = await db.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Cannot find user' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.cookie('userId', user.user_id, { httpOnly: true, sameSite: 'strict' });

    res.locals.user = { username: user.username, id: user.user_id };
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.login: ${err}`,
      status: 500,
      message: { err: 'An error occurred during the login process' },
    });
  }
};

userController.verifyUser = (req, res, next) => {};

userController.deleteUser = (req, res, next) => {
  const { username, password } = req.body;
  const query = `
  
  `;
};

module.exports = userController;
