const mongoose =require('mongoose');
const uri='mongodb://localhost:27017/mynotebook';

const connecttomongo=()=>{
    mongoose.connect(uri);
    console.log("connnected  to mongodb")
}

module.exports=connecttomongo;
