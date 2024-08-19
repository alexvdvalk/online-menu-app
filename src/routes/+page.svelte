<script lang="ts">
  import type { PageData } from "./$types";
  import MenuSection from "./MenuSection.svelte";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let search = $state("");

  // let filteredMenu = $derived(
  //   data.menu_items.filter((i) =>
  //     (i.title as string).toLowerCase().includes(search.toLowerCase())
  //   )
  // );
  let sortBy = $state<"menu_section" | "calories">("menu_section");

  const updateSortBy = (type: "menu_section" | "calories") => {
    sortBy = type;
  };
</script>

<div class="card shadow-2xl my-2">
  <label class="label p-3">
    <span>Search</span>
    <input class="input" type="text" bind:value={search} />
  </label>
  <div class="grid grid-cols-2 h-12">
    <button
      class="w-full h-full text-left px-4"
      class:bg-primary-600={sortBy === "menu_section"}
      onclick={() => updateSortBy("menu_section")}>Sort By Category</button
    >
    <button
      class="w-full h-full text-left px-4"
      onclick={() => updateSortBy("calories")}
      class:bg-primary-600={sortBy === "calories"}
    >
      Sort By Calorie Count</button
    >
  </div>

  {#each data.sections as section (section.id)}
    <MenuSection {section} menu_items={data.menu_items} {search} {sortBy}
    ></MenuSection>
  {/each}
</div>
