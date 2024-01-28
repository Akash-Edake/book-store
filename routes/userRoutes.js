const {Router}= require("express");
const router = Router();
const {registerUser, loginUser} = require("../controllers/UserController")
// const db=require('../db'); 


// //get all products from the database  
// router.get('/',(req,res)=>{
//     let sql="SELECT * FROM Products";  //SQL query to get data from table "Products" in the database
//     console.log(sql);                       //printing SQL command on server side for debugging purposes
//     db.query(sql,(err,result)=> {          //executing SQL command and getting result set
//         if (err) throw err;               //if any error occurs then it will show that   error on console
//         res.send(result);                //Sending the response with result of SQL query back to client side
//     })
// });
router.get("/singup",registerUser)
router.get("/singin",loginUser)

module.exports=router;
