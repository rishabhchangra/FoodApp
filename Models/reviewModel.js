const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const emailvalidator=require('email-validator');
const crypto=require('crypto');

const db_link='mongodb+srv://admin:j7tXxVeIkLj4O4qr@cluster0.x3gif.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('review db connected');
})
.catch(function(err){
    console.log(err);
})
    
const reviewSchema= mongoose.Schema({

review:{
    type: String,
    required: true,
    maxlength: 300
},
user:{
    type: mongoose.Schema.ObjectId,
    ref: 'userModel',
    required: true
},
plan: {
    type: mongoose.Schema.ObjectId,
    ref: 'planModel',
    required: true

    },
rating:{
    type: Number,
    min:1,
    max:10,
    required: true,
},
date:{

    type:Date,
    default:Date.now(),
    required: true
}

});

reviewSchema.pre(/^find/, function(next)
{   

    this.populate({
    path: "user",
    select: "name profile_image"});
    this.populate({path:"plan"});
    next();

}
)


const reviewModel=mongoose.model('reviewModel', reviewSchema);
module.exports=reviewModel;