import type { PmdSpriteData } from "../components/PmdSprite.astro";

export interface CharacterData {
  name: string;
  species: string;
  pronouns?: string;
  types?: string[];
  color?: string;
  sprite?: PmdSpriteData;
}

export const characters: CharacterData[] = [
  {
    name: "Hikaru Hatsumi",
    species: "Pikachu",
    pronouns: "she/her",
    sprite: {
      speciesID: 25,
      formID: 4,
      emotion: "Normal",
      authors: ["baronessfaron"],
    },
  },
  {
    name: "Bruce Flameback",
    species: "Cyndaquil",
    pronouns: "he/him",
    sprite: {
      speciesID: 155,
    }
  },
  {
    name: "Sammy Pepperoni",
    species: "Munchlax",
    pronouns: "he/him",
    sprite: {
      speciesID: 446,
      emotion: "Special2",
    }
  },
  {
    name: "Walter Fisthands",
    species: "Riolu",
    pronouns: "he/him",
    sprite: {
      speciesID: 447,
      authors: ["Spike Chunsoft", "Fearless-Quit"],
    }
  },
  {
    name: "Blair Arkheron",
    species: "Absol",
    pronouns: "she/her",
    sprite: {
      speciesID: 359,
      emotion: "Worried",
      authors: ["Emmuffin", "baronessfaron"],
    }
  },
  {
    name: "Salena",
    species: "Glaceon",
    pronouns: "she/her",
    sprite: {
      speciesID: 471,
      emotion: "Determined",
      authors: ["PhillipsYoung"],
    }
  },
  {
    name: "Caroline Flameback",
    species: "Typhlosion",
    pronouns: "she/her",
    sprite: {
      speciesID: 157,
      emotion: "Surprised",
      authors: ["0palite"],
    }
  },
];
