const mongoose = require('mongoose');

const NoticeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' },
    description: {
        type: String,
        required: true, },
    price: {
        type: Number,
        default: 0, },
    imgs: [{
        type: String,
        default: [] }],
    date: {
        type: Date,
        default: Date.now, },
    expDate:{
        type: Date },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' },
    type: {
        type: Number },
    location: {
        type: String, }
});

module.exports = mongoose.model('Notice', NoticeSchema);

