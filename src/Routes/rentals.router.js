import express from 'express'

import { insertRentalController, getRentalController, finishingRentedController } from '../Controller/rentals.controller.js';
import { insertRentalMiddleware } from '../Middleware/rentals.middleware.js';

const router = express.Router();

router.post('/rentals', insertRentalMiddleware,insertRentalController);
router.get('/rentals' , getRentalController)
router.post('/rentals/:id/return', finishingRentedController)

export default router;