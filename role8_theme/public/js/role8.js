// Role8 Theme JS — Auto-runs on desk load
// Uses $(document).ready and frappe.after_ajax for desk

$(document).ready(function () {
    console.log("Role8 Theme Loaded 🚀");

    // Run after a short delay to let sidebar render
    setTimeout(function () {
        role8_fix_submenu_icons();
    }, 500);

    // Re-run on Frappe page changes (SPA)
    $(document).on('page-change', function () {
        setTimeout(role8_fix_submenu_icons, 500);
    });
});

function role8_fix_submenu_icons() {
    // Find all sidebar sub-item icons with arrow-left or arrow-right
    var icons = document.querySelectorAll(
        '.sidebar-item-icon[item-icon="arrow-left"],' +
        '.sidebar-item-icon[item-icon="arrow-right"],' +
        '.sidebar-item-icon[item-icon="arrow-up-right"]'
    );

    icons.forEach(function (iconSpan) {
        // Skip if already fixed
        if (iconSpan.getAttribute('data-role8-fixed')) return;

        // Hide the original SVG
        var svg = iconSpan.querySelector('svg');
        if (svg) {
            svg.style.display = 'none';
        }

        // Insert a white dot/circle instead
        var dot = document.createElement('span');
        dot.className = 'role8-submenu-dot';
        dot.textContent = '\u2022'; // bullet character •
        iconSpan.appendChild(dot);
        iconSpan.setAttribute('data-role8-fixed', 'true');
        console.log("Role8: Fixed submenu icon for", iconSpan.getAttribute('item-icon'));
    });

    // Also watch for sidebar mutations (menu expand/collapse)
    var sidebar = document.querySelector('.desk-sidebar') || document.querySelector('.layout-side-section');
    if (sidebar && !sidebar.getAttribute('data-role8-observer')) {
        var observer = new MutationObserver(function () {
            setTimeout(role8_fix_submenu_icons, 200);
        });
        observer.observe(sidebar, { childList: true, subtree: true });
        sidebar.setAttribute('data-role8-observer', 'true');
    }
}
