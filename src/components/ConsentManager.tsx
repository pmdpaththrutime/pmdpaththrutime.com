import React from "react";
import { ConsentManagerProvider, ConsentBanner, ConsentDialog } from "@c15t/react";

/**
 * ConsentManager wraps the c15t UI components with the provider
 * This is used as a single React island at the root of the app
 */
export default function ConsentManager() {
  return (
    <ConsentManagerProvider
      options={{
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
                  "This website uses cookies to enable certain features, such as the Spotify embedded player. You'll need to accept marketing cookies for the player to load."
              }
            }
          }
        }
      }}
    >
      <ConsentBanner />
      <ConsentDialog showTrigger />
    </ConsentManagerProvider>
  );
}
