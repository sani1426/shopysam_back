import mongoose from 'mongoose'


const ConnectToDb = async ()=> {

    try {
        await mongoose.connect(process.env.MONGODB_URI , {
          dbName : "shopysam",
        })
        console.log('successfully connected to mongo db ✔✔👍👍')
      } catch (error) {
        console.error(`Error: ${error.message} 🤢🤢`)
      }
}

export default ConnectToDb