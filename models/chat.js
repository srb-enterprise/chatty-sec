var mongoose = require('mongoose');
/*A chat message object. These never be updated. Only C- create, R- read opertion should be used for them.*/
module.exports = mongoose.model('Chat',{
        sender: String,
        reciever: String,
        message: String,
        readByRecipient: Boolean,
        room: String,
        date: { type: Date, default: Date.now }
});
