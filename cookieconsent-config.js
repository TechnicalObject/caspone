/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */

const CAT_NECESSARY = "necessary";
const CAT_ANALYTICS = "analytics";
const CAT_ADVERTISEMENT = "advertisement";
const CAT_FUNCTIONALITY = "functionality";
const CAT_SECURITY = "security";

const SERVICE_AD_STORAGE = 'ad_storage'
const SERVICE_AD_USER_DATA = 'ad_user_data'
const SERVICE_AD_PERSONALIZATION = 'ad_personalization'
const SERVICE_ANALYTICS_STORAGE = 'analytics_storage'
const SERVICE_FUNCTIONALITY_STORAGE = 'functionality_storage'
const SERVICE_PERSONALIZATION_STORAGE = 'personalization_storage'
const SERVICE_SECURITY_STORAGE = 'security_storage'

const WEBSITE_LOCALE = document.documentElement.lang.split('-')[0] || 'en'
const DEFAULT_LOCALE = window.defaultLocale || 'cs';
const LOCALE_PATHS = window.localePaths || {
    'en': '/assets/en.json',
    'cs': '/assets/cs.json'
};

let serviceTranslation = {
    [SERVICE_ANALYTICS_STORAGE]: {
        en: 'Enables storage (such as cookies) related to analytics e.g. visit duration.',
        cs: 'Umožňuje ukládání (např. cookies) související s analýzou, např. doba návštěvy.'
    },
    [SERVICE_AD_STORAGE]: {
        en: 'Enables storage (such as cookies) related to advertising.',
        cs: 'Umožňuje ukládání (např. cookies) související s reklamou.'
    },
    [SERVICE_AD_USER_DATA]: {
        en: 'Sets consent for sending user data related to advertising to Google.',
        cs: 'Nastavuje souhlas se zasíláním údajů o uživatelských datech souvisejících s reklamou společnosti Google.'
    },
    [SERVICE_AD_PERSONALIZATION]: {
        en: 'Sets consent for personalized advertising.',
        cs: 'Nastavuje souhlas pro personalizovanou reklamu.'
    },
};
console.log('serviceTranslation', serviceTranslation);

function consentRun(selectedLang, ccObj) {
    console.debug('consentRun');
    ccObj.language.default = [selectedLang];
    ccObj.categories[CAT_ANALYTICS].services[SERVICE_ANALYTICS_STORAGE].label = serviceTranslation[SERVICE_ANALYTICS_STORAGE][selectedLang];
    ccObj.categories[CAT_ADVERTISEMENT].services[SERVICE_AD_STORAGE].label = serviceTranslation[SERVICE_AD_STORAGE][selectedLang];
    ccObj.categories[CAT_ADVERTISEMENT].services[SERVICE_AD_USER_DATA].label = serviceTranslation[SERVICE_AD_USER_DATA][selectedLang];
    ccObj.categories[CAT_ADVERTISEMENT].services[SERVICE_AD_PERSONALIZATION].label = serviceTranslation[SERVICE_AD_PERSONALIZATION][selectedLang];
    CookieConsent.run(ccObj);
}

// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

const linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = `https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.1/dist/cookieconsent.css`;
document.head.appendChild(linkElement);
import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.1/dist/cookieconsent.umd.js';
const scriptSrc = new URL(import.meta.url).href || 'latest';
console.debug(new URL(import.meta.url).href);
const tagFromSrc = scriptSrc.split('@').slice(-1)[0].split('/')[0];
// const currentTag = '1.0.4';
const currentTag = /\d+\.\d+\.\d+/g.test(tagFromSrc) ? tagFromSrc : 'latest';
console.debug('currentTag:', currentTag);

// Set the default consent state for all services
gtag('consent', 'default', {
    [SERVICE_AD_STORAGE]: 'denied',
    [SERVICE_AD_USER_DATA]: 'denied',
    [SERVICE_AD_PERSONALIZATION]: 'denied',
    [SERVICE_ANALYTICS_STORAGE]: 'denied',
    [SERVICE_FUNCTIONALITY_STORAGE]: 'denied',
    [SERVICE_PERSONALIZATION_STORAGE]: 'denied',
    [SERVICE_SECURITY_STORAGE]: 'denied',
    wait_for_update: 500,
    region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE']
});
gtag('consent', 'default', {
    [SERVICE_AD_STORAGE]: 'denied',
    [SERVICE_AD_USER_DATA]: 'denied',
    [SERVICE_AD_PERSONALIZATION]: 'denied',
    [SERVICE_ANALYTICS_STORAGE]: 'denied',
    [SERVICE_FUNCTIONALITY_STORAGE]: 'denied',
    [SERVICE_PERSONALIZATION_STORAGE]: 'denied',
    [SERVICE_SECURITY_STORAGE]: 'denied',
    wait_for_update: 500
});

// load GTM if gtmId is set
// const gtmId = document.currentScript?.getAttribute('data-gtmid') || '';
const gtmId = window.gtmId || '';
let gtmUrl = window.gtmURL || 'https://www.googletagmanager.com/gtm.js';
if (!gtmUrl.endsWith('/')) {
  gtmUrl += '/';
}
const currentHostName = window.location.host;
const regex = /(test|stg|stage|staging)\./g; // TODO: Make this the default value like: inputRegex || /(test|stg|stage|staging)\./g
const isStaging = currentHostName.match(regex);
console.debug('isStaging', isStaging);
if (gtmId) {
    const envPart = isStaging ? window.gtmEnv || '' : '';
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    gtmUrl+'?id='+i+dl+ envPart;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',gtmId);
}

/** 
 * Update gtag consent according to the users choices made in CookieConsent UI
 */
function updateGtagConsent() {
    gtag('consent', 'update', {
        [SERVICE_ANALYTICS_STORAGE]: CookieConsent.acceptedService(SERVICE_ANALYTICS_STORAGE, CAT_ANALYTICS) ? 'granted' : 'denied',
        [SERVICE_AD_STORAGE]: CookieConsent.acceptedService(SERVICE_AD_STORAGE, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_AD_USER_DATA]: CookieConsent.acceptedService(SERVICE_AD_USER_DATA, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_AD_PERSONALIZATION]: CookieConsent.acceptedService(SERVICE_AD_PERSONALIZATION, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_FUNCTIONALITY_STORAGE]: CookieConsent.acceptedService(SERVICE_FUNCTIONALITY_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
        [SERVICE_PERSONALIZATION_STORAGE]: CookieConsent.acceptedService(SERVICE_PERSONALIZATION_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
        [SERVICE_SECURITY_STORAGE]: CookieConsent.acceptedService(SERVICE_SECURITY_STORAGE, CAT_SECURITY) ? 'granted' : 'denied',
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
    cookieButton = document.createElement("div");
    cookieButton.classList.add("floating-button");
    cookieButton.id = "cookieButton";

    // Set the inner HTML of the button to include the SVG
    cookieButton.innerHTML = cookieSvg;
    cookieButton.classList.add('floating-button-hidden');

    // Append the floating button to the body (or you can target another container)

    function DOMListener() {
        document.body.appendChild(cookieButton);
        document.removeEventListener("DOMContentLoaded", DOMListener);
    }
    if (document.readyState === "loading") {
        // Add the event listener
        console.debug('document still loading, appending cookie button');
        document.addEventListener("DOMContentLoaded", DOMListener);
    } else {
        console.debug('document already loaded, appending cookie button');
        document.body.appendChild(cookieButton);
    }
    cookieButton.addEventListener("click", () => {
        const isFlipped = cookieButton.classList.contains('is-flipped');
        isFlipped ? CookieConsent.hidePreferences() : CookieConsent.showPreferences();
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
            updateGtagConsent();
        },

        onChange: ({cookie, changedCategories, changedServices}) => {
            console.debug('onChange fired!', changedCategories, changedServices);
            updateGtagConsent();
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

    // Configure categories and services
    categories: {
        [CAT_NECESSARY]: {
            enabled: true,  // this category is enabled by default
            readOnly: true,  // this category cannot be disabled
        },
        [CAT_ANALYTICS]: {
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
            // See: https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
            services: {
                [SERVICE_ANALYTICS_STORAGE]: {
                    label: 'Enables storage (such as cookies) related to analytics e.g. visit duration.',
                }
            }
        },
        [CAT_ADVERTISEMENT]: {
            services: {
                [SERVICE_AD_STORAGE]: {
                    label: 'Enables storage (such as cookies) related to advertising.',
                },
                [SERVICE_AD_USER_DATA]: {
                    label: 'Sets consent for sending user data related to advertising to Google.',
                },
                [SERVICE_AD_PERSONALIZATION]: {
                    label: 'Sets consent for personalized advertising.',
                },
            }
        },
        [CAT_FUNCTIONALITY]: {
            services: {
                [SERVICE_FUNCTIONALITY_STORAGE]: {
                    label: 'Enables storage that supports the functionality of the website or app e.g. language settings.',
                },
                [SERVICE_PERSONALIZATION_STORAGE]: {
                    label: 'Enables storage related to personalization e.g. video recommendations.',
                },
            }
        },
        [CAT_SECURITY]: {
            services: {
                [SERVICE_SECURITY_STORAGE]: {
                    label: 'Enables storage related to security such as authentication functionality, fraud prevention, and other user protection.',
                },
            }
        }
    },

        language: {
            autoDetect: 'document',
            default: [DEFAULT_LOCALE],
            translations: LOCALE_PATHS
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
        consentRun(WEBSITE_LOCALE, ccObj);
    }
} catch (e) {
    console.error(e);
    consentRun(WEBSITE_LOCALE, ccObj);
}


