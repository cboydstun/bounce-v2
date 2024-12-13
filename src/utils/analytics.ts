declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

// Track page views
export const pageView = (path: string) => {
    if (window.gtag) {
        window.gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
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
