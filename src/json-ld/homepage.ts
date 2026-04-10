import {
  RSS_URL,
  WEBSITE_ROOT_URL,
  SPOTIFY_URL,
  YOUTUBE_URL,
  APPLE_PODCASTS_URL,
  AUDIBLE_URL,
  ZENCASTR_URL,
} from "../constants";

export const data = {
  "@context": "https://schema.org/",
  "@graph": [
    {
      // JSON-LD for the website
      "@id": `${WEBSITE_ROOT_URL}/#website`,
      "@type": "WebSite",
      "url": WEBSITE_ROOT_URL,
      "name": "Mystery Dungeon: A Path Through Time",
      "description": "Website for Mystery Dungeon: A Path Through Time",
      "inLanguage": "en",
      "mainEntity": { "@id": `${WEBSITE_ROOT_URL}/#podcast` },
      "publisher": { "@id": `${WEBSITE_ROOT_URL}/#ptt-crew` },
      "copyrightYear": 2026,
      "copyrightNotice": "© 2026 The PTT Crew",
      "copyrightHolder": { "@id": `${WEBSITE_ROOT_URL}/#ptt-crew` },
    },
    {
      // The podcast itself
      "@id": `${WEBSITE_ROOT_URL}/#podcast`,
      "@type": "PodcastSeries",
      "name": "Mystery Dungeon: A Path Through Time",
      "description": "A Pokémon Mystery Dungeon TTRPG fan podcast",
      "webFeed": RSS_URL, // PodcastSeries.webFeed represents the RSS feed
      "startDate": "2023-10-22T05:49:14Z", // based on the date Arc 1 Episode 1 was published
      "genre": ["Actual Play", "Fantasy", "Comedy", "Fanwork"],
      "inLanguage": "en",
      "url": ZENCASTR_URL, // main URL where the podcast can be found
      "sameAs": [
        SPOTIFY_URL,
        YOUTUBE_URL,
        APPLE_PODCASTS_URL,
        AUDIBLE_URL,
      ],
      "actor": { "@id": `${WEBSITE_ROOT_URL}/#ptt-crew` },
      "publisher": { "@id": `${WEBSITE_ROOT_URL}/#ptt-crew` },
      "copyrightYear": 2023,
      "copyrightNotice": "© ℗ 2023–2026 The PTT Crew",
      "copyrightHolder": { "@id": `${WEBSITE_ROOT_URL}/#ptt-crew` },
      "about": [
        {
          "@type": "Thing",
          "name": "Pokémon",
          "sameAs": "https://www.wikidata.org/wiki/Q864",
        },
        {
          "@type": "VideoGameSeries",
          "name": "Pokémon Mystery Dungeon",
          "sameAs": "https://www.wikidata.org/wiki/Q2100952",
        },
      ],
    },
    {
      // The PTT Crew (as a group)
      "@id": `${WEBSITE_ROOT_URL}/#ptt-crew`,
      "@type": "PerformingGroup",
      "name": "The PTT Crew",
      "description": "The cast of Mystery Dungeon: A Path Through Time",
      "url": WEBSITE_ROOT_URL,
    }
  ]
};
