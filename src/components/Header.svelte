<script lang="ts">
  import ProfileWithOrbit from './ProfileWithOrbit.svelte';
  import { onMount } from 'svelte';

  export let initialShape: 'circle' | 'pill' = 'circle';
  let shape: 'circle' | 'pill' = initialShape;
  const breakpoint = 768;

  function updateHeaderSize() {
    shape = window.innerWidth < breakpoint ? 'pill' : 'circle';
  }

  onMount(() => {
    updateHeaderSize();
    window.addEventListener('resize', updateHeaderSize);
    return () => window.removeEventListener('resize', updateHeaderSize);
  });
</script>

<header class="site-header">
  <ProfileWithOrbit {shape} />
  <nav class="nav-links">
    <a href="/" class="nav-link">Home</a>
    <a href="/post_test" class="nav-link">Posts</a>
    <a href="/projects" class="nav-link">Projects</a>
  </nav>
</header>

<style>
  .site-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    position: relative;
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  @media (max-width: 768px) {
    .site-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
