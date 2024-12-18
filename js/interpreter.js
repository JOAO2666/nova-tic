document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.interpreter-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                patientName: document.getElementById('name').value,
                patientEmail: document.getElementById('email').value,
                patientPhone: document.getElementById('phone').value,
                requestDate: document.getElementById('date').value,
                requestTime: document.getElementById('time').value,
                specialNeeds: document.getElementById('special-needs').value,
                language: 'Libras'
            };

            try {
                // Create interpreter request
                const response = await InterpreterAPI.request({
                    patientName: formData.patientName,
                    patientEmail: formData.patientEmail,
                    patientPhone: formData.patientPhone,
                    requestDate: new Date(`${formData.requestDate}T${formData.requestTime}`),
                    language: formData.language,
                    specialNeeds: formData.specialNeeds
                });

                // Show success message
                alert('Solicitação de intérprete enviada com sucesso!');
                
                // Redirect to home page
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Error requesting interpreter:', error);
                alert('Erro ao solicitar intérprete. Por favor, tente novamente.');
            }
        });
    }
});
