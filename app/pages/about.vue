<script setup lang="ts">
useSeoMeta({
  title: 'About Us | MetaGenDigital',
  description: 'MetaGenDigital — Bangladesh\'s trusted digital marketing agency based in Uttara, Dhaka. Learn our story, values, and the team behind your brand\'s growth.',
})

const stats = [
  { icon: 'mdi:account-group-outline', value: 50,   suffix: '+', label: 'Happy Clients',      color: 'orange' },
  { icon: 'mdi:rocket-launch-outline', value: 100,  suffix: '+', label: 'Projects Delivered', color: 'purple' },
  { icon: 'mdi:star-outline',          value: 98,   suffix: '%', label: 'Client Satisfaction',color: 'cyan' },
  { icon: 'mdi:calendar-check-outline',value: 3,    suffix: '+', label: 'Years Experience',   color: 'orange' },
]

const values = [
  { icon: 'mdi:target',              title: 'Results First',           description: 'We measure everything. Every strategy we build is anchored to real KPIs — not vanity metrics.', color: 'orange' },
  { icon: 'mdi:handshake-outline',   title: 'Client Partnership',      description: 'We treat every client as a long-term partner, not just a project. Your growth is our growth.',       color: 'purple' },
  { icon: 'mdi:lightbulb-on-outline',title: 'Creative Excellence',     description: 'Bold ideas, refined execution. We push creative boundaries while staying true to your brand.',       color: 'cyan' },
  { icon: 'mdi:shield-check-outline', title: 'Trust & Transparency',  description: 'Clear reporting, honest pricing, and direct communication — no smoke and mirrors, ever.',            color: 'orange' },
  { icon: 'mdi:chart-line',          title: 'Data-Driven Decisions',   description: "Analytics guide every campaign. We use real data to optimise and scale what's already working.",     color: 'purple' },
  { icon: 'mdi:clock-fast',          title: 'Always On Time',          description: 'Deadlines are sacred. We plan meticulously and deliver on schedule — every single time.',            color: 'cyan' },
]

const team = [
  {
    name: 'MD. Tanvir Hossain',
    role: 'Founder & CEO',
    bio: 'Visionary leader with deep expertise in digital marketing strategy and brand growth across Bangladesh.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&q=80&auto=format&fit=crop&crop=face',
    socials: { linkedin: '#', facebook: '#' },
  },
  {
    name: 'Nusrat Jahan',
    role: 'Head of Social Media',
    bio: 'Social media strategist who has grown brand communities to tens of thousands of engaged followers.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&q=80&auto=format&fit=crop&crop=face',
    socials: { linkedin: '#', facebook: '#' },
  },
  {
    name: 'Arif Rahman',
    role: 'Lead Web Developer',
    bio: 'Full-stack developer specialising in high-performance websites and custom e-commerce solutions.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&q=80&auto=format&fit=crop&crop=face',
    socials: { linkedin: '#', facebook: '#' },
  },
  {
    name: 'Sadia Islam',
    role: 'Creative Director',
    bio: 'Brand designer and photographer with an eye for visual storytelling that stops the scroll.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&q=80&auto=format&fit=crop&crop=face',
    socials: { linkedin: '#', facebook: '#' },
  },
]

const services = [
  { icon: 'mdi:trending-up',      label: 'Digital Marketing',        color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { icon: 'mdi:instagram',        label: 'Social Media Marketing',   color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
  { icon: 'mdi:camera-outline',   label: 'Photography & Videography',color: 'text-brand-cyan',   bg: 'bg-brand-cyan/10' },
  { icon: 'mdi:monitor-shimmer',  label: 'Website Development',      color: 'text-brand-primary',bg: 'bg-brand-primary/10' },
  { icon: 'mdi:shopping-outline', label: 'E-commerce Development',   color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { icon: 'mdi:palette-outline',  label: 'Branding & Graphic Design',color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
]

const contactDetails = [
  { icon: 'mdi:map-marker-outline', label: 'Address',       value: 'Kamarpara, Uttara, Dhaka, Bangladesh',     href: 'https://maps.google.com/?q=Kamarpara,Uttara,Dhaka', color: 'orange', external: true },
  { icon: 'mdi:phone-outline',      label: 'Phone',         value: '+88 01970-222573',                          href: 'tel:+8801970222573', color: 'purple' },
  { icon: 'mdi:email-outline',      label: 'Email',         value: 'hello@metagendigital.com',                  href: 'mailto:hello@metagendigital.com', color: 'cyan' },
  { icon: 'mdi:email-outline',      label: 'Alt Email',     value: 'metagendigital@gmail.com',                  href: 'mailto:metagendigital@gmail.com', color: 'cyan' },
  { icon: 'mdi:web',                label: 'Website',       value: 'www.metagendigital.com',                    href: 'https://www.metagendigital.com', color: 'orange', external: true },
  { icon: 'mdi:clock-outline',      label: 'Working Hours', value: 'Sunday – Thursday, 9am – 6pm (BST)',       color: 'purple' },
]

const socials = [
  { icon: 'mdi:facebook',  href: 'https://www.facebook.com/MetagenDigital',  label: 'Facebook',  handle: '@MetagenDigital', color: 'hover:text-[#4c76be] hover:border-[#4c76be]/30' },
  { icon: 'mdi:instagram', href: 'https://www.instagram.com/MetagenDigital', label: 'Instagram', handle: '@MetagenDigital', color: 'hover:text-[#e1306c] hover:border-[#e1306c]/30' },
  { icon: 'mdi:linkedin',  href: 'https://www.linkedin.com/company/MetagenDigital', label: 'LinkedIn', handle: 'MetagenDigital', color: 'hover:text-[#0b86ca] hover:border-[#0b86ca]/30' },
  { icon: 'mdi:youtube',   href: 'https://www.youtube.com/@MetagenDigital', label: 'YouTube',   handle: '@MetagenDigital', color: 'hover:text-[#fd3832] hover:border-[#fd3832]/30' },
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

const iconContactBg: Record<string, string> = {
  orange: 'bg-brand-orange/10 text-brand-orange',
  purple: 'bg-brand-purple/10 text-brand-purple',
  cyan:   'bg-brand-cyan/10   text-brand-cyan',
}
</script>

<template>
  <div>

    <!-- ── HERO ─────────────────────────────────────────────── -->
    <section class="relative pt-32 pb-20 bg-brand-surface border-b border-brand-border overflow-hidden">
      <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <!-- Orbs -->
      <div class="absolute -left-32 top-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none" style="background:rgba(48,60,142,0.07)" aria-hidden="true" />
      <div class="absolute -right-20 bottom-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style="background:rgba(124,58,237,0.07)" aria-hidden="true" />

      <div class="container-content relative z-10">
        <AppBreadcrumb :crumbs="[{ label: 'About Us' }]" class="mb-6" />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -24 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 700 } }"
          >
            <SectionBadge icon="mdi:information-outline" color="primary" class="mb-5">About Us</SectionBadge>
            <h1 class="text-brand-text-primary mt-4 mb-5">
              We Are <span class="gradient-text">MetaGenDigital</span>
            </h1>
            <p class="text-lg text-brand-text-secondary leading-relaxed mb-6 max-w-lg">
              A passionate digital agency from Uttara, Dhaka — helping Bangladesh businesses grow online
              through creative marketing, stunning web experiences, and data-driven strategies.
            </p>

            <!-- Service chips -->
            <div class="flex flex-wrap gap-2 mb-8">
              <div
                v-for="svc in services"
                :key="svc.label"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-border bg-white text-xs font-medium text-brand-text-secondary"
              >
                <span class="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" :class="svc.bg">
                  <Icon :name="svc.icon" class="w-3 h-3" :class="svc.color" aria-hidden="true" />
                </span>
                {{ svc.label }}
              </div>
            </div>

            <div class="flex gap-3 flex-wrap">
              <GradientButton to="/services" icon-right="mdi:arrow-right">Our Services</GradientButton>
              <GradientButton to="/contact" variant="outline" icon="mdi:chat-outline">Get In Touch</GradientButton>
            </div>
          </div>

          <!-- Right: image + floating badges -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 32, scale: 0.96 }"
            :enter="{ opacity: 1, x: 0, scale: 1, transition: { delay: 200, duration: 700 } }"
            class="relative hidden lg:block"
          >
            <div class="relative rounded-3xl overflow-hidden shadow-card-hover ring-1 ring-brand-border">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop"
                alt="MetaGenDigital team at work"
                class="w-full h-auto object-cover"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent" />
            </div>

            <!-- Badge: location -->
            <div
              class="absolute -bottom-5 -left-5 flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-card-hover border border-brand-border animate-float"
              aria-hidden="true"
            >
              <div class="w-9 h-9 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                <Icon name="mdi:map-marker" class="w-5 h-5 text-brand-orange" aria-hidden="true" />
              </div>
              <div>
                <p class="text-[11px] font-bold text-brand-text-primary leading-none">Based in Dhaka</p>
                <p class="text-[10px] text-brand-text-muted mt-0.5">Kamarpara, Uttara</p>
              </div>
            </div>

            <!-- Badge: founded -->
            <div
              class="absolute -top-4 -right-4 flex items-center gap-2.5 px-3.5 py-2.5 bg-white rounded-xl shadow-card border border-brand-border animate-float"
              style="animation-delay:1s"
              aria-hidden="true"
            >
              <div class="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center">
                <Icon name="mdi:trophy-outline" class="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <div>
                <p class="text-[11px] font-bold text-brand-text-primary leading-none">Est. 2021</p>
                <p class="text-[10px] text-brand-text-muted mt-0.5">3+ Years Strong</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── STATS BANNER ──────────────────────────────────────── -->
    <section class="py-14 bg-white">
      <div class="container-content">
        <div class="relative overflow-hidden rounded-card bg-gradient-brand p-px">
          <div class="relative rounded-[15px] bg-gradient-brand px-6 py-12">
            <div class="absolute inset-0 bg-grid-pattern bg-grid opacity-10 rounded-[15px] pointer-events-none" aria-hidden="true" />
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              <div
                v-for="(stat, i) in stats"
                :key="stat.label"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 500 } }"
                class="text-center"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <Icon :name="stat.icon" class="w-5 h-5 text-white/70" aria-hidden="true" />
                </div>
                <StatCounter
                  :value="stat.value"
                  :suffix="stat.suffix"
                  :label="stat.label"
                  class="[&_.gradient-text]:!text-white [&_.gradient-text]:!bg-none [&_p]:!text-white/70"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── OUR STORY ─────────────────────────────────────────── -->
    <section class="section-padding bg-brand-surface" aria-label="Our Story">
      <div class="container-content">

        <!-- Section heading -->
        <div class="text-center mb-14">
          <SectionBadge icon="mdi:book-open-outline" color="orange" class="mb-4">Our Story</SectionBadge>
          <h2 class="text-brand-text-primary mt-4 mb-4">
            Built to Help Brands
            <span class="gradient-text"> Win Online</span>
          </h2>
          <p class="text-brand-text-secondary max-w-2xl mx-auto">
            From a creative team in Uttara, Dhaka — to a full-service digital agency serving clients across
            Bangladesh and internationally.
          </p>
        </div>

        <!-- Two-column: image left, content right -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          <!-- Image side -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -24 }"
            :visible-once="{ opacity: 1, x: 0, transition: { duration: 600 } }"
            class="relative"
          >
            <!-- Main image -->
            <div class="relative rounded-3xl overflow-hidden shadow-card-hover ring-1 ring-brand-border">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop"
                alt="MetaGenDigital strategy session"
                class="w-full h-auto object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent" />
            </div>

            <!-- Floating stat card — bottom right overlap -->
            <div
              class="absolute -bottom-6 -right-4 md:right-8 bg-white rounded-2xl shadow-card-hover border border-brand-border px-5 py-4 flex items-center gap-4 animate-float"
              aria-hidden="true"
            >
              <div class="w-11 h-11 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:earth" class="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p class="text-[13px] font-extrabold text-brand-text-primary leading-none">Global Reach</p>
                <p class="text-[11px] text-brand-text-muted mt-0.5">Local roots · International clients</p>
              </div>
            </div>

            <!-- Floating badge — top left -->
            <div
              class="absolute -top-4 -left-4 bg-white rounded-2xl shadow-card border border-brand-border px-4 py-3 flex items-center gap-3 animate-float"
              style="animation-delay:0.8s"
              aria-hidden="true"
            >
              <div class="w-9 h-9 rounded-xl bg-brand-success/10 flex items-center justify-center">
                <Icon name="mdi:check-decagram" class="w-5 h-5 text-brand-success" aria-hidden="true" />
              </div>
              <div>
                <p class="text-[11px] font-bold text-brand-text-primary leading-none">Est. 2021</p>
                <p class="text-[10px] text-brand-text-muted mt-0.5">3+ Years of Excellence</p>
              </div>
            </div>

            <!-- Decorative accent blocks -->
            <div class="absolute -bottom-6 -left-6 w-28 h-28 rounded-3xl bg-brand-orange/8 -z-10" aria-hidden="true" />
            <div class="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-brand-primary/8 -z-10" aria-hidden="true" />
          </div>

          <!-- Content side -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 24 }"
            :visible-once="{ opacity: 1, x: 0, transition: { delay: 100, duration: 600 } }"
            class="flex flex-col gap-6"
          >
            <!-- Story paragraphs as modern cards -->
            <div class="flex gap-4 p-5 rounded-2xl border border-brand-border bg-white shadow-card group hover:shadow-card-hover hover:border-brand-orange/30 transition-all duration-300">
              <div class="w-10 h-10 flex-shrink-0 rounded-xl bg-brand-orange/10 flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <Icon name="mdi:flag-outline" class="w-5 h-5 text-brand-orange" aria-hidden="true" />
              </div>
              <div>
                <h3 class="text-[15px] font-bold text-brand-text-primary mb-1">How We Started</h3>
                <p class="text-sm text-brand-text-secondary leading-relaxed">
                  MetaGenDigital was founded in 2021 with one clear goal — to give businesses access to world-class
                  digital marketing that actually delivers results. We started small in Kamarpara, Uttara, Dhaka, with
                  a passionate team and a big vision.
                </p>
              </div>
            </div>

            <div class="flex gap-4 p-5 rounded-2xl border border-brand-border bg-white shadow-card group hover:shadow-card-hover hover:border-brand-purple/30 transition-all duration-300">
              <div class="w-10 h-10 flex-shrink-0 rounded-xl bg-brand-purple/10 flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <Icon name="mdi:earth" class="w-5 h-5 text-brand-purple" aria-hidden="true" />
              </div>
              <div>
                <h3 class="text-[15px] font-bold text-brand-text-primary mb-1">Local Roots, Global Reach</h3>
                <p class="text-sm text-brand-text-secondary leading-relaxed">
                  What started as a local agency has grown into a full-service team serving clients both across
                  Bangladesh and internationally. From Dhaka startups to overseas brands — we bring the same
                  dedication, creativity, and results-focus to every project.
                </p>
              </div>
            </div>

            <div class="flex gap-4 p-5 rounded-2xl border border-brand-border bg-white shadow-card group hover:shadow-card-hover hover:border-brand-cyan/30 transition-all duration-300">
              <div class="w-10 h-10 flex-shrink-0 rounded-xl bg-brand-cyan/10 flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <Icon name="mdi:chart-line" class="w-5 h-5 text-brand-cyan" aria-hidden="true" />
              </div>
              <div>
                <h3 class="text-[15px] font-bold text-brand-text-primary mb-1">Where We Are Today</h3>
                <p class="text-sm text-brand-text-secondary leading-relaxed">
                  Today we combine sharp strategy, creative execution, and performance analytics to help 50+ clients
                  stand out in a competitive digital landscape — and achieve sustainable, measurable growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── MISSION + VISION ──────────────────────────────────── -->
    <section class="py-16 md:py-20 bg-white" aria-label="Mission and Vision">
      <div class="container-content">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Mission -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="relative overflow-hidden rounded-card border border-brand-border bg-white shadow-card p-8 group hover:shadow-card-hover hover:border-brand-primary/30 transition-all duration-300"
          >
            <div class="h-1 absolute top-0 left-0 right-0 bg-brand-primary rounded-t-card" />
            <div class="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 text-brand-primary mb-6 transition-transform duration-300 group-hover:scale-110">
              <Icon name="mdi:flag-outline" class="w-7 h-7" aria-hidden="true" />
            </div>
            <h3 class="text-xl font-bold text-brand-text-primary mb-3">Our Mission</h3>
            <p class="text-brand-text-secondary leading-relaxed">
              To empower Bangladeshi businesses with world-class digital marketing, creative content, and
              technology solutions — enabling them to compete and win in the global digital economy.
              We build partnerships, not just campaigns.
            </p>
          </div>

          <!-- Vision -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: 120, duration: 600 } }"
            class="relative overflow-hidden rounded-card border border-brand-border bg-white shadow-card p-8 group hover:shadow-card-hover hover:border-brand-purple/30 transition-all duration-300"
          >
            <div class="h-1 absolute top-0 left-0 right-0 bg-brand-purple rounded-t-card" />
            <div class="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple/20 to-brand-purple/5 text-brand-purple mb-6 transition-transform duration-300 group-hover:scale-110">
              <Icon name="mdi:eye-outline" class="w-7 h-7" aria-hidden="true" />
            </div>
            <h3 class="text-xl font-bold text-brand-text-primary mb-3">Our Vision</h3>
            <p class="text-brand-text-secondary leading-relaxed">
              To become the most trusted and results-driven digital agency in Bangladesh — recognised for our
              creativity, integrity, and the measurable impact we create for every client we work with.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── OUR VALUES ────────────────────────────────────────── -->
    <section class="section-padding bg-brand-surface" aria-label="Our Values">
      <div class="container-content">
        <div class="text-center mb-14">
          <SectionBadge icon="mdi:heart-outline" color="purple" class="mb-4">Our Values</SectionBadge>
          <h2 class="text-brand-text-primary mt-4 mb-4">
            What We
            <span class="gradient-text"> Believe In</span>
          </h2>
          <p class="text-brand-text-secondary max-w-xl mx-auto">
            Our values shape every decision we make — from how we build campaigns to how we talk to clients.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(value, i) in values"
            :key="value.title"
            v-motion
            :initial="{ opacity: 0, y: 28 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 80, duration: 500 } }"
            class="group relative flex flex-col overflow-hidden rounded-card border border-brand-border bg-white shadow-card transition-all duration-300"
            :class="{
              'hover:border-brand-orange/30 hover:shadow-glow-orange': value.color === 'orange',
              'hover:border-brand-purple/30 hover:shadow-glow-purple': value.color === 'purple',
              'hover:border-brand-cyan/30   hover:shadow-glow-cyan':   value.color === 'cyan',
            }"
          >
            <div class="h-1 w-full flex-shrink-0" :class="accentBar[value.color]" />
            <div class="p-5 flex gap-4 items-start">
              <div
                class="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                :class="iconGradient[value.color]"
              >
                <Icon :name="value.icon" class="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 class="text-[15px] font-bold text-brand-text-primary mb-1">{{ value.title }}</h3>
                <p class="text-sm text-brand-text-secondary leading-relaxed">{{ value.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── OUR TEAM ───────────────────────────────────────────── -->
    <section class="section-padding bg-white" aria-label="Our Team">
      <div class="container-content">
        <div class="text-center mb-14">
          <SectionBadge icon="mdi:account-group-outline" color="cyan" class="mb-4">Our Team</SectionBadge>
          <h2 class="text-brand-text-primary mt-4 mb-4">
            The Experts Behind
            <span class="gradient-text"> Your Growth</span>
          </h2>
          <p class="text-brand-text-secondary max-w-xl mx-auto">
            A tight-knit team of marketers, developers, designers, and creatives — all dedicated to your success.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(member, i) in team"
            :key="member.name"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 90, duration: 500 } }"
            class="group flex flex-col rounded-card border border-brand-border bg-white shadow-card hover:shadow-card-hover hover:border-brand-primary/20 transition-all duration-300 overflow-hidden"
          >
            <!-- Avatar -->
            <div class="relative aspect-square overflow-hidden bg-brand-surface">
              <img
                :src="member.avatar"
                :alt="member.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <!-- Social overlay -->
              <div class="absolute bottom-3 left-0 right-0 flex justify-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <a :href="member.socials.linkedin" class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-primary hover:bg-[#0b86ca] hover:text-white transition-colors duration-150" aria-label="LinkedIn">
                  <Icon name="mdi:linkedin" class="w-4 h-4" aria-hidden="true" />
                </a>
                <a :href="member.socials.facebook" class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-primary hover:bg-[#4c76be] hover:text-white transition-colors duration-150" aria-label="Facebook">
                  <Icon name="mdi:facebook" class="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <!-- Info -->
            <div class="p-5">
              <h3 class="text-[15px] font-bold text-brand-text-primary mb-0.5">{{ member.name }}</h3>
              <p class="text-xs font-semibold text-brand-orange mb-2 uppercase tracking-wide">{{ member.role }}</p>
              <p class="text-xs text-brand-text-secondary leading-relaxed">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CONTACT INFO ───────────────────────────────────────── -->
    <section class="section-padding bg-brand-surface" aria-label="Contact Information">
      <div class="container-content">

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          <!-- Left: heading + map placeholder -->
          <div class="lg:col-span-2">
            <SectionBadge icon="mdi:map-marker-outline" color="orange" class="mb-5">Find Us</SectionBadge>
            <h2 class="text-brand-text-primary mt-4 mb-4">
              Get In
              <span class="gradient-text"> Touch</span>
            </h2>
            <p class="text-brand-text-secondary mb-8 leading-relaxed">
              We're based in Uttara, Dhaka and available Sunday to Thursday. Reach us through any channel below — we usually reply within a few hours.
            </p>

            <!-- Social links -->
            <div>
              <p class="text-xs text-brand-text-muted uppercase tracking-widest font-semibold mb-4">Follow Us</p>
              <div class="flex flex-wrap gap-3">
                <a
                  v-for="social in socials"
                  :key="social.label"
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="social.label"
                  class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-brand-border text-brand-text-secondary text-xs font-semibold transition-all duration-200"
                  :class="social.color"
                >
                  <Icon :name="social.icon" class="w-4 h-4" aria-hidden="true" />
                  {{ social.handle }}
                </a>
              </div>
            </div>
          </div>

          <!-- Right: contact detail cards -->
          <div class="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="(detail, i) in contactDetails"
              :key="detail.label + i"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 70, duration: 450 } }"
              class="group flex items-start gap-4 p-4 rounded-card border border-brand-border bg-white shadow-card hover:shadow-card-hover transition-all duration-250"
              :class="{
                'hover:border-brand-orange/30': detail.color === 'orange',
                'hover:border-brand-purple/30': detail.color === 'purple',
                'hover:border-brand-cyan/30':   detail.color === 'cyan',
              }"
            >
              <div
                class="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 transition-transform duration-250 group-hover:scale-110"
                :class="iconContactBg[detail.color]"
              >
                <Icon :name="detail.icon" class="w-5 h-5" aria-hidden="true" />
              </div>
              <div class="min-w-0">
                <p class="text-[10px] text-brand-text-muted uppercase tracking-widest font-semibold mb-0.5">{{ detail.label }}</p>
                <a
                  v-if="detail.href"
                  :href="detail.href"
                  :target="detail.external ? '_blank' : undefined"
                  :rel="detail.external ? 'noopener noreferrer' : undefined"
                  class="text-sm font-medium text-brand-text-primary hover:text-brand-primary transition-colors duration-150 break-words"
                >
                  {{ detail.value }}
                </a>
                <p v-else class="text-sm font-medium text-brand-text-primary">{{ detail.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────── -->
    <CtaSection
      title="Ready to Grow Your Business?"
      subtitle="Let's build something great together. Tell us about your project and we'll get back within 24 hours."
      primary-label="Start a Project"
      primary-to="/contact"
      secondary-label="View Our Work"
      secondary-to="/portfolio"
    />

  </div>
</template>
