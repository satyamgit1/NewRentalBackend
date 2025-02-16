import express from 'express';
import { exportClothes, exportRentals } from '../controllers/exportController.js';

const router = express.Router();

router.get('/clothes', exportClothes);
router.get('/rentals', exportRentals);

export default router;