const mongoose = require('mongoose');

const interpreterRequestSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientEmail: {
        type: String,
        required: true
    },
    patientPhone: {
        type: String,
        required: true
    },
    requestDate: {
        type: Date,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    specialNeeds: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'assigned', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('InterpreterRequest', interpreterRequestSchema);
