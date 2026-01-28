<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <p :data-text="text">{{ text }}</p>
</template>

<style scoped>
p {
  --color: #000;
  --shadow-stroke: 2px;
  --shadow-stroke-gap: 3;
  --shadow-rotate: -45deg;
  --shadow-color: #aaa;

  position: relative;
  color: transparent;
  font-size: 200px;
  text-align: center;
  line-height: 180px;
  font-family: 'DM Serif Text', serif;
  background: repeating-linear-gradient(
    var(--shadow-rotate),
    var(--shadow-color),
    var(--shadow-color) var(--shadow-stroke),
    transparent var(--shadow-stroke),
    transparent calc(var(--shadow-stroke) * var(--shadow-stroke-gap))
  );

  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-stroke: 2px;
}

p::before {
  content: attr(data-text);
  position: absolute;
  color: transparent;
  background: var(--color);
  -webkit-text-stroke: 10px;
  left: -10px;
  top: -10px;
  background-clip: text;
  -webkit-background-clip: text;
}
</style>
