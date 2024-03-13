const express = require('express');

const jobController = require('../controllers/jobController');
const categoryController = require('../controllers/categoryController');

const dbRouter = express.Router();

// job routes

// get one job
dbRouter.get('/job/:id', jobController.getOneJob, (req, res) => {
  const { getOneJob } = res.locals;
  return res.status(200).send(getOneJob);
});

// get all jobs
dbRouter.get('/job', jobController.getAllJobs, (req, res) => {
  const { getAllJobs } = res.locals;
  return res.status(200).send(getAllJobs);
});

// post new job
dbRouter.post('/job', jobController.createJob, (req, res) => {
  return res.status(200).json('Job Successfully Created');
});

// patch job
dbRouter.patch('/job/:id', jobController.updateJob, (req, res) => {
  return res.status(200).send('Job Successfully Updated');
});

// delete job
dbRouter.delete('/job/:id', jobController.deleteJob, (req, res) => {
  return res.status(200).send('Job Successfully Deleted');
});

// category routes

// get one category
dbRouter.get('/category/:id', categoryController.getOneCategory, (req, res) => {
  const { getOneCategory } = res.locals;
  return res.status(200).send(getOneCategory);
});

// get all categories
dbRouter.get('/category', categoryController.getAllCategory, (req, res) => {
  const { getAllCategory } = res.locals;
  return res.status(200).send(getAllCategory);
});

// create category
dbRouter.post('/category', categoryController.createCategory, (req, res) => {
  return res.status(200).json({ category_id: res.locals.category_id });
});

// update category
dbRouter.patch(
  '/category/:id',
  categoryController.updateCategory,
  (req, res) => {
    return res.status(200).send('Category Succesfully Updated');
  }
);

// delete category
dbRouter.delete(
  '/category/:id',
  categoryController.deleteCategory,
  (req, res) => {
    return res.status(200).send('Category Succesfully Deleted');
  }
);

module.exports = dbRouter;
