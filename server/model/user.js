const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Enter a valid name'
    },
    liked: [
        {type: mongoose.Schema.ObjectId, ref: 'Post'}
    ]
});

function autopopulate(next) {
    this.populate('Post');
    next();
}

userSchema.pre('find', autopopulate);
userSchema.pre('findOne', autopopulate);

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}