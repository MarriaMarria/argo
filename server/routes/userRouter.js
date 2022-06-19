const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

////////////////////////////////////////////////////////////////////////////

// register 

////////////////////////////////////////////////////////////////////////////

router.post("/", async (req, res) => {
    try {
        const {email, password, passwordVerify} = req.body;

        // validation 

        if (!email || !password || !passwordVerify) 
            return res.status(400).json({ 
                error: "Please fill in all required fields.",
            });
        

        // obligation to have a password of 6+ characters

        if(password.length < 6) 
            return res.status(400).json({ 
                error: "Please enter a password of at least 6 characters.",
            });

        // verify that the password is correct

        if(password != passwordVerify) 
            return res.status(400).json({ 
                error: "Make sure to enter the same password twice.",
        });
        
        // verify no account exists for this email 

        const existingUser = await User.findOne({ email: email});
        console.log(existingUser); // shall return null if the user doesn't exist

        if (existingUser) 
            return res.status(400).json({
                error: "An account with this email already exists."
            });

        // hash the password
        const salt = await bcrypt.genSalt(); //bcrypt will create a random string of characters called salt
        const passwordHash = await bcrypt.hash(password, salt); // we pass password we want to hash and salt to hash it with 
        // console.log(passwordHash); //logs smth like that: $2a$10$pI2jkywU7CM1lFO.qOlV9.uai8DvKUvUwMlZ/OPCmoJObFLP8Cg5W

        // save the user in the db 

        const newUser = new User({ // we construct a new DB document out of the user model
            email,
            passwordHash,
        });

        // console.log(newUser);

        const savedUser = await newUser.save();

        // console.log(savedUser);

        // res.send(savedUser); // mongo returns a document that has been saved

        // create JWT token
        const jwtData = {
            id: savedUser._id // information to put to jwt payload
        };

        const token = jwt.sign({jwtData}, process.env.JWT_SECRET);

        // res.send(token);

        // set up cookies
        res.cookie("token", token, { httpsOnly: true }).send(); // we give our cookie name "" and value, httpsOnly is an option to browser to not make cookie accessible via JS, only via http requests


    } catch(err) {
        res.status(500).send({err});
    }
});

////////////////////////////////////////////////////////////////////////////

// login user

////////////////////////////////////////////////////////////////////////////

router.post("/login", async (req, res) => {
    try {
        const {email, password } = req.body;

        // validation 

        if (!email || !password) 
            return res.status(400).json({ 
                error: "Please fill in all required fields.",
            });     
        // get user account with the email

        const existingUser = await User.findOne({ email: email });
        console.log(existingUser); // shall return null if the user doesn't exist

        if (!existingUser) 
            return res.status(400).json({
                error: "Wrong email or password."
            });

        const correctPassword = await bcrypt.compare(password, existingUser.passwordHash); // will return true or false

        if (!correctPassword)
            return res.status(401).json({ error: "Wrong email or password." });

        // create JWT token
        const token = jwt.sign(
            {
                id: existingUser._id, // information to put to jwt payload
        },  process.env.JWT_SECRET);

        // set up cookies
        res.cookie("token", token, { httpOnly: true }).send(); // we give our cookie name "" and value, httpsOnly is an option to browser to not make cookie accessible via JS, only via http requests


    } catch(err) {
        res.status(500).send({err});
    }
});


router.get("/loggedIn", function(req, res) {
    try {
        const token = req.cookies.token 
        if (!token) return res.json(null);
        const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
        res.json(validatedUser.id);

    } catch (err) {
        return res.json(null); // no users logged in
    }
});

// log out a user (for this we only need to clear a cookie)

router.get("/logout", function(req, res) {
    try {
        res.clearCookie("token").send();
    } catch (err) {
        return res.json(null); // no users logged in
    }
})



module.exports = router;