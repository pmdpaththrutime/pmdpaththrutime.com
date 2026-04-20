import React, { useEffect, useRef } from "react";
import {
  CookieConsentProvider,
  CookieBanner,
  FloatingConsentInfo,
  CookieService,
  useCookieConsent,
} from "@vantezzen/react-cookie-banner";

interface CookieBannerWrapperProps {
  privacyPolicyUrl?: string;
}

function CookieBannerContent({
  privacyPolicyUrl,
}: {
  privacyPolicyUrl: string;
}) {
  const { setOpen } = useCookieConsent();
  const lastConsentRef = useRef<string | null>(null);

  useEffect(() => {
    // Listen for custom event to open the banner from other React roots
    const handleOpenBanner = () => {
      setOpen(true);
    };
    window.addEventListener("openCookieBanner", handleOpenBanner);
    return () => {
      window.removeEventListener("openCookieBanner", handleOpenBanner);
    };
  }, [setOpen]);

  // Poll localStorage for consent changes and broadcast to other React roots
  useEffect(() => {
    const checkForConsentChanges = () => {
      const currentConsent = localStorage.getItem("cookie-consent");
      if (currentConsent !== lastConsentRef.current) {
        // Consent has changed, dispatch event to other React roots
        window.dispatchEvent(new CustomEvent("cookieConsentChanged"));
      }
      lastConsentRef.current = currentConsent;
    };

    // Initial read
    checkForConsentChanges();

    // Poll every 100ms for changes (aggressive polling for responsiveness)
    const interval = setInterval(checkForConsentChanges, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CookieBanner privacyPolicyUrl={privacyPolicyUrl} />
      <FloatingConsentInfo />

      {/* Declare services that may appear in different parts of the site */}
      <CookieService
        id="spotify-embed"
        category="marketing"
        name="Spotify Embed Player"
      />
    </>
  );
}

export default function CookieBannerWrapper({
  privacyPolicyUrl = "/privacy-policy",
}: CookieBannerWrapperProps) {
  return (
    <CookieConsentProvider>
      <CookieBannerContent privacyPolicyUrl={privacyPolicyUrl} />
    </CookieConsentProvider>
  );
}
