<script lang="ts">
  import { onMount } from "svelte";
  import { Toaster, toast } from "svelte-sonner";

  function handleClick() {
    toast.success("Hello, world!");
  }

  function toggle() {
    isLogin = !isLogin;
  }

  let name = $state("");
  let email = $state("");
  let password = $state("");
  let isLogin = $state(true);

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

  async function handleSignup() {
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
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

  // onMount(() => {
  //   toast.info("Notice");
  //   toast.warning("Warning");
  // });
</script>

<div class="container">
  <div class="card {isLogin ? '' : 'flipped'}">
    <!-- LOGIN -->
    <div class="side front">
      <h2>Login</h2>
      <input bind:value={email} placeholder="Email" />
      <input type="password" bind:value={password} placeholder="Password" />
      <button onclick={handleLogin}>Login</button>
      <p onclick={toggle}>Go to sign up</p>
    </div>

    <!-- SIGNUP -->
    <div class="side back">
      <h2>Sign Up</h2>
      <input bind:value={name} placeholder="Name" />
      <input bind:value={email} placeholder="Email" />
      <input type="password" bind:value={password} placeholder="Password" />
      <button onclick={handleSignup}>Sign Up</button>
      <p onclick={toggle}>Go to login</p>
    </div>
  </div>
</div>

<Toaster />
<button type="button" onclick={handleClick}>Toast</button>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .card {
    width: 300px;
    height: 350px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    background-color: black;
  }

  .card.flipped {
    transform: rotateY(180deg);
  }

  .side {
    position: absolute;
    width: 100%;
    height: 100%;
    background: grey;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    backface-visibility: hidden;

    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }

  .back {
    transform: rotateY(180deg);
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
