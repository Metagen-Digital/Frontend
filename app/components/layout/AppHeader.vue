<script setup lang="ts">
const { y: scrollY } = useWindowScroll()
const mobileMenuOpen = useState('mobileMenuOpen', () => false)

const isScrolled = computed(() => scrollY.value > 50)

const navLinks = [
  { label: 'Home',      to: '/' },
  { label: 'About',     to: '/about' },
  { label: 'Services',  to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing',   to: '/pricing' },
  { label: 'Blog',      to: '/blog' },
  { label: 'Contact',   to: '/contact' },
]

const route = useRoute()
const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-[100] transition-all duration-250 ease-in-out"
    :class="isScrolled
      ? 'bg-white/95 backdrop-blur-md shadow-header border-b border-brand-border'
      : 'bg-white/80 backdrop-blur-sm'"
  >
    <div class="container-content flex items-center justify-between h-16 md:h-20">
      <!-- Logo — dark version for light bg -->
      <NuxtLink to="/" class="flex items-center" aria-label="MetaGenDigital home">
        <img
          src="/images/MetaGen-Logo.svg"
          alt="MetaGenDigital"
          class="h-8 md:h-9 w-auto"
        />
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-1" aria-label="Main navigation">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="relative px-3 py-2 text-sm font-medium transition-colors duration-150 rounded-md group"
          :class="isActive(link.to)
            ? 'text-brand-text-primary'
            : 'text-brand-text-secondary hover:text-brand-text-primary'"
        >
          {{ link.label }}
          <!-- Active/hover underline -->
          <span
            class="absolute bottom-0.5 left-3 right-3 h-0.5 bg-brand-primary rounded-full transition-all duration-250 origin-left"
            :class="isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
          />
        </NuxtLink>
      </nav>

      <!-- CTA + mobile toggle -->
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/contact"
          class="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-brand rounded-btn hover:shadow-glow-primary hover:scale-105 transition-all duration-250 ease-spring"
        >
          Get a Quote
          <Icon name="mdi:arrow-right" class="w-4 h-4" aria-hidden="true" />
        </NuxtLink>

        <!-- Mobile hamburger -->
        <button
          class="lg:hidden p-2 text-brand-text-secondary hover:text-brand-text-primary transition-colors duration-150 rounded-md"
          :aria-label="mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          @click="toggleMenu"
        >
          <Icon
            :name="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'"
            class="w-6 h-6"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </header>
</template>
