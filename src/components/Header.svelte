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

<div class="header-wrapper">
  <ProfileWithOrbit {shape} />
  <nav class="nav-links">
    <a href="/" class="nav-link">Home</a>
    <a href="/post_test" class="nav-link">Posts</a>
    <a href="/projects" class="nav-link">Projects</a>
  </nav>
</div>

<style>
  .header-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    flex-wrap: wrap;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    .header-wrapper {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
