document.addEventListener('DOMContentLoaded', function() {
    // Função para mostrar vídeo ao passar o mouse
    function setupVideoHover(buttonSelector, videoId) {
        const button = document.querySelector(buttonSelector);
        const video = document.getElementById(videoId);

        if (button && video) {
            // Primeiro, vamos checar se o vídeo está carregado corretamente
            video.addEventListener('loadedmetadata', () => {
                console.log(`Vídeo ${videoId} metadados carregados`);
            });

            video.addEventListener('error', (e) => {
                console.error(`Erro no vídeo ${videoId}:`, e);
            });

            button.addEventListener('mouseenter', () => {
                try {
                    // Definir atributos para autoplay e muted
                    video.setAttribute('autoplay', true);
                    video.setAttribute('muted', true);
                    
                    // Ajustar estilos
                    video.style.display = 'block';
                    video.style.zIndex = '10';
                    
                    // Reset e tentativa de reprodução
                    video.currentTime = 0;
                    video.play()
                        .then(() => console.log(`Vídeo ${videoId} reproduzido com sucesso`))
                        .catch(error => {
                            console.error(`Erro ao reproduzir ${videoId}:`, error);
                            // Tenta forçar a reprodução com mute
                            video.muted = true;
                            video.play();
                        });
                } catch (error) {
                    console.error('Erro ao tentar reproduzir vídeo:', error);
                }
            });

            button.addEventListener('mouseleave', () => {
                try {
                    video.style.display = 'none';
                    video.pause();
                    video.currentTime = 0;
                } catch (error) {
                    console.error('Erro ao pausar vídeo:', error);
                }
            });

            // Tratamento para dispositivos móveis
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                try {
                    video.setAttribute('autoplay', true);
                    video.setAttribute('muted', true);
                    video.style.display = 'block';
                    video.style.zIndex = '10';
                    video.currentTime = 0;
                    video.play()
                        .then(() => console.log(`Vídeo ${videoId} reproduzido com sucesso no touch`))
                        .catch(error => {
                            console.error(`Erro ao reproduzir ${videoId} no touch:`, error);
                            video.muted = true;
                            video.play();
                        });
                } catch (error) {
                    console.error('Erro no touchstart:', error);
                }
            });

            button.addEventListener('touchend', () => {
                try {
                    video.style.display = 'none';
                    video.pause();
                    video.currentTime = 0;
                } catch (error) {
                    console.error('Erro no touchend:', error);
                }
            });
        }
    }

    // Configurar interações para cada botão na página inicial
    setupVideoHover('.emergency-section', 'urgenciaVideo');
    setupVideoHover('.action-button.blue', 'consultaVideo');
    setupVideoHover('.action-button.green', 'interpreteVideo');

    // Configurar navegação para as páginas
    const emergencySection = document.querySelector('.emergency-section');
    if (emergencySection) {
        emergencySection.addEventListener('click', () => {
            setTimeout(() => {
                window.location.href = 'emergencia.html';
            }, 300);
        });
    }

    const consultaBtn = document.querySelector('.action-button.blue');
    if (consultaBtn) {
        consultaBtn.addEventListener('click', () => {
            setTimeout(() => {
                window.location.href = 'agendar-consulta.html';
            }, 300);
        });
    }

    const interpreteBtn = document.querySelector('.action-button.green');
    if (interpreteBtn) {
        interpreteBtn.addEventListener('click', () => {
            setTimeout(() => {
                window.location.href = 'agendar-interprete.html';
            }, 300);
        });
    }

    // Configurar navegação do menu inferior
    const navLinks = document.querySelectorAll('.bottom-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Video hover functionality
    // Add hover event listeners for all Libras videos
    const videoElements = document.querySelectorAll('.libras-video');
    
    videoElements.forEach(video => {
        const container = video.closest('.action-button, .emergency-section');
        
        if (container) {
            container.addEventListener('mouseenter', () => {
                if (video.paused) {
                    video.play();
                }
            });
            
            container.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
});