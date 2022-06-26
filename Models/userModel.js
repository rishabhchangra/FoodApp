const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const emailvalidator=require('email-validator');
const crypto=require('crypto');

const db_link='mongodb+srv://admin:j7tXxVeIkLj4O4qr@cluster0.x3gif.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('user db connected');
})
.catch(function(err){
    console.log(err);
})
    
const userSchema= mongoose.Schema({
name:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true,
    unique: true,
    validate: function(){

        return emailvalidator.validate(this.email);
    }
},
password:{
    type: String,
    required: true,
    minlength:8
},
confirmpassword: {
    type: String,
    required: true,
    minlength:8,
    validate: function(){

        return this.confirmpassword==this.password
    }
},
role:{

    type: String,
    enum:['admin','user', 'restaurant owner', 'delivery boy'],
    default:'user'
},
profile_image:{

        type: String,
        default: 'img/users/default.jpeg' 

},
resetToken: String
,
plan: [{ 
    type: mongoose.Schema.ObjectId,
    ref:'planModel'
}]
});

userSchema.pre(/^find/, function(next)
{   
    try{

    this.populate({path:"plan"});
    next();}
    catch(err){
        console.log("insidepre catch")
    }
})

userSchema.methods.createResetToken=function(){


    const resetToken=crypto.randomBytes(32).toString("hex");
    this.resetToken= resetToken;
    return resetToken;
}



userSchema.methods.resetPasswordHandler=function(password,confirmpassword){

    this.password=password;
    this.confirmpassword=confirmpassword;
    this.resetToken=undefined;

}

const userModel=mongoose.model('userModel', userSchema);
module.exports=userModel;