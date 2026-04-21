import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const characters = defineCollection({
  loader: glob({
    base: "./src/content/characters",
    pattern: "**/*.md",
  }),
  schema: z.object({
    name: z.string(),
    species: z.string(),
    pronouns: z.string().optional(),
    ability: z.string().optional(),
    types: z.array(z.string()).optional(),
    color: z.string().optional(),
    birthPlace: z.object({
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    sprite: z.object({
      speciesID: z.number(),
      formID: z.number().optional(),
      isShiny: z.boolean().optional(),
      emotion: z.string().optional(),
      authors: z.array(z.string()).optional(),
      license: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { characters };
