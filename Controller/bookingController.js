let sk= "sk_test_51L6iOZGy5qe4t1QqZmwggYno4xadgvIqAKK8hqKPOzS4Qo8MZxojXI1RATx8uQK5VLCKe93mVE3dW1bVSWPjvJbP00jg8CrDQO";
const stripe=require('stripe')(sk);
const planModel=require('../Models/planModel');
const userModel=require('../Models/userModel');


module.exports.createSession = async function createSession(req,res){
    
try{    

    let userID=req.id;
    let planID=req.params.id;

    const user= userModel.findById(userID);
    const plan=planModel.findById(planID);
    session=await stripe.checkout.sessions.create({
    
    payment_method_types: ['card'],
    customer_email: user.email,
    client_reference_id: plan.id,
    
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        name:plan.planname,
        description:plan.description,
        price: plan.price,
        currency:"CAD",
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get("host")}/profile`,
    cancel_url: `${req.protocol}://${req.get("host")}/profile`
  });


  res.status(200).json({status:"success"})
}
catch(err){

res.json({message:err.message});

}
}