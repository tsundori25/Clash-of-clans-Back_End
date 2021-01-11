const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    _marketId: {
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
}, {timestamps: { createdAt:false, updatedAt:false }});

module.exports = mongoose.model('Market', marketSchema);