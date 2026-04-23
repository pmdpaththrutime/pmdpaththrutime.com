import type { ConsentManagerOptions } from "@c15t/react";
import { posthog } from "@c15t/scripts/posthog";

const posthogApiHost = "https://us.i.posthog.com";

export const consentOptions = {
  mode: "offline",
  consentCategories: ["necessary", "marketing", "measurement"],
  scripts: [
    posthog({
      id: "phc_Bcg9ehqQu2pVAiL5hsEEHnzAzEdvKHYMzjCzXunfwAJ2",
      apiHost: posthogApiHost,
      scriptUrl: "https://us-assets.i.posthog.com/static/array.js",
      initOptions: {
        api_host: posthogApiHost,
        ui_host: posthogApiHost,
        defaults: "2026-01-30",
        cookieless_mode: "on_reject",
        autocapture: true,
        capture_pageview: false,
        person_profiles: "identified_only",
      },
    }),
  ],
  offlinePolicy: {
    policyPacks: [
      {
        id: "global-opt-in-banner",
        match: { isDefault: true },
        consent: { model: "opt-in", expiryDays: 365 },
        ui: { mode: "banner" },
      },
    ],
  },
  i18n: {
    locale: "en",
    messages: {
      en: {
        cookieBanner: {
          title: "Come to the dark side\u2026",
          description:
            "This website uses cookies to enable certain features, such as the Spotify embedded player.",
        },
        common: {
          acceptAll: "Accept All",
          rejectAll: "Essential Cookies Only",
        }
      },
    },
  },
  theme: {
    slots: {
      consentBanner: "c15t-cookie-banner",
      consentBannerCard: "c15t-cookie-surface c15t-cookie-banner-card",
      consentBannerTitle: "c15t-cookie-title",
      consentBannerDescription: "c15t-cookie-description",
      consentBannerFooter: "c15t-cookie-footer c15t-cookie-banner-footer",
      consentBannerFooterSubGroup: "c15t-cookie-footer-group",
      consentBannerOverlay: "c15t-cookie-overlay",
      consentDialogCard: "c15t-cookie-surface c15t-cookie-dialog-card",
      consentDialogHeader: "c15t-cookie-header",
      consentDialogTitle: "c15t-cookie-title",
      consentDialogDescription: "c15t-cookie-description",
      consentDialogOverlay: "c15t-cookie-overlay",
      consentWidgetAccordion: "c15t-cookie-widget-accordion",
      consentWidgetFooter: "c15t-cookie-footer",
      buttonPrimary: "c15t-cookie-button-primary",
      buttonSecondary: "c15t-cookie-button-secondary",
    },
  },
} satisfies ConsentManagerOptions;
