document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.appointment-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                speciality: document.getElementById('specialty').value,
                doctor: document.getElementById('doctor').value,
                appointmentDate: document.getElementById('date').value,
                appointmentTime: document.getElementById('time').value,
                needsInterpreter: document.getElementById('interpreter').checked,
                patientName: document.getElementById('name').value,
                patientEmail: document.getElementById('email').value,
                patientPhone: document.getElementById('phone').value
            };

            try {
                // Create appointment
                const response = await AppointmentsAPI.create({
                    patientName: formData.patientName,
                    patientEmail: formData.patientEmail,
                    patientPhone: formData.patientPhone,
                    appointmentDate: new Date(`${formData.appointmentDate}T${formData.appointmentTime}`),
                    appointmentType: formData.speciality,
                    speciality: formData.speciality,
                    doctor: formData.doctor
                });

                // If interpreter is needed, create interpreter request
                if (formData.needsInterpreter) {
                    await InterpreterAPI.request({
                        patientName: formData.patientName,
                        patientEmail: formData.patientEmail,
                        patientPhone: formData.patientPhone,
                        requestDate: new Date(`${formData.appointmentDate}T${formData.appointmentTime}`),
                        language: 'Libras'
                    });
                }

                // Show success message
                alert('Consulta agendada com sucesso!');
                
                // Redirect to home page
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Error scheduling appointment:', error);
                alert('Erro ao agendar consulta. Por favor, tente novamente.');
            }
        });
    }

    // Handle specialty change to update doctors
    const specialtySelect = document.getElementById('specialty');
    const doctorSelect = document.getElementById('doctor');

    if (specialtySelect && doctorSelect) {
        specialtySelect.addEventListener('change', () => {
            const specialty = specialtySelect.value;
            
            // Clear current options
            doctorSelect.innerHTML = '<option value="">Selecione um médico</option>';
            
            // Add doctors based on specialty
            if (specialty) {
                const doctors = getDoctorsBySpecialty(specialty);
                doctors.forEach(doctor => {
                    const option = document.createElement('option');
                    option.value = doctor.id;
                    option.textContent = doctor.name;
                    doctorSelect.appendChild(option);
                });
            }
        });
    }
});

// Mock function to get doctors by specialty
function getDoctorsBySpecialty(specialty) {
    const doctorsBySpecialty = {
        'clinico': [
            { id: 'dr-silva', name: 'Dr. Silva' },
            { id: 'dra-santos', name: 'Dra. Santos' }
        ],
        'cardio': [
            { id: 'dr-cardio1', name: 'Dr. Carlos Cardio' },
            { id: 'dra-cardio2', name: 'Dra. Maria Cardio' }
        ],
        'dermato': [
            { id: 'dr-derma1', name: 'Dr. João Derma' },
            { id: 'dra-derma2', name: 'Dra. Ana Derma' }
        ]
    };
    
    return doctorsBySpecialty[specialty] || [];
}
