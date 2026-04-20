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
      }}
    >
      <ConsentBanner />
      <ConsentDialog showTrigger />
    </ConsentManagerProvider>
  );
}
