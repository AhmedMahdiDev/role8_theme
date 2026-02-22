// Role8 Theme JS — Auto-runs on desk load
// Uses $(document).ready and frappe.after_ajax for desk

$(document).ready(function () {
    console.log("Role8 Theme Loaded 🚀");

    // Run after a short delay to let sidebar render
    setTimeout(function () {
        role8_fix_submenu_icons();
        role8_inject_sidebar_logo();
        role8_inject_welcome_header();
    }, 500);

    // Re-run on Frappe page changes (SPA)
    $(document).on('page-change', function () {
        setTimeout(function () {
            role8_fix_submenu_icons();
            role8_inject_sidebar_logo();
            role8_init_sidebar_toggle();
            role8_inject_welcome_header();
        }, 500);
    });
});

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

/* ── Welcome Header — Azia-style greeting banner ── */
function role8_inject_welcome_header() {
    // Only show on Home workspace (case-insensitive)
    var route = frappe.get_route();
    if (!route) return;
    var r0 = (route[0] || '').toLowerCase();
    var r1 = (route[1] || '').toLowerCase();
    if (r0 !== 'workspaces' || (r1 && r1 !== 'home')) {
        return;
    }

    // Don't inject if already exists
    if ($('.role8-welcome-header').length > 0) return;

    // Get user display name
    var fullName = frappe.session.user_fullname || frappe.session.user || 'User';
    var firstName = fullName.split(' ')[0];

    // Get current time for greeting
    var hour = new Date().getHours();
    var greeting = 'Hi';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';

    var welcomeHtml = '<div class="role8-welcome-header">' +
        '<h2>' + greeting + ', ' + firstName + '! 👋</h2>' +
        '<p>Your finance performance and monitoring dashboard.</p>' +
        '</div>';

    // Find the workspace content area and prepend
    var workspaceBody = $('.layout-main-section .codex-editor');
    if (workspaceBody.length > 0) {
        workspaceBody.before(welcomeHtml);
    } else {
        var layoutMain = $('.layout-main-section');
        if (layoutMain.length > 0) {
            layoutMain.prepend(welcomeHtml);
        }
    }
}
