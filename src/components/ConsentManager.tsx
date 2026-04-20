import React from "react";
import { getOrCreateConsentRuntime } from "c15t";
import { ConsentBanner, ConsentDialog } from "@c15t/react";

/**
 * Initialize c15t consent management
 * This runs once to set up the global consent runtime
 */
const runtime = getOrCreateConsentRuntime({
  consentCategories: ["necessary", "marketing", "analytics"],
});

export default function ConsentManager() {
  return (
    <>
      <ConsentBanner />
      <ConsentDialog />
    </>
  );
}

/**
 * Export the runtime so other components can access consent state
 */
export { runtime };
