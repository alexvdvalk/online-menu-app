<script lang="ts">
  import MenuItemSubSection from "./MenuItemSubSection.svelte";
  import {slide} from "svelte/transition";
  import {page} from "$app/stores";
 
  interface Props {
    item: any;
  }
  const { item }: Props = $props();

  let selected = $state(false);

  let icon = $derived(selected ? "south" : "info");

  let allergens = $derived(
    Object.keys(item).filter((key) => key.startsWith("allergen_"))
  );
  let nutrician = $derived(
    Object.keys(item).filter((key) => key.startsWith("nut_"))
  );
</script>

<div class="p-4" class:bg-surface-300={selected}>
  <button
    class="flex justify-around gap-5 md:gap-20 text-left mb-2 rounded p-1 w-full"
    
    onclick={() => (selected = !selected)}
  >
    <div class="flex-grow my-auto">
      <h6 class="h6">{item.title}</h6>
      {#if item.description}
      <p>{item.description}</p>
      {/if}
    </div>
    <div class="flex flex-col">
      <div class="text-end">
        <p class="italic text-nowrap text-xs">{item.calories} kcal</p>
      </div>
      <div class="text-end">
        <span class="material-symbols-outlined"> {icon} </span>
      </div>
    </div>
  </button>
  {#if selected}
  <!-- <Accordion> -->
    <MenuItemSubSection title="Allergens">

        <div class="grid grid-cols-1 sm:grid-cols-2">
        {#each $page.data.allergens as allergen}
        {@const label = ($page.data.allergens.find ((i:{id:string;label:string | null}) => allergen ===`allergen_${i.id}`))}
          <div class="flex flex-row gap-2 sm:even:justify-end">
            <div class="font-bold">
               {allergen?.label || i.id}
            </div>
            <div>
              {item[allergen] ? "Yes" : "No"}
            </div>
          </div>
        {/each}
      </div>
      
    </MenuItemSubSection>
    <MenuItemSubSection title="Suitable For">
      {@render spec ({title:"Suitable for Vegetarians", value: item.suitable_for_vegetarians ? "Yes" : "No"})}
      {@render spec ({title:"Suitable for Vegans", value: item.suitable_for_vegans ? "Yes" : "No"})}
      
    </MenuItemSubSection>
    <MenuItemSubSection title="Nutritional">
            {@render spec ({title:"Calories", value: item.calories+ " kcal"})}
            {#each nutrician as nut}
                    {@render spec ({title:nut.split('_').slice(1).join (' '), value: item[nut]+ " g"})}
            {/each}

    </MenuItemSubSection>
    <MenuItemSubSection title="Ingredients">
    <p class="whitespace-pre-line	">

      {item.ingredients}
    </p>
    </MenuItemSubSection>
  <!-- </Accordion> -->
  {/if}
  
</div>


{#snippet spec (data:{title:string;value:any})}
<div class="flex flex-row justify-between">
  <div class="font-bold capitalize">{data.title}</div>
  <div>
    {data.value}
  </div>
</div>

{/snippet}
<!-- <pre>
       {JSON.stringify(item, null, 2)}
   </pre> -->
