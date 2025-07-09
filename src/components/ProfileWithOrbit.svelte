<script>
  import Orbit from './Orbit.svelte';
  export let shape = 'circle';
</script>

<div class={`profile-container ${shape}`}>
  <img src="/me.JPG" alt="Profile" class="profile-image" />
  <Orbit class="orbit-canvas" radius={100} />
</div>

<style>
.profile-container {
  position: relative;
  transition: border-radius 0.4s ease, width 0.4s ease, height 0.4s ease;
}
.profile-container.circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.profile-container.pill {
  width: 300px;
  height: 150px;
  border-radius: 100px;
}
.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
.orbit-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
