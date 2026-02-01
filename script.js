// Add visible class on load with delay for slide-in
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, index * 200); // Staggered animation
    });

    // Inisialisasi AOS untuk animasi scroll (fitur 1)
    AOS.init({
        duration: 1000, // Durasi animasi
        once: true // Animasi sekali saja
    });

    // Persistent dark mode menggunakan localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark');
        const checkbox = document.getElementById('dark-mode-checkbox');
        if (checkbox) checkbox.checked = true;
    }

    // Dark mode toggle (fitur 4) dengan switch slider
    const toggleCheckbox = document.getElementById('dark-mode-checkbox');
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', () => {
            document.body.classList.toggle('dark');
            if (document.body.classList.contains('dark')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // Inisialisasi Slick untuk testimonial slider (fitur 6)
    if (document.querySelector('.testimonial-slider')) {
        $('.testimonial-slider').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }

    // Inisialisasi Slick untuk image slider di home, about, portfolio
    if (document.querySelector('.image-slider')) {
        $('.image-slider').slick({
            autoplay: true,
            autoplaySpeed: 4000, // Ganti gambar setiap 4 detik
            dots: true,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
        });
    }
});

// Back-to-top button
const backToTop = document.createElement('div');
backToTop.id = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});