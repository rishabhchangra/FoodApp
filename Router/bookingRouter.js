
const express=require('express');
const bookingRouter=express.Router();
const {getAllUsers,getUser,updateUser,deleteUser,myfunction}=require('../Controller/userController');
const {signup, login,isAuthorised, protectroute, forgetpassword, resetpassword}=require('../Controller/authController');
const {getallplans, getplan, createplan, updateplan, deleteplan, top3plans}= require('../Controller/planController');
const {getplanreviews}=require('../Controller/reviewController');
const reviewRouter = require('./reviewRouter');
const { createSession } = require('../Controller/bookingController');


bookingRouter.post('/createsession', protectroute, createSession);
bookingRouter.get('/createsession', function(req,res){

res.sendFile("E:/Backend Development/FoodApp/booking.html");


});

module.exports=bookingRouter;