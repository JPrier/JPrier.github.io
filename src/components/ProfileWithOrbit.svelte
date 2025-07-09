<script>
  import { onMount } from 'svelte';
  import OrbitCanvas from './Orbit.svelte';

  export let src = '/me.JPG';
  let size = 0;
  export let profileSizeRatio = 1.4;

  let wrapper;
  let orbitRadius = 200; // Single radius value

  const updateSize = () => {
    size = orbitRadius * profileSizeRatio;
  };

  onMount(() => {
    updateSize();
  });
</script>

<style>
  .wrapper {
    --pill-shape: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    --circle: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    position: absolute;
    top: -90px;
    left: -90px;
    pointer-events: none;
    overflow: visible;
  }
  
  .orbit-canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .profile {
    position: absolute;
    border-radius: 50%;
    overflow: hidden;
    z-index: 2;
    pointer-events: auto;
    margin: 0;
    padding: 0;
    width: var(--size)px;
    height: var(--size)px;
    /* Center the profile within the orbit */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .profile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>

<div 
  class="wrapper" 
  bind:this={wrapper}
>
  <div class="orbit-canvas">
    <OrbitCanvas radius={orbitRadius} />
    <div class="profile">
      <img {src} alt="Profile"/>
    </div>
  </div>
</div>

<svelte:window on:resize={updateSize} />


