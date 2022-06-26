const express=require('express');
const reviewRouter=express.Router();
const res = require('express/lib/response');
const JWT=require('jsonwebtoken');
const {jwt_key}= require('../../secret');
const planModel = require('../Models/planModel');
const {createreview, getallreviews, top3reviews, deletereview, updatereview}= require('../Controller/reviewController')
const {protectroute}= require('../Controller/authController')



reviewRouter
.route('/getallreviews')
.get(getallreviews)


reviewRouter
.route('/top3')
.get(top3reviews)


reviewRouter.use(protectroute);

reviewRouter
.route('/:plan')
.post(createreview)


reviewRouter
.route('/:id')
.patch(updatereview)
.delete(deletereview)



module.exports= reviewRouter