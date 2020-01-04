const mongoose = require('mongoose');
const { Schema } = mongoose;

const resetPwd = new mongoose.Schema({
    email: { type: String, required: true }
});

resetPwd.set('timestamps', true);
mongoose.model('resetPwd', resetPwd);
