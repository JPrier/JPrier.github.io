<script>
  let scrollY = 0;
  let progress = 0;
  $: {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress = total > 0 ? scrollY / total : 0;
  }
</script>

<svelte:window bind:scrollY />

<div class="progress-bar" style="transform: scaleX({progress});"></div>

<style>
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    width: 100%;
    background: #29abe2;
    transform-origin: left;
  }
  main {
    margin-top: 4px;
  }
</style>



