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