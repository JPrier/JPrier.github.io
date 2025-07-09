<!-- OrbitAnimation.svelte -->
<script lang="ts">
import { onMount, onDestroy } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let frameId: number;

  export let radius = 300;
  let currentRadius = radius;

  let innerRadius: number;// = radius *.4;
  let outerRadius: number;// = radius*.45;
  let maxOuterRadius: number;
  let innerCircleAmt: number;// = Math.max(10, innerRadius/10);
  let outerCircleAmt: number;// = Math.max(20, outerRadius/10);
  const ballSize = 10;
  const indexTotal = 1000;
  const speed = 0.2;
  let lineDistance: number;// = 250;
  let fadeDistance: number;// = 200;
  const spreadSpeed = 0.1;
  let maxLines: number;// = Math.floor(outerCircleAmt / 2);

  let piIndex: number;// = (Math.PI * 2) / indexTotal;
  let oL = false;

  class Ball {
    inner: boolean;
    r: number;
    i: number;
    x = 0;
    y = 0;
    lines = 0;

    constructor(r: number, idx: number, inner: boolean) {
      this.inner = inner;
      this.r = r;
      this.i = idx * (indexTotal / (inner ? innerCircleAmt : outerCircleAmt));
      this.updatePos();
    }

    update() {
      if (this.inner) {
        this.i = this.i < indexTotal ? this.i + speed : 0;
        this.updatePos();
        this.lines = 0;
        return;
      }

      this.i = this.i > -indexTotal ? this.i - speed : 0;

      if (this.r > maxOuterRadius || oL) {
        this.r -= spreadSpeed;
        oL = !(this.r <= outerRadius);
      } else {
        this.r += spreadSpeed;
      }

      this.updatePos();
      this.lines = 0;
    }

    updatePos() {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      this.x = cx + this.r * Math.sin(piIndex * this.i);
      this.y = cy + this.r * Math.cos(piIndex * this.i);
    }

    draw() {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.x, this.y, ballSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    drawLines(others: Ball[]) {
      // Sort potential connections by distance to prioritize closer ones
      const connections = [];
      for (const other of others) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dist = Math.hypot(dx, dy);
        if (dist < ballSize) continue;
        if (dist > lineDistance) continue;
        connections.push({ other, dist });
      }
      
      // Sort by distance (closest first)
      connections.sort((a, b) => a.dist - b.dist);
      
      // Draw lines up to maxLines, prioritizing closest connections
      for (let i = 0; i < Math.min(connections.length, maxLines); i++) {
        const { other, dist } = connections[i];
        
        // Calculate opacity based on distance
        let opacity = 1;
        if (dist > fadeDistance) {
          opacity = 1 - (dist - fadeDistance) / (lineDistance - fadeDistance);
        }
        if (opacity <= 0) continue; // Skip if fully faded
        ctx.strokeStyle = 'rgba(255,255,255,' + opacity + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
        this.lines++;
      }
    }
  }

  const innerBalls: Ball[] = [];
  const outerBalls: Ball[] = [];

  function init() {
    let diameter = radius * 2;
    canvas.width = diameter;
    canvas.height = diameter;
    piIndex = (Math.PI * 2) / indexTotal;
    innerRadius = radius*.6;
    outerRadius = radius*.7;
    maxOuterRadius = Math.min(radius-ballSize,outerRadius*1.2);
    outerCircleAmt = Math.floor(Math.min(40, Math.max(20, outerRadius/5)));
    innerCircleAmt = Math.floor(Math.min(20, Math.max(10, innerRadius/5)));
    maxLines = Math.floor((outerCircleAmt+innerCircleAmt) / 6);
    lineDistance = radius * 0.7;
    fadeDistance = radius * 0.3;

    console.log('resize', {
      diameter,
      innerRadius,
      outerRadius,
      maxOuterRadius,
      innerCircleAmt,
      outerCircleAmt,
      lineDistance,
      fadeDistance,
      maxLines
    });
  }

  function setup() {
    innerBalls.length = 0;
    outerBalls.length = 0;
    init();

    for (let i = 0; i < innerCircleAmt; i++) {
      innerBalls.push(new Ball(innerRadius, i, true));
    }
    for (let i = 0; i < outerCircleAmt; i++) {
      outerBalls.push(new Ball(outerRadius, i, false));
    }
  }

  function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    innerBalls.forEach(b => {
      b.update();
      b.draw();
      b.drawLines(outerBalls);
    });

    outerBalls.forEach(b => {
      b.update();
      b.draw();
      // Also draw lines from outer balls to inner balls for better coverage
      b.drawLines(innerBalls);
    });

    frameId = requestAnimationFrame(drawLoop);
  }

  onMount(() => {
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get canvas context');
    }
    ctx = context;
    setup();

    drawLoop();
  });

  $: if (ctx && radius !== currentRadius) {
    currentRadius = radius;
    setup();
  }

  onDestroy(() => {
    typeof cancelAnimationFrame!=="undefined" && cancelAnimationFrame(frameId);
  });
</script>

<style>
  canvas {
    display: block;
  }
</style><canvas bind:this={canvas} style="display:block;"></canvas>
