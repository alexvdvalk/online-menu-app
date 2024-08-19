<script lang="ts">
  import MenuItem from "./MenuItem.svelte";
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";

  interface Props {
    section: any;
    menu_items: any[];
    search: String;
    sortBy: "menu_section" | "calories";
  }

  let { section, menu_items, search, sortBy }: Props = $props();

  let selected = $state(false);

  let items = $derived(
    menu_items
      .filter((i: any) => i.menu_section === section.id)
      .filter((i) => !!i.description)
      .filter((i) =>
        (i.title as string).toLowerCase().includes(search.toLowerCase())
      )
      .sort((a: { calories: number }, b: { calories: number }) => {
        if (sortBy === "calories") {
          return a.calories - b.calories;
        }
        return 1;
      })
  );
</script>

{#if items.length > 0}
  <div>
    <button
      class="w-full p-4 text-left flex flex-row justify-between items-center bg-surface-200 border-y"
      onclick={() => (selected = !selected)}
    >
      <h6 class="h6">{section.label}</h6>
      <div>{selected ? "-" : "+"}</div>
    </button>
    {#if selected}
      <div class="w-full flex flex-col gap-1">
        {#each items as item (item.id)}
          <div animate:flip={{ duration: 150, easing: quintOut }}>
            <MenuItem {item}></MenuItem>
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}
