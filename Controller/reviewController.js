// const express=require('express');
// const res = require('express/lib/response');
// const JWT=require('jsonwebtoken');
// const {jwt_key}= require('../../secret');
const planModel = require('../Models/planModel');
const reviewModel = require('../Models/reviewModel');


module.exports.createreview=async function createreview(req,res){

   try{
        let id=req.params.plan
        let plan=await planModel.findById(id)
        let reviewObj=req.body;
        let sumofratings=plan.numberofratings*plan.ratingsaverage
        plan.numberofratings=plan.numberofratings+1;
        plan.ratingsaverage=(sumofratings+reviewObj.rating)/plan.numberofratings;
        let plansaved= plan.save();
        let data= await reviewModel.create(reviewObj);
        res.json({message:"review created", data});

}
catch(err){

        res.json({message:err.message});
}
}

module.exports.getallreviews=async function getallreviews(req,res){

        try{
  
             let data= await reviewModel.find();
             res.json({message:"reviews are", data});
         
         }
         catch(err){
         
                 res.json({message:err.message});
         }
}


module.exports.deletereview= async function deletereview(req,res){

        try{
                
                let id= req.params.id;
                let review= await reviewModel.findById(id);
                

                if(review){
                        let plan= await planModel.findById(review.plan);
                        // console.log(plan);
                        // console.log(plan.numberofratings)
                        // console.log(plan.ratingsaverage)
                        let sumofratings=plan.numberofratings*plan.ratingsaverage
                        plan.numberofratings=plan.numberofratings-1;

                        
                        if(plan.numberofratings==0)
                              {
                                      plan.ratingsaverage=0
                              }
                        else
                        { 
                                plan.ratingsaverage=(sumofratings-review.rating)/plan.numberofratings
                        }
                        // console.log(plan.numberofratings)
                        // console.log(plan.ratingsaverage)
                        await plan.save();
                        let datadeleted=await reviewModel.findByIdAndDelete(id);

                        res.json({datadeleted,message:"deleted"});
                }
                else
                        res.json({message:"review not present"})
        }
        catch(err){

                res.json({message:err.message});
        }
}




module.exports.getplanreviews=async function getplanreviews(req,res){

try{
     let id=req.params.id;
     let data= await reviewModel.find({plan:id});
     res.json({message:"reviews are", data});
 
 }
 catch(err){
 
         res.json({message:err.message});
 }
 }


 module.exports.top3reviews=async function top3reviews(req,res){

        try{
                let data= await reviewModel.find().sort({'ratings':-1}).limit(3);;
    
        if(data){
            return res.json({message:"Top 3 reviews are ", data});

        }
        else
            return res.json({message:"No reviews in DB", data});

        }
        catch(err){

                res.json({message:err.message});
        }


 }


 module.exports.updatereview= async function updatereview(req,res){


        try{

                let id= req.params.id;
                let review= await reviewModel.findById(id);

                let datatobeupdated= req.body;
                let old_rating=review.rating;
                if (review){


                        for(let key in datatobeupdated)
                        {   
                            // console.log(key);
                            review[key]=datatobeupdated[key];   
                        }
                
                        let dataupdated=await review.save();
                        
                        let diff=dataupdated.rating-old_rating;
                        let plan= await planModel.findById(review.plan);
                       
                        plan.ratingsaverage=(plan.ratingsaverage*plan.numberofratings+diff)/plan.numberofratings;
                     
                        await plan.save();

                        res.send({"message": "updated successfully"});
                    }
                    else 
                        res.send({message:"review not found"});
                    
        }
        catch(err){

                res.json({message:err.message});
        }


        }
 

// module.exports.deletereview = async function deletereview(req,res){

//         try{

//                 let id= req.params.id;
//                 let user= await reviewModel.findById(id);
            
//                 if(user){
            
//                     let datadeleted= await reviewModel.findByIdAndDelete(id);
//                     res.json({datadeleted,message:"deleted"});
//                 }
                
//                 }catch(err) {
            
//                     res.json({message:"model not found"});
//                 } 


// }


