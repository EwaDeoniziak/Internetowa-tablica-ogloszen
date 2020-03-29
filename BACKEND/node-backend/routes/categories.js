const express = require('express');
const router = express.Router();
const Joi = require('Joi');
const Category = require('../models/Category');

router.get('', async (req,res) => {
    try {
        const categories = await Category.find()
        res.json(categories);
    }catch(err){
        res.json({message:err});
    }
})

router.post('', (req,res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description,
    });

    category.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json({message: err})
    })
});

module.exports = router;