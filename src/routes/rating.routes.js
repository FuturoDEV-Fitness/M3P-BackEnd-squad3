const { Router } = require('express');
const RatingController = require('../controllers/RatingController');

const ratingRoutes = Router();

ratingRoutes.post('/', RatingController.createRating);

ratingRoutes.get('/:locationId', RatingController.getRatingsByLocation);

module.exports = ratingRoutes;

