/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.0/dist/cookieconsent.umd.js';

function consentUpdate(cookie) {
    let consentLevel = cookie["categories"];
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

CookieConsent.run({

    // root: 'body',
    // autoShow: true,
    // disablePageInteraction: true,
    // hideFromBots: true,
    // mode: 'opt-in',
    // revision: 0,

    cookie: {
        name: 'cc_cookie',
        // domain: location.hostname,
        // path: '/',
        // sameSite: "Lax",
        // expiresAfterDays: 365,
    },

    // https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
    guiOptions: {
        consentModal: {
            layout: 'cloud inline',
            position: 'bottom center',
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: 'box',
            equalWeightButtons: true,
            flipButtons: false
        }
    },

    onFirstConsent: ({cookie}) => {
        console.log('onFirstConsent fired',cookie);
    },

    onConsent: ({cookie}) => {
        console.log('onConsent fired!', cookie);
        consentUpdate(cookie);
    },

    onChange: ({changedCategories, changedServices}) => {
        console.log('onChange fired!', changedCategories, changedServices);
        consentUpdate(cookie);
    },

    onModalReady: ({modalName}) => {
        console.log('ready:', modalName);
    },

    onModalShow: ({modalName}) => {
        console.log('visible:', modalName);
    },

    onModalHide: ({modalName}) => {
        console.log('hidden:', modalName);
    },

    categories: {
        necessary: {
            enabled: true,  // this category is enabled by default
            readOnly: true  // this category cannot be disabled
        },
        analytics: {
            autoClear: {
                cookies: [
                    {
                        name: /^_ga/,   // regex: match all cookies starting with '_ga'
                    },
                    {
                        name: '_gid',   // string: exact cookie name
                    }
                ]
            },

            // https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
            services: {
                ga: {
                    label: 'Google Analytics',
                    onAccept: () => {},
                    onReject: () => {}
                },
                youtube: {
                    label: 'Youtube Embed',
                    onAccept: () => {},
                    onReject: () => {}
                },
            }
        },
        targeting: {}
    },

    language: {
        default: 'cs',
        translations: {
            en: 'https://cdn.jsdelivr.net/gh/TechnicalObject/caspone@main/en.json',
            cs: 'https://cdn.jsdelivr.net/gh/TechnicalObject/caspone@main/cs.json'
        }
    }
});