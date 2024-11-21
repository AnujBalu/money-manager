const mongoose = require('mongoose');

let FormDataSchema = mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId, // Ensure this is an ObjectId type
    //     ref: 'User', // Reference the User collection (optional)
    //     required: true
    // },
    formType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FormData', FormDataSchema);
