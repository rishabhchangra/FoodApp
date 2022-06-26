const mongoose=require('mongoose');
const db_link='mongodb+srv://admin:j7tXxVeIkLj4O4qr@cluster0.x3gif.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('plan db connected');
})
.catch(function(err){
    console.log(err);
})
    
const planSchema= mongoose.Schema({
planname:{
    type: String,
    required: true,
    maxlength: [20,"name should be less than 20 characters"],
    unique:true
},
duration:{
    type: Number,
    required: true,
    minlength:8,
    default:5
},
price: {
    type: Number,
    required: [true,"price not entered"]
},
ratingsaverage:{

    type: Number,
    default:0
},
discount:{

        type: Number,
        validate: [function(){
            this.discount<100
        },"discount should be less than 100"]
    },
numberofratings:{

    type:Number,
    default:0


}
});


const planModel=mongoose.model('planModel', planSchema);


// (async function createnewplan(planObj){


//     // let planObj={
//     //     planname:"Superfood",
//     //     duration:30,
//     //     price:500,
//     //     ratingsaverage:5,
//     //     discount:20
//     // }

//     let data= await planModel.create(planObj);
//     console.log(data);

// })();


module.exports = planModel;

