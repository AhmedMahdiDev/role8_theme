frappe.ready(function () {
    console.log("Role8 Theme Loaded 🚀");
    role8.init();
});

const role8 = {
    init: function () {
        this.inject_logo();
        this.setup_sidebar_effects();
    },

    inject_logo: function () {
        // Find the sidebar header or logo area
        const sidebar_header = $('.layout-side-section .app-logo');

        if (sidebar_header.length > 0) {
            // Replace or append Role8 logo
            // Assuming logo file is at /assets/role8_theme/images/role8_logo.png
            const logo_url = '/assets/role8_theme/images/role8_logo.png';

            // Create image element
            const logo_img = $(`<img src="${logo_url}" class="role8-logo" alt="Role8" style="max-height: 40px; width: auto;">`);

            // Clear existing text/logo and append new one
            sidebar_header.empty().append(logo_img);

            console.log("Role8 Logo Injected");
        }
    },

    setup_sidebar_effects: function () {
        // Add hover classes or extra listeners if needed
        $('.sidebar-item').hover(
            function () { $(this).addClass('role8-hover'); },
            function () { $(this).removeClass('role8-hover'); }
        );
    }
};
