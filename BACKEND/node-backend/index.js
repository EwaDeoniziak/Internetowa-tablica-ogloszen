const express = require('express');
const app = express();
//const Joi = require('Joi');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser');
app.use(express.json());

//connect to db
mongoose.connect('mongodb+srv://Ewa_1998:my_database@cluster0-lhv1v.azure.mongodb.net/NoticeBoard?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log('DB Connection Error: ${err.message}');
    });


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Token");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    next();
}); 
app.use('/uploads', express.static('uploads'))
//import routes
const noticeRoute = require('./routes/notices');
app.use('/api/notices', noticeRoute);

const userRoute = require('./routes/users');
app.use('/api/users', userRoute);

const categoryRoute = require('./routes/categories');
app.use('/api/categories', categoryRoute);

const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);



app.listen(3000, () => console.log('Listening on port 3000...'));