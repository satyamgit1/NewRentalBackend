import Clothes from '../models/Clothes.js';
import { sendLowStockAlert } from '../services/emailService.js';

export const checkLowStock = async () => {
  try {
    const lowStockItems = await Clothes.find({ quantity: { $lt: 3 } });
    
    for (const item of lowStockItems) {
      await sendLowStockAlert(item);
    }
    
    console.log('Low stock check completed');
  } catch (error) {
    console.error('Low stock check error:', error);
  }
};

// Run check every 6 hours
setInterval(checkLowStock, 21600000);