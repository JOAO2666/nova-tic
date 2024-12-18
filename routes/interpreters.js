const express = require('express');
const router = express.Router();
const InterpreterRequest = require('../models/Interpreter');

// Create new interpreter request
router.post('/', async (req, res) => {
    try {
        const request = new InterpreterRequest(req.body);
        await request.save();
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all interpreter requests
router.get('/', async (req, res) => {
    try {
        const requests = await InterpreterRequest.find();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get specific interpreter request
router.get('/:id', async (req, res) => {
    try {
        const request = await InterpreterRequest.findById(req.params.id);
        if (request) {
            res.json(request);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update interpreter request
router.patch('/:id', async (req, res) => {
    try {
        const request = await InterpreterRequest.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Cancel interpreter request
router.delete('/:id', async (req, res) => {
    try {
        await InterpreterRequest.findByIdAndDelete(req.params.id);
        res.json({ message: 'Interpreter request cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
