<script setup lang="ts">
import type { Stat } from '~/types'

const { el, isVisible } = useScrollAnimation()

const stats: Stat[] = [
  { value: 50,  suffix: '+', label: 'Happy Clients',      prefix: '' },
  { value: 100, suffix: '+', label: 'Projects Delivered', prefix: '' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction',prefix: '' },
  { value: 3,   suffix: '+', label: 'Years Experience',   prefix: '' },
]

const features = [
  { icon: 'mdi:target',        title: 'Results-Driven Approach',  description: 'Every campaign is built around your KPIs — not vanity metrics.',                           color: 'orange' },
  { icon: 'mdi:chart-line',    title: 'Data & Analytics First',   description: 'We track everything so you know exactly what\'s working and why.',                          color: 'purple' },
  { icon: 'mdi:account-group', title: 'Dedicated Expert Team',    description: 'Specialists in marketing, design, development, and content — all under one roof.',          color: 'cyan' },
  { icon: 'mdi:clock-fast',    title: 'On-Time Delivery',         description: 'Deadlines matter. We plan carefully and execute on schedule, every time.',                  color: 'orange' },
  { icon: 'mdi:headset',       title: 'Responsive Communication', description: 'Direct access to your team — no ticket queues, no waiting in the dark.',                    color: 'purple' },
  { icon: 'mdi:currency-usd',  title: 'Transparent Pricing',      description: 'No hidden fees. Clear deliverables and fair pricing from day one.',                         color: 'cyan' },
]

const iconGradient: Record<string, string> = {
  orange: 'from-brand-orange/20 to-brand-orange/5 text-brand-orange',
  purple: 'from-brand-purple/20 to-brand-purple/5 text-brand-purple',
  cyan:   'from-brand-cyan/20   to-brand-cyan/5   text-brand-cyan',
}

const accentBar: Record<string, string> = {
  orange: 'bg-brand-orange',
  purple: 'bg-brand-purple',
  cyan:   'bg-brand-cyan',
}
</script>

<template>
  <section class="section-padding bg-white" aria-label="Why Choose Us">
    <div class="container-content">

      <!-- Heading -->
      <div class="text-center mb-14">
        <SectionBadge icon="mdi:shield-star" color="purple" class="mb-4">Why Choose Us</SectionBadge>
        <h2 class="text-brand-text-primary mt-4 mb-4">
          The Agency That
          <span class="gradient-text"> Gets Results</span>
        </h2>
        <p class="text-brand-text-secondary max-w-xl mx-auto">
          We don't just deliver services — we build lasting partnerships that drive measurable growth.
        </p>
      </div>

      <!-- Gradient stats banner -->
      <div
        ref="el"
        class="relative overflow-hidden rounded-card mb-14 bg-gradient-brand p-px"
      >
        <div class="relative rounded-[15px] bg-gradient-brand px-6 py-10 md:py-12">
          <!-- subtle dot grid overlay -->
          <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-10 rounded-[15px] pointer-events-none" aria-hidden="true" />
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center"
            >
              <StatCounter
                :value="stat.value"
                :suffix="stat.suffix"
                :label="stat.label"
                class="[&_.gradient-text]:text-white [&_p]:text-white/70"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Feature cards grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 80, duration: 500 } }"
          class="group relative flex flex-col overflow-hidden rounded-card border border-brand-border bg-white shadow-card hover:shadow-card-hover transition-all duration-300"
          :class="{
            'hover:border-brand-orange/30': feature.color === 'orange',
            'hover:border-brand-purple/30': feature.color === 'purple',
            'hover:border-brand-cyan/30':   feature.color === 'cyan',
          }"
        >
          <!-- Top accent bar -->
          <div class="h-1 w-full flex-shrink-0" :class="accentBar[feature.color]" />

          <div class="p-5 flex gap-4 items-start">
            <!-- Icon -->
            <div
              class="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              :class="iconGradient[feature.color]"
            >
              <Icon :name="feature.icon" class="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 class="text-[15px] font-bold text-brand-text-primary mb-1">{{ feature.title }}</h3>
              <p class="text-sm text-brand-text-secondary leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
