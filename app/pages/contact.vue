<script setup lang="ts">
useSeoMeta({
  title: 'Contact Us | MetaGenDigital',
  description: 'Get in touch with MetaGenDigital. Let\'s discuss your project and how we can help grow your business online.',
})

const { fields, isSubmitting, submit, services, budgets } = useContactForm()
const { name, email, service, budget, message } = fields

const contactDetails = [
  {
    icon: 'mdi:email-outline',
    label: 'Email',
    value: 'hello@metagendigital.com',
    href: 'mailto:hello@metagendigital.com',
    color: 'orange',
  },
  {
    icon: 'mdi:whatsapp',
    label: 'WhatsApp',
    value: 'Chat on WhatsApp →',
    href: 'https://wa.me/8801XXXXXXXXX',
    color: 'orange',
    external: true,
  },
  {
    icon: 'mdi:map-marker-outline',
    label: 'Location',
    value: 'Dhaka, Bangladesh',
    color: 'orange',
  },
  {
    icon: 'mdi:clock-outline',
    label: 'Working Hours',
    value: 'Sun – Thu, 9am – 6pm (BST)',
    color: 'orange',
  },
]

const iconBg: Record<string, string> = {
  orange: 'bg-brand-orange/10 text-brand-orange',
  purple: 'bg-brand-purple/10 text-brand-purple',
}
</script>

<template>
  <div>
    <!-- Page hero -->
    <section class="pt-32 pb-14 bg-brand-surface border-b border-brand-border overflow-hidden relative">
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: 'Contact' }]" class="mb-6" />
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        >
          <SectionBadge icon="mdi:chat-outline" color="orange" class="mb-5">Get In Touch</SectionBadge>
          <h1 class="text-brand-text-primary mb-4">
            Let's <span class="gradient-text">Work Together</span>
          </h1>
          <p class="text-brand-text-secondary text-lg max-w-xl">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    </section>

    <!-- Main content -->
    <section class="section-padding bg-white">
      <div class="container-content">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">

          <!-- Left: contact info -->
          <div class="lg:col-span-2 space-y-8">
            <div>
              <h2 class="text-2xl font-bold text-brand-text-primary mb-2">Contact Information</h2>
              <p class="text-brand-text-secondary text-sm mb-7">
                Reach out through any channel and our team will respond promptly.
              </p>

              <ul class="space-y-5">
                <li
                  v-for="item in contactDetails"
                  :key="item.label"
                  class="flex items-start gap-4"
                >
                  <div
                    class="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
                    :class="iconBg[item.color]"
                  >
                    <Icon :name="item.icon" class="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p class="text-xs text-brand-text-muted font-medium mb-0.5">{{ item.label }}</p>
                    <a
                      v-if="item.href"
                      :href="item.href"
                      :target="item.external ? '_blank' : undefined"
                      :rel="item.external ? 'noopener noreferrer' : undefined"
                      class="text-brand-text-primary font-medium hover:text-brand-orange transition-colors duration-150"
                    >
                      {{ item.value }}
                    </a>
                    <p v-else class="text-brand-text-primary font-medium">{{ item.value }}</p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Social links -->
            <div class="pt-6 border-t border-brand-border">
              <p class="text-xs text-brand-text-muted uppercase tracking-widest font-medium mb-4">Follow Us</p>
              <div class="flex gap-3">
                <a
                  href="https://www.facebook.com/metagendigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-surface border border-brand-border text-brand-text-secondary hover:text-[#4c76be] hover:border-[#4c76be]/30 transition-all duration-150"
                  aria-label="Facebook"
                >
                  <Icon name="mdi:facebook" class="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/company/metagendigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-surface border border-brand-border text-brand-text-secondary hover:text-[#0b86ca] hover:border-[#0b86ca]/30 transition-all duration-150"
                  aria-label="LinkedIn"
                >
                  <Icon name="mdi:linkedin" class="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/metagendigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-surface border border-brand-border text-brand-text-secondary hover:text-brand-orange hover:border-brand-orange/30 transition-all duration-150"
                  aria-label="Instagram"
                >
                  <Icon name="mdi:instagram" class="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <!-- Right: contact form -->
          <div class="lg:col-span-3">
            <div class="bg-white border border-brand-border rounded-card shadow-card p-7 md:p-9">
              <h2 class="text-xl font-bold text-brand-text-primary mb-6">Send Us a Message</h2>

              <form class="space-y-5" @submit.prevent="submit">

                <!-- Name + Email -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <!-- Name -->
                  <div>
                    <label for="contact-name" class="block text-sm font-medium text-brand-text-primary mb-1.5">
                      Your Name <span class="text-brand-orange">*</span>
                    </label>
                    <input
                      id="contact-name"
                      v-model="name.value.value"
                      type="text"
                      placeholder="e.g. Rafiq Ahmed"
                      autocomplete="name"
                      class="w-full px-4 py-2.5 rounded-xl border text-sm text-brand-text-primary placeholder:text-brand-text-muted bg-white transition-colors duration-150 outline-none"
                      :class="name.errorMessage.value
                        ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10'"
                    />
                    <p v-if="name.errorMessage.value" class="mt-1 text-xs text-red-500">{{ name.errorMessage.value }}</p>
                  </div>

                  <!-- Email -->
                  <div>
                    <label for="contact-email" class="block text-sm font-medium text-brand-text-primary mb-1.5">
                      Email Address <span class="text-brand-orange">*</span>
                    </label>
                    <input
                      id="contact-email"
                      v-model="email.value.value"
                      type="email"
                      placeholder="you@example.com"
                      autocomplete="email"
                      class="w-full px-4 py-2.5 rounded-xl border text-sm text-brand-text-primary placeholder:text-brand-text-muted bg-white transition-colors duration-150 outline-none"
                      :class="email.errorMessage.value
                        ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10'"
                    />
                    <p v-if="email.errorMessage.value" class="mt-1 text-xs text-red-500">{{ email.errorMessage.value }}</p>
                  </div>
                </div>

                <!-- Service -->
                <div>
                  <label for="contact-service" class="block text-sm font-medium text-brand-text-primary mb-1.5">
                    Service Interested In <span class="text-brand-orange">*</span>
                  </label>
                  <select
                    id="contact-service"
                    v-model="service.value.value"
                    class="w-full px-4 py-2.5 rounded-xl border text-sm text-brand-text-primary bg-white transition-colors duration-150 outline-none appearance-none"
                    :class="service.errorMessage.value
                      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                      : 'border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10'"
                  >
                    <option value="" disabled selected>Select a service…</option>
                    <option v-for="svc in services" :key="svc" :value="svc">{{ svc }}</option>
                  </select>
                  <p v-if="service.errorMessage.value" class="mt-1 text-xs text-red-500">{{ service.errorMessage.value }}</p>
                </div>

                <!-- Budget -->
                <div>
                  <label for="contact-budget" class="block text-sm font-medium text-brand-text-primary mb-1.5">
                    Budget Range <span class="text-brand-text-muted font-normal">(optional)</span>
                  </label>
                  <select
                    id="contact-budget"
                    v-model="budget.value.value"
                    class="w-full px-4 py-2.5 rounded-xl border border-brand-border text-sm text-brand-text-primary bg-white transition-colors duration-150 outline-none appearance-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                  >
                    <option value="">Select budget range…</option>
                    <option v-for="b in budgets" :key="b" :value="b">{{ b }}</option>
                  </select>
                </div>

                <!-- Message -->
                <div>
                  <label for="contact-message" class="block text-sm font-medium text-brand-text-primary mb-1.5">
                    Your Message <span class="text-brand-orange">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    v-model="message.value.value"
                    rows="5"
                    placeholder="Tell us about your project, goals, and timeline…"
                    class="w-full px-4 py-2.5 rounded-xl border text-sm text-brand-text-primary placeholder:text-brand-text-muted bg-white transition-colors duration-150 outline-none resize-none"
                    :class="message.errorMessage.value
                      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                      : 'border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10'"
                  />
                  <p v-if="message.errorMessage.value" class="mt-1 text-xs text-red-500">{{ message.errorMessage.value }}</p>
                </div>

                <!-- Submit -->
                <GradientButton
                  type="submit"
                  size="lg"
                  icon-right="mdi:send-outline"
                  :loading="isSubmitting"
                  :disabled="isSubmitting"
                  class="w-full justify-center"
                >
                  {{ isSubmitting ? 'Sending…' : 'Send Message' }}
                </GradientButton>

                <p class="text-xs text-brand-text-muted text-center">
                  We'll reply within 24 hours. Your information is kept private.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>

    <CtaSection
      title="Not Sure Where to Start?"
      subtitle="Book a free 30-minute strategy call and let's figure it out together."
      primary-label="Book a Free Call"
      primary-to="/contact"
      secondary-label="View Our Services"
      secondary-to="/services"
    />
  </div>
</template>
