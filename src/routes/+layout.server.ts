import { readItems } from "@directus/sdk";
import type { LayoutServerLoad } from "./$types";
import getDirectusInstance from "$lib/directus";

export const load = (async ({ fetch }) => {
  const directus = getDirectusInstance(fetch);
  return {
    allergens: await directus.request(readItems("allergens")),
    menu_items: await directus.request(readItems("menu_item", { limit: -1 })),
    sections: await directus.request(
      readItems("menu_sections", {
        fields: ["name", "label", "id", "sort"],
      })
    ),
  };
}) satisfies LayoutServerLoad;
