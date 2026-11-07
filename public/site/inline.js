
function initializeModal() {
  const modal = document.getElementById("lp-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const form = document.getElementById("modal-contact-form");
  const successBox = document.getElementById("modal-success-msg");
  const successClose = document.getElementById("modal-success-close");

  // Event Delegation for CTA click events across the document
  const openModalHandler = (e) => {
    // Traverse up to find a matching trigger
    let target = e.target;
    while (target && target !== document) {
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('btn') || target.getAttribute('role') === 'button') {
        const text = target.textContent.trim().toLowerCase();
        
        // Skip close buttons, newsletter submits, and the modal form submit itself
        if (target.id === 'modal-close-btn' || target.id === 'modal-success-close') {
          target = target.parentNode;
          continue;
        }
        if (target.type === 'submit' && target.closest('#modal-contact-form')) {
          target = target.parentNode;
          continue;
        }
        
        if (target.tagName === 'A') {
          const href = (target.getAttribute('href') || '').trim();
          // Allow real page links (like contact-us/index.php, about-us, etc.) to navigate normally
          if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
            if (!target.classList.contains('open-modal-btn') && !target.classList.contains('trigger-modal')) {
              target = target.parentNode;
              continue;
            }
          }
        }
        
        const ctaPhrases = [
          'consultation', 'quote', 'start project', 'publish', 'know more', 
          'talk to us', 'get in touch', 'advisor', 'send message', 
          'ask us', 'anything', 'touch', 'get started', 'start', 'live chat', 
          'chat', 'write'
        ];
        
        const isCTA = ctaPhrases.some(phrase => text.includes(phrase)) || 
                      target.getAttribute('href') === '#contact' ||
                      target.classList.contains('open-modal-btn') ||
                      target.classList.contains('trigger-modal');
                      
        if (isCTA) {
          e.preventDefault();
          e.stopPropagation();
          
          if (modal) {
            // Reset states
            if (form) form.style.display = "flex";
            if (successBox) successBox.classList.remove("show");
            
            modal.classList.add("modal-open");
          }
          return;
        }
      }
      target = target.parentNode;
    }
  };

  document.addEventListener("click", openModalHandler, true);

  if (modal) {
    const closeModal = () => {
      modal.classList.remove("modal-open");
    };

    closeBtn?.addEventListener("click", closeModal);
    successClose?.addEventListener("click", closeModal);

    // Close when clicking outside of modal container
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

  }

}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeModal, { once: true });
} else {
  initializeModal();
}



    
async function initializePhoneInputs() {
    const selector = 'input[name="phone"], input[name="phone_number"], input.phoneNum, input[type="tel"], input[type="phone"]';

    if (!window.intlTelInput) {
        console.error("intl-tel-input library missing");
        return;
    }

    // Detect country by IP
    async function detectCountry() {
        for (const url of [
            "https://ipwho.is/",
            "https://ipapi.co/json/"
        ]) {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 4000);

            try {
                const response = await fetch(url, {
                    signal: controller.signal
                });
                if (!response.ok) continue;

                const data = await response.json();
                if (data.country_code && data.success !== false) {
                    return data.country_code.toLowerCase();
                }
            } catch (e) {
                console.warn("IP lookup failed:", e);
            } finally {
                clearTimeout(timer);
            }
        }
        return "us";
    }

    const countryPromise = detectCountry();
    const instances = new WeakMap();

    function initialize() {
        document.querySelectorAll(selector).forEach(input => {
            if (instances.has(input)) return;

            // Remove an existing Inputmask
            if (window.jQuery && jQuery.fn.inputmask) {
                try {
                    jQuery(input).inputmask("remove");
                } catch (e) {}
            }

            input.type = "tel";
            input.setAttribute("autocomplete", "off");
            input.setAttribute("inputmode", "tel");
            input.setAttribute("data-lpignore", "true");

            const iti = window.intlTelInput(input, {
                initialCountry: "us",
                allowDropdown: false,
                showFlags: false,
                separateDialCode: false,
                nationalMode: false,
                autoPlaceholder: "aggressive",
                formatAsYouType: true,
                strictMode: true,
                loadUtils: () => import(
                    "https://cdn.jsdelivr.net/npm/intl-tel-input@25.10.5/build/js/utils.js"
                )
            });

            instances.set(input, iti);

            // Set country prefix automatically
            Promise.all([countryPromise, iti.promise]).then(([country]) => {
                iti.setCountry(country);

                const dialCode = iti.getSelectedCountryData().dialCode;

                if (!input.value.trim()) {
                    input.value = "+" + dialCode + " ";
                }
            }).catch(console.error);

            input.addEventListener("focus", function () {
                if (!input.value.trim()) {
                    const dialCode = iti.getSelectedCountryData().dialCode;
                    input.value = "+" + dialCode + " ";
                }
            });

            input.addEventListener("input", function () {
                input.setCustomValidity("");
            });
        });
    }

    initialize();

    // Support popup forms
    const observer = new MutationObserver(mutations => {
        if (mutations.some(m => m.addedNodes.length)) {
            initialize();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Validate before submission
    document.addEventListener("submit", function (event) {
        const form = event.target;
        if (!(form instanceof HTMLFormElement)) return;

        for (const input of form.querySelectorAll(selector)) {
            const iti = instances.get(input);
            if (!iti) continue;

            input.setCustomValidity("");

            if (!iti.isValidNumber()) {
                event.preventDefault();
                event.stopImmediatePropagation();
                input.setCustomValidity("Enter a valid phone number");
                input.reportValidity();
                return;
            }

            input.value = iti.getNumber();
        }
    }, true);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePhoneInputs, { once: true });
} else {
    initializePhoneInputs();
}

