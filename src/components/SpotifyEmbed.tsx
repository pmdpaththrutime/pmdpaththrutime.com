import React, { useState, useEffect } from "react";
import { getOrCreateConsentRuntime } from "c15t";

interface SpotifyEmbedProps {
  episode?: string;
}

export default function SpotifyEmbed({ episode }: SpotifyEmbedProps) {
  const [isMarketingEnabled, setIsMarketingEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get the c15t runtime - this is a global singleton
    const runtime = getOrCreateConsentRuntime({
      consentCategories: ["necessary", "marketing", "measurement"],
      mode: "offline",
    });
    const store = runtime.consentStore;

    // Function to update state based on current consent
    const updateMarketingConsent = () => {
      try {
        // Access the store to get consent state
        const state = store.getState();
        console.log("[SpotifyEmbed] Current consent state:", state);
        
        // Check if marketing category is consented
        const marketingEnabled = state?.acceptedCategories?.includes("marketing") ?? false;
        console.log("[SpotifyEmbed] Marketing enabled:", marketingEnabled);
        
        setIsMarketingEnabled(marketingEnabled);
      } catch (error) {
        console.error("[SpotifyEmbed] Error reading consent state:", error);
      }
      setIsLoaded(true);
    };

    // Initial check
    updateMarketingConsent();

    // Subscribe to consent changes
    const unsubscribe = store.subscribe(() => {
      console.log("[SpotifyEmbed] Consent store updated");
      updateMarketingConsent();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const embedUrl = episode
    ? `https://open.spotify.com/embed/episode/${episode}?utm_source=generator`
    : "https://open.spotify.com/embed/show/1ImfR6fAe241ATmhHHLP6C?utm_source=generator";

  const openConsentDialog = () => {
    const runtime = getOrCreateConsentRuntime({
      consentCategories: ["necessary", "marketing", "measurement"],
      mode: "offline",
    });

    runtime.consentStore.getState().setActiveUI("dialog", { force: true });
  };

  // Show loading state while checking consent
  if (!isLoaded) {
    return (
      <div
        style={{
          borderRadius: "12px",
          padding: "24px",
          backgroundColor: "#f5f5f5",
          textAlign: "center",
          border: "1px solid #ddd",
        }}
      >
        <p>Loading player...</p>
      </div>
    );
  }

  // If marketing cookies not consented, show fallback
  if (!isMarketingEnabled) {
    return (
      <div
        style={{
          borderRadius: "12px",
          padding: "24px",
          backgroundColor: "#f5f5f5",
          textAlign: "center",
          border: "1px solid #ddd",
        }}
      >
        <p>
          The Spotify player requires your consent to load. Please enable
          marketing cookies to listen to our podcast.
        </p>
        <button
          onClick={() => {
            console.log("[SpotifyEmbed] Enable button clicked - opening consent dialog");
            openConsentDialog();
          }}
          style={{
            marginTop: "12px",
            padding: "10px 20px",
            backgroundColor: "#1DB954",
            color: "white",
            border: "none",
            borderRadius: "24px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Enable Spotify Player
        </button>
      </div>
    );
  }

  // Render the Spotify iframe when consent is given
  console.log("[SpotifyEmbed] Marketing enabled, rendering iframe");
  return (
    <iframe
      data-testid="embed-iframe"
      style={{ borderRadius: "12px" }}
      src={embedUrl}
      width="100%"
      height="152"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title="Spotify Episode Player"
    >
      Oops! Looks like your browser doesn't support iframes and can't load
      this embedded player.
    </iframe>
  );
}
