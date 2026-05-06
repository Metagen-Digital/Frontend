<script setup lang="ts">
const { y: scrollY } = useWindowScroll()
const mobileMenuOpen = useState('mobileMenuOpen', () => false)
const { locale, toggleLocale, localeLabel } = useLocale()
const localePath = useLocalePath()
const { t } = useI18n()

const isScrolled = computed(() => scrollY.value > 50)

const navLinks = computed(() => [
  { labelKey: 'nav.home',      to: '/',                                        external: false },
  { labelKey: 'nav.about',     to: '/about',                                   external: false },
  { labelKey: 'nav.services',  to: '/services',                                external: false },
  { labelKey: 'nav.portfolio', to: '/portfolio',                               external: false },
  { labelKey: 'nav.blog',      to: '/blog',                                    external: false },
  { labelKey: 'nav.hosting',   to: 'https://hosting.metagendigital.com',       external: true  },
])

const route = useRoute()
const isActive = (path: string) => {
  if (path === '/') return route.path === '/' || route.path === '/bn'
  return route.path.startsWith(path) || route.path.startsWith('/bn' + path)
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
      <NuxtLink :to="localePath('/')" class="flex items-center" aria-label="MetaGenDigital home">
        <img
          src="/images/MetaGen-Logo.svg"
          alt="MetaGenDigital"
          class="h-8 md:h-9 w-auto"
        />
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-1" aria-label="Main navigation">
        <template v-for="link in navLinks" :key="link.to">
          <a
            v-if="link.external"
            :href="link.to"
            target="_blank"
            rel="noopener noreferrer"
            class="relative px-3 py-2 text-sm font-semibold text-brand-text-primary rounded-md group"
          >
            {{ t(link.labelKey) }}
            <span class="absolute bottom-0.5 left-3 right-3 h-0.5 bg-brand-primary rounded-full transition-all duration-250 origin-left scale-x-0 group-hover:scale-x-100" />
          </a>
          <NuxtLink
            v-else
            :to="localePath(link.to)"
            class="relative px-3 py-2 text-sm font-semibold text-brand-text-primary rounded-md group"
          >
            {{ t(link.labelKey) }}
            <span
              class="absolute bottom-0.5 left-3 right-3 h-0.5 bg-brand-primary rounded-full transition-all duration-250 origin-left"
              :class="isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
            />
          </NuxtLink>
        </template>
      </nav>

      <!-- CTA + Language Toggle + Mobile toggle -->
      <div class="flex items-center gap-2">
        <!-- Language Toggle -->
        <button
          class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200"
          :class="locale === 'bn'
            ? 'bg-brand-primary text-white border-brand-primary'
            : 'bg-transparent text-brand-text-secondary border-brand-border hover:border-brand-primary hover:text-brand-primary'"
          :aria-label="`Switch to ${locale === 'en' ? 'Bangla' : 'English'}`"
          @click="toggleLocale"
        >
          <Icon name="mdi:translate" class="w-3.5 h-3.5" aria-hidden="true" />
          <span>{{ localeLabel }}</span>
        </button>

        <NuxtLink
          :to="localePath('/contact')"
          class="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-brand rounded-btn hover:shadow-glow-primary hover:scale-105 transition-all duration-250 ease-spring"
        >
          {{ $t('nav.contactUs') }}
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
