(function ($) {
  "use strict";

  function isNameField(input) {
    var descriptor = [input.id, input.name, input.getAttribute("placeholder"), input.getAttribute("autocomplete")]
      .filter(Boolean).join(" ");

    return input.matches('input:not([type]), input[type="text"]') &&
      /(^|[\s_-])(name|first|last|john|smith)([\s_-]|$)/i.test(descriptor);
  }

  function prepareForms() {
    document.querySelectorAll("form").forEach(function (form) {
      form.removeAttribute("novalidate");

      form.querySelectorAll("input, textarea, select").forEach(function (field) {
        var isEmail = field.matches('input[type="email"], input[id*="email" i], input[name*="email" i], input[placeholder*="email" i]');
        var isPhone = field.matches('input[type="tel"], input[id*="phone" i], input[name*="phone" i], input[placeholder*="phone" i]');
        var isCheckbox = field.matches('input[type="checkbox"]');
        var isName = field instanceof HTMLInputElement && isNameField(field);

        field.required = isName || isEmail || isPhone || isCheckbox;
        if (field.required) {
          field.setAttribute("aria-required", "true");
        } else {
          field.removeAttribute("aria-required");
        }

        if (isEmail) field.type = "email";
        if (isPhone) {
          field.type = "tel";
          field.inputMode = "tel";
          field.classList.add("phoneNum");
        }
      });
    });
  }

  function initializeFormValidation() {
    prepareForms();

    var observer = new MutationObserver(function (mutations) {
      if (mutations.some(function (mutation) { return mutation.addedNodes.length > 0; })) {
        prepareForms();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeFormValidation, { once: true });
  } else {
    initializeFormValidation();
  }
})(window.jQuery);

