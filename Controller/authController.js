const userModel=require('../Models/userModel');
const JWT=require('jsonwebtoken');
const {jwt_key}= require('../../secret');
// const index=require('../public/index.html');





module.exports.loginpage= function loginpage(req,res){

    res.sendFile('E:/Backend Development/FoodApp/public/index.html')
}


module.exports.signup= async function signup(req,res){
    
    try{
    let obj=req.body;
    
    if(obj){
    let data= await userModel.create(obj);
    res.json({message:"user signed up", data});
    }
    else{
        res.json({message:"Empty Data"})
    }

    }
    catch(err){

        res.json({message:err.message});
    }
};


module.exports.login=async function login(req,res){
    try{
    let data= req.body
    if (data.email)
    {
        let user= await userModel.findOne({email:data.email});
            if(user){
    
                if(user.password==data.password)
                {   
       
                    let uid= user['_id'];  ///unique id
                    let jwt= JWT.sign({payload:uid}, jwt_key);
                    res.cookie('login',jwt,{httpOnly:true});
                    res.json({message:"user logged in"});
                }
                
                else 
                {
                
                    res.json({message:"wrong password"});
                }
    
            }
            else{
    
                return res.json({
                    message: "user not found"
                });
            }
    
    }
    else{
    
        return res.json({
            message: "Empty field found"
        });
    }
    
    }
    catch(err){
        console.log("error");
        res.json({message:err.message});
    }
    
    };

module.exports.isAuthorised=function isAuthorised(roles){

    return function(req,res,next){

        // console.log(req.role);
        if(roles.includes(req.role)==true){
            
        
            next();
        }
        else
            res.status(401).json({message:"Access not allowed"});
    }
};

module.exports.protectroute=async function protectroute(req,res,next){
 
    try{
    let token;
    if(req.cookies.login){
        token=req.cookies.login;
        let payload=JWT.verify(token,jwt_key);
        
        if(payload)
        {    
            const user= await userModel.findById(payload.payload);
            if(user){
                req.role=user.role;
                req.id=user.id;
                req.plan=user.plan;
                
                next();
            }
            else{
                res.json({message:"user not found"});
            }
        }   
        else
        {       
            res.json({message:"User not verified"});
        
        }        
    }
    else{
        const client=req.get('User-Agent');
        if(client.includes("Mozilla")==true){

            return res.redirect('/login')
        }
        else 
            return res.redirect('/user/loginpage')
            // res.json({message:"User not logged in "});
    }
    }
    
    catch(err){
        console.log("error");
        res.json({message:err.message});
    }


}


module.exports.forgetpassword=async function forgetpassword(req,res){

    let {email}=req.body;

    try{
        //find user
        const user= await userModel.findOne({email:email});
        
        if(user){
                        //get new token
                const resetToken=user.createResetToken();
                
                //create URL
                let resetPasswordLink=`${req.protocol}://${req.host}/resetpassword/${resetToken}`;

                //send email
            }
            else{

                res.json({message:"user not found"});
            }

    }
    catch{

        res.status(500).json({message:err.message});
    }

}


module.exports.resetpassword=async function resetpassword(req,res){

    try{
        const token=req.params.token;
        let {password,confirmpassword}=req.body;
        const user= await userModel.findOne({resetToken:token});
        
        if(user){
    
            user.resetPasswordhandler=(password,confirmpassword);
            await user.save();
            res.json({message:"updated successfully"});
    
        }
        else{
            res.json({message:"user not found"});
    
        }
    }
    catch{

        res.json({message:err.message});
    }

}



module.exports.logout= function logout(req,res){


        res.cookie('login','',{maxAge:1});
        return res.redirect('/user/loginpage');
        // res.json({message:"user logged out"})
}
    // module.exports=authController