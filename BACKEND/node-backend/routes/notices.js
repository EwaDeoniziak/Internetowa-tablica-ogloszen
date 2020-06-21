const express = require('express');
const router = express.Router();
const Joi = require('Joi');
const Notice = require('../models/Notice');
const User = require('../models/User');
const Category = require('../models/Category');
const multer = require('multer');

const verify = require('./verifyToken');

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, 'img_' + new Date().toISOString().replace(/:/g, "-") + '_' + file.originalname);
    }

});
//const upload = multer({dest: 'uploads'});
const upload = multer({storage: storage,
    limits: {fileSize: 1024 * 1024 * 5 * 10},
    fileFilter: fileFilter
});

//Get all notices

router.get('', async (req,res) => {
    try {
        const notices = await Notice.find({expDate: {$gt: new Date()}}).populate('categories').sort({date: -1});
        res.json(notices);
    }catch(err){
        res.json({message:err});
        res.status(404);
    }
})

//Get one notice by id

router.get('/:id', async (req,res) => {
    try {
        const notice = await Notice.findById(req.params.id).populate('categories').populate('userId');
        res.json(notice);
    } catch(err) {
        res.json({message: err});
        res.status(404);
    }
           
})


//add notice by logged user

router.post('', upload.array('imgs'), verify, (req,res) => {
    //console.log(req.files);
    imgPaths = [];
    req.files.map( el => imgPaths.push(el.path));
    //console.log(imgPaths);
    const expDate = new Date();
    const notice = new Notice({
        title: req.body.title,
        categories: req.body.categories,
        description: req.body.description,
        price: req.body.price,
        userId: req.user._id,
        location: req.body.location,
        type: req.body.type,
        imgs: imgPaths,
        expDate: 
        expDate
        .setMonth(expDate.getMonth()+1),
    });
    // console.log(notice);
    // console.log(notice.expDate)
    // console.log(req.body.title)
    notice.save()
    .then(new_notice => {
        console.log(new_notice);
        User.findOneAndUpdate({_id: notice.userId}, {$push: {notices: new_notice._id}}, {new: true} ,function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
        })
    })
    .then(user => {
        
        res.json(user)
    })
    .catch(err => {
        res.json({message: err})
        res.status(404);
    })
});

//Update notice

router.put('/:id',
 upload.array('newImgs'),
  verify, async (req,res) => {
    try {
        var imgPaths = [];
        // console.log("tu są moje files" + req.files);
        // console.log(req.body.imgs);
        if(req.body.imgs && req.body.imgs[0].length == 1){
            imgPaths.push(req.body.imgs);
        } 
        else if(req.body.imgs && req.body.imgs.length>1){
            req.body.imgs.map(element => imgPaths.push(element));
        }
        if(req.files.length>0){
            req.files.map( el => imgPaths.push(el.path));
        }
        // console.log("Tu jest imgpaths" + imgPaths);
        const item = {
            title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    type: req.body.type,
                    location: req.body.location,
                    categories: req.body.categories,
                    imgs: imgPaths
        }
        console.log(item);
        const updatedNotice = await Notice.updateOne({_id: req.params.id}, 
            { $set: item,
            })
        // console.log(updatedNotice);
        res.json(updatedNotice);
    } catch(err) {
        res.json({message: err})
        res.status(404);
        console.log(err);
    }
})

//Extend the validity

router.put('/extendValidity/:id', verify, async (req,res) => {
    try {
        const now = new Date();
        const item = {
            date: Date.now(),
            expDate: now.setMonth(now.getMonth() + 1)
        }
        const actualNotice = await Notice.updateOne({_id: req.params.id}, 
            { $set: item
            })
        console.log(actualNotice);
        res.json(actualNotice);
        console.log(item);
    } catch(err) {
        res.json({message: err})
        res.status(404);
        
    }
    
})

//Delete notice

router.delete("/:id", verify, async (req, res) => {
    try {
        const removedNotice = await Notice.remove({_id: req.params.id})
        res.json(removedNotice);
    }catch(err) {
        res.json({message: err});
        res.status(404);
    }
}) 


module.exports = router;