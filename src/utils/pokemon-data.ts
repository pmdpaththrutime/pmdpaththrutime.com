import type { CharacterData } from '../data/characters';

const POKEAPI_GRAPHQL_ENDPOINT = 'https://graphql.pokeapi.co/v1beta2';

interface SpeciesData {
  name: string;
  pokemon_color_id: {
    name: string;
  };
}

interface FormData {
  name: string;
  pokemontypes: Array<{
    type: {
      name: string;
    };
  }>;
}

interface GraphQLResponse {
  data: {
    species: SpeciesData[];
    forms: FormData[];
  };
}

/**
 * Capitalize first letter of a string (title case)
 */
function toTitleCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Fetch Pokemon type and color data from PokeAPI GraphQL and enrich character data
 */
const linkCharacterSpeciesData = async function (
  characterData: CharacterData[]
): Promise<CharacterData[]> {
  // Extract unique lowercase species names
  const speciesNames = characterData.map((c) =>
    c.species.toLowerCase()
  );

  // Build GraphQL query with variable
  const query = `
    query pkmn_colors_and_types($speciesNames: [String!]!) {
      species: pokemonspecies(where: {
        name: {
          _in: $speciesNames
        }
      }) {
        name,
        pokemon_color_id: pokemoncolor {
          name
        },
      }

      forms: pokemon(where: {
        name: {
          _in: $speciesNames
        }
      }) {
        name,
        pokemontypes: pokemontypes {
          type {
            name
          }
        }
      }
    }
  `;

  // Fetch from PokeAPI GraphQL endpoint
  const response = await fetch(POKEAPI_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: {
        speciesNames,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `PokeAPI GraphQL request failed: ${response.status} ${response.statusText}`
    );
  }

  const json: GraphQLResponse = await response.json();

  if (!json.data) {
    throw new Error('PokeAPI GraphQL response missing data field');
  }

  // Create lookup maps from API response
  const colorMap = new Map<string, string>();
  const typesMap = new Map<string, string[]>();

  // Populate color map from species data
  for (const species of json.data.species) {
    colorMap.set(species.name, species.pokemon_color_id.name);
  }

  // Populate types map from forms data
  for (const form of json.data.forms) {
    const types = form.pokemontypes.map((pt) =>
      toTitleCase(pt.type.name)
    );
    typesMap.set(form.name, types);
  }

  // Enrich character data
  const enrichedCharacters = characterData.map((character) => {
    const speciesLower = character.species.toLowerCase();
    const color = colorMap.get(speciesLower);
    const types = typesMap.get(speciesLower);

    if (!color) {
      throw new Error(
        `Pokemon species "${character.species}" color not found in PokeAPI`
      );
    }

    if (!types) {
      throw new Error(
        `Pokemon species "${character.species}" types not found in PokeAPI`
      );
    }

    return {
      ...character,
      color,
      types,
    };
  });

  return enrichedCharacters;
};

export { linkCharacterSpeciesData };
