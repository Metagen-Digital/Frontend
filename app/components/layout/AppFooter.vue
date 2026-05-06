<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const services = computed(() => [
  { labelKey: "footer.links.digitalMarketing", to: "/services/digital-marketing" },
  { labelKey: "footer.links.socialMedia",      to: "/services/social-media-marketing" },
  { labelKey: "footer.links.photography",      to: "/services/photography-videography" },
  { labelKey: "footer.links.webDev",           to: "/services/website-development" },
  { labelKey: "footer.links.ecommerce",        to: "/services/ecommerce-development" },
])

const company = computed(() => [
  { labelKey: "footer.links.about",     to: "/about" },
  { labelKey: "footer.links.portfolio", to: "/portfolio" },
  { labelKey: "footer.links.blog",      to: "/blog" },
  { labelKey: "footer.links.products",  to: "/products" },
  { labelKey: "footer.links.careers",   to: "/careers" },
  { labelKey: "footer.links.contact",   to: "/contact" },
])

const legal = computed(() => [
  { labelKey: "footer.links.privacy", to: "/privacy-policy" },
  { labelKey: "footer.links.terms",   to: "/terms" },
])

const socials = [
  {
    icon: "mdi:facebook",
    href: "https://www.facebook.com/MetagenDigital",
    label: "Facebook",
    bg: "hover:bg-[#4c76be]",
  },
  {
    icon: "mdi:instagram",
    href: "https://www.instagram.com/MetagenDigital",
    label: "Instagram",
    bg: "hover:bg-pink-600",
  },
  {
    icon: "mdi:linkedin",
    href: "https://www.linkedin.com/company/MetagenDigital",
    label: "LinkedIn",
    bg: "hover:bg-[#0b86ca]",
  },
  {
    icon: "mdi:youtube",
    href: "https://www.youtube.com/@MetagenDigital",
    label: "YouTube",
    bg: "hover:bg-[#fd3832]",
  },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-brand-footer-bg" style="background-color: #1d1d47">
    <!-- Main footer grid -->
    <div
      class="container-content pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
    >
      <!-- Brand column -->
      <div class="lg:col-span-1">
        <!-- Real MetaGen logo -->
        <NuxtLink
          :to="localePath('/')"
          class="inline-block mb-5"
          aria-label="MetaGenDigital home"
        >
          <img
            src="/images/MetaGen-Logo-w.svg"
            alt="MetaGenDigital"
            class="h-10 w-auto"
            loading="lazy"
          />
        </NuxtLink>

        <p class="text-sm leading-relaxed mb-6" style="color: #e8e8e8">
          {{ $t('footer.tagline') }}
        </p>

        <!-- Social icons -->
        <div class="flex items-center gap-2.5">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.label"
            class="w-9 h-9 flex items-center justify-center rounded-btn bg-white/10 text-white/70 hover:text-white transition-all duration-150"
            :class="social.bg"
          >
            <Icon :name="social.icon" class="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <!-- Services -->
      <div>
        <h3
          class="text-sm font-semibold text-white uppercase tracking-widest mb-5"
        >
          {{ $t('footer.services') }}
        </h3>
        <ul class="space-y-3">
          <li v-for="link in services" :key="link.to">
            <NuxtLink
              :to="localePath(link.to)"
              class="text-sm transition-colors duration-150 hover:text-brand-orange"
              style="color: #e8e8e8"
            >
              {{ $t(link.labelKey) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h3
          class="text-sm font-semibold text-white uppercase tracking-widest mb-5"
        >
          {{ $t('footer.company') }}
        </h3>
        <ul class="space-y-3">
          <li v-for="link in company" :key="link.to">
            <NuxtLink
              :to="localePath(link.to)"
              class="text-sm transition-colors duration-150 hover:text-brand-orange"
              style="color: #e8e8e8"
            >
              {{ $t(link.labelKey) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3
          class="text-sm font-semibold text-white uppercase tracking-widest mb-5"
        >
          {{ $t('footer.contact') }}
        </h3>
        <ul class="space-y-3 text-sm" style="color: #e8e8e8">
          <li class="flex items-start gap-2.5">
            <Icon
              name="mdi:map-marker-outline"
              class="w-4 h-4 mt-0.5 text-brand-orange flex-shrink-0"
              aria-hidden="true"
            />
            <span>Uttara 10, Dhaka, Bangladesh</span>
          </li>
          <li class="flex items-start gap-2.5">
            <Icon
              name="mdi:phone-outline"
              class="w-4 h-4 mt-0.5 text-brand-orange flex-shrink-0"
              aria-hidden="true"
            />
            <a
              href="tel:+8801970222573"
              class="hover:text-brand-orange transition-colors duration-150"
            >
              +88 01970-222573
            </a>
          </li>
          <li class="flex items-start gap-2.5">
            <Icon
              name="mdi:email-outline"
              class="w-4 h-4 mt-0.5 text-brand-orange flex-shrink-0"
              aria-hidden="true"
            />
            <a
              href="mailto:hello@metagendigital.com"
              class="hover:text-brand-orange transition-colors duration-150 break-all"
            >
              hello@metagendigital.com
            </a>
          </li>
          <li class="flex items-start gap-2.5">
            <Icon
              name="mdi:whatsapp"
              class="w-4 h-4 mt-0.5 text-brand-orange flex-shrink-0"
              aria-hidden="true"
            />
            <a
              href="https://wa.me/8801970222573"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-brand-orange transition-colors duration-150"
            >
              {{ $t('footer.links.whatsapp') }}
            </a>
          </li>
          <li class="flex items-start gap-2.5">
            <Icon
              name="mdi:clock-outline"
              class="w-4 h-4 mt-0.5 text-brand-orange flex-shrink-0"
              aria-hidden="true"
            />
            <span>{{ $t('footer.links.hours') }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div>
      <div
        class="container-content flex flex-col sm:flex-row items-center justify-between gap-3 py-5"
      >
        <p class="text-xs" style="color: #c7c6c6">
          &copy; {{ currentYear }} MetaGenDigital. {{ $t('footer.copyright') }}
        </p>
        <div class="flex items-center gap-4">
          <NuxtLink
            v-for="link in legal"
            :key="link.to"
            :to="localePath(link.to)"
            class="text-xs hover:text-white transition-colors duration-150"
            style="color: #c7c6c6"
          >
            {{ $t(link.labelKey) }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
