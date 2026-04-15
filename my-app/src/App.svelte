<script>
  import { Router, Route } from "svelte-routing";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";
  import Home from "./pages/Home.svelte";
  import { isLoggedIn } from "./stores/authStore.js";

  let loading = $state(true);

  async function checkSession() {
    try {
      const response = await fetch("http://localhost:8080/auth/me", {
        credentials: "include",
      });
      isLoggedIn.set(response.ok);
    } catch {
      isLoggedIn.set(false);
    } finally {
      loading = false;
    }
  }

  checkSession();
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <Router>
    <Route path="/login"><Login /></Route>
    <Route path="/signup"><Signup /></Route>
    <Route path="/">
      {#if $isLoggedIn}
        <Home />
      {:else}
        <Login />
      {/if}
    </Route>
  </Router>
{/if}