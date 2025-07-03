import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
        name : {
            type : String ,
            required : true ,
            trim : true
        },
        email : {
            type : String ,
            required : true ,
            unique : true ,
            trim : true
        },
        password : {
            type : String,
            rquired : true ,
        },
        gender : {
            type : String ,
            enum : ['Men' , 'Women'] ,
            required : true
        },
        role : {
            type : String ,
            enum : ['customer' , 'admin'],
            default : 'customer'
        },
    
    },{
        timestamps : true
    })
    
const UserModel = mongoose.model('User' , userSchema);


export default UserModel;