// ================================================
// Modern Portfolio Script - Enhanced with subtle effects
// ================================================

window.addEventListener('load', () => {
    // Staggered section visible (fallback kalau AOS lambat)
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, index * 150 + 300); // sedikit lebih cepat & variatif
    });

    // Inisialisasi AOS (tetap seperti asli)
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-cubic',
        anchorPlacement: 'top-bottom'
    });

    // Dark mode persistent (tetap seperti asli)
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark');
        const checkbox = document.getElementById('dark-mode-checkbox');
        if (checkbox) checkbox.checked = true;
    }

    const toggleCheckbox = document.getElementById('dark-mode-checkbox');
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('darkMode', document.body.classList.contains('dark') ? 'enabled' : 'disabled');
        });
    }

    // Stabilkan height slider di mobile & desktop
    const updateSliderHeight = () => {
        document.querySelectorAll('.image-slider, .testimonial-slider').forEach(slider => {
            if (slider) {
                slider.style.minHeight = window.innerWidth < 768 ? '260px' : '420px';
            }
        });
    };
    updateSliderHeight();
    window.addEventListener('resize', updateSliderHeight);

    // Slick untuk testimonial (tetap seperti asli, sedikit lebih smooth)
    if (document.querySelector('.testimonial-slider')) {
        $('.testimonial-slider').slick({
            autoplay: true,
            autoplaySpeed: 3500,
            dots: true,
            arrows: false,
            infinite: true,
            speed: 700,
            fade: true,              // tambah efek fade untuk lebih cinematic
            cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnHover: true
        });
    }

    // Slick untuk image slider (tetap, tambah fade)
    if (document.querySelector('.image-slider')) {
        $('.image-slider').slick({
            autoplay: true,
            autoplaySpeed: 4500,
            dots: true,
            arrows: true,
            infinite: true,
            speed: 800,
            fade: true,
            cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnHover: true
        });
    }

    // Optional: Subtle cursor glow (hanya di desktop, orange accent)
    if (window.innerWidth > 1024) {
        const cursorGlow = document.createElement('div');
        cursorGlow.style.cssText = `
            position: fixed;
            width: 280px;
            height: 280px;
            background: radial-gradient(circle at center, rgba(255,154,60,0.12) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            transition: opacity 0.4s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursorGlow);

        let timeout;
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top  = e.clientY + 'px';
            cursorGlow.style.opacity = '1';

            clearTimeout(timeout);
            timeout = setTimeout(() => {
                cursorGlow.style.opacity = '0';
            }, 1500);
        });
    }

    // IntersectionObserver untuk section visible (supplement AOS)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section').forEach(sec => observer.observe(sec));
});

// Back-to-top (tetap seperti asli, tapi lebih smooth)
const backToTop = document.createElement('div');
backToTop.id = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
        backToTop.style.opacity = '1';
        backToTop.style.transform = 'scale(1)';
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (window.scrollY <= 350) backToTop.style.display = 'none';
        }, 300);
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Optional: Prevent FOUC (Flash of Unstyled Content) di dark mode
document.documentElement.classList.add('js-loaded');