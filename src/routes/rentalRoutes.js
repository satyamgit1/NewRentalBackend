import express from 'express';
import {
  createRental,
  getRentals,
  updateRental,
  deleteRental,
  markReturned
} from '../controllers/rentalController.js';

const router = express.Router();

router.post('/', createRental);
router.get('/', getRentals);
router.put('/:id', updateRental);
router.delete('/:id', deleteRental);
router.patch('/:id/return', markReturned);

export default router;