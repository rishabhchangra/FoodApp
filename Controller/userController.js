const express=require('express');
const JWT=require('jsonwebtoken');
const {jwt_key}= require('../../secret');
const userModel=require('../Models/userModel');



module.exports.getUser=async function getUsers(req,res){

    let id=req.id;
    let user= await userModel.findById(id);
    if(user){
        res.json({message:"user is", user});
    }
    else 
        res.json({message: "user not found" });
}

// module.exports.getUsers=async function getUsers(req,res){

//     let allusers= await userModel.find();
//     // console.log(req.query);
//     res.json({message: "List of users" , data:allusers});
// }


// module.exports.postUser=function postUser(req,res){

//     console.log(req.body);
//     users=req.body;
//     console.log(users);
//     res.json({"message" : "Received"}); 
// }



module.exports.updateUser=async function updateUser(req,res){

    try{
    let id= req.params.id;
    let user= await userModel.findById(id);
    let datatobeupdated= req.body;
    if (user){
        for(let key in datatobeupdated)
        {   
            
            user[key]=datatobeupdated[key];   
        }

        let dataupdated=await user.save();
        res.send({"message": "updated successfully"});
    }
    else 
        res.send({message:"user not found"});
    
    }
    catch(err){
        res.json({message:err.message});
     }
};




module.exports.deleteUser=async function deleteUser(req,res){


    try{
    // users={};
    let id= req.params.id;
    let user= await userModel.findById(id);

    if(user){

        let datadeleted= await userModel.findByIdAndDelete(id);
        res.json({datadeleted,message:"deleted"});
    }
    
    }catch(err) {

        res.json({message:"user not found"});
    } 
};



module.exports.getAllUsers=async function getAllUsers(req,res){
   
    
    try{
    let users= await userModel.find();
    if(users){

        res.json({message:"List of Users", users});
    }
    else {

        res.json({message:"No users"});
    }
    } 
    catch(err){
        res.json({message:err.message});
    }
};



