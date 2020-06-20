const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

//REGISTER

var private_key = 'ssssscfvdxbfdbf';

router.post('/register', async (req,res) => {

    //validation before creating a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in database
    const loginExist = await User.findOne({login: req.body.login});
    if(loginExist) return res.status(400).send('Login already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //creating a new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        login: req.body.login,
        password: hashedPassword,
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err);
    }
})

//LOGIN

router.post('/login', async (req,res) => {
    //validation before login a user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the email exists
    const user = await User.findOne({login: req.body.login});
    if(!user) return res.status(400).send('Email doesnt exist');

    //password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //create and assign a token 
    const token = jwt.sign({_id: user._id}, private_key);
    res.header('token', token).send(token);

})

module.exports = router;