document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const loader = document.querySelector('.loader');
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 1500);

    // Typing Animation
    const typingElement = document.querySelector('.typing-animation');
    const texts = ["Suganeshwaran A", "a Full Stack Developer", "a Python Programmer", "a Problem Solver"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 1800;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing animation after preloader
    setTimeout(type, 1600);

    // Theme Toggle Functionality
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        themeSwitch.checked = currentTheme === 'dark-theme';
    }

    // Theme switch event
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Run once on page load

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navUl.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navUl.classList.remove('active');
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.querySelector('.form-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        formMessage.textContent = 'Message sent successfully!';
        formMessage.style.color = '#4CAF50';
        formMessage.style.display = 'block';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            formMessage.style.display = 'none';
        }, 3000);
    });

    // Project Demo Modal
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    const modalIframe = document.getElementById('modalIframe');
    const projectLinks = document.querySelectorAll('.project-link');

    // Demo URLs for projects (replace with your actual demo URLs)
    const demoUrls = {
        library: "https://library-management-demo.com",
        phishing: "https://phishing-detection-demo.com",
        portfolio: "https://your-portfolio-demo.com"
    };

    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            modalIframe.setAttribute('src', demoUrls[projectId]);
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        modalIframe.setAttribute('src', '');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalIframe.setAttribute('src', '');
            document.body.style.overflow = 'auto';
        }
    });

    // Animate Skills Progress Bars on Scroll
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skillItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
            
            if (isVisible) {
                item.querySelector('.progress').style.opacity = '1';
            }
        });
    }
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run once on page load

    // Simple Animation on Scroll (AOS) Implementation
    const aosElements = document.querySelectorAll('[data-aos]');
    
    function checkAOS() {
        aosElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0);
            
            if (isVisible) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkAOS);
    window.addEventListener('load', checkAOS);

    // Update Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Tooltip Initialization
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.setAttribute('data-tooltip-active', 'true');
        });
        
        element.addEventListener('mouseleave', function() {
            this.removeAttribute('data-tooltip-active');
        });
    });
});