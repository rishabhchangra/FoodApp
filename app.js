const express=require('express');
const app=express();
const userRouter= require('./Router/userRouter');
const planRouter= require('./Router/planRouter');
const reviewRouter= require('./Router/reviewRouter');
const bookingRouter=require('./Router/bookingRouter');
const cookieParser=require('cookie-parser');


app.use(express.json()); //global middleware
app.listen(4000);
app.use(cookieParser());

//base route, router to use

app.use('/user', userRouter); 
app.use('/plans', planRouter);    //global middleware
app.use('/review', reviewRouter);
app.use('/booking', bookingRouter);
    //global middleware



