// Variables globales
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const mainContent = document.getElementById('mainContent');
const navButtons = document.querySelectorAll('.nav-button');
const contentCards = document.querySelectorAll('.content-card');

// Toggle de la barra lateral
toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('expanded');
    toggleBtn.classList.toggle('sidebar-hidden');
    
    // Cambiar el ícono del botón
    if (sidebar.classList.contains('hidden')) {
        toggleBtn.innerHTML = '→';
    } else {
        toggleBtn.innerHTML = '☰';
    }
});

// Navegación entre pasos
navButtons.forEach(button => {
    button.addEventListener('click', function() {
        const stepNumber = this.getAttribute('data-step');
        
        // Remover clase active de todos los botones
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar clase active al botón clickeado
        this.classList.add('active');
        
        // Ocultar todas las tarjetas de contenido
        contentCards.forEach(card => {
            card.classList.remove('active');
            card.classList.add('hidden');
        });
        
        // Mostrar la tarjeta correspondiente con animación
        const targetCard = document.getElementById(`step-${stepNumber}`);
        if (targetCard) {
            targetCard.classList.remove('hidden');
            
            // Pequeño delay para la animación
            setTimeout(() => {
                targetCard.classList.add('active');
            }, 50);
        }
        
        // Scroll suave al inicio del contenido
        mainContent.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Animación de entrada para las tarjetas
window.addEventListener('load', function() {
    const activeCard = document.querySelector('.content-card.active');
    if (activeCard) {
        setTimeout(() => {
            activeCard.style.opacity = '1';
            activeCard.style.transform = 'translateY(0)';
        }, 200);
    }
});

// Cerrar sidebar en dispositivos móviles al hacer click en el contenido
mainContent.addEventListener('click', function() {
    if (window.innerWidth <= 768 && !sidebar.classList.contains('hidden')) {
        sidebar.classList.add('hidden');
        mainContent.classList.add('expanded');
        toggleBtn.classList.add('sidebar-hidden');
        toggleBtn.innerHTML = '→';
    }
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('hidden');
        mainContent.classList.remove('expanded');
        toggleBtn.classList.remove('sidebar-hidden');
        toggleBtn.innerHTML = '☰';
    }
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('hidden');
        mainContent.classList.remove('expanded');
        toggleBtn.classList.remove('sidebar-hidden');
        toggleBtn.innerHTML = '☰';
    }
});

// Funcionalidad de zoom para imágenes
function createImageModal() {
    // Crear el modal si no existe
    if (!document.getElementById('imageModal')) {
        const modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="modalClose">&times;</button>
                <img class="modal-image" id="modalImage" src="" alt="">
            </div>
        `;
        document.body.appendChild(modal);
        
        // Event listeners para cerrar el modal
        const closeBtn = document.getElementById('modalClose');
        const modalElement = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        
        closeBtn.addEventListener('click', closeModal);
        modalElement.addEventListener('click', function(e) {
            if (e.target === modalElement) {
                closeModal();
            }
        });
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalElement.style.display === 'flex') {
                closeModal();
            }
        });
    }
}

function openModal(imageSrc, imageAlt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
}

// Inicializar modal y agregar event listeners a las imágenes
window.addEventListener('load', function() {
    createImageModal();
    
    // Agregar click listener a todas las imágenes dentro de image-placeholder
    const images = document.querySelectorAll('.image-placeholder img');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openModal(this.src, this.alt);
        });
    });
    
    // Re-aplicar listeners cuando se cambia de paso (por si se agregan imágenes dinámicamente)
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                const newImages = document.querySelectorAll('.image-placeholder img');
                newImages.forEach(img => {
                    if (!img.hasAttribute('data-modal-listener')) {
                        img.style.cursor = 'pointer';
                        img.setAttribute('data-modal-listener', 'true');
                        img.addEventListener('click', function() {
                            openModal(this.src, this.alt);
                        });
                    }
                });
            }, 100);
        });
    });
});