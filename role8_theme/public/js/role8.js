// Role8 Theme JS — Auto-runs on desk load
// Uses $(document).ready and frappe.after_ajax for desk

/* ══════════════════════════════════════════════════════════
   Translation Helper — bilingual AR / EN
   ══════════════════════════════════════════════════════════ */
var ROLE8_LANG = (document.documentElement.lang || 'en').toLowerCase().startsWith('ar') ? 'ar' : 'en';

var ROLE8_STRINGS = {
    // Greetings
    'good_morning': { en: 'Good Morning', ar: 'صباح الخير' },
    'good_afternoon': { en: 'Good Afternoon', ar: 'مساء الخير' },
    'good_evening': { en: 'Good Evening', ar: 'مساء الخير' },
    'dashboard_subtitle': { en: 'Your finance performance and monitoring dashboard.', ar: 'لوحة متابعة الأداء المالي الخاصة بك.' },

    // Finance cards
    'total_income': { en: 'TOTAL INCOME', ar: 'إجمالي الإيرادات' },
    'total_expenses': { en: 'TOTAL EXPENSES', ar: 'إجمالي المصروفات' },
    'net_profit_loss': { en: 'NET PROFIT / LOSS', ar: 'صافي الربح / الخسارة' },
    'profitable': { en: 'Profitable', ar: 'مربح' },
    'loss': { en: 'Loss', ar: 'خسارة' },
    'total': { en: 'Total', ar: 'الإجمالي' },
    'no_company': { en: 'No company set', ar: 'لم يتم تحديد شركة' },
    'no_data': { en: 'No data', ar: 'لا توجد بيانات' },
    'error_loading': { en: 'Error loading data', ar: 'خطأ في تحميل البيانات' },

    // Login
    'sign_in': { en: 'Sign In', ar: 'تسجيل الدخول' },
    'sign_in_subtitle': { en: 'Enter your credentials to access your account', ar: 'أدخل بياناتك للوصول إلى حسابك' },
    'erp_headline': { en: 'Your Cloud ERP<br>Solution for Growth.', ar: 'حلول ERP السحابية<br>لنمو أعمالك.' },
    'erp_subtitle': { en: 'Manage your accounting, inventory, CRM and operations — all in one powerful platform built for modern businesses.', ar: 'إدارة المحاسبة والمخزون وعلاقات العملاء والعمليات — الكل في منصة واحدة قوية مصممة للأعمال الحديثة.' },

    // Module card labels
    'unpaid_invoices': { en: 'Unpaid Invoices', ar: 'فواتير غير مدفوعة' },
    'overdue_payments': { en: 'Overdue Payments', ar: 'مدفوعات متأخرة' },
    'total_revenue': { en: 'Total Revenue', ar: 'إجمالي الإيرادات' },
    'draft_journals': { en: 'Draft Journals', ar: 'قيود مسودة' },

    'open_quotations': { en: 'Open Quotations', ar: 'عروض أسعار مفتوحة' },
    'active_orders': { en: 'Active Sales Orders', ar: 'أوامر بيع نشطة' },
    'pending_delivery': { en: 'Pending Deliveries', ar: 'تسليمات معلقة' },
    'monthly_revenue': { en: 'Monthly Revenue', ar: 'إيرادات الشهر' },

    'pending_po': { en: 'Pending POs', ar: 'أوامر شراء معلقة' },
    'unpaid_suppliers': { en: 'Unpaid Suppliers', ar: 'موردون غير مدفوعين' },
    'items_to_receive': { en: 'Items to Receive', ar: 'أصناف للاستلام' },
    'purchase_returns': { en: 'Purchase Returns', ar: 'مرتجعات المشتريات' },

    'total_items': { en: 'Total Items', ar: 'إجمالي الأصناف' },
    'low_stock': { en: 'Low Stock Items', ar: 'أصناف منخفضة المخزون' },
    'pending_receipts': { en: 'Pending Receipts', ar: 'إيصالات معلقة' },
    'pending_deliveries': { en: 'Pending Deliveries', ar: 'تسليمات معلقة' },

    'total_assets': { en: 'Total Assets', ar: 'إجمالي الأصول' },
    'depreciating': { en: 'Depreciating', ar: 'قيد الإهلاك' },
    'fully_depreciated': { en: 'Fully Depreciated', ar: 'مُهلكة بالكامل' },
    'pending_repairs': { en: 'Pending Repairs', ar: 'صيانة معلقة' },

    'open_inspections': { en: 'Open Inspections', ar: 'فحوصات مفتوحة' },
    'non_conformance': { en: 'Non-Conformances', ar: 'عدم مطابقة' },
    'actions_open': { en: 'Actions Open', ar: 'إجراءات مفتوحة' },
    'reviews_pending': { en: 'Reviews Pending', ar: 'مراجعات معلقة' },

    'active_projects': { en: 'Active Projects', ar: 'مشاريع نشطة' },
    'open_tasks': { en: 'Open Tasks', ar: 'مهام مفتوحة' },
    'overdue_tasks': { en: 'Overdue Tasks', ar: 'مهام متأخرة' },
    'timesheets_today': { en: 'Timesheets Today', ar: 'سجل الوقت اليوم' },

    'open_tickets': { en: 'Open Tickets', ar: 'تذاكر مفتوحة' },
    'avg_resolution': { en: 'Avg Resolution', ar: 'متوسط الحل' },
    'unresolved': { en: 'Unresolved', ar: 'غير محلولة' },
    'sla_breach': { en: 'SLA Breach', ar: 'انتهاك SLA' },

    'total_users': { en: 'Total Users', ar: 'إجمالي المستخدمين' },
    'active_today': { en: 'Active Today', ar: 'نشط اليوم' },
    'roles_count': { en: 'Roles', ar: 'الأدوار' },
    'sessions': { en: 'Active Sessions', ar: 'جلسات نشطة' },

    'published_pages': { en: 'Published Pages', ar: 'صفحات منشورة' },
    'blog_posts': { en: 'Blog Posts', ar: 'مقالات المدونة' },
    'web_forms': { en: 'Web Forms', ar: 'نماذج الويب' },
    'visitors': { en: 'Visitors', ar: 'الزوار' },

    'open_leads': { en: 'Open Leads', ar: 'عملاء محتملون' },
    'active_opps': { en: 'Active Opportunities', ar: 'فرص نشطة' },
    'won_this_month': { en: 'Won This Month', ar: 'فاز هذا الشهر' },
    'lost_this_month': { en: 'Lost This Month', ar: 'خسائر هذا الشهر' },

    'pending_imports': { en: 'Pending Imports', ar: 'استيرادات معلقة' },
    'error_logs': { en: 'Error Logs', ar: 'سجلات الأخطاء' },
    'scheduled_jobs': { en: 'Scheduled Jobs', ar: 'مهام مجدولة' },
    'bg_jobs': { en: 'Background Jobs', ar: 'مهام في الخلفية' },

    'loading': { en: 'Loading...', ar: '...جاري التحميل' }
};

function role8_t(key) {
    var entry = ROLE8_STRINGS[key];
    if (!entry) return key;
    return entry[ROLE8_LANG] || entry['en'] || key;
}

/* ══════════════════════════════════════════════════════════
   Bootstrap — ready + page-change
   ══════════════════════════════════════════════════════════ */
$(document).ready(function () {
    console.log("Role8 Theme Loaded 🚀");

    // Login page panel (multiple retries for async rendering)
    role8_inject_login_panel();
    setTimeout(role8_inject_login_panel, 100);
    setTimeout(role8_inject_login_panel, 500);
    setTimeout(role8_inject_login_panel, 1500);
    setTimeout(role8_inject_login_panel, 3000);

    // Skip desk-only functions if not on desk
    if (typeof frappe === 'undefined' || !frappe.get_route) return;

    // Run after a short delay to let sidebar render
    setTimeout(function () {
        role8_fix_submenu_icons();
        role8_inject_sidebar_logo();
        role8_inject_welcome_header();
        role8_inject_finance_cards();
        role8_inject_module_cards();
        role8_inject_language_switcher();
        role8_inject_home_icon();
    }, 500);

    // Re-run on Frappe page changes (SPA)
    $(document).on('page-change', function () {
        setTimeout(function () {
            role8_fix_submenu_icons();
            role8_inject_sidebar_logo();
            role8_init_sidebar_toggle();
            role8_inject_welcome_header();
            role8_inject_finance_cards();
            role8_inject_module_cards();
            role8_inject_language_switcher();
            role8_inject_home_icon();
        }, 500);
    });

    // Continuously monitor sidebar state to handle asynchronous SPA routing in Frappe
    setInterval(function() {
        var toggle = document.querySelector('.sidebar-toggle-btn');
        var sidebars = document.querySelectorAll('.desk-sidebar');
        var hasSidebar = false;
        var sidebarVisible = false;
        
        for (var i = 0; i < sidebars.length; i++) {
            var sidebar = sidebars[i];
            if (sidebar.querySelectorAll('.standard-sidebar-item').length > 0) {
                hasSidebar = true;
                // Check if sidebar is actually visible on screen
                if (sidebar.offsetWidth > 0 && sidebar.offsetHeight > 0) {
                    sidebarVisible = true;
                }
                break;
            }
        }
        
        if (hasSidebar) {
            if (toggle) toggle.style.display = '';
            document.body.classList.add('role8-has-sidebar');
            // Auto-detect: if sidebar exists but not visible, mark as hidden
            if (!sidebarVisible) {
                document.body.classList.add('role8-sidebar-hidden');
            } else {
                document.body.classList.remove('role8-sidebar-hidden');
            }
        } else {
            if (toggle) toggle.style.setProperty('display', 'none', 'important');
            document.body.classList.remove('role8-has-sidebar');
            document.body.classList.remove('role8-sidebar-hidden');
        }
    }, 150);
});

function role8_init_sidebar_toggle() {
    $('body').off('click', '.sidebar-toggle-btn').on('click', '.sidebar-toggle-btn', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('body').toggleClass('role8-sidebar-hidden');
    });
}

/* ── Handled by setInterval in $(document).ready ── */

/* ══════════════════════════════════════════════════════════
   Language Switcher
   ══════════════════════════════════════════════════════════ */
function role8_inject_language_switcher() {
    if (document.querySelector('.role8-language-switcher')) return;

    var checkExist = setInterval(function () {
        var headerActions = null;
        var navs = document.querySelectorAll('header .navbar-nav');
        navs.forEach(function (nav) {
            if (nav.querySelector('.dropdown-notifications')) {
                headerActions = nav;
            }
        });

        if (!headerActions) {
            headerActions = document.querySelector('header .navbar-nav.justify-content-end') || document.querySelector('.navbar .navbar-right');
        }

        if (headerActions) {
            clearInterval(checkExist);

            if (document.querySelector('.role8-language-switcher')) return;

            var isArabic = ROLE8_LANG === 'ar';
            var targetLang = isArabic ? 'en' : 'ar';
            var label = isArabic ? 'English' : 'عربي';

            var langItem = document.createElement('li');
            langItem.className = 'nav-item dropdown role8-language-switcher';
            langItem.style.display = 'flex';
            langItem.style.alignItems = 'center';
            langItem.innerHTML = `
                <a class="nav-link" href="#" onclick="event.preventDefault(); role8_switch_language('${targetLang}')" title="Switch Language">
                    <span style="font-weight: 600; font-size: 14px; color: var(--text-color); margin: 0 10px;">${label}</span>
                </a>
            `;

            var notificationBell = headerActions.querySelector('.dropdown-notifications');
            if (notificationBell) {
                headerActions.insertBefore(langItem, notificationBell);
            } else {
                headerActions.prepend(langItem);
            }
        }
    }, 200);
}

window.role8_switch_language = function (lang) {
    if (!frappe || !frappe.call) return;
    frappe.call({
        method: "frappe.client.set_value",
        args: {
            doctype: "User",
            name: frappe.session.user,
            fieldname: "language",
            value: lang
        },
        callback: function (r) {
            if (!r.exc) {
                window.location.reload();
            }
        }
    });
};

/* ══════════════════════════════════════════════════════════
   Home Icon in Navbar
   ══════════════════════════════════════════════════════════ */
function role8_inject_home_icon() {
    if (document.querySelector('.role8-home-icon')) return;

    var breadcrumbs = document.getElementById('navbar-breadcrumbs');
    if (breadcrumbs) {
        var homeIconHtml = `
            <a href="/app/home" class="role8-home-icon" title="Home">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </a>
        `;
        $(breadcrumbs).before(homeIconHtml);
    } else {
        // Fallback: try to find the breadcrumbs container if ID isn't immediately available
        var container = document.querySelector('.navbar-breadcrumbs') || document.querySelector('.breadcrumb-container');
        if (container && !container.querySelector('.role8-home-icon')) {
            var icon = document.createElement('a');
            icon.href = '/app/home';
            icon.className = 'role8-home-icon';
            icon.title = 'Home';
            icon.innerHTML = `
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            `;
            container.parentNode.insertBefore(icon, container);
        }
    }
}

/* ══════════════════════════════════════════════════════════
   Sidebar Logo
   ══════════════════════════════════════════════════════════ */
function role8_inject_sidebar_logo() {
    var sidebar = $('.desk-sidebar');
    if (sidebar.length === 0) return;

    sidebar.each(function () {
        var $thisSidebar = $(this);
        if ($thisSidebar.find('.role8-sidebar-logo').length > 0) return;

        var logoHtml = `
            <div class="role8-sidebar-logo" style="padding: 20px; text-align: center; margin-bottom: 0;">
                <a href="/app/home" style="display: flex; align-items: center; justify-content: center; text-decoration: none;">
                    <img src="/assets/role8_theme/images/cloud360.png" style="max-height: 45px; width: auto;" alt="Cloud360" class="app-logo">
                </a>
            </div>
        `;
        $thisSidebar.prepend(logoHtml);
    });
}

function role8_fix_submenu_icons() {
    var icons = document.querySelectorAll(
        '.sidebar-item-icon[item-icon="arrow-left"],' +
        '.sidebar-item-icon[item-icon="arrow-right"],' +
        '.sidebar-item-icon[item-icon="arrow-up-right"]'
    );

    icons.forEach(function (iconSpan) {
        if (iconSpan.getAttribute('data-role8-fixed')) return;

        var svg = iconSpan.querySelector('svg');
        if (svg) {
            svg.style.display = 'none';
        }

        var dot = document.createElement('span');
        dot.className = 'role8-submenu-dot';
        dot.textContent = '\u2022';
        iconSpan.appendChild(dot);
        iconSpan.setAttribute('data-role8-fixed', 'true');
    });

    var sidebar = document.querySelector('.desk-sidebar') || document.querySelector('.layout-side-section');
    if (sidebar && !sidebar.getAttribute('data-role8-observer')) {
        var observer = new MutationObserver(function () {
            setTimeout(role8_fix_submenu_icons, 200);
        });
        observer.observe(sidebar, { childList: true, subtree: true });
        sidebar.setAttribute('data-role8-observer', 'true');
    }
}

/* ══════════════════════════════════════════════════════════
   Welcome Header — Bilingual greeting banner
   ══════════════════════════════════════════════════════════ */
function role8_inject_welcome_header() {
    var route = frappe.get_route();
    if (!route) return;
    var r0 = (route[0] || '').toLowerCase();
    var r1 = (route[1] || '').toLowerCase();
    if (r0 !== 'workspaces' || (r1 && r1 !== 'home')) {
        $('.role8-welcome-header').remove();
        return;
    }

    if ($('.role8-welcome-header').length > 0) return;

    var fullName = frappe.session.user_fullname || frappe.session.user || 'User';
    var firstName = fullName.split(' ')[0];

    var hour = new Date().getHours();
    var greetingKey = 'good_morning';
    if (hour >= 12 && hour < 18) greetingKey = 'good_afternoon';
    else if (hour >= 18) greetingKey = 'good_evening';

    var welcomeHtml = '<div class="role8-welcome-header">' +
        '<h2>' + role8_t(greetingKey) + ', ' + firstName + '! 👋</h2>' +
        '<p>' + role8_t('dashboard_subtitle') + '</p>' +
        '</div>';

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

/* ══════════════════════════════════════════════════════════
   Finance Summary Cards — Home Page KPI (Bilingual)
   ══════════════════════════════════════════════════════════ */
function role8_inject_finance_cards() {
    var route = frappe.get_route();
    if (!route) return;
    var r0 = (route[0] || '').toLowerCase();
    var r1 = (route[1] || '').toLowerCase();
    if (r0 !== 'workspaces' || (r1 && r1 !== 'home')) {
        $('.role8-home-finance-cards').remove();
        return;
    }

    if ($('.role8-home-finance-cards').length > 0) return;

    var incomeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>';
    var expenseIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>';
    var profitIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"></rect><line x1="2" y1="9" x2="22" y2="9"></line><line x1="12" y1="9" x2="12" y2="21"></line></svg>';

    var cardsHtml = '<div class="role8-home-finance-cards role8-finance-cards">' +
        role8_build_card('card-income', role8_t('total_income'), '...', '', incomeIcon, true) +
        role8_build_card('card-expense', role8_t('total_expenses'), '...', '', expenseIcon, true) +
        role8_build_card('card-profit', role8_t('net_profit_loss'), '...', '', profitIcon, true) +
        '</div>';

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
        role8_update_cards_error(role8_t('no_company'));
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
                role8_update_cards_error(role8_t('no_data'));
            }
        },
        error: function () {
            role8_update_cards_error(role8_t('error_loading'));
        }
    });
}

function role8_render_pnl_cards(data) {
    var income = 0, expense = 0, netProfit = 0;
    var currency = frappe.boot.sysdefaults.currency || 'SAR';
    var year = new Date().getFullYear();

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

    var profitTrend = netProfit >= 0
        ? '<div class="card-trend trend-up"><span class="trend-icon">▲</span> ' + role8_t('profitable') + '</div>'
        : '<div class="card-trend trend-down"><span class="trend-icon">▼</span> ' + role8_t('loss') + '</div>';

    var cards = $('.role8-home-finance-cards');
    cards.find('.card-income').removeClass('loading')
        .find('.card-value').html(formatNum(income)).end()
        .find('.card-trend').html('<div class="card-trend trend-up"><span class="trend-icon">▲</span> ' + role8_t('total') + ' ' + year + '</div>');

    cards.find('.card-expense').removeClass('loading')
        .find('.card-value').html(formatNum(expense)).end()
        .find('.card-trend').html('<div class="card-trend trend-down"><span class="trend-icon">▼</span> ' + role8_t('total') + ' ' + year + '</div>');

    cards.find('.card-profit').removeClass('loading')
        .find('.card-value').html(formatNum(netProfit)).end()
        .find('.card-trend').html(profitTrend);
}

function role8_update_cards_error(msg) {
    $('.role8-home-finance-cards .role8-finance-card').removeClass('loading')
        .find('.card-value').text(msg);
}

/* ══════════════════════════════════════════════════════════
   Per-Module Summary Cards
   ══════════════════════════════════════════════════════════ */

// SVG icons for module cards
var ROLE8_ICONS = {
    invoice: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    tool: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    folder: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',
    headphones: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"></path><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
};
// Unique SVG icon per card key — each card gets a distinct, descriptive icon
var ROLE8_CARD_ICONS = {
    unpaid_invoices: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>',
    overdue_payments: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    draft_journals: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>',
    unpaid_suppliers: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',
    total_revenue: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    purchase_returns: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>',
    open_quotations: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
    active_orders: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
    pending_delivery: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
    monthly_revenue: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    pending_po: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>',
    items_to_receive: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>',
    total_items: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
    low_stock: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    pending_receipts: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    pending_deliveries: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',
    total_assets: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
    depreciating: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>',
    fully_depreciated: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    open_inspections: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
    non_conformance: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
    actions_open: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
    active_projects: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',
    open_tasks: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>',
    overdue_tasks: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><line x1="10" y1="14" x2="14" y2="18"></line><line x1="14" y1="14" x2="10" y2="18"></line></svg>',
    open_tickets: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"></path><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>',
    unresolved: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    sla_breach: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
    total_users: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    active_today: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    roles_count: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    published_pages: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    blog_posts: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    web_forms: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
    open_leads: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
    active_opps: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
    won_this_month: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>',
    error_logs: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    scheduled_jobs: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    bg_jobs: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>'
};

// Module configuration: workspace name → card definitions (3 or 6 cards only, never 4)
var ROLE8_MODULE_CARDS = {
    'accounting': [
        { key: 'unpaid_invoices', doctype: 'Sales Invoice', filters: { status: 'Unpaid', docstatus: 1 }, icon: 'invoice', color: 'card-income' },
        { key: 'overdue_payments', doctype: 'Sales Invoice', filters: { status: 'Overdue', docstatus: 1 }, icon: 'clock', color: 'card-expense' },
        { key: 'draft_journals', doctype: 'Journal Entry', filters: { docstatus: 0 }, icon: 'invoice', color: 'card-profit' },
        { key: 'unpaid_suppliers', doctype: 'Purchase Invoice', filters: { status: 'Unpaid', docstatus: 1 }, icon: 'clock', color: 'card-teal' },
        { key: 'total_revenue', doctype: 'Sales Invoice', filters: { docstatus: 1 }, icon: 'chart', color: 'card-purple', aggregate: true },
        { key: 'purchase_returns', doctype: 'Purchase Invoice', filters: { is_return: 1, docstatus: 1 }, icon: 'alert', color: 'card-amber' }
    ],
    'selling': [
        { key: 'open_quotations', doctype: 'Quotation', filters: { status: 'Open', docstatus: 1 }, icon: 'invoice', color: 'card-income' },
        { key: 'active_orders', doctype: 'Sales Order', filters: { status: ['in', ['To Deliver and Bill', 'To Bill', 'To Deliver']], docstatus: 1 }, icon: 'chart', color: 'card-profit' },
        { key: 'pending_delivery', doctype: 'Delivery Note', filters: { docstatus: 0 }, icon: 'box', color: 'card-expense' },
        { key: 'unpaid_invoices', doctype: 'Sales Invoice', filters: { status: 'Unpaid', docstatus: 1 }, icon: 'invoice', color: 'card-teal' },
        { key: 'monthly_revenue', doctype: 'Sales Invoice', filters: { docstatus: 1, posting_date: ['>=', ''] }, icon: 'chart', color: 'card-purple', monthly: true },
        { key: 'overdue_payments', doctype: 'Sales Invoice', filters: { status: 'Overdue', docstatus: 1 }, icon: 'clock', color: 'card-amber' }
    ],
    'buying': [
        { key: 'pending_po', doctype: 'Purchase Order', filters: { status: ['in', ['To Receive and Bill', 'To Bill', 'To Receive']], docstatus: 1 }, icon: 'invoice', color: 'card-income' },
        { key: 'unpaid_suppliers', doctype: 'Purchase Invoice', filters: { status: 'Unpaid', docstatus: 1 }, icon: 'clock', color: 'card-expense' },
        { key: 'items_to_receive', doctype: 'Purchase Receipt', filters: { docstatus: 0 }, icon: 'box', color: 'card-profit' }
    ],
    'stock': [
        { key: 'total_items', doctype: 'Item', filters: { disabled: 0 }, icon: 'box', color: 'card-income' },
        { key: 'low_stock', doctype: 'Bin', filters: { actual_qty: ['<', 10] }, icon: 'alert', color: 'card-expense' },
        { key: 'pending_receipts', doctype: 'Purchase Receipt', filters: { docstatus: 0 }, icon: 'invoice', color: 'card-profit' },
        { key: 'pending_deliveries', doctype: 'Delivery Note', filters: { docstatus: 0 }, icon: 'box', color: 'card-teal' },
        { key: 'pending_po', doctype: 'Purchase Order', filters: { status: ['in', ['To Receive and Bill', 'To Receive']], docstatus: 1 }, icon: 'invoice', color: 'card-purple' },
        { key: 'purchase_returns', doctype: 'Purchase Invoice', filters: { is_return: 1, docstatus: 1 }, icon: 'alert', color: 'card-amber' }
    ],
    'assets': [
        { key: 'total_assets', doctype: 'Asset', filters: { docstatus: 1 }, icon: 'folder', color: 'card-income' },
        { key: 'depreciating', doctype: 'Asset', filters: { status: 'Submitted', docstatus: 1 }, icon: 'clock', color: 'card-profit' },
        { key: 'fully_depreciated', doctype: 'Asset', filters: { status: 'Fully Depreciated', docstatus: 1 }, icon: 'check', color: 'card-expense' }
    ],
    'quality-management': [
        { key: 'open_inspections', doctype: 'Quality Inspection', filters: { docstatus: 0 }, icon: 'check', color: 'card-income' },
        { key: 'non_conformance', doctype: 'Non Conformance', filters: { status: 'Open' }, icon: 'alert', color: 'card-expense' },
        { key: 'actions_open', doctype: 'Quality Action', filters: { status: 'Open' }, icon: 'tool', color: 'card-profit' }
    ],
    'projects': [
        { key: 'active_projects', doctype: 'Project', filters: { status: 'Open' }, icon: 'folder', color: 'card-income' },
        { key: 'open_tasks', doctype: 'Task', filters: { status: 'Open' }, icon: 'check', color: 'card-profit' },
        { key: 'overdue_tasks', doctype: 'Task', filters: { status: 'Overdue' }, icon: 'clock', color: 'card-expense' }
    ],
    'support': [
        { key: 'open_tickets', doctype: 'Issue', filters: { status: 'Open' }, icon: 'headphones', color: 'card-income' },
        { key: 'unresolved', doctype: 'Issue', filters: { status: ['in', ['Open', 'Replied']] }, icon: 'alert', color: 'card-expense' },
        { key: 'sla_breach', doctype: 'Issue', filters: { agreement_status: 'Failed' }, icon: 'clock', color: 'card-profit' }
    ],
    'users': [
        { key: 'total_users', doctype: 'User', filters: { enabled: 1, user_type: 'System User' }, icon: 'users', color: 'card-income' },
        { key: 'active_today', doctype: 'User', filters: { enabled: 1, last_active: ['>=', ''] }, icon: 'check', color: 'card-profit', today: true },
        { key: 'roles_count', doctype: 'Role', filters: { disabled: 0 }, icon: 'tool', color: 'card-expense' }
    ],
    'website': [
        { key: 'published_pages', doctype: 'Web Page', filters: { published: 1 }, icon: 'globe', color: 'card-income' },
        { key: 'blog_posts', doctype: 'Blog Post', filters: { published: 1 }, icon: 'invoice', color: 'card-profit' },
        { key: 'web_forms', doctype: 'Web Form', filters: { published: 1 }, icon: 'check', color: 'card-expense' }
    ],
    'crm': [
        { key: 'open_leads', doctype: 'Lead', filters: { status: 'Open' }, icon: 'target', color: 'card-income' },
        { key: 'active_opps', doctype: 'Opportunity', filters: { status: 'Open' }, icon: 'chart', color: 'card-profit' },
        { key: 'won_this_month', doctype: 'Opportunity', filters: { status: 'Converted' }, icon: 'check', color: 'card-expense', monthly: true }
    ],
    'settings': [
        { key: 'error_logs', doctype: 'Error Log', filters: {}, icon: 'alert', color: 'card-expense' },
        { key: 'scheduled_jobs', doctype: 'Scheduled Job Type', filters: { stopped: 0 }, icon: 'clock', color: 'card-income' },
        { key: 'bg_jobs', doctype: 'RQ Job', filters: { status: ['in', ['queued', 'started']] }, icon: 'tool', color: 'card-profit' }
    ]
};

// Map Arabic workspace names to module keys
var ROLE8_WORKSPACE_MAP = {
    'home': null, // Home has its own finance cards
    'accounting': 'accounting',
    'الحسابات': 'accounting',
    'selling': 'selling',
    'البيع': 'selling',
    'buying': 'buying',
    'الشراء': 'buying',
    'stock': 'stock',
    'المخازن': 'stock',
    'assets': 'assets',
    'الأصول': 'assets',
    'quality': 'quality-management',
    'quality-management': 'quality-management',
    'جودة': 'quality-management',
    'projects': 'projects',
    'مشاريع': 'projects',
    'support': 'support',
    'الدعم': 'support',
    'users': 'users',
    'المستخدمين': 'users',
    'website': 'website',
    'الموقع': 'website',
    'crm': 'crm',
    'إدارة علاقات الزبائن': 'crm',
    'tools': 'settings',
    'الأدوات': 'settings',
    'settings': 'settings'
};

function role8_inject_module_cards() {
    var route = frappe.get_route();
    if (!route) return;
    var r0 = (route[0] || '').toLowerCase();
    var r1 = decodeURIComponent(route[1] || '').toLowerCase();

    // Only on workspace pages, skip home (it has finance cards)
    if (r0 !== 'workspaces' || !r1 || r1 === 'home') {
        $('.role8-module-cards').remove();
        return;
    }

    // Find module config
    var moduleKey = ROLE8_WORKSPACE_MAP[r1];
    if (!moduleKey) {
        // Try partial match
        for (var wsName in ROLE8_WORKSPACE_MAP) {
            if (r1.indexOf(wsName) !== -1 || wsName.indexOf(r1) !== -1) {
                moduleKey = ROLE8_WORKSPACE_MAP[wsName];
                break;
            }
        }
    }

    if (!moduleKey || !ROLE8_MODULE_CARDS[moduleKey]) {
        $('.role8-module-cards').remove();
        return;
    }

    // Don't inject if already exists for this module
    if ($('.role8-module-cards[data-module="' + moduleKey + '"]').length > 0) return;
    // Remove old module cards from other pages
    $('.role8-module-cards').remove();

    var cardDefs = ROLE8_MODULE_CARDS[moduleKey];
    var cardsHtml = '<div class="role8-module-cards role8-finance-cards" data-module="' + moduleKey + '">';

    cardDefs.forEach(function (def) {
        var iconSvg = ROLE8_CARD_ICONS[def.key] || ROLE8_CARD_ICONS.unpaid_invoices;
        cardsHtml += role8_build_card(def.color, role8_t(def.key), '...', '', iconSvg, true);
    });

    cardsHtml += '</div>';

    // Insert at top of workspace content
    var workspaceBody = $('.layout-main-section .codex-editor');
    if (workspaceBody.length > 0) {
        workspaceBody.before(cardsHtml);
    } else {
        var layoutMain = $('.layout-main-section');
        if (layoutMain.length > 0) {
            layoutMain.prepend(cardsHtml);
        }
    }

    // Fetch counts for each card
    role8_fetch_module_counts(moduleKey, cardDefs);
}

function role8_fetch_module_counts(moduleKey, cardDefs) {
    var today = frappe.datetime.get_today();
    var monthStart = today.substring(0, 7) + '-01';

    cardDefs.forEach(function (def, idx) {
        var filters = Object.assign({}, def.filters);

        // Handle monthly filter
        if (def.monthly) {
            filters.posting_date = ['>=', monthStart];
            if (def.doctype === 'Opportunity') {
                filters.transaction_date = ['>=', monthStart];
                delete filters.posting_date;
            }
        }

        // Handle today filter
        if (def.today) {
            filters.last_active = ['>=', today];
        }

        frappe.call({
            method: 'frappe.client.get_count',
            args: {
                doctype: def.doctype,
                filters: filters
            },
            async: true,
            callback: function (r) {
                var count = (r && r.message) ? r.message : 0;
                var container = $('.role8-module-cards[data-module="' + moduleKey + '"]');
                var card = container.find('.role8-finance-card').eq(idx);
                card.removeClass('loading');
                card.find('.card-value').text(count);
            },
            error: function () {
                var container = $('.role8-module-cards[data-module="' + moduleKey + '"]');
                var card = container.find('.role8-finance-card').eq(idx);
                card.removeClass('loading');
                card.find('.card-value').text('—');
            }
        });
    });
}

/* ══════════════════════════════════════════════════════════
   Login Page — Welcome Back Panel (Bilingual)
   ══════════════════════════════════════════════════════════ */
function role8_inject_login_panel() {
    var card = document.querySelector('.login-content.page-card');
    if (!card) return;
    if (document.querySelector('.role8-login-panel')) return;

    // Detect language: URL param > cookie > browser language
    var urlParams = new URLSearchParams(window.location.search);
    var langParam = urlParams.get('lang');
    var browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    var loginIsAr = langParam === 'ar' || (!langParam && browserLang.startsWith('ar'));

    // Force all parent containers to full-viewport
    var el = card;
    while (el && el !== document.documentElement) {
        el.style.setProperty('max-width', '100vw', 'important');
        el.style.setProperty('width', '100vw', 'important');
        el.style.setProperty('padding', '0', 'important');
        el.style.setProperty('margin', '0', 'important');
        el.style.setProperty('height', '100vh', 'important');
        el.style.setProperty('overflow', 'hidden', 'important');
        el = el.parentElement;
    }

    document.body.style.setProperty('background', '#144983', 'important');
    document.body.style.setProperty('overflow', 'hidden', 'important');

    // Set RTL direction for Arabic
    if (loginIsAr) {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    }

    var hide = document.querySelectorAll('footer, .navbar, .web-footer, .page-header');
    hide.forEach(function (h) { h.style.display = 'none'; });

    var cardHead = document.querySelector('.page-card-head');
    var logoSrc = '';
    if (cardHead) {
        var logoImg = cardHead.querySelector('img');
        if (logoImg) logoSrc = logoImg.src;
        cardHead.style.setProperty('display', 'none', 'important');
    }

    // Language switcher button — use ID + addEventListener (no inline onclick)
    var switchLabel = loginIsAr ? 'English' : 'العربية';
    var switchLang = loginIsAr ? 'en' : 'ar';
    var langSwitcherHtml = '<div class="role8-login-lang-switcher">' +
        '<button type="button" id="role8-login-lang-toggle" class="role8-login-lang-btn">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">' +
        '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line>' +
        '<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>' +
        '</svg> ' + switchLabel +
        '</button></div>';

    var formBody = card.querySelector('.page-card-body');
    if (formBody && !formBody.querySelector('.role8-signin-title')) {
        var signInText = loginIsAr ? 'تسجيل الدخول' : 'Sign In';
        var signInSub = loginIsAr ? 'أدخل بياناتك للوصول إلى حسابك' : 'Enter your credentials to access your account';
        var titleHtml = '<div class="role8-signin-title">' +
            '<h2>' + signInText + '</h2>' +
            '<p>' + signInSub + '</p>' +
            '</div>';
        formBody.insertAdjacentHTML('afterbegin', langSwitcherHtml + titleHtml);

        // Attach click handler AFTER injection
        var langBtn = document.getElementById('role8-login-lang-toggle');
        if (langBtn) {
            langBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var u = new URL(window.location.href);
                u.searchParams.set('lang', switchLang);
                window.location.href = u.toString();
            });
        }
    }

    var dots = '';
    for (var i = 0; i < 15; i++) { dots += '<span></span>'; }

    var logoHtml = logoSrc
        ? '<img src="' + logoSrc + '" class="role8-login-logo" alt="Cloud360">'
        : '';

    var headline = loginIsAr ? 'حلول ERP السحابية<br>لنمو أعمالك.' : 'Your Cloud ERP<br>Solution for Growth.';
    var subtitle = loginIsAr
        ? 'إدارة المحاسبة والمخزون وعلاقات العملاء والعمليات — الكل في منصة واحدة قوية مصممة للأعمال الحديثة.'
        : 'Manage your accounting, inventory, CRM and operations — all in one powerful platform built for modern businesses.';

    var panelHtml = '<div class="role8-login-panel">' +
        logoHtml +
        '<h2>' + headline + '</h2>' +
        '<p>' + subtitle + '</p>' +
        '<div class="role8-login-dots">' + dots + '</div>' +
        '</div>';

    card.insertAdjacentHTML('beforeend', panelHtml);
}
