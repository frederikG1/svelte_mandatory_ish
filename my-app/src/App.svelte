<script lang="ts">
  import { onMount } from "svelte";
  import { Toaster, toast } from "svelte-sonner";
  import "toastr/build/toastr.min.css";

  function handleClick() {
    toast.success("Hello, world!");
  }

  onMount(() => {
    toast.info("Notice");
    toast.warning("Warning");
  });

  let name = $state("");
  let password = $state("");

  let isLogin = $state(true);
  
</script>

<input bind:value={name} placeholder="Your name" />
<input type="password" bind:value={password} placeholder="Your password" />

<p>Hello, {name}</p>



<Toaster />
<button type="button" onclick={handleClick}>Toast</button>
