// Role8 Theme JS — Auto-runs on desk load
// Uses $(document).ready and frappe.after_ajax for desk

$(document).ready(function () {
    console.log("Role8 Theme Loaded 🚀");

    // Run after a short delay to let sidebar render
    setTimeout(function () {
        role8_fix_submenu_icons();
        role8_inject_sidebar_logo();
        role8_inject_welcome_header();
        role8_inject_finance_cards();
    }, 500);

    // Re-run on Frappe page changes (SPA)
    $(document).on('page-change', function () {
        setTimeout(function () {
            role8_fix_submenu_icons();
            role8_inject_sidebar_logo();
            role8_init_sidebar_toggle();
            role8_inject_welcome_header();
            role8_inject_finance_cards();
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
        // Remove if navigated away from Home
        $('.role8-welcome-header').remove();
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

/* ── Finance Summary Cards — Azia-style KPI Cards ── */
function role8_inject_finance_cards() {
    // Only show on Home workspace
    var route = frappe.get_route();
    if (!route) return;
    var r0 = (route[0] || '').toLowerCase();
    var r1 = (route[1] || '').toLowerCase();
    if (r0 !== 'workspaces' || (r1 && r1 !== 'home')) {
        // Remove if navigated away from Home
        $('.role8-finance-cards').remove();
        return;
    }

    // Don't inject if already exists
    if ($('.role8-finance-cards').length > 0) return;

    // SVG icons
    var incomeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>';
    var expenseIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>';
    var profitIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"></rect><line x1="2" y1="9" x2="22" y2="9"></line><line x1="12" y1="9" x2="12" y2="21"></line></svg>';

    // Create loading skeleton cards first
    var cardsHtml = '<div class="role8-finance-cards">' +
        role8_build_card('card-income', 'TOTAL INCOME', '...', '', incomeIcon, true) +
        role8_build_card('card-expense', 'TOTAL EXPENSES', '...', '', expenseIcon, true) +
        role8_build_card('card-profit', 'NET PROFIT / LOSS', '...', '', profitIcon, true) +
        '</div>';

    // Insert after welcome header or before chart
    var welcomeHeader = $('.role8-welcome-header');
    if (welcomeHeader.length > 0) {
        welcomeHeader.after(cardsHtml);
    } else {
        var chartWidget = $('.widget.dashboard-widget-box').first();
        if (chartWidget.length > 0) {
            chartWidget.before(cardsHtml);
        } else {
            var layoutMain = $('.layout-main-section');
            if (layoutMain.length > 0) layoutMain.prepend(cardsHtml);
        }
    }

    // Fetch actual P&L data
    role8_fetch_pnl_data();
}

function role8_build_card(typeClass, label, value, trend, iconSvg, loading) {
    var loadClass = loading ? ' loading' : '';
    return '<div class="role8-finance-card ' + typeClass + loadClass + '">' +
        '<div class="card-header-row">' +
        '<div class="card-icon">' + iconSvg + '</div>' +
        '<span class="card-label">' + label + '</span>' +
        '</div>' +
        '<div class="card-value">' + value + '</div>' +
        '<div class="card-trend">' + trend + '</div>' +
        '</div>';
}

function role8_fetch_pnl_data() {
    var company = frappe.defaults.get_user_default('company');
    if (!company) {
        role8_update_cards_error('No company set');
        return;
    }

    var year = new Date().getFullYear();

    frappe.call({
        method: 'frappe.desk.query_report.run',
        args: {
            report_name: 'Profit and Loss Statement',
            filters: {
                company: company,
                period_start_date: year + '-01-01',
                period_end_date: year + '-12-31',
                periodicity: 'Yearly'
            }
        },
        callback: function (r) {
            if (r && r.message) {
                role8_render_pnl_cards(r.message);
            } else {
                role8_update_cards_error('No data');
            }
        },
        error: function () {
            role8_update_cards_error('Error loading data');
        }
    });
}

function role8_render_pnl_cards(data) {
    var income = 0, expense = 0, netProfit = 0;
    var currency = frappe.boot.sysdefaults.currency || 'SAR';
    var year = new Date().getFullYear();

    // Parse report_summary — skip separator entries
    // Structure: [Income, sep, Expense, sep, Profit]
    if (data.report_summary && data.report_summary.length >= 3) {
        var dataItems = data.report_summary.filter(function (item) {
            return item.type !== 'separator' && item.datatype;
        });
        if (dataItems.length >= 3) {
            income = Math.abs(parseFloat(dataItems[0].value) || 0);
            expense = Math.abs(parseFloat(dataItems[1].value) || 0);
            netProfit = parseFloat(dataItems[2].value) || 0;
        } else if (dataItems.length >= 1) {
            income = Math.abs(parseFloat(dataItems[0].value) || 0);
            if (dataItems[1]) expense = Math.abs(parseFloat(dataItems[1].value) || 0);
            netProfit = income - expense;
        }
    } else if (data.result) {
        // Fallback: parse rows
        data.result.forEach(function (row) {
            if (row.account_name === 'Total Income' || row.account === 'Total Income') {
                income = Math.abs(row.total || 0);
            }
            if (row.account_name === 'Total Expense' || row.account === 'Total Expense') {
                expense = Math.abs(row.total || 0);
            }
        });
        netProfit = income - expense;
    }

    var formatNum = function (n) {
        var currencyHtml = (currency === 'SAR')
            ? '<span class="icon-saudi_riyal_bold"></span>'
            : '<span class="currency">' + currency + '</span>';
        return currencyHtml + ' ' +
            Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Build trend HTML
    var profitTrend = netProfit >= 0
        ? '<div class="card-trend trend-up"><span class="trend-icon">▲</span> Profitable</div>'
        : '<div class="card-trend trend-down"><span class="trend-icon">▼</span> Loss</div>';

    // Update income card
    var cards = $('.role8-finance-cards');
    cards.find('.card-income').removeClass('loading')
        .find('.card-value').html(formatNum(income)).end()
        .find('.card-trend').html('<div class="card-trend trend-up"><span class="trend-icon">▲</span> ' + year + ' Total</div>');

    cards.find('.card-expense').removeClass('loading')
        .find('.card-value').html(formatNum(expense)).end()
        .find('.card-trend').html('<div class="card-trend trend-down"><span class="trend-icon">▼</span> ' + year + ' Total</div>');

    cards.find('.card-profit').removeClass('loading')
        .find('.card-value').html(formatNum(netProfit)).end()
        .find('.card-trend').html(profitTrend);
}

function role8_update_cards_error(msg) {
    $('.role8-finance-cards .role8-finance-card').removeClass('loading')
        .find('.card-value').text(msg);
}
