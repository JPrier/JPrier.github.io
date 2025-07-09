<script>
  import ProfileWithOrbit from './ProfileWithOrbit.svelte';
  import { onMount } from 'svelte';
  export let initialShape = 'circle';
  let isSmall = false;
  let shape = initialShape;
  const breakpoint = 768;
  function updateHeaderSize() {
    isSmall = window.innerWidth < breakpoint;
    shape = isSmall ? 'pill' : 'circle';
  }
  onMount(() => {
    updateHeaderSize();
    window.addEventListener('resize', updateHeaderSize);
    return () => window.removeEventListener('resize', updateHeaderSize);
  });
</script>

<header class="site-header">
  <ProfileWithOrbit shape={shape} />
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
  padding: 1rem;
  gap: 2rem;
  transition: padding 0.3s ease;
}
.nav-links {
  display: flex;
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
