import { useState, useEffect } from "react";

interface CookieConsent {
  analytics?: boolean;
  marketing?: boolean;
  other?: boolean;
}

/**
 * Custom hook to read cookie consent from localStorage
 * This works across separate React roots (Astro islands)
 * Listens for consent changes via custom events
 */
export function useStoredCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const readConsent = () => {
    try {
      const stored = localStorage.getItem("cookie-consent");
      if (stored) {
        setConsent(JSON.parse(stored));
      } else {
        setConsent({});
      }
    } catch (error) {
      console.error("Error reading cookie consent from localStorage:", error);
      setConsent({});
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    // Initial read from localStorage
    readConsent();

    // Listen for consent changes from other React roots
    const handleConsentChange = () => {
      readConsent();
    };

    window.addEventListener("cookieConsentChanged", handleConsentChange);
    return () => {
      window.removeEventListener("cookieConsentChanged", handleConsentChange);
    };
  }, []);

  const isMarketingEnabled = consent?.marketing === true;

  return { consent, isMarketingEnabled, isLoaded };
}
