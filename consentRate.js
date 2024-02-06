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


const measurement_id = `G-XCZFYWEYWC`;
const api_secret = ``;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
  method: "POST",
  body: JSON.stringify({
    events: [{
      name: 'tutorial_begin',
      params: {},
    }]
  })
});