window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
    region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE']
});
gtag('consent', 'default', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    wait_for_update: 500
});

// load GTM
const envPartTest = document.currentScript.getAttribute('env') || '';
const gtmId = document.currentScript.getAttribute('gtmid') || '';
const hostName = document.currentScript.getAttribute('hostname') || '';
let envPart = '';
const currentHostName = window.location.host;
if (currentHostName != hostName) {
    envPart = envPartTest;
}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl+ envPart;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',gtmId);