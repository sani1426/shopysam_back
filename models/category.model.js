import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema(
  {
    name: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

const CategoryModel = mongoose.model('Category', categorySchema)

export default CategoryModel
