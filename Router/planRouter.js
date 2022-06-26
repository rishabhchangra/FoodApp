const express=require('express');
const planRouter=express.Router();
const {getAllUsers,getUser,updateUser,deleteUser,myfunction}=require('../Controller/userController');
const {signup, login,isAuthorised, protectroute, forgetpassword, resetpassword}=require('../Controller/authController');
const {getallplans, getplan, createplan, updateplan, deleteplan, top3plans}= require('../Controller/planController');
const {getplanreviews}=require('../Controller/reviewController');
const reviewRouter = require('./reviewRouter');




//user options
planRouter
.route('/getallplans')
.get(getallplans)

planRouter
.route('/plan/:id')
.get(getplan)

planRouter
.route('/plan/:id/getplanreviews')
.get(getplanreviews)

planRouter
.route('/top3plans')
.get(top3plans)


planRouter.use(protectroute);


planRouter.use(isAuthorised(['admin']))
planRouter
.route('/createplan')
.post(createplan)

planRouter
.route('/plan/:id')
.patch(updateplan)
.delete(deleteplan) 



module.exports=planRouter;

