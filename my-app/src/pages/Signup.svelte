<script>
  import { navigate } from "svelte-routing";
  import { toast } from "svelte-sonner";

  let name = $state("");
  let email = $state("");
  let password = $state("");

  async function handleSignup() {
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.successMessage);
        navigate("/login");
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
    <h2>Sign Up</h2>
    <input bind:value={name} placeholder="Name" />
    <input bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button onclick={handleSignup}>Sign Up</button>
    <p onclick={() => navigate("/login")}>Go to login</p>
  </div>
</div>



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