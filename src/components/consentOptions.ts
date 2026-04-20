import type { ConsentRuntimeOptions } from "c15t";

export const consentOptions = {
  mode: "offline",
  consentCategories: ["necessary", "marketing", "measurement"],
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
            "This website uses cookies to enable certain features, such as the Spotify embedded player. You'll need to accept marketing cookies for the player to load.",
        },
      },
    },
  },
} satisfies ConsentRuntimeOptions;
