import { generateExcel } from '../utils/excelGenerator.js';
import Clothes from '../models/Clothes.js';
import Rental from '../models/Rental.js';

export const exportClothes = async (req, res) => {
  try {
    const clothes = await Clothes.find();
    const buffer = generateExcel(clothes);
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=clothes.xlsx');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const exportRentals = async (req, res) => {
  try {
    const rentals = await Rental.find().populate('clothes');
    const buffer = generateExcel(rentals);
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=rentals.xlsx');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};