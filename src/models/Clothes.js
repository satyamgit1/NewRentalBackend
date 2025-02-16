import mongoose from 'mongoose';

const clothesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productName: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  catalog: { type: String, required: true },
  customCatalog: { type: String },
  quantity: { type: Number, required: true, min: 0 },
  pricePerDay: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Clothes', clothesSchema);