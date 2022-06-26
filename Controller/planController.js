// const express=require('express');
// const res = require('express/lib/response');
// const JWT=require('jsonwebtoken');
// const {jwt_key}= require('../../secret');
const planModel = require('../Models/planModel');


// const userModel=require('../Models/userModel');

module.exports.createplan=async function createplan(req,res){

    try{

        let data=req.body;
        if(data){

            let datacreated= await planModel.create(data);
            return res.json({message:"plan created",datacreated})

        }
        else
            return res.json({message:"empty body"});
        
    }
    catch(err){
        res.json({message:err.message});
    }
}

module.exports.getallplans=async function getallplans(req,res){
    
    try{

        const data= await planModel.find();
       
        if(data){
            return res.json({message:"List of plans", data})

        }
        else
            return res.json({message:"No plans"});
    }
    catch{

        return res.json({message:err.message})
    }

}


module.exports.getplan=async function getplan(req,res){

    try{

            let pid=req.params.id;
            // console.log(pid);
            let plan= await planModel.findById(pid);
            if(plan){

               return res.json({message:"Plan details are", plan})

            }
            else
                return res.json({message:"Plan not present"});
    }
    catch(err){
        return res.json({message:err.message})
    }

}


module.exports.myplan= function myplan(req,res){
    
    let plan=req.plan
    
    return res.json({message:"plan details are", plan})
}



// module.exports.top3plans=function top3plans(req,res){

//     console.log("inside top 3 plans");
//     res.json({message:"Top 3 plans"})
// }

module.exports.top3plans=async function top3plans(req,res){

    // console.log("hello world");

    // res.json({message:"Hello"})

    try{

        let data= await planModel.find().sort({'ratingsaverage':-1}).limit(3);
        if(data){
            return res.json({message:"Top 3 plans are ", data});

        }
        else
            return res.json({message:"No plans in DB", data});

    }
    catch(err){

            res.json({message:err.message});
        
    }

}



module.exports.updateplan=async function updateplan(req,res){

    try{
    let id= req.params.id;
    let plan= await planModel.findById(id);
    let datatobeupdated= req.body;
    if (plan){
        for(let key in datatobeupdated)
        {   
            // console.log(key);
            plan[key]=datatobeupdated[key];   
        }

        let dataupdated=await plan.save();
        res.send({"message": "updated successfully"});
    }
    else 
        res.send({message:"plan not found"});
    
    }
    catch(err){
        res.json({message:err.message});
     }
};




module.exports.deleteplan=async function deleteplan(req,res){


    try{
    // users={};
    let id= req.params.id;
    let user= await planModel.findById(id);

    if(user){

        let datadeleted= await planModel.findByIdAndDelete(id);
        res.json({datadeleted,message:"deleted"});
    }
    
    }catch(err) {

        res.json({message:"model not found"});
    } 
};