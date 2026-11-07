(function () {
    "use strict";

    function protectForm(form) {
        if (!form || form.dataset.leadProtected === "yes") {
            return;
        }

        var action = (form.getAttribute("action") || "").toLowerCase();

        if (action.indexOf("sendmail.php") === -1) {
            return;
        }

        form.dataset.leadProtected = "yes";

        var honey = form.querySelector('input[name="website_url"]');
        if (!honey) {
            honey = document.createElement("input");
            honey.type = "text";
            honey.name = "website_url";
            honey.value = "";
            honey.autocomplete = "off";
            honey.tabIndex = -1;
            honey.setAttribute("aria-hidden", "true");
            honey.style.position = "absolute";
            honey.style.left = "-99999px";
            honey.style.top = "-99999px";
            honey.style.opacity = "0";
            honey.style.height = "0";
            honey.style.width = "0";
            honey.style.pointerEvents = "none";
            form.appendChild(honey);
        }

        var started = form.querySelector('input[name="form_started_at"]');
        if (!started) {
            started = document.createElement("input");
            started.type = "hidden";
            started.name = "form_started_at";
            form.appendChild(started);
        }

        started.value = Math.floor(Date.now() / 1000);

        form.addEventListener("submit", function () {
            var field = form.querySelector('input[name="form_started_at"]');
            if (field && !field.value) {
                field.value = Math.floor(Date.now() / 1000);
            }
        });
    }

    function initializeLeadProtection() {
        document.querySelectorAll("form").forEach(protectForm);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeLeadProtection, { once: true });
    } else {
        initializeLeadProtection();
    }
})();
