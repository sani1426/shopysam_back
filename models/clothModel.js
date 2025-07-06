import mongoose, { Schema } from 'mongoose'

const clothSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
  },
  brand: {
    type: String,
    required: true,
  },
  avgRating: {
    type: Number,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
  },

  numSales: {
    type: Number,
    default: 0,
  },
  countInStock: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
  },
  colors: {
    type: [String],
  },
  reviews: {
    type: [],
  },
},{
        timestamps : true
})

const ClothModel = mongoose.model('Cloth', clothSchema)

export default ClothModel