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
  kind: 'ambient' | 'rainDrop' | 'rainSplash' | 'sunMote';
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife?: number;
  twinklePhase?: number;
};

type Cloud = {
  layer: 'back' | 'front';
  x: number;
  y: number;
  vx: number;
  width: number;
  height: number;
  alpha: number;
};

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationId = 0;
let particles: Particle[] = [];
let clouds: Cloud[] = [];
let spawnTicker = 0;
let currentType: ParticleType = 'clear';
let frameCounter = 0;
let sunMoteSprite: HTMLCanvasElement | null = null;
let cloudSprite: HTMLCanvasElement | null = null;

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

// 离屏预渲染一颗暖色光点，避免在每帧为每个粒子重复创建径向渐变
const createSunMoteSprite = () => {
  const sprite = document.createElement('canvas');
  const spriteSize = 64;
  sprite.width = spriteSize;
  sprite.height = spriteSize;

  const spriteCtx = sprite.getContext('2d');
  if (!spriteCtx) return sprite;

  const center = spriteSize / 2;
  const gradient = spriteCtx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, 'rgba(255, 250, 220, 1)');
  gradient.addColorStop(0.18, 'rgba(255, 236, 188, 0.85)');
  gradient.addColorStop(0.45, 'rgba(255, 214, 150, 0.32)');
  gradient.addColorStop(1, 'rgba(255, 214, 150, 0)');
  spriteCtx.fillStyle = gradient;
  spriteCtx.fillRect(0, 0, spriteSize, spriteSize);

  return sprite;
};

// 离屏预渲染一朵蓬松的云：用多层柔和径向渐变堆叠出"棉花糖"剪影
const createCloudSprite = () => {
  const sprite = document.createElement('canvas');
  const spriteWidth = 320;
  const spriteHeight = 160;
  sprite.width = spriteWidth;
  sprite.height = spriteHeight;

  const spriteCtx = sprite.getContext('2d');
  if (!spriteCtx) return sprite;

  const puffs = [
    { x: 0.18, y: 0.7, r: 0.32 },
    { x: 0.32, y: 0.5, r: 0.4 },
    { x: 0.48, y: 0.42, r: 0.46 },
    { x: 0.64, y: 0.48, r: 0.42 },
    { x: 0.8, y: 0.62, r: 0.34 },
    { x: 0.4, y: 0.74, r: 0.3 },
    { x: 0.62, y: 0.74, r: 0.3 },
  ];

  for (const puff of puffs) {
    const cx = puff.x * spriteWidth;
    const cy = puff.y * spriteHeight;
    const r = puff.r * spriteHeight;
    const gradient = spriteCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(0.45, 'rgba(240, 248, 255, 0.42)');
    gradient.addColorStop(1, 'rgba(220, 235, 255, 0)');
    spriteCtx.fillStyle = gradient;
    spriteCtx.fillRect(cx - r * 1.4, cy - r * 1.4, r * 2.8, r * 2.8);
  }

  return sprite;
};

const initClouds = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  clouds = [];

  // 后景云：更小更慢更淡，制造远景层次
  const backCount = 5;
  for (let i = 0; i < backCount; i++) {
    const scale = 0.55 + Math.random() * 0.4;
    clouds.push({
      layer: 'back',
      x: Math.random() * (width + 600) - 300,
      y: height * 0.02 + Math.random() * (height * 0.18),
      vx: 0.05 + Math.random() * 0.07,
      width: 280 * scale,
      height: 140 * scale,
      alpha: 0.18 + Math.random() * 0.14,
    });
  }

  // 前景云：稍大稍快稍清晰，但仍局限在视口顶部 0~35%，避开正文阅读区
  const frontCount = 4;
  for (let i = 0; i < frontCount; i++) {
    const scale = 0.85 + Math.random() * 0.55;
    clouds.push({
      layer: 'front',
      x: Math.random() * (width + 600) - 300,
      y: height * 0.05 + Math.random() * (height * 0.22),
      vx: 0.11 + Math.random() * 0.14,
      width: 280 * scale,
      height: 140 * scale,
      alpha: 0.3 + Math.random() * 0.2,
    });
  }
};

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

const handleResize = () => {
  resizeCanvas();
  // 视口变化后云朵的可视区随之改变，重新分布以避免出现在屏幕外的死角
  initClouds();
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

  if (currentType === 'clear') {
    const maxLife = 360 + Math.random() * 420;
    particles.push({
      kind: 'sunMote',
      x: Math.random() * width,
      y: Math.random() * height,
      vx: -0.18 + Math.random() * 0.36,
      vy: -0.35 - Math.random() * 0.25,
      size: 1.2 + Math.random() * 2.4,
      alpha: 0.28 + Math.random() * 0.32,
      life: maxLife,
      maxLife,
      twinklePhase: Math.random() * Math.PI * 2,
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

// 在屏幕右上角铺一层暖色阳光氛围：远离正文阅读区，整体低不透明度
const drawSunshineAmbience = () => {
  if (!ctx) return;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const sunX = width * 0.9;
  const sunY = height * 0.16;
  const haloRadius = Math.max(width, height) * 0.65;

  const halo = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, haloRadius);
  halo.addColorStop(0, 'rgba(255, 224, 158, 0.22)');
  halo.addColorStop(0.18, 'rgba(255, 212, 142, 0.12)');
  halo.addColorStop(0.5, 'rgba(255, 206, 140, 0.035)');
  halo.addColorStop(1, 'rgba(255, 206, 140, 0)');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, width, height);

  // 缓慢旋转的柔和光束，让画面有"晴日"的呼吸感
  const rayCount = 7;
  const rayLength = haloRadius;
  const rotation = frameCounter * 0.0006;
  ctx.save();
  ctx.translate(sunX, sunY);
  ctx.rotate(rotation);
  for (let i = 0; i < rayCount; i++) {
    const angle = (Math.PI * 2 * i) / rayCount;
    ctx.save();
    ctx.rotate(angle);
    const beam = ctx.createLinearGradient(0, 0, rayLength, 0);
    beam.addColorStop(0, 'rgba(255, 232, 178, 0.10)');
    beam.addColorStop(0.55, 'rgba(255, 220, 160, 0.035)');
    beam.addColorStop(1, 'rgba(255, 220, 160, 0)');
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(rayLength, -26);
    ctx.lineTo(rayLength, 26);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();

  // 太阳本体：轻微脉动
  const pulse = 1 + 0.04 * Math.sin(frameCounter * 0.025);
  const coreRadius = 70 * pulse;
  const core = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, coreRadius);
  core.addColorStop(0, 'rgba(255, 252, 226, 0.62)');
  core.addColorStop(0.45, 'rgba(255, 232, 178, 0.30)');
  core.addColorStop(1, 'rgba(255, 220, 160, 0)');
  ctx.fillStyle = core;
  ctx.fillRect(sunX - coreRadius, sunY - coreRadius, coreRadius * 2, coreRadius * 2);
};

// 多云氛围：顶部叠加一层冷调天空，再绘制前后两层缓慢漂移的云
// 云仅出现在视口顶部 0~35%，远离正文阅读区，整体 alpha 偏低，避免视觉干扰
const drawCloudyAmbience = () => {
  if (!ctx) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  // 顶部柔和天空：从浅蓝灰渐隐到透明，让云有"挂在天上"的归属感
  const skyHeight = height * 0.55;
  const skyGradient = ctx.createLinearGradient(0, 0, 0, skyHeight);
  skyGradient.addColorStop(0, 'rgba(180, 200, 226, 0.16)');
  skyGradient.addColorStop(0.55, 'rgba(196, 214, 234, 0.06)');
  skyGradient.addColorStop(1, 'rgba(196, 214, 234, 0)');
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, width, skyHeight);

  if (!cloudSprite) return;

  const renderCtx = ctx;
  const sprite = cloudSprite;

  // 先后景再前景，保证视差顺序正确
  const drawLayer = (layer: 'back' | 'front') => {
    for (const cloud of clouds) {
      if (cloud.layer !== layer) continue;

      cloud.x += cloud.vx;
      const halfWidth = cloud.width / 2;

      // 飘出右侧后从左侧重新进入，并随机化垂直位置，避免轨迹固化
      if (cloud.x - halfWidth > width + 40) {
        cloud.x = -halfWidth - Math.random() * 280;
        cloud.y =
          layer === 'back'
            ? height * 0.02 + Math.random() * (height * 0.18)
            : height * 0.05 + Math.random() * (height * 0.22);
      }

      renderCtx.globalAlpha = cloud.alpha;
      renderCtx.drawImage(
        sprite,
        cloud.x - halfWidth,
        cloud.y - cloud.height / 2,
        cloud.width,
        cloud.height
      );
    }
  };

  drawLayer('back');
  drawLayer('front');
  renderCtx.globalAlpha = 1;
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

  if (particle.kind === 'sunMote') {
    const maxLife = particle.maxLife ?? particle.life;
    const fadeOut = Math.min(1, particle.life / 60);
    const fadeIn = Math.min(1, (maxLife - particle.life) / 40);
    const twinkle = 0.55 + 0.45 * Math.sin(frameCounter * 0.06 + (particle.twinklePhase ?? 0));
    const finalAlpha = particle.alpha * fadeIn * fadeOut * twinkle;

    if (finalAlpha <= 0.01) return;

    if (sunMoteSprite) {
      const drawSize = particle.size * 7;
      ctx.globalAlpha = finalAlpha;
      ctx.drawImage(
        sunMoteSprite,
        particle.x - drawSize / 2,
        particle.y - drawSize / 2,
        drawSize,
        drawSize
      );
      ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = `rgba(255, 244, 200, ${finalAlpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }
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

  if (particle.kind === 'sunMote') {
    if (particle.x < -20) particle.x = window.innerWidth + 20;
    if (particle.x > window.innerWidth + 20) particle.x = -20;
    if (particle.y < -20) {
      particle.y = window.innerHeight + 20;
      particle.x = Math.random() * window.innerWidth;
    }
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
  frameCounter += 1;

  if (currentType === 'clear') {
    drawSunshineAmbience();
  } else if (currentType === 'cloudy') {
    drawCloudyAmbience();
  }

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
              : currentType === 'clear'
                ? 0.5
                : currentType === 'cloudy'
                  ? 0.15
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

  sunMoteSprite = createSunMoteSprite();
  cloudSprite = createCloudSprite();
  resizeCanvas();
  initClouds();
  syncGlobalWeatherType();
  render();

  window.addEventListener('resize', handleResize);
  window.addEventListener('weather:change', handleWeatherChange as EventListener);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', handleResize);
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
