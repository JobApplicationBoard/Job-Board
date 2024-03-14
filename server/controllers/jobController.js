const db = require('../models/jobModels');
const jobController = {};

jobController.getOneJob = (req, res, next) => {

  const { id } = req.params;
  const query = `
        SELECT *
        FROM listings
        WHERE listing_id = $1
    `;

  db.query(query, [id, userId])
    .then((result) => {
      if (result.rows[0] === undefined) {
        return next({
          log: 'Database returned nothing.',
          status: 400,
          message: { err: 'Database returned nothing.' },
        })
      }
      res.locals.getOneJob = result.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error retrieving job from database ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });
};

jobController.getAllJobs = (req, res, next) => {

  // const { userId } = req.cookies;
  const userId = "2";
  const query = `
  SELECT listings.*,categories.*, users.user_id FROM listings
  INNER JOIN categories ON listings.category_id = categories.category_id
  INNER JOIN users ON categories.user_id = users.user_id
  WHERE users.user_id = $1
  `;

  //cleaned up the query
  // const query = `
  //     SELECT listings.* 
  //     FROM listings  
  //     INNER JOIN categories 
  //     ON listings.category_id = categories.category_id 
  //     WHERE user_id = $1;
  //     `

  db.query(query, [userId])
    .then((result) => {

      res.locals.getAllJobs = result.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error retrieving jobs from database ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });
};

jobController.getAllJobsInCategory = (req, res, next) => {
  
  const { id } = req.params
  // const { userId } = req.cookies;
  const userId = "2";
  const query = `
        SELECT listings.*  
        FROM listings 
        INNER JOIN categories 
        ON listings.category_id = categories.category_id 
        WHERE listings.category_id = $1
        AND categories.user_id = $2 
  `;

  db.query(query, [id , userId])
    .then((result) => {
      console.log("I am results", result.rows);
      res.locals.getAllJobsInCategory = result.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error retrieving jobs from database ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });
  
}

jobController.createJob = (req, res, next) => {
  //do not need userId here because category_ids will be unique to users.

  // destructure what we need from req.body
  const { job_role_name, company_name, details, date_applied, category_id } =
    req.body;

  const status = 'status'
  // put destructured content into a params array to be passed into .query method
  const params = [
    job_role_name,
    company_name,
    details,
    date_applied,
    category_id,
    status,
  ];

  const query = `
    INSERT INTO listings (job_role_name, company_name, details, date_applied, category_id, status)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  db.query(query, params)
    .then((result) => {
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error creating job in database, ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });
};

jobController.updateJob = (req, res, next) => {

  //do not need userId here as well. knowing listing id is enough to update a job listing. 
  const { id } = req.params;

  // below is our way of dealing with the fact that you dont
  // know how many update fields will be coming in
  // could be to update 1 field, could be to update 7 fields

  const fields = Object.entries(req.body);

  // setFields will be what we pass into SET field of SQL Update Query
  const setFields = [];

  // iterate through fields to create structure for SQL query and push into setFields
  for (const field of fields) {
    setFields.push(`${field[0]} = '${field[1]}'`);
  }

  console.log({ setFields });
  console.log('I am setFields.join', setFields.join(', '));
  //turn setFields array into string for SQL query
  const query = `
  UPDATE listings
  SET ${setFields.join(', ')}
  WHERE listing_id = $1
  `;
  db.query(query, [id])
    .then((result) => {
      console.log({ result });
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error updating job in database, ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });

  return next();
};

jobController.deleteJob = (req, res, next) => {

  const { id } = req.params;
  const query = `
      DELETE FROM listings
      WHERE listing_id = $1
    `;

  db.query(query, [id])
    .then((result) => {
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error deleting job from database, ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    });
};

module.exports = jobController;
