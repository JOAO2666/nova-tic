const API_BASE_URL = 'http://localhost:5000/api';

// Appointments API
const AppointmentsAPI = {
    create: async (appointmentData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw error;
        }
    },

    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/appointments`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching appointments:', error);
            throw error;
        }
    },

    update: async (id, appointmentData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw error;
        }
    },

    cancel: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('Error canceling appointment:', error);
            throw error;
        }
    }
};

// Interpreter API
const InterpreterAPI = {
    request: async (interpreterData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/interpreters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(interpreterData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error requesting interpreter:', error);
            throw error;
        }
    },

    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/interpreters`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching interpreter requests:', error);
            throw error;
        }
    }
};

// Emergency API
const EmergencyAPI = {
    contact: async (emergencyData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/emergency/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emergencyData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error submitting emergency request:', error);
            throw error;
        }
    },

    getStatus: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/emergency/status`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching emergency status:', error);
            throw error;
        }
    }
};
