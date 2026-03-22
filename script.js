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