const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //Uses built in promise library
mongoose.connect(process.env.MONGODB_URI);

module.export = {
    mongoose
}