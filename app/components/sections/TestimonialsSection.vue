<script setup lang="ts">
import type { Testimonial } from '~/types'

const testimonials: Testimonial[] = [
  { name: 'Rakibul Hasan',  company: 'TechCorp BD', rating: 5, quote: 'MetaGenDigital transformed our online presence completely. Our website traffic tripled within 3 months and leads are pouring in. Highly recommended!' },
  { name: 'Sadia Islam',    company: 'ShopBD',      rating: 5, quote: 'Their social media team is phenomenal. Our Instagram engagement went up by 400% and we now have a community that actually buys from us.' },
  { name: 'Arif Rahman',    company: 'GreenGrow',   rating: 5, quote: 'The product photography they did for us is world-class. Our conversion rate improved by 60% after the new photos went live on our store.' },
  { name: 'Nusrat Jahan',   company: 'UrbanEats',   rating: 5, quote: 'Launched our e-commerce store with them in just 3 weeks. The whole experience was smooth, professional, and the result is stunning.' },
  { name: 'Fahim Chowdhury',company: 'StyleHouse',  rating: 5, quote: 'ROI on our Google Ads improved significantly after MetaGenDigital took over. They really understand how to spend ad budget smartly.' },
  { name: 'Tania Begum',    company: 'EduPrime',    rating: 5, quote: 'Best agency we have worked with. Responsive, transparent, and genuinely invested in our success. They feel like an extension of our team.' },
]

const doubled = [...testimonials, ...testimonials]
</script>

<template>
  <section class="section-padding overflow-hidden bg-white" aria-label="Client Testimonials">
    <div class="container-content mb-12">
      <div class="text-center">
        <SectionBadge icon="mdi:star" color="orange" class="mb-4">Testimonials</SectionBadge>
        <h2 class="text-brand-text-primary mt-4 mb-4">
          What Our Clients
          <span class="gradient-text"> Say About Us</span>
        </h2>
        <p class="text-brand-text-secondary max-w-xl mx-auto">
          Don't take our word for it — hear from the businesses we've helped grow.
        </p>
      </div>
    </div>

    <!-- Marquee row 1 -->
    <div class="relative flex mb-4">
      <div class="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
      <div class="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
      <div class="flex gap-4 animate-marquee hover:[animation-play-state:paused]" role="list" aria-label="Client testimonials">
        <TestimonialCard v-for="(t, i) in doubled" :key="`a-${i}`" v-bind="t" role="listitem" />
      </div>
    </div>

    <!-- Marquee row 2 — reversed -->
    <div class="relative flex">
      <div class="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
      <div class="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
      <div class="flex gap-4 [animation-direction:reverse] animate-marquee hover:[animation-play-state:paused]" aria-hidden="true">
        <TestimonialCard v-for="(t, i) in doubled" :key="`b-${i}`" v-bind="t" />
      </div>
    </div>
  </section>
</template>
