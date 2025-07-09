<script lang="ts">
  import Orbit from './Orbit.svelte';
  export let shape: 'circle' | 'pill' = 'circle';
  export let src: string = '/me.JPG';
  const containerSize = 200;
  const orbitRadius = containerSize / 2;
</script>

<div class="orbit-container" style="width:{containerSize}px;height:{containerSize}px;">
  <Orbit class="orbit-canvas" radius={orbitRadius} />
  <img {src} alt="Profile image" class="profile-img {shape}" />
</div>

<style>
.orbit-container {
  position: relative;
  flex-shrink: 0;
}

.orbit-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.profile-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;
  object-fit: cover;
}

.profile-img.circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.profile-img.pill {
  width: 160px;
  height: 80px;
  border-radius: 9999px;
}
</style>
