const mongoose = require('mongoose');
const { Schema } = mongoose;

const invitationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    projectId: { type: Schema.ObjectId, ref: 'Project', required: true }
});

invitationSchema.set('timestamps', true);
mongoose.model('Invitations', invitationSchema);
