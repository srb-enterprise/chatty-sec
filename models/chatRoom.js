var mongoose = require('mongoose');

module.exports = mongoose.model('ChatRoom',{
    roomname: String,
    userId: String,
    type: String    //Public or private
});
