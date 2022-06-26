const express=require('express');
const userRouter=express.Router();
const {getAllUsers,getUser,updateUser,deleteUser}=require('../Controller/userController');
const {signup, login,isAuthorised, protectroute, forgetpassword, resetpassword, logout, loginpage}=require('../Controller/authController');
const { myplan } = require('../Controller/planController');

//user options

userRouter
.route('/loginpage')
.get(loginpage)



userRouter
.route('/signup')
.post(signup)


userRouter
.route('/login')
.post(login)

userRouter
.route('/forgotpassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)
 

//profile page 
userRouter.use(protectroute);
userRouter
.route('/userProfile')
.get(getUser);


userRouter
.route('/:id/myplans')
.get(myplan)

userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser) 

userRouter
.route('/logout')
.get(logout)





//admin specific route
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUsers)



module.exports = userRouter;