<script lang="ts">
  import Orbit from './Orbit.svelte';
  export let shape: 'circle' | 'pill' = 'circle';
  export let src: string = '/me.JPG';
  const circleSize = 160;
  const orbitRadius = circleSize / 2;
</script>

<div class="orbit-container {shape}">
  <Orbit class="orbit-canvas" radius={orbitRadius} />
  <img {src} alt="Profile image" class="profile-img {shape}" />
</div>

<style>
.orbit-container {
  position: relative;
  flex-shrink: 0;
}

.orbit-container.circle {
  width: 160px;
  height: 160px;
}

.orbit-container.pill {
  width: 120px;
  height: 40px;
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
  box-sizing: border-box;
}

.profile-img.circle {
  width: 120px;
  height: 120px;
  padding: 6px;
  border-radius: 50%;
}

.profile-img.pill {
  width: 120px;
  height: 40px;
  padding: 2px;
  border-radius: 9999px;
}
</style>
