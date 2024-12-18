document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.emergency-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                location: document.getElementById('location').value,
                description: document.getElementById('description').value
            };

            try {
                // Submit emergency request
                const response = await EmergencyAPI.contact(formData);

                // Show success message with estimated response time
                alert(`Solicitação de emergência recebida! Tempo estimado de resposta: ${response.estimatedResponseTime}`);
                
                // Start checking status
                checkEmergencyStatus();
            } catch (error) {
                console.error('Error submitting emergency request:', error);
                alert('Erro ao enviar solicitação de emergência. Por favor, tente novamente ou ligue para 192.');
            }
        });
    }

    // Function to check emergency status
    async function checkEmergencyStatus() {
        try {
            const statusElement = document.getElementById('emergency-status');
            if (statusElement) {
                const status = await EmergencyAPI.getStatus();
                statusElement.textContent = `Status: ${status.currentWaitTime} de espera`;
            }
        } catch (error) {
            console.error('Error checking emergency status:', error);
        }
    }

    // Check status every 30 seconds if we're on the emergency page
    if (document.querySelector('.emergency-form')) {
        setInterval(checkEmergencyStatus, 30000);
    }
});
