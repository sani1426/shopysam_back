import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
        name : {
            type : String ,
            required :[ true , "Provide name"] ,
        },
        email : {
            type : String ,
            required :[ true , "Provide email"] ,
            unique : true ,
        },
        password : {
            type : String,
            required :[ true , "Provide password"] ,
        },
        avatar : {
            type : String ,
            default: ""
        },
        mobile: {
            type: Number ,
            default: null
        },
        verify_email: {
            type: Boolean ,
            default: false
        },
        last_login_date :{
            type: Date,
            default: ""
        },
        status: {
            type: String ,
            enum: ["Active" , "Inactive" , "Suspended"],
            default : "Active"
        },
        address_details : [
            {
                type: mongoose.Schema.ObjectId ,
                ref: 'Address'
            }
        ],
        shopping_cart : [
            {
                type: mongoose.Schema.ObjectId ,
                ref: 'Cart'
            }
        ],
        order_history: [
            {
                type: mongoose.Schema.ObjectId ,
                ref: "Order"
            }
        ],
        forgot_password_otp: {
            type: String ,
            default : null
        },
        forgot_password_expiry: {
            type: Date ,
            default : ""
        },
        role : {
            type : String ,
            enum : ['User' , 'Admin'],
            default : 'User'
        },
        gender: {
            type : String ,
            enum : ["Men" , "Women" , "Unisex"]
        }
    
    },{
        timestamps : true
    })
    
const UserModel = mongoose.model('User' , userSchema);


export default UserModel;