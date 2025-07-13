import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
        address_line : {
                type: String ,
                default : ""
        },
        city: {
                type: String ,
                default : ""
        },
        state: {
                type : String ,
                default : ""
        },
        post_code: {
                type : String
        },
        country: {
                type : String
        },
        mobile : {
                type : Number
        },
        status: {
                type : Boolean ,
                default: true
        }
},
{
        timestamps : true
})

const AddressModel = mongoose.model("Address" , addressSchema)

export default AddressModel