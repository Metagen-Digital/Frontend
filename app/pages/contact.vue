<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: "Contact Us | MetaGenDigital",
  description:
    "Get in touch with MetaGenDigital. Let's discuss your project and how we can help grow your business online.",
});

const { fields, isSubmitting, submit, services } = useContactForm();
const { name, email, phone, service, message } = fields;

const contactCards = [
  {
    icon: "mdi:map-marker-outline",
    label: "Our Office",
    value: "Uttara 10",
    sub: "Dhaka, Bangladesh",
    color: "orange",
  },
  {
    icon: "mdi:phone-outline",
    label: "Phone",
    value: "+88 01970-222573",
    sub: "Call or SMS anytime",
    href: "tel:+8801970222573",
    color: "purple",
  },
  {
    icon: "mdi:email-outline",
    label: "Email",
    value: "hello@metagendigital.com",
    sub: "We reply within 24 hrs",
    href: "mailto:hello@metagendigital.com",
    color: "cyan",
  },
];

const socials = [
  {
    icon: "mdi:facebook",
    label: "Facebook",
    handle: "@MetagenDigital",
    href: "https://www.facebook.com/MetagenDigital",
    color: "#1877F2",
    bg: "bg-[#1877F2]/10",
    border: "hover:border-[#1877F2]/40",
    hoverText: "hover:text-[#1877F2]",
  },
  {
    icon: "mdi:instagram",
    label: "Instagram",
    handle: "@MetagenDigital",
    href: "https://www.instagram.com/MetagenDigital",
    color: "#E1306C",
    bg: "bg-[#E1306C]/10",
    border: "hover:border-[#E1306C]/40",
    hoverText: "hover:text-[#E1306C]",
  },
  {
    icon: "mdi:linkedin",
    label: "LinkedIn",
    handle: "MetagenDigital",
    href: "https://www.linkedin.com/company/MetagenDigital",
    color: "#0A66C2",
    bg: "bg-[#0A66C2]/10",
    border: "hover:border-[#0A66C2]/40",
    hoverText: "hover:text-[#0A66C2]",
  },
  {
    icon: "mdi:youtube",
    label: "YouTube",
    handle: "@MetagenDigital",
    href: "https://www.youtube.com/@MetagenDigital",
    color: "#FF0000",
    bg: "bg-[#FF0000]/10",
    border: "hover:border-[#FF0000]/40",
    hoverText: "hover:text-[#FF0000]",
  },
];

const iconGradient: Record<string, string> = {
  orange: "from-brand-orange/20 to-brand-orange/5 text-brand-orange",
  purple: "from-brand-purple/20 to-brand-purple/5 text-brand-purple",
  cyan: "from-brand-cyan/20   to-brand-cyan/5   text-brand-cyan",
};

const accentBar: Record<string, string> = {
  orange: "bg-brand-orange",
  purple: "bg-brand-purple",
  cyan: "bg-brand-cyan",
};
</script>

<template>
  <div>
    <!-- ── HERO ───────────────────────────────────────────────── -->
    <section
      class="relative pt-32 pb-20 bg-brand-surface border-b border-brand-border overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute -left-32 top-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style="background: rgba(48, 60, 142, 0.07)"
        aria-hidden="true"
      />
      <div
        class="absolute -right-20 bottom-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style="background: rgba(124, 58, 237, 0.06)"
        aria-hidden="true"
      />

      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: $t('contactPage.breadcrumb') }]" class="mb-6" />
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="max-w-2xl"
        >
          <SectionBadge icon="mdi:chat-outline" color="orange" class="mb-5">{{ $t('contactPage.badge') }}</SectionBadge>
          <h1 class="text-brand-text-primary mt-4 mb-4">
            {{ $t('contactPage.heading') }} <span class="gradient-text">{{ $t('contactPage.headingHighlight') }}</span>
          </h1>
          <p class="text-brand-text-secondary text-lg leading-relaxed">
            {{ $t('contactPage.subheading') }}
          </p>
        </div>

        <!-- Contact info cards row -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          <div
            v-for="(card, i) in contactCards"
            :key="card.label"
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { delay: i * 80, duration: 500 },
            }"
            class="group relative overflow-hidden rounded-2xl border border-brand-border bg-white shadow-card hover:shadow-card-hover transition-all duration-300 p-4"
            :class="{
              'hover:border-brand-orange/30': card.color === 'orange',
              'hover:border-brand-purple/30': card.color === 'purple',
              'hover:border-brand-cyan/30': card.color === 'cyan',
            }"
          >
            <div
              class="h-0.5 absolute top-0 left-0 right-0"
              :class="accentBar[card.color]"
            />
            <div
              class="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br mb-3 transition-transform duration-300 group-hover:scale-110"
              :class="iconGradient[card.color]"
            >
              <Icon :name="card.icon" class="w-5 h-5" aria-hidden="true" />
            </div>
            <p
              class="text-[10px] text-brand-text-muted uppercase tracking-widest font-semibold mb-0.5"
            >
              {{ card.label }}
            </p>
            <a
              v-if="card.href"
              :href="card.href"
              class="block text-sm font-bold text-brand-text-primary hover:text-brand-primary transition-colors duration-150 truncate"
            >
              {{ card.value }}
            </a>
            <p v-else class="text-sm font-bold text-brand-text-primary">
              {{ card.value }}
            </p>
            <p class="text-[11px] text-brand-text-muted mt-0.5">
              {{ card.sub }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── MAIN: Form + Sidebar ──────────────────────────────── -->
    <section class="section-padding bg-white">
      <div class="container-content">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-14">
          <!-- ── LEFT SIDEBAR ────────────────────────────────── -->
          <div class="lg:col-span-2 flex flex-col gap-8">
            <!-- WhatsApp CTA card -->
            <div
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :visible-once="{
                opacity: 1,
                x: 0,
                transition: { duration: 600 },
              }"
              class="relative overflow-hidden rounded-2xl bg-gradient-brand p-px"
            >
              <div class="relative rounded-[15px] bg-gradient-brand p-6">
                <div
                  class="absolute inset-0 bg-grid-pattern bg-grid opacity-10 rounded-[15px] pointer-events-none"
                  aria-hidden="true"
                />
                <div class="relative z-10">
                  <div
                    class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4"
                  >
                    <Icon
                      name="mdi:whatsapp"
                      class="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 class="text-white font-bold text-lg mb-1">
                    {{ $t('contactPage.whatsappTitle') }}
                  </h3>
                  <p class="text-white/75 text-sm mb-5 leading-relaxed">
                    {{ $t('contactPage.whatsappText') }}
                  </p>
                  <a
                    href="https://wa.me/8801970222573"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-btn text-brand-primary font-bold text-sm hover:bg-brand-surface transition-colors duration-200"
                  >
                    <Icon
                      name="mdi:whatsapp"
                      class="w-4 h-4 text-[#25D366]"
                      aria-hidden="true"
                    />
                    {{ $t('contactPage.whatsappBtn') }}
                    <Icon
                      name="mdi:arrow-right"
                      class="w-4 h-4"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>

            <!-- Follow us -->
            <div
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :visible-once="{
                opacity: 1,
                x: 0,
                transition: { delay: 100, duration: 600 },
              }"
              class="rounded-2xl border border-brand-border bg-white shadow-card p-6"
            >
              <h3 class="text-base font-bold text-brand-text-primary mb-1">
                {{ $t('contactPage.followTitle') }}
              </h3>
              <p class="text-sm text-brand-text-muted mb-5">
                {{ $t('contactPage.followText') }}
              </p>

              <div class="space-y-3">
                <a
                  v-for="social in socials"
                  :key="social.label"
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 p-3 rounded-xl border border-brand-border bg-brand-surface transition-all duration-200 group"
                  :class="[social.border, social.hoverText]"
                >
                  <!-- Icon with brand background -->
                  <div
                    class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    :class="social.bg"
                    :style="{ color: social.color }"
                  >
                    <Icon
                      :name="social.icon"
                      class="w-4.5 h-4.5"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-[13px] font-bold text-brand-text-primary leading-none group-hover:text-current transition-colors duration-200"
                    >
                      {{ social.label }}
                    </p>
                    <p class="text-[11px] text-brand-text-muted mt-0.5">
                      {{ social.handle }}
                    </p>
                  </div>
                  <Icon
                    name="mdi:arrow-right"
                    class="w-4 h-4 text-brand-text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-current flex-shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            <!-- Quick info -->
            <div
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :visible-once="{
                opacity: 1,
                x: 0,
                transition: { delay: 180, duration: 600 },
              }"
              class="rounded-2xl border border-brand-border bg-brand-surface p-5 space-y-3"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-lg bg-brand-success/10 flex items-center justify-center flex-shrink-0"
                >
                  <Icon
                    name="mdi:check-circle-outline"
                    class="w-4 h-4 text-brand-success"
                    aria-hidden="true"
                  />
                </div>
                <p class="text-sm text-brand-text-secondary">
                  <span class="font-semibold text-brand-text-primary">{{ $t('contactPage.freeConsult') }}</span>
                  {{ $t('contactPage.freeConsultSub') }}
                </p>
              </div>
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0"
                >
                  <Icon name="mdi:clock-fast" class="w-4 h-4 text-brand-orange" aria-hidden="true" />
                </div>
                <p class="text-sm text-brand-text-secondary">
                  <span class="font-semibold text-brand-text-primary">{{ $t('contactPage.replyTime') }}</span>
                  {{ $t('contactPage.replyTimeSub') }}
                </p>
              </div>
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0"
                >
                  <Icon name="mdi:shield-lock-outline" class="w-4 h-4 text-brand-primary" aria-hidden="true" />
                </div>
                <p class="text-sm text-brand-text-secondary">
                  <span class="font-semibold text-brand-text-primary">{{ $t('contactPage.privateInfo') }}</span>
                  {{ $t('contactPage.privateInfoSub') }}
                </p>
              </div>
            </div>
          </div>

          <!-- ── CONTACT FORM ────────────────────────────────── -->
          <div
            class="lg:col-span-3"
            v-motion
            :initial="{ opacity: 0, x: 24 }"
            :visible-once="{
              opacity: 1,
              x: 0,
              transition: { delay: 100, duration: 600 },
            }"
          >
            <div
              class="rounded-2xl border border-brand-border bg-white shadow-card overflow-hidden"
            >
              <!-- Form header -->
              <div class="px-7 pt-7 pb-5 border-b border-brand-border">
                <h2 class="text-xl font-bold text-brand-text-primary mb-1">
                  {{ $t('contactPage.formTitle') }}
                </h2>
                <p class="text-sm text-brand-text-muted">
                  {{ $t('contactPage.formSubtitle') }}
                </p>
              </div>

              <form class="p-7 space-y-5" @submit.prevent="submit">
                <!-- Name + Phone -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      for="contact-name"
                      class="block text-sm font-semibold text-brand-text-primary mb-1.5"
                    >
                      {{ $t('contactPage.labelName') }} <span class="text-brand-orange">*</span>
                    </label>
                    <div class="relative">
                      <Icon
                        name="mdi:account-outline"
                        class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        id="contact-name"
                        v-model="name.value.value"
                        type="text"
                        :placeholder="$t('contactPage.placeholderName')"
                        autocomplete="name"
                        class="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-brand-text-primary placeholder:text-brand-text-muted bg-white transition-all duration-150 outline-none"
                        :class="
                          name.errorMessage.value
                            ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                            : 'border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10'
                        "
                      />
                    </div>
                    <p
                      v-if="name.errorMessage.value"
                      class="mt-1 text-xs text-red-500 flex items-center gap-1"
                    >
                      <Icon
                        name="mdi:alert-circle-outline"
                        class="w-3.5 h-3.5 flex-shrink-0"
                      />
                      {{ name.errorMessage.value }}
                    </p>
                  </div>

                  <div>
                    <label
                      for="contact-phone"
                      class="block text-sm font-semibold text-brand-text-primary mb-1.5"
                    >
                      {{ $t('contactPage.labelPhone') }}
                      <span class="text-brand-text-muted font-normal text-xs ml-1">{{ $t('contactPage.labelPhoneOptional') }}</span>
                    </label>
                    <div class="relative">
                      <Icon
                        name="mdi:phone-outline"
                        class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        id="contact-phone"
                        v-model="phone.value.value"
                        type="tel"
                        :placeholder="$t('contactPage.placeholderPhone')"
                        autocomplete="tel"
                        class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border text-sm text-brand-text-primary placeholder:text-brand-text-muted bg-white transition-all duration-150 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                      />
                    </div>
                  </div>
                </div>

                <!-- Email -->
                <div>
                  <label
                    for="contact-email"
                    class="block text-sm font-semibold text-brand-text-primary mb-1.5"
                  >
                    {{ $t('contactPage.labelEmail') }} <span class="text-brand-orange">*</span>
                  </label>
                  <div class="relative">
                    <Icon
                      name="mdi:email-outline"
                      class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="contact-email"
                      v-model="email.value.value"
                      type="email"
                      :placeholder="$t('contactPage.placeholderEmail')"
                      autocomplete="email"
                      class="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-brand-text-primary placeholder:text-brand-text-muted bg-white transition-all duration-150 outline-none"
                      :class="
                        email.errorMessage.value
                          ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                          : 'border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10'
                      "
                    />
                  </div>
                  <p
                    v-if="email.errorMessage.value"
                    class="mt-1 text-xs text-red-500 flex items-center gap-1"
                  >
                    <Icon
                      name="mdi:alert-circle-outline"
                      class="w-3.5 h-3.5 flex-shrink-0"
                    />
                    {{ email.errorMessage.value }}
                  </p>
                </div>

                <!-- Service -->
                <div>
                  <label
                    for="contact-service"
                    class="block text-sm font-semibold text-brand-text-primary mb-1.5"
                  >
                    {{ $t('contactPage.labelService') }}
                    <span class="text-brand-orange">*</span>
                  </label>
                  <div class="relative">
                    <Icon
                      name="mdi:lightning-bolt"
                      class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted pointer-events-none"
                      aria-hidden="true"
                    />
                    <select
                      id="contact-service"
                      v-model="service.value.value"
                      class="w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-brand-text-primary bg-white transition-all duration-150 outline-none appearance-none"
                      :class="
                        service.errorMessage.value
                          ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                          : 'border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10'
                      "
                    >
                      <option value="" disabled selected>
                        {{ $t('contactPage.placeholderService') }}
                      </option>
                      <option v-for="svc in services" :key="svc" :value="svc">
                        {{ svc }}
                      </option>
                    </select>
                    <Icon
                      name="mdi:chevron-down"
                      class="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                  <p
                    v-if="service.errorMessage.value"
                    class="mt-1 text-xs text-red-500 flex items-center gap-1"
                  >
                    <Icon
                      name="mdi:alert-circle-outline"
                      class="w-3.5 h-3.5 flex-shrink-0"
                    />
                    {{ service.errorMessage.value }}
                  </p>
                </div>

                <!-- Message -->
                <div>
                  <label
                    for="contact-message"
                    class="block text-sm font-semibold text-brand-text-primary mb-1.5"
                  >
                    {{ $t('contactPage.labelMessage') }} <span class="text-brand-orange">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    v-model="message.value.value"
                    rows="5"
                    :placeholder="$t('contactPage.placeholderMessage')"
                    class="w-full px-4 py-3 rounded-xl border text-sm text-brand-text-primary placeholder:text-brand-text-muted bg-white transition-all duration-150 outline-none resize-none"
                    :class="
                      message.errorMessage.value
                        ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                        : 'border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10'
                    "
                  />
                  <p
                    v-if="message.errorMessage.value"
                    class="mt-1 text-xs text-red-500 flex items-center gap-1"
                  >
                    <Icon
                      name="mdi:alert-circle-outline"
                      class="w-3.5 h-3.5 flex-shrink-0"
                    />
                    {{ message.errorMessage.value }}
                  </p>
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
                  {{ isSubmitting ? $t('contactPage.submitting') : $t('contactPage.submit') }}
                </GradientButton>

                <p
                  class="text-xs text-brand-text-muted text-center flex items-center justify-center gap-1.5"
                >
                  <Icon
                    name="mdi:lock-outline"
                    class="w-3.5 h-3.5"
                    aria-hidden="true"
                  />
                  {{ $t('contactPage.privacy') }}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CtaSection
      title="Not Sure Where to Start?"
      subtitle="Book a free 30-minute strategy call and let's figure out the best plan for your business."
      primary-label="Book a Free Call"
      primary-to="/contact"
      secondary-label="View Our Services"
      secondary-to="/services"
    />
  </div>
</template>
