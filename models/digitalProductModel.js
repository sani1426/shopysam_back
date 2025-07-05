import mongoose from 'mongoose'

const digitalProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
    },
    colors: {
      type: [String],
    },
  },
  { timestamps: true }
)

const DigitalModel = mongoose.model('Digital', digitalProductSchema)

export default DigitalModel
