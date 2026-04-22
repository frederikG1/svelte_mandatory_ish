<script>
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import { isLoggedIn } from "../stores/authStore";

  let user = null;

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/me", {
        credentials: "include",
      });

      if (!response.ok) {
        navigate("/login");
        return;
      }

      const data = await response.json();
      user = data.user;
    } catch (error) {
      navigate("/login");
    }
  });
  
  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      console.log(response.status);

      const data = await response.json();

      if (response.ok) {
        isLoggedIn.set(false);
        toast.success(data.successMessage);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
</script>

<div class="container">
  <h1>Welcome, {user?.name}! You are logged in.</h1>
  <button on:click={handleLogout}>Logout</button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 20px;
  }
  button {
    padding: 10px 20px;
    border: none;
    background: black;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  p {
    font-size: 12px;
    color: blue;
    cursor: pointer;
    text-align: center;
  }
</style>
