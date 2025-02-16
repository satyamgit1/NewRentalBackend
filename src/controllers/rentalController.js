import Rental from '../models/Rental.js';
import Clothes from '../models/Clothes.js';

export const createRental = async (req, res) => {
  try {
    const { clothes: clothesId, quantity, ...rentalData } = req.body;
    
    const clothes = await Clothes.findById(clothesId);
    if (!clothes) return res.status(404).json({ error: 'Clothes not found' });
    if (clothes.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    const totalPrice = clothes.pricePerDay * rentalData.days;
    const remainingAmount = totalPrice - rentalData.advanceAmount;

    const rental = await Rental.create({
      clothes: clothesId,
      ...rentalData,
      totalPrice,
      remainingAmount
    });

    // Update inventory
    clothes.quantity -= quantity;
    await clothes.save();

    res.status(201).json(rental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRentals = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    
    if (status === 'active') filter.isReturned = false;
    if (status === 'returned') filter.isReturned = true;

    const rentals = await Rental.find(filter)
      .populate('clothes')
      .sort({ rentDate: -1 });

    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('clothes');

    if (!rental) return res.status(404).json({ error: 'Rental not found' });
    res.json(rental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental) return res.status(404).json({ error: 'Rental not found' });
    
    // Restock if not returned
    if (!rental.isReturned) {
      const clothes = await Clothes.findById(rental.clothes);
      clothes.quantity += 1;
      await clothes.save();
    }

    res.json({ message: 'Rental deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markReturned = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id).populate('clothes');
    if (!rental) return res.status(404).json({ error: 'Rental not found' });

    rental.isReturned = true;
    rental.clothes.quantity += 1;
    
    await Promise.all([rental.save(), rental.clothes.save()]);
    
    res.json(rental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};