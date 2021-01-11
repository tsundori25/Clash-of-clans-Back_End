const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    _farmId: {
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

module.exports = mongoose.model('Farm', farmSchema);