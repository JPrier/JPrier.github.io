<script lang="ts">
  import Orbit from './Orbit.svelte';
  export let shape: 'circle' | 'pill' = 'circle';
  export let src: string = '/me.JPG';
  let radius: number;
  $: radius = shape === 'circle' ? 100 : 50;
</script>

<div class={`profile-container ${shape}`}>
  <div class="orbit-wrapper">
    <Orbit radius={radius} />
  </div>
  <img {src} alt="Profile" class="profile-image" />
</div>

<style>
  .profile-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-right: 0.5rem;
    transition: border-radius 0.4s ease, width 0.4s ease, height 0.4s ease;
  }
  .profile-container.circle {
    width: 160px;
    height: 160px;
    border-radius: 50%;
  }
  .profile-container.pill {
    width: 64px;
    height: 32px;
    border-radius: 999px;
  }
  .profile-image {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
  .orbit-wrapper {
    position: absolute;
    top: -20px;
    left: -20px;
    width: calc(100% + 40px);
    height: calc(100% + 40px);
    pointer-events: none;
    z-index: 0;
  }
  .orbit-wrapper :global(canvas) {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
