<script setup lang="ts">
const route = useRoute();
const { y: scrollY } = useWindowScroll();

const maxScrollable = ref(0);
let resizeObserver: ResizeObserver | null = null;

const updateMaxScrollable = () => {
  if (typeof window === "undefined") return;

  const body = document.body;
  const docEl = document.documentElement;
  const docHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    body.clientHeight,
    docEl.scrollHeight,
    docEl.offsetHeight,
    docEl.clientHeight,
  );

  maxScrollable.value = Math.max(docHeight - window.innerHeight, 0);
};

const progress = computed(() => {
  if (maxScrollable.value <= 0) return 0;
  const raw = (scrollY.value / maxScrollable.value) * 100;
  return Math.min(Math.max(raw, 0), 100);
});

onMounted(() => {
  updateMaxScrollable();

  window.addEventListener("resize", updateMaxScrollable, { passive: true });
  window.addEventListener("load", updateMaxScrollable, { passive: true });

  resizeObserver = new ResizeObserver(() => updateMaxScrollable());
  resizeObserver.observe(document.documentElement);
  resizeObserver.observe(document.body);

  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    resizeObserver.observe(mainContent);
  }
});

watch(
  () => route.fullPath,
  async () => {
    await nextTick();
    requestAnimationFrame(updateMaxScrollable);
  },
);

watch(scrollY, (y) => {
  if (y > maxScrollable.value) {
    updateMaxScrollable();
  }
});

onBeforeUnmount(() => {
  if (typeof window === "undefined") return;
  window.removeEventListener("resize", updateMaxScrollable);
  window.removeEventListener("load", updateMaxScrollable);
  resizeObserver?.disconnect();
});
</script>

<template>
  <div
    class="fixed top-0 left-0 z-[550] h-1 rounded-r-full bg-brand-cyan transition-[width] duration-100 ease-out"
    :style="{ width: `${progress}%` }"
    aria-hidden="true"
  />
</template>
