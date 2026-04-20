import React from "react";
import { ConsentManagerProvider, ConsentBanner, ConsentDialog } from "@c15t/react";
import { consentOptions } from "./consentOptions";

/**
 * ConsentManager wraps the c15t UI components with the provider
 * This is used as a single React island at the root of the app
 */
export default function ConsentManager() {
  return (
    <ConsentManagerProvider options={consentOptions}>
      <ConsentBanner />
      <ConsentDialog showTrigger />
    </ConsentManagerProvider>
  );
}
