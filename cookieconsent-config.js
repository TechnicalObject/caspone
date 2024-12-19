/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.1/dist/cookieconsent.umd.js';
const scriptSrc = new URL(import.meta.url).href || 'latest';
console.debug(new URL(import.meta.url).href);
const tagFromSrc = scriptSrc.split('@').slice(-1)[0].split('/')[0];
// const currentTag = '1.0.4';
const currentTag = /\d+\.\d+\.\d+/g.test(tagFromSrc) ? tagFromSrc : 'latest';
console.debug('currentTag:', currentTag);

function consentUpdate(cookie) {
    window.dataLayer = window.dataLayer || [];
    let consentLevel = cookie["categories"];
    gtag('consent', 'update', {
        ad_storage: consentLevel.includes("marketing") ? "granted" : "denied",
        analytics_storage: consentLevel.includes("analytics") ? "granted" : "denied",
        ad_user_data: consentLevel.includes("marketing") ? "granted" : "denied",
        ad_personalization: consentLevel.includes("marketing") ? "granted" : "denied"
    });
    dataLayer.push({'event': 'consent_ready'});
}


const crossSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none"/>
          <line x1="80" y1="80" x2="176" y2="176" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/>
          <line x1="80" y1="176" x2="176" y2="80" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/>
        </svg>
    `;

const cookieSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none"/>
          <circle cx="156" cy="172" r="12"/>
          <circle cx="92" cy="164" r="12"/>
          <circle cx="84" cy="108" r="12"/>
          <circle cx="132" cy="124" r="12"/>
          <path d="M224,128a48,48,0,0,1-48-48,48,48,0,0,1-48-48,96,96,0,1,0,96,96Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
        </svg>
      `;
let cookieButton;

function insertButton() {
    const style = document.createElement("style");
    style.innerHTML = `
        /* Floating Button Styles */
        .floating-button {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 55px;
            height: 55px;
            background-color: #11875c;
            color: white;
            border-radius: 50%;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 9999; /* Ensure the button is on top */
            transition: transform 0.6s, background-color 0.3s;
            transform: perspective(600px) rotateY(0);
        }

        .floating-button.is-flipped {
        background-color: gray;
            transform: perspective(600px) rotateY(180deg);
        }

        .floating-button-hidden {
            display: none;
        }

        /* Cookie Icon Styles */
        .floating-button svg {
            width: 40px;
            height: 40px;
            fill: white;
            transition: transform 0.6s;
        }

        .is-flipped #cookieIcon {
            transform: rotate(180deg);
        }
    `;
    document.head.appendChild(style);
    cookieButton = document.createElement("div");
    cookieButton.classList.add("floating-button");
    cookieButton.id = "cookieButton";

    // Set the inner HTML of the button to include the SVG
    cookieButton.innerHTML = cookieSvg;
    cookieButton.classList.add('floating-button-hidden');

    // Append the floating button to the body (or you can target another container)
    document.body.appendChild(cookieButton);
    cookieButton.addEventListener("click", function() {
        if (!cookieButton.classList.contains('is-flipped')) {
            CookieConsent.showPreferences();
        } else {
            CookieConsent.hidePreferences()
        }
    });
}

insertButton();

function showCookie() {
    cookieButton.classList.remove('is-flipped');
    cookieButton.innerHTML = cookieSvg;
}

function showCross() {
    cookieButton.classList.add('is-flipped');
    cookieButton.innerHTML = crossSvg;
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
            console.debug('onFirstConsent fired',cookie);
        },

        onConsent: ({cookie}) => {
            console.debug('onConsent fired!', cookie['categories']);
            cookieButton.classList.remove('floating-button-hidden');
            consentUpdate(cookie);
        },

        onChange: ({cookie, changedCategories, changedServices}) => {
            console.debug('onChange fired!', changedCategories, changedServices);
            consentUpdate(cookie);
        },

        onModalReady: ({modalName}) => {
            console.debug('ready:', modalName);
        },

        onModalShow: ({modalName}) => {
            console.debug('visible:', modalName);
            if (modalName === 'consentModal') {
                cookieButton.classList.add('floating-button-hidden');
            }
            showCross();
        },

        onModalHide: ({modalName}) => {
            console.debug('hidden:', modalName);
            if (modalName === 'consentModal') {
                cookieButton.classList.remove('floating-button-hidden');
            }
            showCookie();
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
