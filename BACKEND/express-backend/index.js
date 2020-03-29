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

// var notices = [
//     {id: 1, name: 'Notice 1'},
//     {id: 2, name: 'Notice 2'}, 
//     {id: 3, name: 'Notice 3'}
// ]

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

// app.get('/', (req,res) => {
//     res.send('Hello World');
// });

// app.get('/api/notices', (req,res) => {
//     res.send(notices);
// })

// app.get('/api/notices/:id', (req,res) => {
//     const notice = notices.find(x => x.id === parseInt(req.params.id));
//     if(!notice) {
//         // 404 Not Found
//         res.status(404).send('Notice with the given ID was not found...')
//     }
//     res.send(notice);        
// })

// app.post('/api/notices', (req,res) => {
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
// app.put('/api/notices/:id', (req,res) => {
//     const notice = notices.find(x => x.id === parseInt(req.params.id));
//     if(!notice) {
//         // 404 Not Found
//         res.status(404).send('Notice with the given ID was not found...')
//     }
//     const result = validateNotice(req.body);
//     if(result.error){
//         // 400 Bad Request
//         res.status(400).send(result.error.details[0].message);
//         return;
//     }

//     notice.name = req.body.name;
//     res.send(notice);
// })

// app.delete("/api/notices/:id", (req, res) => {
//     const notice = notices.find(x => x.id === parseInt(req.params.id));
//     if(!notice) {
//         // 404 Not Found
//         res.status(404).send('Notice with the given ID was not found...')
//     }
//     notices = notices.filter(el => el.id !== parseInt(req.params.id));
//     res.send(notice);
// }) 

// function validateNotice(notice){
//     const schema = {
//         name: Joi.string().min(3).required()
//     };

//     const result = Joi.validate(notice, schema)
//     return result;

// }


app.listen(3000, () => console.log('Listening on port 3000...'));