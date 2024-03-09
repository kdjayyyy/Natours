const express = require('express');
const router = express.Router();
const { getTour, getTours, createTour, updateTour, checkID, checkNameAndPrice } = require('./../controllers/tourController');


// TOURS ROUTES

// run the validator of the id before any of the routes are executed
router.param('id', checkID);

router
  .route('/')
  .get(getTours)
  .post(checkNameAndPrice, createTour) // chaining the middleware to the post request

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)

module.exports = router;