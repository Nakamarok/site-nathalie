// Gestion du mode sombre/clair
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const header = document.querySelector('.hero-header');
    const nav = document.querySelector('.modern-nav');
    const footer = document.querySelector('.modern-footer');
    
    // Vérifier si une préférence est déjà enregistrée
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Fonction pour appliquer le thème
    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeToggle.innerHTML = '☀️';
            themeToggle.setAttribute('aria-label', 'Passer en mode sombre');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            themeToggle.innerHTML = '🌙';
            themeToggle.setAttribute('aria-label', 'Passer en mode clair');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Écouter le clic sur le bouton
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
});

//Bouton retour en haut
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    // Afficher/Masquer le bouton au scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Remonter en haut de page au clic
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Gestion du menu burger mobile
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navUl = document.querySelector('.modern-nav ul');
    
    // Ouvrir/fermer le menu
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navUl.classList.toggle('active');
        
        // Empêcher le scroll quand le menu est ouvert
        if (navUl.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.modern-nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navUl.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.modern-nav')) {
            burgerMenu.classList.remove('active');
            navUl.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});


// Charger la galerie depuis JSON
async function loadGallery() {
    try {
        const response = await fetch('gallery.json');
        const data = await response.json();
        const grid = document.getElementById('gallery-grid');
        
        // Afficher seulement les 10 dernières photos
        const last10 = data.photos.slice(-10);
        
        last10.forEach(filename => {
            const item = document.createElement('div');
            item.className = 'gallery-item';

            item.innerHTML = `
                <img src="assets/${filename}" alt="${filename}" loading="lazy" class="gallery-img">
                    <div class="overlay" aria-hidden="true">
                    </div>
            `;
            grid.appendChild(item);
        });
        
        // Ajouter la lightbox
        setupLightbox();
    } catch (error) {
        console.error('Erreur chargement galerie:', error);
    }
}

function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            lightboxImg.src = '';
            document.body.style.overflow = '';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            lightboxImg.src = '';
            document.body.style.overflow = '';
        }
    });
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', loadGallery);



// ============================================
// ENVOI DE FORMULAIRE DE CONTACT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    
    // Remplace par tes identifiants EmailJS
    const EMAILJS_PUBLIC_KEY = 'TON_PUBLIC_KEY';
    const EMAILJS_SERVICE_ID = 'TON_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'TON_TEMPLATE_ID';
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Désactiver le bouton pendant l'envoi
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            formStatus.textContent = '';
            formStatus.style.color = 'var(--text-secondary)';
            
            try {
                // Récupérer les données du formulaire
                const formData = {
                    nom: document.getElementById('nom').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };
                
                // Envoyer via EmailJS
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData, EMAILJS_PUBLIC_KEY);
                
                // Succès
                formStatus.textContent = '✅ Message envoyé avec succès !';
                formStatus.style.color = '#10B981';
                contactForm.reset();
                
            } catch (error) {
                // Erreur
                console.error('Erreur d\'envoi:', error);
                formStatus.textContent = '❌ Erreur lors de l\'envoi. Veuillez réessayer.';
                formStatus.style.color = '#EF4444';
            } finally {
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            }
        });
    }
});

// ============================================
// CHARGEMENT DES DIPLÔMES
// ============================================
async function loadDiplomas() {
    try {
        const response = await fetch('diplomes.json');
        const data = await response.json();
        const grid = document.getElementById('diplomes-grid');
        
        // Afficher tous les diplômes
        data.diplomas.forEach((filename, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('data-category', 'diplome');
            
            item.innerHTML = `
                <img src="assets/Diplomes/${filename}" alt="Diplôme ${index + 1}" loading="lazy" class="gallery-img">
                <div class="overlay" aria-hidden="true">
                    <span class="overlay-text">📜</span>
                </div>
            `;
            grid.appendChild(item);
        });
        
        // Réutiliser la lightbox existante
        setupLightbox();
    } catch (error) {
        console.warn('Fichier diplômes non configuré:', error);
        const grid = document.getElementById('diplomes-grid');
        grid.innerHTML = '<p class="lead-text">Diplômes bientôt disponibles</p>';
    }
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    loadDiplomas();
});