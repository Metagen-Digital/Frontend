<script setup lang="ts">
const steps = [
  {
    number: '01',
    icon: 'mdi:magnify',
    title: 'Discovery',
    description: 'We deep-dive into your business, goals, audience, and competitors to lay a solid foundation.',
    color: 'orange',
    tag: 'Research',
  },
  {
    number: '02',
    icon: 'mdi:lightbulb-on-outline',
    title: 'Strategy',
    description: 'We craft a tailored plan — channels, messaging, timelines, and KPIs — built around your objectives.',
    color: 'purple',
    tag: 'Planning',
  },
  {
    number: '03',
    icon: 'mdi:rocket-launch-outline',
    title: 'Execute',
    description: 'Our team brings the strategy to life with precision — design, development, content, and campaigns.',
    color: 'cyan',
    tag: 'Build & Launch',
  },
  {
    number: '04',
    icon: 'mdi:chart-line',
    title: 'Grow',
    description: 'We measure, optimise, and report — then keep iterating to accelerate your growth month after month.',
    color: 'orange',
    tag: 'Optimise',
  },
]

const cardGradient: Record<string, string> = {
  orange: 'from-brand-orange/10 to-transparent border-brand-orange/20 hover:border-brand-orange/40 hover:shadow-glow-orange',
  purple: 'from-brand-purple/10 to-transparent border-brand-purple/20 hover:border-brand-purple/40 hover:shadow-glow-purple',
  cyan:   'from-brand-cyan/10   to-transparent border-brand-cyan/20   hover:border-brand-cyan/40   hover:shadow-glow-cyan',
}

const iconGradient: Record<string, string> = {
  orange: 'from-brand-orange/20 to-brand-orange/5 text-brand-orange',
  purple: 'from-brand-purple/20 to-brand-purple/5 text-brand-purple',
  cyan:   'from-brand-cyan/20   to-brand-cyan/5   text-brand-cyan',
}

const numberColor: Record<string, string> = {
  orange: 'text-brand-orange',
  purple: 'text-brand-purple',
  cyan:   'text-brand-cyan',
}

const tagPill: Record<string, string> = {
  orange: 'bg-brand-orange/10 text-brand-orange',
  purple: 'bg-brand-purple/10 text-brand-purple',
  cyan:   'bg-brand-cyan/10   text-brand-cyan',
}

const connectorColor: Record<string, string> = {
  orange: 'from-brand-orange/40',
  purple: 'from-brand-purple/40',
  cyan:   'from-brand-cyan/40',
}
</script>

<template>
  <section class="section-padding bg-brand-surface" aria-label="Our Process">
    <div class="container-content">

      <!-- Heading -->
      <div class="text-center mb-14">
        <SectionBadge icon="mdi:map-marker-path" color="cyan" class="mb-4">Our Process</SectionBadge>
        <h2 class="text-brand-text-primary mt-4 mb-4">
          How We
          <span class="gradient-text"> Work</span>
        </h2>
        <p class="text-brand-text-secondary max-w-xl mx-auto">
          A clear, repeatable process that takes you from idea to measurable growth — with zero surprises.
        </p>
      </div>

      <!-- Steps grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">

        <!-- Desktop dashed connector line -->
        <div
          class="hidden lg:block absolute top-12 left-[14%] right-[14%] h-px border-t-2 border-dashed border-brand-border z-0"
          aria-hidden="true"
        />

        <div
          v-for="(step, i) in steps"
          :key="step.number"
          v-motion
          :initial="{ opacity: 0, y: 32 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 120, duration: 550 } }"
          class="group relative z-10 flex flex-col rounded-card border bg-gradient-to-b bg-white p-6 shadow-card transition-all duration-300"
          :class="cardGradient[step.color]"
        >
          <!-- Step number + tag row -->
          <div class="flex items-center justify-between mb-4">
            <span
              class="font-display font-extrabold text-4xl leading-none"
              :class="numberColor[step.color]"
              aria-hidden="true"
            >
              {{ step.number }}
            </span>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" :class="tagPill[step.color]">
              {{ step.tag }}
            </span>
          </div>

          <!-- Icon circle -->
          <div
            class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br mb-4 transition-transform duration-300 group-hover:scale-110"
            :class="iconGradient[step.color]"
          >
            <Icon :name="step.icon" class="w-6 h-6" aria-hidden="true" />
          </div>

          <!-- Text -->
          <h3 class="text-[17px] font-bold text-brand-text-primary mb-2">{{ step.title }}</h3>
          <p class="text-sm text-brand-text-secondary leading-relaxed">{{ step.description }}</p>

          <!-- Mobile vertical connector -->
          <div
            v-if="i < steps.length - 1"
            class="lg:hidden mx-auto mt-5 w-px h-8 bg-gradient-to-b to-transparent"
            :class="connectorColor[step.color]"
            aria-hidden="true"
          />
        </div>
      </div>

    </div>
  </section>
</template>
