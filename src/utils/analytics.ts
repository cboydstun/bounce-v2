declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

const GA_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
const GTM_ID = import.meta.env.VITE_GTM_ID;

// Initialize dataLayer
export const initGTM = () => {
    window.dataLayer = window.dataLayer || [];

    // Insert GTM script
    const script = document.createElement('script');
    script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `;
    document.head.insertBefore(script, document.head.firstChild);

    // Insert GTM noscript iframe
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
};

// Initialize GA4
export const initGA = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.insertBefore(script, document.head.firstChild);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
};

// Track page views
export const pageView = (path: string) => {
    if (window.gtag) {
        window.gtag('config', GA_ID, {
            page_path: path
        });
    }
    // Also push to dataLayer for GTM
    window.dataLayer?.push({
        event: 'page_view',
        page_path: path
    });
};

// Track events
export const trackEvent = (
    eventName: string,
    eventParams: Record<string, any> = {}
) => {
    if (window.gtag) {
        window.gtag('event', eventName, eventParams);
    }
    // Also push to dataLayer for GTM
    window.dataLayer?.push({
        event: eventName,
        ...eventParams
    });
};
