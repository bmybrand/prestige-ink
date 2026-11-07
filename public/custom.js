function initializeSite() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800
        });
    }

    // Header dropdown toggle
    const servicesBtn = document.querySelector('button[aria-expanded]');
    if (servicesBtn) {
        const dropdown = servicesBtn.nextElementSibling;
        
        let isOpen = false;
        
        const toggleDropdown = () => {
            isOpen = !isOpen;
            servicesBtn.setAttribute('aria-expanded', isOpen);
            
            if (isOpen) {
                dropdown.classList.remove('invisible', '-translate-y-1', 'opacity-0');
                dropdown.classList.add('visible', 'translate-y-0', 'opacity-100');
            } else {
                dropdown.classList.add('invisible', '-translate-y-1', 'opacity-0');
                dropdown.classList.remove('visible', 'translate-y-0', 'opacity-100');
            }
        };

        // Desktop hover
        const liItem = servicesBtn.closest('li');
        if (liItem) {
            liItem.addEventListener('mouseenter', () => {
                if (!isOpen) toggleDropdown();
            });
            liItem.addEventListener('mouseleave', () => {
                if (isOpen) toggleDropdown();
            });
        }
        
        // Mobile click
        servicesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDropdown();
        });
    }

    // Number counter animation
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    // FAQ Accordion
    const faqButtons = document.querySelectorAll('.space-y-4 > div > button');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.parentElement;
            const content = button.nextElementSibling;
            const icon = button.querySelector('svg');
            
            const isOpen = content.classList.contains('grid-rows-[1fr]');
            
            // Close all others
            faqButtons.forEach(btn => {
                const otherParent = btn.parentElement;
                const otherContent = btn.nextElementSibling;
                const otherIcon = btn.querySelector('svg');
                
                otherParent.classList.remove('border-gold/40', 'shadow-editorial');
                otherParent.classList.add('border-ink/10', 'hover:border-gold/30');
                
                otherContent.classList.remove('grid-rows-[1fr]', 'opacity-100');
                otherContent.classList.add('grid-rows-[0fr]', 'opacity-0');
                
                if (otherIcon) {
                    otherIcon.classList.remove('rotate-180');
                }
            });
            
            // Toggle current
            if (!isOpen) {
                parent.classList.remove('border-ink/10', 'hover:border-gold/30');
                parent.classList.add('border-gold/40', 'shadow-editorial');
                
                content.classList.remove('grid-rows-[0fr]', 'opacity-0');
                content.classList.add('grid-rows-[1fr]', 'opacity-100');
                
                if (icon) {
                    icon.classList.add('rotate-180');
                }
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSite, { once: true });
} else {
    initializeSite();
}

// Remove old fixed US phone mask globally
function removeOldPhoneMask() {
    document.querySelectorAll(".phoneNum").forEach(function(input) {
        input.inputmask?.remove();
        input.setCustomValidity("");
    });
}

removeOldPhoneMask();
