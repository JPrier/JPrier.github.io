<script lang="ts">
  import ProfileWithOrbit from './ProfileWithOrbit.svelte';
  import { onMount } from 'svelte';

  export let initialShape: 'circle' | 'pill' = 'circle';
  const breakpoint = 768;
  let shape: 'circle' | 'pill';

  function computeShape() {
    return window.innerWidth < breakpoint ? 'pill' : 'circle';
  }

  if (typeof window !== 'undefined') {
    shape = computeShape();
  } else {
    shape = initialShape;
  }

  onMount(() => {
    const handleResize = () => (shape = computeShape());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    flex-wrap: nowrap;
  }
</style>
