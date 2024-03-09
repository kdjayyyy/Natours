const express = require('express');
const router = express.Router();
const { getTour, getTours, createTour, updateTour } = require('./../controllers/tourController');

// TOURS ROUTES
router
  .route('/')
  .get(getTours)
  .post(createTour)
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)

module.exports = router;