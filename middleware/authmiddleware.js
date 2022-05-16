const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/users");

exports.verifym = async (req,res,next) => {
    if(!req.body.userId){                                       //allows to specify userId in req.body without authentication for testing purposes only
        const token = req.headers.authorization;              //Take token from headers
        if(!token){
        res.status(401).json({
        error: "User not Signed in, Sign in First.",
        });
        }
        
        jwt.verify(token, process.env.SECRET_KEY, async (err,decoded)=>{         //Verify function for JWT
        if(err)
        {                                                                          //If no token is present
        res.status(400).json({
            error: "User not Signed in, Sign in First.",
        });
        }

        else{
            const userEmail = decoded.email;
            // client
            // .query(`SELECT * FROM users WHERE email = $1;`,[userEmail])
            // .then((info) => {                                         
            //     if (info.rows.length === 0) {                                     //Checking if user is registered or not
            //         res.status(400).json({  
            //         error: "User not registered. Register yourself first.",
            //         });
            //     } else {
            //         req.email = userEmail;                                            //Sending email and ID of user if registered          
            //         req.userid = info.rows[0].id;
            //         next();
            //     }
            console.log(userEmail);
            const user = await User.findOne({email:userEmail});
            console.log(user);
            req.body.userId = user._id;
            next();
        }

        })
    }
    else{
        next();
    }
     
}
