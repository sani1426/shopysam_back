
import mongoose from 'mongoose'
import ClothModel from './models/clothModel.js'
import DigitalModel from './models/digitalProductModel.js'
import Cloth from './data/product_1.js'
import Digital from './data/product_2.js'



const main = async () => {
  try {

    await mongoose.connect("mongodb+srv://samankarimi1426:sam.jester1@cluster0.soceaiz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" , {
      dbName : "shopysam",
    })

    await ClothModel.deleteMany()
    await DigitalModel.deleteMany()
    const createdCloth = await ClothModel.insertMany(Cloth)
    const createdDigitals = await DigitalModel.insertMany(Digital)

    console.log({
      createdCloth, createdDigitals ,
      message: 'Seeded database successfully',
    })
    process.exit(0)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed database')
  }
}

main()