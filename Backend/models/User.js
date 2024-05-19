const mongoose=require('mongoose');
const {Schema}=mongoose;

const Userschema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:new Date(Date.now())
    }
})

module.exports=mongoose.model('user',Userschema);