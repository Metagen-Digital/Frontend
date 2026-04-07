<script setup lang="ts">
const stats = [
  {
    icon: "mdi:account-group-outline",
    value: "50+",
    label: "Happy Clients",
    color: "text-brand-orange",
  },
  {
    icon: "mdi:rocket-launch-outline",
    value: "100+",
    label: "Projects Done",
    color: "text-brand-purple",
  },
  {
    icon: "mdi:star-outline",
    value: "5.0★",
    label: "Client Rating",
    color: "text-brand-cyan",
  },
  {
    icon: "mdi:calendar-check-outline",
    value: "3+",
    label: "Years Experience",
    color: "text-brand-primary",
  },
];

const services = [
  {
    icon: "mdi:trending-up",
    label: "Digital Marketing",
    color: "text-brand-orange",
    bg: "bg-brand-orange/10",
  },
  {
    icon: "mdi:instagram",
    label: "Social Media",
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
  },
  {
    icon: "mdi:monitor-shimmer",
    label: "Web Development",
    color: "text-brand-primary",
    bg: "bg-brand-primary/10",
  },
  {
    icon: "mdi:camera-outline",
    label: "Photography",
    color: "text-brand-cyan",
    bg: "bg-brand-cyan/10",
  },
];

// Floating service bubbles around the right-side image
const floatingBubbles = [
  {
    icon: "mdi:google-ads",
    label: "Google Ads",
    sub: "Certified Partner",
    wrapClass: "-top-4 left-6",
    iconClass: "bg-brand-orange/10 text-brand-orange",
    delay: "0s",
  },
  {
    icon: "mdi:instagram",
    label: "Social Media",
    sub: "4 Platforms",
    wrapClass: "top-1/3 -right-6",
    iconClass: "bg-brand-purple/10 text-brand-purple",
    delay: "0.7s",
  },
  {
    icon: "mdi:web",
    label: "Web Development",
    sub: "E-commerce · Agency · Business",
    wrapClass: "-bottom-4 left-10",
    iconClass: "bg-brand-primary/10 text-brand-primary",
    delay: "1.4s",
  },
  {
    icon: "mdi:camera",
    label: "Photo & Videography",
    sub: "Product & Brand",
    wrapClass: "bottom-1/3 -left-6",
    iconClass: "bg-brand-cyan/10 text-brand-cyan",
    delay: "2.1s",
  },
];
</script>

<template>
  <section
    class="relative min-h-[100svh] flex items-center overflow-hidden bg-white"
    aria-label="Hero"
  >
    <!-- Background grid -->
    <div
      class="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none"
      aria-hidden="true"
    />
    <!-- Orb left -->
    <div
      class="absolute -left-40 top-1/4 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
      style="background: rgba(48, 60, 142, 0.06)"
      aria-hidden="true"
    />
    <!-- Orb right -->
    <div
      class="absolute -right-20 bottom-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
      style="background: rgba(124, 58, 237, 0.06)"
      aria-hidden="true"
    />

    <div class="container-content relative z-10 pt-28 pb-20">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center"
      >
        <!-- ── LEFT: Content ──────────────────────────── -->
        <div class="flex flex-col">
          <!-- Eyebrow badge — custom animated pill -->
          <div
            v-motion
            :initial="{ opacity: 0, y: -10 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { delay: 80, duration: 600 },
            }"
            class="mb-6"
          >
            <div
              class="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-semibold uppercase tracking-widest"
            >
              <!-- Animated live dot -->
              <span class="relative flex h-5 w-5">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-60"
                />
                <span
                  class="relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-success/20"
                >
                  <span class="w-2 h-2 rounded-full bg-brand-success" />
                </span>
              </span>
              <Icon
                name="mdi:trophy-outline"
                class="w-3.5 h-3.5 text-brand-orange"
                aria-hidden="true"
              />
              Bangladesh's #1 Digital Agency
            </div>
          </div>

          <!-- Headline -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -28 }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: { delay: 180, duration: 700 },
            }"
          >
            <h1
              class="font-display font-extrabold leading-[1.08] text-brand-text-primary mb-5"
            >
              We <span class="gradient-text">Grow</span> Your<br />
              Business<br class="hidden sm:block" />
              <span class="gradient-text"> Online</span>
            </h1>
          </div>

          <!-- Subheadline -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: { delay: 300, duration: 600 },
            }"
          >
            <p
              class="text-lg text-brand-text-secondary leading-relaxed mb-8 max-w-lg"
            >
              From digital marketing to stunning web experiences — we help
              Bangladesh businesses stand out, scale fast, and win online.
            </p>
          </div>

          <!-- CTA buttons -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { delay: 420, duration: 600 },
            }"
            class="flex flex-col sm:flex-row gap-3 mb-4"
          >
            <GradientButton
              to="/services"
              size="lg"
              icon-right="mdi:arrow-right"
            >
              View Our Services
            </GradientButton>
            <GradientButton
              to="/contact"
              size="lg"
              variant="outline"
              icon="mdi:chat-outline"
            >
              Get Free Consultation
            </GradientButton>
          </div>

          <!-- WhatsApp quick CTA -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 10 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { delay: 520, duration: 500 },
            }"
            class="mb-8"
          >
            <a
              href="https://wa.me/8801970222573"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-brand-text-muted hover:text-[#25D366] transition-colors duration-200 group"
            >
              <Icon
                name="mdi:whatsapp"
                class="w-4 h-4 text-[#25D366]"
                aria-hidden="true"
              />
              Chat on WhatsApp — usually replies within 1 hour
              <Icon
                name="mdi:arrow-right"
                class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <!-- Service chips -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 12 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { delay: 600, duration: 500 },
            }"
            class="flex flex-wrap gap-2 mb-8"
          >
            <div
              v-for="svc in services"
              :key="svc.label"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-border bg-white text-xs font-medium text-brand-text-secondary hover:border-brand-border-strong hover:shadow-card transition-all duration-200 cursor-default"
            >
              <span
                class="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0"
                :class="svc.bg"
              >
                <Icon
                  :name="svc.icon"
                  class="w-3 h-3"
                  :class="svc.color"
                  aria-hidden="true"
                />
              </span>
              {{ svc.label }}
            </div>
          </div>

          <!-- Stats row -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 12 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { delay: 700, duration: 500 },
            }"
            class="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-6 border-t border-brand-border"
          >
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="flex flex-col items-start gap-1"
            >
              <div class="flex items-center gap-1.5">
                <Icon
                  :name="stat.icon"
                  class="w-4 h-4 flex-shrink-0"
                  :class="stat.color"
                  aria-hidden="true"
                />
                <span
                  class="font-display font-extrabold text-xl md:text-2xl text-brand-text-primary"
                >
                  {{ stat.value }}
                </span>
              </div>
              <span class="text-[11px] text-brand-text-muted leading-tight">{{
                stat.label
              }}</span>
            </div>
          </div>
        </div>

        <!-- ── RIGHT: Image ──────────────────────────── -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 40, scale: 0.96 }"
          :enter="{
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { delay: 280, duration: 800 },
          }"
          class="relative hidden lg:flex items-center justify-center py-8 px-8"
        >
          <!-- Glow behind image -->
          <div
            class="absolute inset-0 rounded-3xl blur-2xl opacity-25 pointer-events-none"
            style="
              background: radial-gradient(
                circle at 55% 45%,
                rgba(48, 60, 142, 0.3),
                rgba(124, 58, 237, 0.2),
                transparent 70%
              );
            "
            aria-hidden="true"
          />

          <!-- Floating service bubbles -->
          <div
            v-for="bubble in floatingBubbles"
            :key="bubble.label"
            class="absolute z-20"
            :class="bubble.wrapClass"
            aria-hidden="true"
          >
            <div
              class="flex items-center gap-2.5 pl-2 pr-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-sm border border-brand-border shadow-card-hover animate-float"
              :style="{ animationDelay: bubble.delay }"
            >
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                :class="bubble.iconClass"
              >
                <Icon :name="bubble.icon" class="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <p
                  class="text-[11px] font-bold text-brand-text-primary leading-none"
                >
                  {{ bubble.label }}
                </p>
                <p class="text-[10px] text-brand-text-muted mt-0.5">
                  {{ bubble.sub }}
                </p>
              </div>
            </div>
          </div>

          <!-- Main image -->
          <div
            class="relative rounded-3xl overflow-hidden shadow-card-hover ring-1 ring-brand-border w-full"
          >
            <img
              src="/images/HeroBg.png"
              alt="MetaGenDigital — Digital marketing and web development agency"
              class="w-full h-auto object-cover"
              loading="eager"
            />

            <!-- Badge: Available -->
            <div
              class="absolute top-5 left-5 flex items-center gap-2 px-3.5 py-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-card border border-brand-border animate-float"
              style="animation-delay: 0.4s"
              aria-hidden="true"
            >
              <span class="relative flex h-2.5 w-2.5">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-60"
                />
                <span
                  class="relative inline-flex w-2.5 h-2.5 rounded-full bg-brand-success"
                />
              </span>
              <span class="text-xs font-semibold text-brand-text-primary"
                >Available for projects</span
              >
            </div>

            <!-- Badge: Traffic Growth -->
            <div
              class="absolute bottom-5 right-5 flex items-center gap-3 px-3.5 py-2.5 bg-white/95 backdrop-blur-sm rounded-xl shadow-card border border-brand-border animate-float"
              style="animation-delay: 1.1s"
              aria-hidden="true"
            >
              <div
                class="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0"
              >
                <Icon
                  name="mdi:trending-up"
                  class="w-4.5 h-4.5 text-white"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p
                  class="text-sm font-extrabold text-brand-text-primary leading-none"
                >
                  +300%
                </p>
                <p class="text-[10px] text-brand-text-muted mt-0.5">
                  Avg. Traffic Growth
                </p>
              </div>
            </div>

            <!-- Badge: Star rating -->
            <div
              class="absolute top-5 right-5 flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-card border border-brand-border animate-float"
              style="animation-delay: 1.8s"
              aria-hidden="true"
            >
              <div class="flex gap-0.5">
                <Icon
                  v-for="i in 5"
                  :key="i"
                  name="mdi:star"
                  class="w-3 h-3 text-brand-warning"
                  aria-hidden="true"
                />
              </div>
              <span class="text-xs font-bold text-brand-text-primary">5.0</span>
            </div>

            <!-- Badge: Clients count -->
            <div
              class="absolute bottom-5 left-5 flex items-center gap-2.5 px-3.5 py-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-card border border-brand-border animate-float"
              style="animation-delay: 0.9s"
              aria-hidden="true"
            >
              <!-- Avatar stack -->
              <div class="flex -space-x-2">
                <div
                  v-for="(c, i) in [
                    'bg-brand-orange',
                    'bg-brand-purple',
                    'bg-brand-cyan',
                  ]"
                  :key="i"
                  class="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-bold"
                  :class="c"
                >
                  {{ ["R", "S", "A"][i] }}
                </div>
              </div>
              <div>
                <p
                  class="text-[11px] font-bold text-brand-text-primary leading-none"
                >
                  50+ Clients
                </p>
                <p class="text-[10px] text-brand-text-muted">
                  Across Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 1100, duration: 600 } }"
        class="flex flex-col items-center gap-2 mt-14"
        aria-hidden="true"
      >
        <span
          class="text-[11px] text-brand-text-muted tracking-widest uppercase"
          >Scroll</span
        >
        <div
          class="w-px h-10 bg-gradient-to-b from-brand-primary to-transparent animate-bounce-y"
        />
      </div>
    </div>
  </section>
</template>
