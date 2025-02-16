import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  clothes: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clothes',
    required: true
  },
  customerName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  rentDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  days: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  advanceAmount: { type: Number, default: 0 },
  remainingAmount: { type: Number, required: true },
  isReturned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Rental', rentalSchema);