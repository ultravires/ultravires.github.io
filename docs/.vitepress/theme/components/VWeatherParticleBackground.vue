<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

type ParticleType =
  | 'clear'
  | 'cloudy'
  | 'drizzle'
  | 'rainModerate'
  | 'rainHeavy'
  | 'snow'
  | 'fog'
  | 'thunder';

type Particle = {
  kind: 'ambient' | 'rainDrop' | 'rainSplash';
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
};

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationId = 0;
let particles: Particle[] = [];
let spawnTicker = 0;
let currentType: ParticleType = 'clear';

const getCurrentPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('geolocation-not-supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5 * 60 * 1000,
    });
  });

const isRainType = (type: ParticleType) =>
  type === 'drizzle' || type === 'rainModerate' || type === 'rainHeavy';

const createRainSplashes = (x: number, y: number) => {
  if (!isRainType(currentType)) return;

  const splashCount = currentType === 'drizzle' ? 1 : currentType === 'rainModerate' ? 2 : 3;
  const splashSize = currentType === 'drizzle' ? 0.9 : currentType === 'rainModerate' ? 1.2 : 1.6;
  const splashAlpha = currentType === 'drizzle' ? 0.22 : currentType === 'rainModerate' ? 0.3 : 0.38;

  for (let i = 0; i < splashCount; i++) {
    const direction = Math.random() < 0.5 ? -1 : 1;
    particles.push({
      kind: 'rainSplash',
      x,
      y,
      vx: (0.35 + Math.random() * 0.8) * direction,
      vy: -(0.8 + Math.random() * 1.6),
      size: splashSize + Math.random() * 1.4,
      alpha: splashAlpha + Math.random() * 0.2,
      life: 10 + Math.random() * 10,
    });
  }
};

const getTypeByWeatherCode = (code: number): ParticleType => {
  if ([95, 96, 99].includes(code)) return 'thunder';
  if ([45, 48].includes(code)) return 'fog';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if ([51, 56, 61, 66, 80].includes(code)) return 'drizzle';
  if ([53, 57, 63, 81].includes(code)) return 'rainModerate';
  if ([55, 65, 67, 82].includes(code)) return 'rainHeavy';
  if ([1, 2, 3].includes(code)) return 'cloudy';
  return 'clear';
};

const resizeCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas || !ctx) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

const spawnParticle = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (isRainType(currentType)) {
    const rainStyle =
      currentType === 'drizzle'
        ? {
            vxMin: -0.45,
            vxMax: -0.2,
            vyMin: 3,
            vyMax: 4.4,
            sizeMin: 8,
            sizeMax: 13,
            alphaMin: 0.16,
            alphaMax: 0.28,
          }
        : currentType === 'rainModerate'
          ? {
              vxMin: -0.65,
              vxMax: -0.3,
              vyMin: 4.5,
              vyMax: 6,
              sizeMin: 11,
              sizeMax: 17,
              alphaMin: 0.24,
              alphaMax: 0.4,
            }
          : {
              vxMin: -0.9,
              vxMax: -0.45,
              vyMin: 6.2,
              vyMax: 8.5,
              sizeMin: 13,
              sizeMax: 22,
              alphaMin: 0.32,
              alphaMax: 0.55,
            };

    particles.push({
      kind: 'rainDrop',
      x: Math.random() * width,
      y: -20,
      vx: rainStyle.vxMin + Math.random() * (rainStyle.vxMax - rainStyle.vxMin),
      vy: rainStyle.vyMin + Math.random() * (rainStyle.vyMax - rainStyle.vyMin),
      size: rainStyle.sizeMin + Math.random() * (rainStyle.sizeMax - rainStyle.sizeMin),
      alpha: rainStyle.alphaMin + Math.random() * (rainStyle.alphaMax - rainStyle.alphaMin),
      life: height + 40,
    });
    return;
  }

  if (currentType === 'snow') {
    particles.push({
      kind: 'ambient',
      x: Math.random() * width,
      y: -8,
      vx: -0.4 + Math.random() * 0.8,
      vy: 0.8 + Math.random() * 1.6,
      size: 1 + Math.random() * 2.5,
      alpha: 0.25 + Math.random() * 0.45,
      life: height + 20,
    });
    return;
  }

  particles.push({
    kind: 'ambient',
    x: Math.random() * width,
    y: Math.random() * height,
    vx: -0.2 + Math.random() * 0.4,
    vy: -0.2 + Math.random() * 0.4,
    size: 1 + Math.random() * 3,
    alpha: 0.12 + Math.random() * 0.2,
    life: 200 + Math.random() * 260,
  });
};

const drawParticle = (particle: Particle) => {
  if (!ctx) return;

  if (particle.kind === 'rainDrop') {
    const lineWidth = currentType === 'drizzle' ? 0.8 : currentType === 'rainModerate' ? 1.2 : 1.8;
    ctx.strokeStyle = `rgba(125, 177, 255, ${particle.alpha})`;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(particle.x, particle.y);
    ctx.lineTo(particle.x + particle.vx * particle.size, particle.y + particle.size);
    ctx.stroke();
    return;
  }

  if (particle.kind === 'rainSplash') {
    ctx.fillStyle = `rgba(160, 210, 255, ${particle.alpha})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  const color =
    currentType === 'fog'
      ? `rgba(180, 188, 202, ${particle.alpha})`
      : currentType === 'cloudy'
        ? `rgba(168, 190, 220, ${particle.alpha})`
        : `rgba(140, 196, 255, ${particle.alpha})`;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fill();
};

const updateParticle = (particle: Particle) => {
  const screenHeight = window.innerHeight;

  if (particle.kind === 'rainDrop') {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life -= 1;

    const groundY = screenHeight - (6 + Math.random() * 12);
    if (particle.y >= groundY) {
      createRainSplashes(particle.x, groundY);
      particle.life = 0;
    }
    return;
  }

  particle.x += particle.vx;
  particle.y += particle.vy;
  particle.life -= 1;

  if (particle.kind === 'rainSplash') {
    particle.vy += 0.06;
    particle.alpha *= 0.93;
    return;
  }

  if (currentType === 'clear' || currentType === 'cloudy' || currentType === 'fog') {
    if (particle.x < -10) particle.x = window.innerWidth + 10;
    if (particle.x > window.innerWidth + 10) particle.x = -10;
    if (particle.y < -10) particle.y = window.innerHeight + 10;
    if (particle.y > window.innerHeight + 10) particle.y = -10;
  }
};

const render = () => {
  if (!ctx) return;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  const spawnRate =
    currentType === 'drizzle'
      ? 5.5
      : currentType === 'rainModerate'
        ? 8.5
        : currentType === 'rainHeavy'
          ? 12
          : currentType === 'snow'
            ? 3
            : currentType === 'fog'
              ? 1.4
              : 0.8;

  spawnTicker += spawnRate;
  while (spawnTicker >= 1) {
    spawnParticle();
    spawnTicker -= 1;
  }

  particles = particles.filter((particle) => {
    updateParticle(particle);
    drawParticle(particle);
    return (
      particle.life > 0 &&
      particle.y < window.innerHeight + 40 &&
      particle.x > -40 &&
      particle.x < window.innerWidth + 40 &&
      particle.alpha > 0.02
    );
  });

  if (currentType === 'thunder' && Math.random() < 0.002) {
    ctx.fillStyle = 'rgba(230, 240, 255, 0.12)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }

  animationId = requestAnimationFrame(render);
};

const handleWeatherChange = (event: Event) => {
  const customEvent = event as CustomEvent<{ weatherCode?: number }>;
  const weatherCode = customEvent.detail?.weatherCode;
  if (typeof weatherCode !== 'number') return;

  currentType = getTypeByWeatherCode(weatherCode);
  particles = [];
};

const syncGlobalWeatherType = async () => {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code&timezone=auto`
    );

    if (!weatherResponse.ok) return;

    const weatherData = await weatherResponse.json();
    const weatherCode = weatherData?.current?.weather_code;
    if (typeof weatherCode !== 'number') return;

    currentType = getTypeByWeatherCode(weatherCode);
    particles = [];
  } catch {
    // 背景效果获取失败时静默降级为默认粒子，避免影响页面功能
  }
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  ctx = canvas.getContext('2d');
  if (!ctx) return;

  resizeCanvas();
  syncGlobalWeatherType();
  render();

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('weather:change', handleWeatherChange as EventListener);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resizeCanvas);
  window.removeEventListener('weather:change', handleWeatherChange as EventListener);
});
</script>

<template>
  <canvas
    ref="canvasRef"
    class="weather-particle-canvas"
    aria-hidden="true"
  />
</template>

<style scoped>
.weather-particle-canvas {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.75;
}
</style>
