/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.0/dist/cookieconsent.umd.js';
const scriptSrc = new URL(import.meta.url).href || 'latest';
console.debug(new URL(import.meta.url).href);
const tagFromSrc = scriptSrc.split('@').slice(-1)[0].split('/')[0];
// const currentTag = '1.0.4';
const currentTag = /\d+\.\d+\.\d+/g.test(tagFromSrc) ? tagFromSrc : 'latest';
console.debug('currentTag:', currentTag);

function consentUpdate(cookie) {
    window.dataLayer = window.dataLayer || [];
    let consentLevel = cookie["categories"];
    let adStorage = consentLevel.includes("marketing") ? "granted" : "denied";
    let analyticsStorage = consentLevel.includes("analytics") ? "granted" : "denied";
    let adUserData = consentLevel.includes("marketing") ? "granted" : "denied";
    let adPersonalization = consentLevel.includes("marketing") ? "granted" : "denied";
    gtag('consent', 'update', {
        ad_storage: adStorage,
        analytics_storage: analyticsStorage,
        ad_user_data: adUserData,
        ad_personalization: adPersonalization
    });
    dataLayer.push({'event': 'consent_update'});
}

const ccObj = {

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
            expiresAfterDays: 365
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
            console.log('onConsent fired!', cookie['categories']);
            consentUpdate(cookie);
        },

        onChange: ({cookie, changedCategories, changedServices}) => {
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
            marketing: {
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
            }
        },

        language: {
            default: 'cs',
            translations: {
                en: `https://cdn.jsdelivr.net/gh/TechnicalObject/caspone@${currentTag}/en.json`,
                cs: `https://cdn.jsdelivr.net/gh/TechnicalObject/caspone@${currentTag}/cs.json`
            }
        }
    };
try {
    async function getCloudflareJSON(endpoint) {
        let data = await fetch(endpoint).then(res => res.text());
        let arr = data.trim().split('\n').map(e => e.split('='));
        let res = Object.fromEntries(arr);
        return res.loc;
    }

    let cntryCode;
    await getCloudflareJSON('https://1.1.1.1/cdn-cgi/trace').then(data => (cntryCode = data));
    let EEAregions = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];
// let noticeRegions = ['US','JP','CN','KR'];
// let bannerType;
// let dynamicMode = 'opt-in';
    if (EEAregions.includes(cntryCode)) {
        CookieConsent.run(ccObj);
    }
} catch (e) {
    console.error(e);
    CookieConsent.run(ccObj)
}
