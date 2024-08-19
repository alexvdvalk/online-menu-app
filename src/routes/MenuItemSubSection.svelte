<script lang="ts">
  import type { Snippet } from "svelte";
  	import { slide } from 'svelte/transition';


  interface Props {
    title: String;
    children: Snippet;
  }
  let { title, children }: Props = $props();

  let expanded = $state(false);

  let icon = $derived(expanded ? "remove" : "add");
</script>

<button
  class="bg-primary-200 flex justify-between p-2 w-full my-0.5 rounded"
  onclick={() => (expanded = !expanded)}
>
  <h6 class="h6">{title}</h6>
  <div class="flex flex-col justify-center my-auto">
    <span class="material-symbols-outlined"> {icon} </span>
  </div>
</button>

{#if expanded}
<div transition:slide={{duration:150}} class="p-2">
    {@render children()}
</div>
{/if}
