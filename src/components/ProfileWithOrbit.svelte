<script lang="ts">
  import Orbit from './Orbit.svelte';
  export let shape: 'circle' | 'pill' = 'circle';
  export let src: string = '/me.JPG';
  let radius = 60;
</script>

<div class={`profile-container ${shape}`}>
  <img {src} alt="Profile" class="profile-image" />
  <div class="orbit-wrapper">
    <Orbit radius={radius} />
  </div>
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
    width: 80px;
    height: 40px;
    border-radius: 999px;
  }
  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
  .orbit-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .orbit-wrapper :global(canvas) {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
