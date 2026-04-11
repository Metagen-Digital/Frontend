<script setup lang="ts">
const mobileMenuOpen = useState("mobileMenuOpen", () => false);

const navLinks = [
  { label: "Home", to: "/", icon: "mdi:home-outline" },
  { label: "About", to: "/about", icon: "mdi:account-group-outline" },
  { label: "Services", to: "/services", icon: "mdi:briefcase-outline" },
  { label: "Portfolio", to: "/portfolio", icon: "mdi:folder-star-outline" },
  { label: "Blog", to: "/blog", icon: "mdi:notebook-outline" },
  { label: "Contact", to: "/contact", icon: "mdi:message-outline" },
];

const socialLinks = [
  {
    icon: "mdi:facebook",
    href: "https://www.facebook.com/MetagenDigital",
    label: "Facebook",
    hoverClass: "hover:bg-[#4c76be]",
  },
  {
    icon: "mdi:instagram",
    href: "https://www.instagram.com/MetagenDigital",
    label: "Instagram",
    hoverClass: "hover:bg-pink-600",
  },
  {
    icon: "mdi:linkedin",
    href: "https://www.linkedin.com/company/MetagenDigital",
    label: "LinkedIn",
    hoverClass: "hover:bg-[#0b86ca]",
  },
  {
    icon: "mdi:youtube",
    href: "https://www.youtube.com/@MetagenDigital",
    label: "YouTube",
    hoverClass: "hover:bg-[#fd3832]",
  },
];

const route = useRoute();
const isActive = (path: string) => {
  if (path === "/") return route.path === "/";
  return route.path.startsWith(path);
};

// Close on route change
watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false;
  },
);

// Prevent body scroll when menu is open
watch(mobileMenuOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? "hidden" : "";
  }
});
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
        <div
          class="flex items-center justify-between px-6 h-16 border-b border-brand-border"
        >
          <img
            src="/images/MetaGen-Logo.svg"
            alt="MetaGenDigital"
            class="h-7 w-auto"
          />
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
            class="group relative flex items-center gap-3 px-4 py-3 rounded-card text-base font-semibold border transition-all duration-200"
            :class="
              isActive(link.to)
                ? 'bg-gradient-brand text-white border-brand-primary/40 shadow-card'
                : 'text-brand-text-secondary border-transparent hover:bg-brand-surface hover:text-brand-primary hover:border-brand-border'
            "
            :style="{ animationDelay: `${i * 50}ms` }"
          >
            <span
              class="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-brand-orange transition-opacity duration-200"
              :class="
                isActive(link.to)
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-70'
              "
              aria-hidden="true"
            />
            <Icon :name="link.icon" class="w-5 h-5" aria-hidden="true" />
            {{ link.label }}
          </NuxtLink>

          <!-- Contact + social info -->
          <div class="mt-6 pt-6 border-t border-brand-border">
            <p
              class="px-1 text-[11px] font-bold tracking-widest uppercase text-brand-text-muted"
            >
              Contact
            </p>

            <div class="mt-3 space-y-2.5">
              <a
                href="tel:+8801970222573"
                class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-brand-text-secondary hover:bg-brand-surface hover:text-brand-primary transition-colors duration-150"
              >
                <Icon
                  name="mdi:phone-outline"
                  class="w-4 h-4 text-brand-orange"
                  aria-hidden="true"
                />
                +88 01970-222573
              </a>

              <a
                href="mailto:hello@metagendigital.com"
                class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-brand-text-secondary hover:bg-brand-surface hover:text-brand-primary transition-colors duration-150"
              >
                <Icon
                  name="mdi:email-outline"
                  class="w-4 h-4 text-brand-orange"
                  aria-hidden="true"
                />
                hello@metagendigital.com
              </a>
            </div>

            <div class="mt-4 flex items-center gap-2 px-1">
              <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.label"
                class="w-9 h-9 flex items-center justify-center rounded-btn bg-brand-surface text-brand-primary transition-all duration-150 hover:text-white"
                :class="social.hoverClass"
              >
                <Icon :name="social.icon" class="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
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
