<script lang="ts">
  import Orbit from './Orbit.svelte';
  export let shape: 'circle' | 'pill' = 'circle';
  export let src: string = '/me.JPG';
  let radius: number;
  $: radius = shape === 'circle' ? 120 : 60;
</script>

<div class={`profile-container ${shape}`} style={`--radius:${radius}px`}>
  <Orbit class="orbit" radius={radius} />
  <img {src} alt="Profile" class="profile-image" />
</div>

<style>
  .profile-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: var(--width);
    height: var(--height);
    margin-right: calc(var(--radius) - (var(--width) / 2));
    transition: width 0.4s ease, height 0.4s ease, border-radius 0.4s ease,
      margin-right 0.4s ease;
  }
  .profile-container.circle {
    --width: 160px;
    --height: 160px;
    border-radius: 50%;
  }
  .profile-container.pill {
    --width: 80px;
    --height: 40px;
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
  .orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(var(--radius) * 2);
    height: calc(var(--radius) * 2);
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 0;
  }
  .orbit :global(canvas) {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
