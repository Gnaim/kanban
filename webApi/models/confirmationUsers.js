const mongoose = require('mongoose');


const confirmationUsersSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    tel: String,
    profession: String,
    imageUrl: String,
});

confirmationUsersSchema.set('timestamps', true);

mongoose.model('confirmationUsers', confirmationUsersSchema);
