const mongoose = require('mongoose');

const barrackSchema = new mongoose.Schema({
    _barrackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastCollected:{
        type: Number,
        default: Date.now(),
    },
}, {timestamps: { createdAt:false, updatedAt:false}})

module.exports = mongoose.model('Barrack', barrackSchema);