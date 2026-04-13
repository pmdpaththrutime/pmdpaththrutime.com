export interface CharacterData {
  name: string;
  species: string;
  pronouns?: string;
  types?: string[];
  color?: string;
}

export const characters: CharacterData[] = [
  {
    name: "Hikaru Hatsumi",
    species: "Pikachu",
    pronouns: "she/her",
  },
  {
    name: "Bruce Flameback",
    species: "Cyndaquil",
    pronouns: "he/him",
  },
  {
    name: "Sammy Pepperoni",
    species: "Munchlax",
    pronouns: "he/him",
  },
  {
    name: "Walter Fisthands",
    species: "Riolu",
    pronouns: "he/him",
  },
  {
    name: "Blair Arkheron",
    species: "Absol",
    pronouns: "she/her",
  },
  {
    name: "Salena",
    species: "Glaceon",
    pronouns: "she/her",
  },
  {
    name: "Caroline Flameback",
    species: "Typhlosion",
    pronouns: "she/her",
  },
];
