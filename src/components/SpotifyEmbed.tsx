import React from "react";
import { useStoredCookieConsent } from "../hooks/useStoredCookieConsent";

interface SpotifyEmbedProps {
  episode?: string;
}

export default function SpotifyEmbed({ episode }: SpotifyEmbedProps) {
  const { isMarketingEnabled, isLoaded } = useStoredCookieConsent();

  const embedUrl = episode
    ? `https://open.spotify.com/embed/episode/${episode}?utm_source=generator`
    : "https://open.spotify.com/embed/show/1ImfR6fAe241ATmhHHLP6C?utm_source=generator";

  // Show loading state while checking localStorage
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
            // Open the cookie banner
            const event = new CustomEvent("openCookieBanner");
            window.dispatchEvent(event);
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
