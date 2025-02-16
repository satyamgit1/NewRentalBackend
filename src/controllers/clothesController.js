import Clothes from '../models/Clothes.js';
import { sendLowStockAlert } from '../services/emailService.js';

export const createClothes = async (req, res) => {
  try {
    const { catalog, customCatalog, ...rest } = req.body;
    const finalCatalog = catalog === 'other' ? customCatalog : catalog;
    
    const clothes = await Clothes.create({
      ...rest,
      catalog: finalCatalog
    });

    if (clothes.quantity < 3) {
      await sendLowStockAlert(clothes);
    }

    res.status(201).json(clothes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getClothes = async (req, res) => {
  try {
    const clothes = await Clothes.find();
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClothes = async (req, res) => {
  try {
    const clothes = await Clothes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!clothes) {
      return res.status(404).json({ error: 'Clothes not found' });
    }

    if (clothes.quantity < 3) {
      await sendLowStockAlert(clothes);
    }

    res.json(clothes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteClothes = async (req, res) => {
  try {
    const clothes = await Clothes.findByIdAndDelete(req.params.id);
    if (!clothes) {
      return res.status(404).json({ error: 'Clothes not found' });
    }
    res.json({ message: 'Clothes deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};