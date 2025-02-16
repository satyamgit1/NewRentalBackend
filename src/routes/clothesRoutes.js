import express from 'express';
import {
  createClothes,
  getClothes,
  updateClothes,
  deleteClothes
} from '../controllers/clothesController.js';

const router = express.Router();

router.post('/', createClothes);
router.get('/', getClothes);
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);

export default router;