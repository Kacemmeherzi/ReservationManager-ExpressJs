const mongoose = require('mongoose')  ;
const bcrypt = require('bcryptjs') ;


const userschema = new mongoose.Schema ( {
    username : {type : String ,unique  : true } ,password : {type :String, unique: true} 
},{collation: "users"}
)

userschema.pre('save' , async function (next){
const salt = await bcrypt.genSalt(10);

const user = this ; 
if (user.isModified("password")){
    user.password = await bcrypt.hash(user.password,salt) ;
    next();
}


})
const User = mongoose.model ('User',userschema) ;
module.exports= User ; 
