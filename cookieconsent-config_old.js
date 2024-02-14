
window.addEventListener('load', function(){

    // obtain plugin
    var cc = initCookieConsent();

    function consentUpdate(cookie) {
        let consentLevel = cookie["level"];
        let adStorage = consentLevel.includes("targeting") ? "granted" : "denied";
        let analyticsStorage = consentLevel.includes("analytics") ? "granted" : "denied";
        let adUserData = consentLevel.includes("targeting") ? "granted" : "denied";
        let adPersonalization = consentLevel.includes("targeting") ? "granted" : "denied";
        gtag('consent', 'update', {
            ad_storage: adStorage,
            analytics_storage: analyticsStorage,
            ad_user_data: adUserData,
            ad_personalization: adPersonalization
        });
    }

    // run plugin with your configuration
    cc.run({
        // current_lang: 'en',
        autoclear_cookies: false,                   // default: false
        page_scripts: true,                        // default: false

        // mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
        // delay: 0,                               // default: 0
        auto_language: 'document',                      // default: null; could also be 'browser' or 'document'
        // autorun: true,                          // default: true
        // force_consent: false,                   // default: false
        // hide_from_bots: true,                   // default: true
        // remove_cookie_tables: false             // default: false
        // cookie_name: 'cc_cookie',               // default: 'cc_cookie'
        // cookie_expiration: 182,                 // default: 182 (days)
        // cookie_necessary_only_expiration: 182   // default: disabled
        // cookie_domain: location.hostname,       // default: current domain
        // cookie_path: '/',                       // default: root
        // cookie_same_site: 'Lax',                // default: 'Lax'
        // use_rfc_cookie: false,                  // default: false
        // revision: 0,                            // default: 0

        onFirstAction: function(user_preferences, cookie){
            // callback triggered only once on the first accept/reject action
            // dataLayer.push({"event": "cookieFirstAction"})
        },

        onAccept: function (cookie) {
            // callback triggered on the first accept/reject action, and after each page load
            consentUpdate(cookie);
        },

        onChange: function (cookie, changed_categories) {
            // callback triggered when user changes preferences after consent has already been given
            consentUpdate(cookie);
        },

        languages: {
            'cs': {
                consent_modal: {
                    title: 'Používáme cookies',
                    description: 'Tato stránka používá cookies, které nám pomáhají ke zkvalitňování obsahu. <button type="button" data-cc="c-settings" class="cc-link">Přizpůsobit</button>',
                    primary_btn: {
                        text: 'Přijmout vše',
                        role: 'accept_all'              // 'accept_selected' or 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Odmítnout vše',
                        role: 'accept_necessary'        // 'settings' or 'accept_necessary'
                    }
                },
                settings_modal: {
                    title: 'Nastavení cookies',
                    save_settings_btn: 'Uložit nastavení',
                    accept_all_btn: 'Přijmout vše',
                    reject_all_btn: 'Odmítnout vše',
                    close_btn_label: 'Zavřít',
                    // cookie_table_caption: 'Cookie list',
                    cookie_table_headers: [
                        {col1: 'Název'},
                        {col2: 'Doména'},
                        {col3: 'Expirace'},
                        {col4: 'Popis'}
                    ],
                    blocks: [
                        {
                            title: 'Použití cookies 📢',
                            description: 'Používáme cookies k zajištění základních funkcí webu a ke zkvalitňování poskytovaného obsahu. Můžete si vybrat nastavení pro každou kategorii zvlášť. Pro více informací spojených s cookies a dalších citlivých dat si prosím přečtěte plné znění <a href="zasady-ochrany-osobnich-udaju" class="cc-link">zásad ochrany osobních údajů</a>.'
                        }, {
                            title: 'Nezbytné cookies',
                            description: 'Tyto cookies jsou nezbytné pro správné fungování webu.',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
                            }
                        }, {
                            title: 'Analytické cookies',
                            description: 'Tyto cookies slouží k analyzování chování uživatelů na našem webu.',
                            toggle: {
                                value: 'analytics',     // your cookie category
                                enabled: false,
                                readonly: false
                            },
                            cookie_table: [             // list of all expected cookies
                                {
                                    col1: '^_ga',       // match all cookies starting with "_ga"
                                    col2: 'google.com',
                                    col3: '2 roky',
                                    col4: 'Google Analytics',
                                    is_regex: true
                                },
                                {
                                    col1: '_gid',
                                    col2: 'google.com',
                                    col3: '1 den',
                                    col4: 'Google Analytics',
                                }
                            ]
                        }, {
                            title: 'Marketingové cookies',
                            description: 'Tyto cookies sbírají informace o tom, jak používáte náš web, které příspěvky jste navštívili a na jaké odkazy jste klikli. Všechna data jsou anonymizována a nemohou být využita k identifikaci jednotlivých uživatelů.',
                            toggle: {
                                value: 'targeting',
                                enabled: false,
                                readonly: false
                            }
                        }, {
                            title: 'Více informací',
                            description: 'Pro jakékoli dotazy, týkající se našich zásad ohledně cookies, nás prosím <a class="cc-link" href="kontakt#contact-form">kontaktujte</a>.',
                        }
                    ]
                }
            },
            'en': {
                consent_modal: {
                    title: 'We use cookies!',
                    description: 'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
                    primary_btn: {
                        text: 'Accept all',
                        role: 'accept_all'              // 'accept_selected' or 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Reject all',
                        role: 'accept_necessary'        // 'settings' or 'accept_necessary'
                    }
                },
                settings_modal: {
                    title: 'Cookie preferences',
                    save_settings_btn: 'Save settings',
                    accept_all_btn: 'Accept all',
                    reject_all_btn: 'Reject all',
                    close_btn_label: 'Close',
                    // cookie_table_caption: 'Cookie list',
                    cookie_table_headers: [
                        {col1: 'Name'},
                        {col2: 'Domain'},
                        {col3: 'Expiration'},
                        {col4: 'Description'}
                    ],
                    blocks: [
                        {
                            title: 'Cookie usage 📢',
                            description: 'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="zasady-ochrany-osobnich-udaju" class="cc-link">privacy policy</a>.'
                        }, {
                            title: 'Strictly necessary cookies',
                            description: 'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
                            }
                        }, {
                            title: 'Performance and Analytics cookies',
                            description: 'These cookies allow the website to remember the choices you have made in the past',
                            toggle: {
                                value: 'analytics',     // your cookie category
                                enabled: false,
                                readonly: false
                            },
                            cookie_table: [             // list of all expected cookies
                                {
                                    col1: '^_ga',       // match all cookies starting with "_ga"
                                    col2: 'google.com',
                                    col3: '2 years',
                                    col4: 'Google Analytics',
                                    is_regex: true
                                },
                                {
                                    col1: '_gid',
                                    col2: 'google.com',
                                    col3: '1 day',
                                    col4: 'Google Analytics',
                                }
                            ]
                        }, {
                            title: 'Advertisement and Targeting cookies',
                            description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
                            toggle: {
                                value: 'targeting',
                                enabled: false,
                                readonly: false
                            }
                        }, {
                            title: 'More information',
                            description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="kontakt#contact-form">contact us</a>.',
                        }
                    ]
                }
            }
        }
    ,
    gui_options: {
    consent_modal: {
        layout: 'cloud',               // box/cloud/bar
        position: 'bottom center',     // bottom/middle/top + left/right/center
        transition: 'slide',           // zoom/slide
        swap_buttons: false            // enable to invert buttons
    },
    settings_modal: {
        layout: 'box',                 // box/bar
        position: 'left',              // left/right
        transition: 'slide'            // zoom/slide
    }
    }});
});