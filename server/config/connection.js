const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sjbdlt:root@cluster0.wj6j9lt.mongodb.net/googlebooks');



module.exports = mongoose.connection;
