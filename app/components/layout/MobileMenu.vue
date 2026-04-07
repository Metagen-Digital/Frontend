<script setup lang="ts">
const mobileMenuOpen = useState('mobileMenuOpen', () => false)

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

// Close on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

// Prevent body scroll when menu is open
watch(mobileMenuOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-250"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-250"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm lg:hidden"
        aria-hidden="true"
        @click="mobileMenuOpen = false"
      />
    </Transition>

    <!-- Slide-in panel -->
    <Transition
      enter-active-class="transition-transform duration-250 ease-spring"
      enter-from-class="translate-x-full"
      leave-active-class="transition-transform duration-250 ease-spring"
      leave-to-class="translate-x-full"
    >
      <nav
        v-if="mobileMenuOpen"
        id="mobile-menu"
        class="fixed top-0 right-0 bottom-0 z-[300] w-4/5 max-w-sm bg-white border-l border-brand-border flex flex-col lg:hidden shadow-card-hover"
        aria-label="Mobile navigation"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 h-16 border-b border-brand-border">
          <img src="/images/MetaGen-Logo.svg" alt="MetaGenDigital" class="h-7 w-auto" />
          <button
            class="p-2 text-brand-text-secondary hover:text-white transition-colors duration-150 rounded-md"
            aria-label="Close navigation menu"
            @click="mobileMenuOpen = false"
          >
            <Icon name="mdi:close" class="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <!-- Links -->
        <div class="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <NuxtLink
            v-for="(link, i) in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 px-4 py-3 rounded-card text-base font-medium transition-all duration-150"
            :class="$route.path === link.to || ($route.path.startsWith(link.to) && link.to !== '/')
              ? 'bg-brand-card text-white border border-brand-orange/30'
              : 'text-brand-text-secondary hover:bg-brand-card hover:text-white'"
            :style="{ animationDelay: `${i * 50}ms` }"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <!-- CTA -->
        <div class="px-4 py-6 border-t border-brand-border">
          <NuxtLink
            to="/contact"
            class="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-white bg-gradient-brand rounded-btn hover:shadow-glow-orange transition-all duration-250"
            @click="mobileMenuOpen = false"
          >
            Get a Quote
            <Icon name="mdi:arrow-right" class="w-4 h-4" aria-hidden="true" />
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </Teleport>
</template>
