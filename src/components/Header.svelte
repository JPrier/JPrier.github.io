<script lang="ts">
  import ProfileWithOrbit from './ProfileWithOrbit.svelte';
  import { onMount } from 'svelte';

  export let initialShape: 'circle' | 'pill' = 'circle';
  const breakpoint = 768;
  let shape: 'circle' | 'pill';

  function computeShape() {
    const responsive = window.innerWidth < breakpoint ? 'pill' : 'circle';
    return initialShape === 'pill' || responsive === 'pill' ? 'pill' : 'circle';
  }

  if (typeof window !== 'undefined') {
    shape = computeShape();
  } else {
    shape = initialShape;
  }

  onMount(() => {
    const handleResize = () => (shape = computeShape());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  $: if (typeof window !== 'undefined') {
    const newShape = computeShape();
    if (newShape !== shape) shape = newShape;
  }
</script>

<header class="header-bar">
  <ProfileWithOrbit {shape} />
  <nav class="nav-links">
    <a href="/" class="nav-link">Home</a>
    <a href="/post_test" class="nav-link">Posts</a>
    <a href="/projects" class="nav-link">Projects</a>
  </nav>
</header>

<style>
  .header-bar {
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
  @media (max-width: 768px) {
    .header-bar {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
