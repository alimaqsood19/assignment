const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title of post is required'
    },
    likes: [
        {type: mongoose.Schema.ObjectId, ref: 'User'}
    ]
});

function autopopulate(next) {
    this.populate('User');
    next();
}

postSchema.pre('find', autopopulate);
postSchema.pre('findOne', autopopulate);

const Post = mongoose.model('Post', postSchema);

module.exports = {
    Post
}