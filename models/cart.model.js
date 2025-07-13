import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const CartModel = mongoose.model('Cart', cartSchema)

export default CartModel
