const mongoose = require('mongoose');

const collectSchema = new mongoose.Schema({
    goldCollected: Number,
    _MarketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Market'
    },
    lastCollected: Date
});

module.exports = mongoose.model('Market', marketSchema);