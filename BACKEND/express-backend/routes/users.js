const express = require('express');
const router = express.Router();
const Joi = require('Joi');
const User = require('../models/User');
const verify = require('./verifyToken');



router.get('', async (req,res) => {
    try {
        const users = await User.find().populate('notices');
        res.json(users);
    }catch(err){
        res.json({message:err});
        res.status(404);
    }
})

router.get('/logged-user-information', verify, async (req,res) => {
    try {
        const user = await User.findById(req.user._id).populate('notices');
        res.json(user);
    } catch(err) {
        res.json({message: err});
        res.status(404);
    }
    // res.send(req.user); 
    // user = User.findbyOne({_id: req.user});       
});

// router.post('', (req,res) => {
//     const user = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         phoneNumber: req.body.phoneNumber,
//         login: req.body.login,
//         password: req.body.password,
//     });

//     user.save()
//     .then(data => {
//         res.json(data)
//     })
//     .catch(err => {
//         res.json({message: err})
//     })
// });

module.exports = router;
