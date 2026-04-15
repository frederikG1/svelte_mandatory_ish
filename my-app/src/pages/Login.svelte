<script>
  import { navigate } from "svelte-routing";
  import { Toaster, toast } from "svelte-sonner";
  import { isLoggedIn } from "../stores/authStore";
  

  let email = $state("");
  let password = $state("");
  

  async function handleLogin() {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.successMessage);
      } else {
        toast.error(data.errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
</script>

<div class="container">
  <div class="card">
    <h2>Login</h2>
    <input bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button onclick={handleLogin}>Login</button>
    <p onclick={() => navigate("/signup")}>Go to sign up</p>
  </div>
</div>

<Toaster />

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .card {
    width: 300px;
    background: grey;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    padding: 10px;
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
