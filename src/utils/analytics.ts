
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = 'G-TK70ELTWQR';

export const pageview = (url: string) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
