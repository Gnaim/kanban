const mongoose = require('mongoose');
const { Schema } = mongoose;

const resetPwdSchema = new mongoose.Schema({
    email: { type: String, required: true }
});

resetPwdSchema.set('timestamps', true);
mongoose.model('resetPwd', resetPwdSchema);
