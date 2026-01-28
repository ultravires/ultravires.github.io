<template>
  <div
    ref="container"
    class="glsl-banner-container"
  >
    <canvas ref="canvasEl"></canvas>
    <div class="banner-content">
      <slot></slot>
    </div>
    <v-wave />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import VWave from './VWave.vue';

const props = defineProps({
  speed: { type: Number, default: 1.0 },
  overlayOpacity: { type: Number, default: 0.5 } // 控制内容层背景深度
});

const container = ref(null);
const canvasEl = ref(null);
let gl, program, animationFrame;
let start = performance.now();

// --- 着色器源码 ---
const vertSrc = `
  attribute vec2 pos;
  void main() { gl_Position = vec4(pos, 0.0, 1.0); }
`;

const fragSrc = `
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time;
  uniform float u_speed;
  void main() {
    vec2 FC = gl_FragCoord.xy;
    float t = u_time * u_speed;
    vec2 r = u_res;
    vec2 p = (FC * 2.0 - r) / r.y;
    vec3 c = vec3(0.0);
    for (float i = 0.0; i < 42.0; i++) {
      float a = i / 1.5 + t * 0.5;
      vec2 q = p;
      q.x = q.x + sin(q.y * 19.0 + t * 2.0 + i) * 29.0 * smoothstep(0.0, -2.0, q.y);
      float d = length(q - vec2(cos(a), sin(a)) * (0.4 * smoothstep(0.0, 0.5, -q.y)));
      c = c + vec3(0.34, 0.30, 0.24) * (0.015 / d);
    }
    vec3 col = c * c + 0.05;
    gl_FragColor = vec4(col, 1.0);
  }
`;

// --- WebGL 逻辑 ---
const initGL = () => {
  const canvas = canvasEl.value;
  gl = canvas.getContext('webgl');
  if (!gl) return;

  const compile = (src, type) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };

  const vs = compile(vertSrc, gl.VERTEX_SHADER);
  const fs = compile(fragSrc, gl.FRAGMENT_SHADER);
  program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.useProgram(program);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );

  const posLoc = gl.getAttribLocation(program, 'pos');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
};

const resize = () => {
  if (!canvasEl.value || !container.value) return;
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = container.value.getBoundingClientRect();
  canvasEl.value.width = width * dpr;
  canvasEl.value.height = height * dpr;
  gl.viewport(0, 0, canvasEl.value.width, canvasEl.value.height);
};

const draw = () => {
  const now = performance.now();
  const t = (now - start) * 0.001;

  const uRes = gl.getUniformLocation(program, 'u_res');
  const uTime = gl.getUniformLocation(program, 'u_time');
  const uSpeed = gl.getUniformLocation(program, 'u_speed');

  gl.uniform2f(uRes, canvasEl.value.width, canvasEl.value.height);
  gl.uniform1f(uTime, t);
  gl.uniform1f(uSpeed, props.speed);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
  animationFrame = requestAnimationFrame(draw);
};

onMounted(() => {
  initGL();
  resize();
  window.addEventListener('resize', resize);
  draw();
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
  cancelAnimationFrame(animationFrame);
});
</script>

<style scoped>
.glsl-banner-container {
  position: relative;
  width: 100%;
  height: 60vh; /* Banner 默认高度 */
  min-height: 400px;
  overflow: hidden;
  background: #000;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.banner-content {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 允许内容区域有轻微的渐变遮罩，提高文字可读性 */
  background: radial-gradient(circle, transparent 20%, rgba(0, 0, 0, 0.3) 100%);
}
</style>
