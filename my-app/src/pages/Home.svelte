<script>
  import { navigate } from "svelte-routing";
  import { Toaster, toast } from "svelte-sonner";

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.successMessage);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
</script>

<div class="container">
  <h1>Welcome! You are logged in.</h1>
  <button onclick={handleLogout}>Logout</button>
</div>

<Toaster />

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
</style>