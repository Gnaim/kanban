var mongoose = require('mongoose'),
Schema = mongoose.Schema;  

var checklistSchema = new mongoose.Schema({
    _card : { type: Schema.ObjectId, ref: 'Card' },
    content: {type: String, required: true},
    isDone: Boolean,
});


mongoose.model('Checklist', checklistSchema);