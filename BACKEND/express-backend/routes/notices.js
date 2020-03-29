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
        const notice = await Notice.findById(req.params.id).populate('categories');
        res.json(notice);
    } catch(err) {
        res.json({message: err});
        res.status(404);
    }
           
})

// router.post('', (req,res) => {
//     const result = validateNotice(req.body);
//     if(result.error){
//         // 400 Bad Request
//         res.status(400).send(result.error.details[0].message);
//         return;
//     }
//     const notice = {
//         id: notices.length + 1,
//         name: req.body.name,
//     }
//     console.log(notice)
//     notices.push(notice);
//     res.send(notice);
// });

//Add new notice
///to jest niewazne juz bo bez logowania nie mozna dodac

// router.post('/new', (req,res) => {
//     const notice = new Notice({
//         title: req.body.title,
//         categories: req.body.categories,
//         description: req.body.description,
//         price: req.body.price
//     });

//     notice.save()
//     .then(data => {
//         res.json(data)
//     })
//     .catch(err => {
//         res.json({message: err})
//     })
// });

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
        User.findOneAndUpdate({_id: notice.userId}, {$push: {notices: new_notice._id}}, {new: true});
    })
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.json({message: err})
        res.status(404);
    })
});

//add notice to user
/// to jest tez niewazne, bo tokenem pobieram id
// router.post('/:userId', (req,res) => {
//     const notice = new Notice({
//         title: req.body.title,
//         categories: req.body.categories,
//         description: req.body.description,
//         price: req.body.price,
//         userId: req.params.userId
//     });
//     console.log(notice)
//     notice.save()
//     .then(new_notice => {
//         return User.findOneAndUpdate({_id: req.params.userId}, {$push: {notices: new_notice._id}}, {new: true});
//         console.log(data._id)
//         console.log(req.params.id)
//     })
//     .then(user => {
//         res.json(user)
//     })
//     .catch(err => {
//         res.json({message: err})
//     })
// });

//Update notice

router.put('/:id',
 upload.array('imgs'),
  verify, async (req,res) => {
    try {
        console.log(req.files);
        imgPaths = [];
        req.files.map( el => imgPaths.push(el.path));
        console.log(imgPaths);
        const item = {
            title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    type: req.body.type,
                    location: req.body.location,
                    categories: req.body.categories,
                    imgs: imgPaths
        }
        const updatedNotice = await Notice.updateOne({_id: req.params.id}, 
            { $set: item,
                // {description: req.body.description},
                // {price: req.body.price},
                // {type: req.body.type},
                // {location: req.body.location},
                // {categories: req.body.categories},
                // {imgs: imgPaths}
            })
        console.log(updatedNotice);
        res.json(updatedNotice);
    } catch(err) {
        res.json({message: err})
        res.status(404);
        
    }
    
})

//Extend the validity

router.put('/extendValidity/:id', verify, async (req,res) => {
    try {
        const now = new Date();
        const item = {
            date: now,
            expDate: now.setMonth(now.getMonth() + 1)
        }
        const actualNotice = await Notice.updateOne({_id: req.params.id}, 
            { $set: item
                // {description: req.body.description},
                // {price: req.body.price},
                // {type: req.body.type},
                // {location: req.body.location},
                // {categories: req.body.categories},
                // {imgs: imgPaths}
            })
        console.log(actualNotice);
        res.json(actualNotice);
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



// function validateNotice(notice){
//     const schema = {
//         name: Joi.string().min(3).required()
//     };

//     const result = Joi.validate(notice, schema)
//     return result;

// }

module.exports = router;