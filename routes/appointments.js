const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create new appointment
router.post('/', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        
        // Emit real-time notification
        const io = req.app.get('io');
        io.emit('newAppointment', {
            message: 'Nova consulta agendada!',
            appointment: {
                patientName: appointment.patientName,
                appointmentDate: appointment.appointmentDate,
                appointmentType: appointment.appointmentType,
                speciality: appointment.speciality
            }
        });
        
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ appointmentDate: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get specific appointment
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (appointment) {
            res.json(appointment);
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update appointment
router.patch('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        // Emit update notification
        const io = req.app.get('io');
        io.emit('appointmentUpdated', {
            message: 'Consulta atualizada!',
            appointment: {
                patientName: appointment.patientName,
                appointmentDate: appointment.appointmentDate,
                appointmentType: appointment.appointmentType,
                speciality: appointment.speciality
            }
        });
        
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Cancel appointment
router.delete('/:id', async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Appointment cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
