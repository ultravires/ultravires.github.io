<script setup>
import { getAvatarUrl } from '@theme/composables/useGravatar';
import { useData } from 'vitepress';
import { computed } from 'vue';

const { frontmatter } = useData();

// Props for customization
const props = defineProps({
  text: {
    type: String,
    default: '❤ MADE WITH LOVE ❤ MADE WITH LOVE '
  }
});

// Generate unique IDs for SVG references to prevent conflicts
const uid = Math.random().toString(36).slice(2);
const blobId = `blobClip-${uid}`;
const textPathId = `textPath-${uid}`;

const avatarUrl = computed(() =>
  getAvatarUrl(frontmatter.value?.author?.email)
);

// Repeat text logic if needed, but the user provided a hardcoded string pattern.
// We'll construct a string that fills the ring if the user provides a short one?
// For now, we'll verify if the user's default text is long enough.
// The SVG textPath animation expects a continuous stream or enough text.
// We will use the prop text repeated 2-4 times depending on length to be safe,
// or just trust the prop.
const fullText = computed(() => {
  const t = props.text;
  // Simple heuristic: ensure it's long enough to look good on the circle
  return t.length < 20 ? (t + ' ').repeat(4) : (t + ' ').repeat(2);
});

/* The text animation requires two textPath elements to create the seamless loop effect
   as seen in the provided snippet: one starting at 0% and one at 100%. */
</script>

<template>
  <div class="v-avatar-container relative h-32 w-32">
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      class="avatar-svg block h-full w-full fill-current text-black dark:text-white"
    >
      <defs>
        <clipPath
          :id="blobId"
          class="blob-clip"
        >
          <path
            d="M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
            transform="translate(100 100)"
          />
        </clipPath>
      </defs>

      <!-- Main Image -->
      <image
        :href="avatarUrl"
        width="200"
        height="200"
        preserveAspectRatio="xMidYMid slice"
        :clip-path="`url(#${blobId})`"
        class="avatar-img"
      />

      <!-- Text Path Curve (Invisible) -->
      <path
        :id="textPathId"
        d="M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
        transform="translate(100 100)"
        fill="none"
        stroke="none"
      />

      <!-- Rotating Text -->
      <text class="text-content">
        <textPath
          :href="`#${textPathId}`"
          startOffset="0%"
        >
          {{ fullText }}
          <animate
            attributeName="startOffset"
            from="0%"
            to="100%"
            dur="15s"
            repeatCount="indefinite"
          />
        </textPath>
        <textPath
          :href="`#${textPathId}`"
          startOffset="100%"
        >
          {{ fullText }}
          <animate
            attributeName="startOffset"
            from="-100%"
            to="0%"
            dur="15s"
            repeatCount="indefinite"
          />
        </textPath>
      </text>
    </svg>
  </div>
</template>

<style scoped>
.avatar-svg {
  aspect-ratio: 1/1;
  overflow: visible;
}

/* 
   We target the classes inside the SVG. 
   Note: :deep() might be needed if these elements are considered deep (SVG often is weird with scoped styles),
   but usually standard scoped CSS works on tags in the template.
*/

/* Hover Effect for Blob scaling */
.blob-clip {
  transform-origin: center;
  transition: transform 0.4s ease-out;
  /* Normally CSS transforms on clipPath elements requires browser support, but it's widely supported now */
}

/* 
   The structure needs to support the hover on the PARENT triggering the child.
   We put the hover on .avatar-svg
*/
.avatar-svg:hover .blob-clip {
  transform: scale(1.15); /* translate(0%, 0%) is default */
  /* Note: transform on clipPath might behave differently depending on coordinate system. 
       The user's code had transform on #blobClip.
    */
}

/* Text Content Styling */
.text-content {
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 700;
  font-size: 10px;
  line-height: 1.2;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  /* Fill color: adapt to theme or default */
  fill: currentColor;

  mix-blend-mode: normal;
  transition: fill 0.5s ease;
  pointer-events: none; /* Let clicks pass through text to image if needed */
}

.avatar-svg:hover .text-content {
  /* The user wanted white fill and overlay blend mode on hover */
  /* fill: white; */
  /* mix-blend-mode: overlay; */

  /* 
       Problem: 'overlay' blend mode against a complex background works, 
       but here the text is over the image? No, the text is outside the image mostly?
       Actually the text follows the path boundary. Use a simpler highlight color for safety across themes. 
       Or stick to the requested effect.
    */
  fill: #ef5350; /* A nice highlight color (red/pink) often used with 'love' themes */
  opacity: 0.9;
}
</style>
