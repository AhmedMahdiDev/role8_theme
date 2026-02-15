frappe.ready(function () {
    console.log("Role8 Theme Loaded 🚀");
    role8.init();
});

const role8 = {
    init: function () {
        this.inject_logo();
        this.setup_sidebar_effects();
        this.fix_submenu_icons();

        // Re-run on route change (SPA navigation)
        frappe.router && frappe.router.on && frappe.router.on('change', () => {
            setTimeout(() => this.fix_submenu_icons(), 300);
        });

        // Also watch for sidebar mutations (when menus expand/collapse)
        this.observe_sidebar();
    },

    inject_logo: function () {
        const sidebar_header = $('.layout-side-section .app-logo');
        if (sidebar_header.length > 0) {
            const logo_url = '/assets/role8_theme/images/role8_logo.png';
            const logo_img = $(`<img src="${logo_url}" class="role8-logo" alt="Role8" style="max-height: 40px; width: auto;">`);
            sidebar_header.empty().append(logo_img);
            console.log("Role8 Logo Injected");
        }
    },

    fix_submenu_icons: function () {
        // Find all sidebar sub-item icons with arrow-left or arrow-right
        document.querySelectorAll('.desk-sidebar .sidebar-item-icon[item-icon="arrow-left"], .desk-sidebar .sidebar-item-icon[item-icon="arrow-right"], .layout-side-section .sidebar-item-icon[item-icon="arrow-left"], .layout-side-section .sidebar-item-icon[item-icon="arrow-right"]').forEach(function (iconSpan) {
            // Skip if already fixed
            if (iconSpan.dataset.role8Fixed) return;

            // Hide the original SVG
            const svg = iconSpan.querySelector('svg');
            if (svg) {
                svg.style.display = 'none';
            }

            // Insert a white dot/circle instead
            const dot = document.createElement('span');
            dot.className = 'role8-submenu-dot';
            dot.innerHTML = '•';
            iconSpan.appendChild(dot);
            iconSpan.dataset.role8Fixed = 'true';
        });
    },

    observe_sidebar: function () {
        // Watch for DOM changes in sidebar (menu expand/collapse)
        const sidebar = document.querySelector('.desk-sidebar') || document.querySelector('.layout-side-section');
        if (sidebar) {
            const observer = new MutationObserver(() => {
                setTimeout(() => this.fix_submenu_icons(), 100);
            });
            observer.observe(sidebar, { childList: true, subtree: true });
        }
    },

    setup_sidebar_effects: function () {
        $('.sidebar-item').hover(
            function () { $(this).addClass('role8-hover'); },
            function () { $(this).removeClass('role8-hover'); }
        );
    }
};
