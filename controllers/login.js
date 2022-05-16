const jwt = require('jsonwebtoken');

exports.login = async(req,res) => {
    const {email, password} = req.body;

    try{
        if(email === "dummy@email.com" && password==="password"){
            const token = jwt.sign({
                email: email,
            },
            process.env.SECRET_KEY);

            res.status(200).json({
                message: "User signed in",
                token: token,
            });
        }
        else{
            res.status(400).json({
                error: "Invalid email or password!",
            });
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            error: "Error occurred while signing in!",                         
        });
    }
}