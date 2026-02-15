// Role8 Theme JS — Auto-runs on desk load
// Uses $(document).ready and frappe.after_ajax for desk

$(document).ready(function () {
    console.log("Role8 Theme Loaded 🚀");

    // Run after a short delay to let sidebar render
    setTimeout(function () {
        role8_fix_submenu_icons();
        role8_inject_sidebar_logo();
    }, 500);

    // Re-run on Frappe page changes (SPA)
    $(document).on('page-change', function () {
        setTimeout(function () {
            role8_fix_submenu_icons();
            role8_inject_sidebar_logo();
            role8_move_sidebar_to_body(); // NEW: Fix visibility by moving to body
            role8_init_sidebar_toggle();
        }, 500);
    });
});

/* ── NEW: Move Sidebar to Body (Fix visibility on List/Form views) ── */
function role8_move_sidebar_to_body() {
    var sidebar = $('.desk-sidebar');
    // If sidebar exists AND is not already a direct child of body
    if (sidebar.length > 0 && sidebar.parent()[0].tagName !== 'BODY') {
        console.log('Role8: Moving sidebar to body for global visibility');
        sidebar.prependTo('body');
    }
}

function role8_init_sidebar_toggle() {
    // Attach click event to the sidebar toggle button
    // We use 'body' delegation because the button might be re-rendered
    $('body').off('click', '.sidebar-toggle-btn').on('click', '.sidebar-toggle-btn', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('body').toggleClass('role8-sidebar-hidden');
    });
}



function role8_inject_sidebar_logo() {
    var sidebar = $('.desk-sidebar');
    if (sidebar.length === 0) return;

    // Check if logo already exists INSIDE this specific sidebar
    // If multiple sidebars exist (e.g. one hidden), we iterate
    sidebar.each(function () {
        var $thisSidebar = $(this);
        if ($thisSidebar.find('.role8-sidebar-logo').length > 0) return;

        // Create Logo HTML
        var logoHtml = `
            <div class="role8-sidebar-logo" style="padding: 20px; text-align: center; margin-bottom: 0;">
                <a href="/app/home" style="display: flex; align-items: center; justify-content: center; text-decoration: none;">
                    <img src="/assets/role8_theme/images/cloud360.png" style="max-height: 45px; width: auto;" alt="Cloud360" class="app-logo">
                </a>
            </div>
        `;

        // Prepend to sidebar
        $thisSidebar.prepend(logoHtml);
    });
}

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
        // console.log("Role8: Fixed submenu icon for", iconSpan.getAttribute('item-icon'));
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
