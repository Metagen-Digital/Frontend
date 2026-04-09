<script setup lang="ts">
const route = useRoute()

interface ServiceFeature { icon: string; title: string; desc: string }
interface ProcessStep    { step: string; icon: string; title: string; desc: string }
interface FaqItem        { q: string; a: string }
interface ServiceData {
  name: string
  icon: string
  tagline: string
  overview: string
  color: 'orange' | 'purple' | 'cyan'
  heroStats: { value: string; label: string }[]
  features: ServiceFeature[]
  process: ProcessStep[]
  benefits: string[]
  faq: FaqItem[]
}

const serviceMap: Record<string, ServiceData> = {
  'digital-marketing': {
    name: 'Digital Marketing',
    icon: 'mdi:trending-up',
    tagline: 'ROI-focused campaigns that scale your business',
    overview: 'We design and execute data-driven digital marketing strategies that deliver measurable, scalable results. From search ads to social campaigns, every decision is backed by data and optimized for maximum return on investment.',
    color: 'orange',
    heroStats: [
      { value: '3×', label: 'Average ROI' },
      { value: '200+', label: 'Campaigns Run' },
      { value: '95%', label: 'Client Retention' },
    ],
    features: [
      { icon: 'mdi:google', title: 'Google Ads', desc: 'Search, Display, and Shopping campaigns optimized for conversions and lowest cost-per-click.' },
      { icon: 'mdi:facebook', title: 'Meta Ads', desc: 'Facebook and Instagram ad campaigns with precise audience targeting and creative A/B testing.' },
      { icon: 'mdi:magnify', title: 'SEO Optimization', desc: 'Technical SEO, on-page content, and link building to rank higher and drive organic traffic.' },
      { icon: 'mdi:chart-line', title: 'Analytics & Reporting', desc: 'Custom dashboards and weekly reports so you always know exactly where your budget is going.' },
      { icon: 'mdi:target', title: 'Conversion Rate Optimization', desc: 'Landing page A/B testing and funnel analysis to turn more visitors into paying customers.' },
      { icon: 'mdi:email-outline', title: 'Email Marketing', desc: 'Automated email sequences and newsletters that nurture leads and retain existing customers.' },
    ],
    process: [
      { step: '01', icon: 'mdi:magnify', title: 'Discovery & Audit', desc: 'We analyze your digital presence, competitors, and audience to identify the biggest opportunities.' },
      { step: '02', icon: 'mdi:lightbulb-outline', title: 'Strategy Build', desc: 'A custom marketing roadmap with clear KPIs, channel mix, and budget allocation.' },
      { step: '03', icon: 'mdi:rocket-launch-outline', title: 'Launch & Test', desc: 'We launch campaigns, test creatives and audiences, and gather real performance data quickly.' },
      { step: '04', icon: 'mdi:chart-bar', title: 'Optimize & Scale', desc: 'Continuously refine based on data — cutting what\'s not working and scaling what is.' },
    ],
    benefits: [
      'Transparent weekly reporting with no jargon',
      'Dedicated account manager, always reachable',
      'No long-term lock-in contracts',
      'Real-time campaign dashboard access',
      'Creative production included in all plans',
    ],
    faq: [
      { q: 'How soon will I see results?', a: 'Paid ads typically show results within 2–4 weeks. SEO takes 3–6 months for meaningful organic growth, with compounding returns over time.' },
      { q: 'What\'s the minimum ad spend budget?', a: 'We recommend a minimum of $500/month in ad spend for meaningful data. We can work with tighter budgets for local or niche campaigns.' },
      { q: 'Do you handle ad creatives?', a: 'Yes — our team handles copy, design, and video creatives for all campaigns. You review and approve before anything goes live.' },
      { q: 'How do you measure success?', a: 'We set clear KPIs in week one — ROAS, CPL, CPA, or whatever matters most to your business — and report against them every week.' },
    ],
  },

  'social-media-marketing': {
    name: 'Social Media Marketing',
    icon: 'mdi:instagram',
    tagline: 'Build community, drive engagement, grow your brand',
    overview: 'From content strategy to daily community management — we handle your entire social media presence so you can focus on running your business. We grow engaged audiences that actually convert into customers.',
    color: 'purple',
    heroStats: [
      { value: '5M+', label: 'Total Reach Generated' },
      { value: '40+', label: 'Brands Managed' },
      { value: '8×', label: 'Avg. Engagement Lift' },
    ],
    features: [
      { icon: 'mdi:file-document-edit-outline', title: 'Content Strategy', desc: 'Monthly content calendars aligned with your brand voice, trending topics, and campaign goals.' },
      { icon: 'mdi:account-group-outline', title: 'Community Management', desc: 'Daily monitoring, comment replies, DM management, and community building across all platforms.' },
      { icon: 'mdi:palette-outline', title: 'Creative Production', desc: 'On-brand graphics, reels, carousels, and stories — designed and posted consistently.' },
      { icon: 'mdi:handshake-outline', title: 'Influencer Outreach', desc: 'Identifying and partnering with the right micro and macro influencers in your niche.' },
      { icon: 'mdi:chart-areaspline', title: 'Performance Tracking', desc: 'Monthly analytics reports covering reach, engagement, follower growth, and conversion metrics.' },
      { icon: 'mdi:shopping-outline', title: 'Social Commerce', desc: 'Setting up Instagram Shopping and Facebook Shops with shoppable content to drive direct sales.' },
    ],
    process: [
      { step: '01', icon: 'mdi:ear-hearing', title: 'Brand Deep Dive', desc: 'We study your brand, competitors, audience demographics, and existing content to find what resonates.' },
      { step: '02', icon: 'mdi:map-outline', title: 'Content Roadmap', desc: 'A 30-day content calendar with post types, captions, hashtags, and publishing schedule.' },
      { step: '03', icon: 'mdi:creation-outline', title: 'Create & Publish', desc: 'We produce all content in-house. You review and approve before anything goes live.' },
      { step: '04', icon: 'mdi:repeat', title: 'Analyse & Improve', desc: 'Monthly reviews to see what\'s growing, what\'s flopping, and how to keep improving.' },
    ],
    benefits: [
      'Consistent daily posting — never miss a schedule',
      'All content approved by you before publishing',
      'Covers Instagram, Facebook, TikTok, LinkedIn & more',
      'Monthly growth reports with real, transparent numbers',
      'Crisis management and reputation monitoring included',
    ],
    faq: [
      { q: 'How many posts per week?', a: 'Typically 4–7 posts per week per platform, including stories and reels — depending on your plan.' },
      { q: 'Do I lose access to my accounts?', a: 'Never. You always own your accounts. We manage as collaborators and you can revoke access anytime.' },
      { q: 'What platforms do you cover?', a: 'Instagram, Facebook, TikTok, LinkedIn, Twitter/X, Pinterest, and YouTube Shorts.' },
      { q: 'Can I approve content before it posts?', a: 'Absolutely. We use a content calendar tool where you can review, comment, and approve everything in advance.' },
    ],
  },

  'photography-videography': {
    name: 'Photography & Videography',
    icon: 'mdi:camera',
    tagline: 'Visual storytelling that captures and converts',
    overview: 'Professional photography and videography that transforms how the world sees your brand. We specialize in product shoots, cinematic brand films, and scroll-stopping social content that performs and sells.',
    color: 'cyan',
    heroStats: [
      { value: '500+', label: 'Shoots Completed' },
      { value: '4K', label: 'Ultra HD Video' },
      { value: '2-day', label: 'Avg. Turnaround' },
    ],
    features: [
      { icon: 'mdi:camera-outline', title: 'Product Photography', desc: 'Studio and lifestyle product shoots optimized for e-commerce listings, ads, and printed catalogs.' },
      { icon: 'mdi:video-outline', title: 'Brand Films', desc: 'Cinematic brand stories that communicate your values and connect emotionally with your audience.' },
      { icon: 'mdi:phone-portrait-outline', title: 'Social Media Reels', desc: 'Short-form vertical videos designed for Instagram, TikTok, and YouTube Shorts — edited to stop the scroll.' },
      { icon: 'mdi:image-edit-outline', title: 'Professional Editing', desc: 'Color grading, retouching, and post-production to ensure every image and video is flawless.' },
      { icon: 'mdi:store-outline', title: 'Event & In-Store Coverage', desc: 'Product launches, brand events, and in-store photography for marketing and PR use.' },
      { icon: 'mdi:drone', title: 'Aerial Drone Shots', desc: 'Cinematic drone cinematography for real estate, events, and sweeping establishing shots.' },
    ],
    process: [
      { step: '01', icon: 'mdi:phone-outline', title: 'Creative Brief Call', desc: 'We discuss your vision, brand aesthetic, shot list, and deliverables before any camera comes out.' },
      { step: '02', icon: 'mdi:clipboard-list-outline', title: 'Pre-Production', desc: 'Location scouting, prop sourcing, styling prep, and scheduling — all handled by our team.' },
      { step: '03', icon: 'mdi:camera-outline', title: 'Shoot Day', desc: 'Our professional crew guides the entire shoot to ensure every item on the list is captured perfectly.' },
      { step: '04', icon: 'mdi:image-filter-hdr', title: 'Edit & Deliver', desc: 'Full post-production within 2 business days. Files delivered in all formats you need.' },
    ],
    benefits: [
      'Professional studio and on-location shoots anywhere',
      'All equipment provided — lights, gimbal, drone included',
      'Delivered in all formats: web, print, and social',
      'Unlimited revision rounds on final edited deliverables',
      'Full commercial usage rights on every file',
    ],
    faq: [
      { q: 'How quickly will I receive my photos or videos?', a: 'Product photos within 24–48 hours. Videos and brand films within 3–5 business days depending on complexity.' },
      { q: 'Do you provide models or props?', a: 'Yes — we can source models, stylists, and props as part of a full-service production package.' },
      { q: 'What file formats do you deliver?', a: 'Photos: RAW + JPG/WebP in multiple resolutions. Videos: MP4 in 4K, 1080p, and social-specific aspect ratios (9:16, 1:1, 16:9).' },
      { q: 'Can you shoot at our business location?', a: 'Yes. We do on-location shoots at your store, office, or any chosen location. Travel costs may apply beyond a certain range.' },
    ],
  },

  'website-development': {
    name: 'Website Development',
    icon: 'mdi:web',
    tagline: 'Fast, beautiful, SEO-ready websites that convert',
    overview: 'We build custom websites that are blazing fast, mobile-first, and designed to convert visitors into customers. From landing pages to full business websites — every pixel is intentional and every line of code serves a purpose.',
    color: 'orange',
    heroStats: [
      { value: '100', label: 'Lighthouse Score' },
      { value: '60+', label: 'Sites Delivered' },
      { value: '<2s', label: 'Avg. Page Load' },
    ],
    features: [
      { icon: 'mdi:palette-outline', title: 'Custom UI Design', desc: 'Unique, on-brand designs tailored to your industry — no generic templates, ever.' },
      { icon: 'mdi:cellphone', title: 'Mobile-First & Responsive', desc: 'Pixel-perfect experience across all devices — phones, tablets, and desktops.' },
      { icon: 'mdi:lightning-bolt-outline', title: 'Performance Optimized', desc: 'Sub-2 second load times, optimized Core Web Vitals, and 90+ Lighthouse scores built in.' },
      { icon: 'mdi:magnify-scan', title: 'SEO Architecture', desc: 'Clean URLs, semantic HTML, schema markup, and meta optimization built from day one.' },
      { icon: 'mdi:content-save-outline', title: 'CMS Integration', desc: 'Editable content via WordPress, Sanity, or a custom CMS — update your site without code.' },
      { icon: 'mdi:shield-check-outline', title: 'Security & Maintenance', desc: 'SSL, uptime monitoring, daily backups, and monthly maintenance plans to keep things running perfectly.' },
    ],
    process: [
      { step: '01', icon: 'mdi:chat-outline', title: 'Discovery Workshop', desc: 'We understand your goals, competitors, and desired user flow before designing a single screen.' },
      { step: '02', icon: 'mdi:vector-square', title: 'Wireframe & Design', desc: 'We share wireframes and high-fidelity Figma designs for your review and approval.' },
      { step: '03', icon: 'mdi:code-braces', title: 'Development', desc: 'Clean, maintainable code on the agreed tech stack — no bloated page builders or heavy themes.' },
      { step: '04', icon: 'mdi:rocket-launch-outline', title: 'QA & Launch', desc: 'Cross-browser testing, speed optimization, and a smooth handover with training and documentation.' },
    ],
    benefits: [
      'Source code ownership — it\'s yours forever, no licensing fees',
      'Built for speed: Core Web Vitals and SEO optimized',
      'Editable by your team without any developer help',
      '30 days of post-launch support included free',
      'Integrations with CRM, analytics, and marketing tools',
    ],
    faq: [
      { q: 'How long does a website take to build?', a: 'A standard business website takes 3–5 weeks. E-commerce or custom web apps may take 6–10 weeks depending on scope.' },
      { q: 'What technology do you build with?', a: 'We use Nuxt.js, Next.js, and WordPress primarily. We match the technology to your needs and budget.' },
      { q: 'Will I be able to update the site myself?', a: 'Yes — we include a CMS for all content and provide training so your team can make updates confidently without a developer.' },
      { q: 'Do you offer hosting?', a: 'We recommend and configure hosting for you, or deploy to your existing server. We don\'t lock you into our infrastructure.' },
    ],
  },

  'ecommerce-development': {
    name: 'E-commerce Development',
    icon: 'mdi:shopping',
    tagline: 'Online stores built to sell around the clock',
    overview: 'Full-featured e-commerce solutions designed to maximize sales. From product catalog setup to checkout optimization — we build stores that convert browsers into buyers and scale with your business.',
    color: 'purple',
    heroStats: [
      { value: '40+', label: 'Stores Launched' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '2.8%', label: 'Avg. Conversion Rate' },
    ],
    features: [
      { icon: 'mdi:storefront-outline', title: 'Shopify Development', desc: 'Custom Shopify themes, app integrations, and Shopify Plus solutions for scaling brands.' },
      { icon: 'mdi:wordpress', title: 'WooCommerce Stores', desc: 'Flexible WordPress-based stores with full control over design, products, and checkout flow.' },
      { icon: 'mdi:credit-card-outline', title: 'Payment Integration', desc: 'Stripe, PayPal, bKash, Nagad, Rocket, and 50+ payment gateways configured and tested.' },
      { icon: 'mdi:package-variant', title: 'Inventory & Orders', desc: 'Real-time stock tracking, low-stock alerts, and order fulfillment workflow automation.' },
      { icon: 'mdi:truck-outline', title: 'Shipping & Logistics', desc: 'Automated shipping rates, carrier integrations with Pathao, RedX, Steadfast, and delivery tracking.' },
      { icon: 'mdi:chart-line-variant', title: 'Conversion Optimization', desc: 'Checkout flow optimization, cart abandonment recovery, and upsell/cross-sell setups built in.' },
    ],
    process: [
      { step: '01', icon: 'mdi:store-outline', title: 'Store Planning', desc: 'We map out your product catalog, categories, customer journey, and revenue goals together.' },
      { step: '02', icon: 'mdi:draw-pen', title: 'Design & UX', desc: 'Brand-aligned store design focused on product discovery, trust signals, and conversion rates.' },
      { step: '03', icon: 'mdi:cog-outline', title: 'Build & Integrate', desc: 'Full store development with all products, payments, shipping, and 3rd party tools connected.' },
      { step: '04', icon: 'mdi:test-tube-outline', title: 'Test & Go Live', desc: 'End-to-end order testing, performance checks, and a smooth, stress-free public launch.' },
    ],
    benefits: [
      'Mobile-optimized checkout with high conversion rates',
      'Local payment gateways: bKash, Nagad, Rocket supported',
      'Product import from Excel/CSV — no tedious manual entry',
      'Built-in SEO for all product and category pages',
      'Full training and handover so your team can run it independently',
    ],
    faq: [
      { q: 'Shopify vs WooCommerce — which is better for me?', a: 'Shopify is easier to manage and scales effortlessly but has monthly fees. WooCommerce gives more flexibility with lower recurring costs. We\'ll recommend the right one for your business.' },
      { q: 'Can you migrate my existing store?', a: 'Yes — we handle full migrations including products, orders, customer data, and SEO URLs with zero downtime.' },
      { q: 'Do you support local delivery in Bangladesh?', a: 'Absolutely. We integrate with Pathao, RedX, Steadfast, and other local couriers for seamless domestic delivery management.' },
      { q: 'What happens after the store launches?', a: 'We offer monthly maintenance plans covering updates, security monitoring, plugin management, and performance optimization.' },
    ],
  },

  'brand-design': {
    name: 'Brand & Graphic Design',
    icon: 'mdi:palette',
    tagline: 'Identities that people instantly recognize and trust',
    overview: 'A strong brand is your most valuable business asset. We create complete visual identity systems — from logo to brand guidelines — that make you look professional, credible, and unforgettable across every touchpoint.',
    color: 'cyan',
    heroStats: [
      { value: '150+', label: 'Brands Designed' },
      { value: '100%', label: 'Client Satisfaction' },
      { value: '5-day', label: 'Logo Delivery' },
    ],
    features: [
      { icon: 'mdi:vector-ellipse', title: 'Logo Design', desc: 'Unique, scalable logos delivered in all formats — from favicon to billboard. Multiple concepts to choose from.' },
      { icon: 'mdi:book-open-page-variant-outline', title: 'Brand Guidelines', desc: 'Comprehensive brand style guide covering colors, typography, logo usage rules, and visual tone.' },
      { icon: 'mdi:card-account-details-outline', title: 'Business Stationery', desc: 'Business cards, letterheads, email signatures, and branded office materials that look consistently polished.' },
      { icon: 'mdi:image-multiple-outline', title: 'Marketing Materials', desc: 'Brochures, flyers, banners, social media templates, and ad creatives that actually convert.' },
      { icon: 'mdi:monitor-dashboard', title: 'UI/UX Design', desc: 'App and website interface design in Figma — user-tested, beautiful, and developer-ready.' },
      { icon: 'mdi:package-variant-closed', title: 'Packaging Design', desc: 'Product packaging and label design that stands out on shelves and tells your brand story clearly.' },
    ],
    process: [
      { step: '01', icon: 'mdi:brain', title: 'Brand Discovery', desc: 'We learn your business, values, target audience, and competitors through a structured brand questionnaire.' },
      { step: '02', icon: 'mdi:pencil-ruler', title: 'Concept Creation', desc: 'We present 2–3 distinct logo directions with creative rationale. You choose and we refine.' },
      { step: '03', icon: 'mdi:refresh', title: 'Revisions', desc: 'Unlimited revision rounds until the design perfectly captures your brand vision and feels right.' },
      { step: '04', icon: 'mdi:folder-zip-outline', title: 'Final Delivery', desc: 'Full brand kit: SVG, PNG, PDF in all sizes and color variants — full color, white, and dark.' },
    ],
    benefits: [
      '100% original, custom-designed — never template-based',
      'Full ownership of all source files (AI, SVG, PSD)',
      'Unlimited revision rounds until you\'re completely satisfied',
      'Delivered for print, digital, and social media formats',
      'Brand consistency guide to use with future vendors and partners',
    ],
    faq: [
      { q: 'How many logo concepts will I receive?', a: 'We present 2–3 distinct design concepts. Once you select a direction, we refine it with unlimited revisions until it\'s exactly right.' },
      { q: 'Do I own the logo and brand files after purchase?', a: 'Yes — 100% full ownership. You receive all source files and full commercial rights. No licensing fees, ever.' },
      { q: 'What if I need small changes months later?', a: 'Minor adjustments are covered under our brand maintenance plan. A full rebrand is quoted separately.' },
      { q: 'Can you match or extend my existing brand elements?', a: 'Absolutely. If you have existing colors, fonts, or brand elements you love, we\'ll build the identity around them.' },
    ],
  },
}

const service = computed(() => serviceMap[route.params.slug as string])

if (!service.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found' })
}

useSeoMeta({
  title:       computed(() => `${service.value?.name} | MetaGenDigital`),
  description: computed(() => service.value?.overview),
})

const openFaq = ref<number | null>(null)
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}

// Pre-defined color configs — all classes must be complete strings for Tailwind JIT
const colorConfig = {
  orange: {
    heroBg:        'from-[#FF6B35] via-[#FF7B45] to-[#FF9A5C]',
    textAccent:    'text-brand-orange',
    badgeBg:       'bg-orange-100 text-orange-700',
    featureIconBg: 'bg-orange-50',
    featureIconText: 'text-brand-orange',
    stepBg:        'bg-brand-orange text-white',
    checkBg:       'bg-orange-50',
    checkText:     'text-brand-orange',
    borderAccent:  'border-brand-orange/40',
    btnBg:         'bg-brand-orange hover:bg-orange-600',
    dividerColor:  'bg-brand-orange',
  },
  purple: {
    heroBg:        'from-[#7C3AED] via-[#8B4CF6] to-[#6D28D9]',
    textAccent:    'text-brand-purple',
    badgeBg:       'bg-violet-100 text-violet-700',
    featureIconBg: 'bg-violet-50',
    featureIconText: 'text-brand-purple',
    stepBg:        'bg-brand-purple text-white',
    checkBg:       'bg-violet-50',
    checkText:     'text-brand-purple',
    borderAccent:  'border-brand-purple/40',
    btnBg:         'bg-brand-purple hover:bg-violet-700',
    dividerColor:  'bg-brand-purple',
  },
  cyan: {
    heroBg:        'from-[#0EA5E9] via-[#06B6D4] to-[#0284C7]',
    textAccent:    'text-brand-cyan',
    badgeBg:       'bg-sky-100 text-sky-700',
    featureIconBg: 'bg-sky-50',
    featureIconText: 'text-brand-cyan',
    stepBg:        'bg-brand-cyan text-white',
    checkBg:       'bg-sky-50',
    checkText:     'text-brand-cyan',
    borderAccent:  'border-brand-cyan/40',
    btnBg:         'bg-brand-cyan hover:bg-sky-600',
    dividerColor:  'bg-brand-cyan',
  },
}

const cfg = computed(() => colorConfig[service.value?.color ?? 'orange'])
</script>

<template>
  <div v-if="service" class="min-h-screen">

    <!-- ══════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════ -->
    <section
      class="relative pt-24 pb-24 overflow-hidden bg-gradient-to-br"
      :class="cfg.heroBg"
    >
      <!-- Decorative blobs -->
      <div class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />
      <div class="absolute -left-16 -bottom-8 w-72 h-72 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />
      <div class="absolute right-1/3 top-1/2 w-40 h-40 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />

      <div class="container-content relative z-10">
        <!-- Breadcrumb -->
        <div class="mb-8 opacity-80">
          <AppBreadcrumb :crumbs="[{ label: 'Services', to: '/services' }, { label: service.name }]" />
        </div>

        <div class="flex flex-col lg:flex-row lg:items-start gap-10 xl:gap-16">
          <!-- ── Left ── -->
          <div class="flex-1 min-w-0">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest mb-6">
              <Icon :name="service.icon" class="w-3.5 h-3.5" aria-hidden="true" />
              MetaGenDigital Service
            </div>

            <!-- Service icon + Title -->
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30 shadow-lg flex-shrink-0">
                <Icon :name="service.icon" class="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h1 class="text-white leading-tight">{{ service.name }}</h1>
            </div>

            <p class="text-white/80 text-xl font-semibold mb-3 leading-snug">{{ service.tagline }}</p>
            <p class="text-white/70 text-base leading-relaxed max-w-xl mb-8">{{ service.overview }}</p>

            <!-- CTA buttons -->
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                to="/contact"
                class="inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold text-sm rounded-btn shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                :class="cfg.textAccent"
              >
                Start a Project
                <Icon name="mdi:arrow-right" class="w-4 h-4" aria-hidden="true" />
              </NuxtLink>
              <NuxtLink
                to="/portfolio"
                class="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white font-semibold text-sm rounded-btn hover:bg-white/15 backdrop-blur-sm transition-all duration-200"
              >
                View Our Work
              </NuxtLink>
            </div>
          </div>

          <!-- ── Right: stats card ── -->
          <div class="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div class="bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 shadow-2xl overflow-hidden">
              <div class="px-6 pt-6 pb-5">
                <p class="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-5">By The Numbers</p>
                <div class="space-y-5">
                  <div
                    v-for="stat in service.heroStats"
                    :key="stat.label"
                    class="flex items-center justify-between"
                  >
                    <span class="text-white/65 text-sm">{{ stat.label }}</span>
                    <span class="text-white text-2xl font-black font-display">{{ stat.value }}</span>
                  </div>
                </div>
              </div>
              <div class="px-6 py-4 bg-white/10 border-t border-white/15">
                <div class="flex items-center gap-2">
                  <div class="flex -space-x-1.5">
                    <div v-for="n in 3" :key="n" class="w-6 h-6 rounded-full bg-white/30 ring-2 ring-white/20 flex items-center justify-center text-white text-[8px] font-bold">
                      {{ ['A', 'B', 'C'][n - 1] }}
                    </div>
                  </div>
                  <p class="text-white/60 text-xs">Trusted by 50+ businesses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         FEATURES GRID
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-white">
      <div class="container-content">
        <!-- Section header -->
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4" :class="cfg.badgeBg">
            What's Included
          </span>
          <h2 class="text-brand-text-primary mb-4">Everything You Need to Succeed</h2>
          <p class="text-brand-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive set of deliverables designed to give your business a real competitive edge.
          </p>
        </div>

        <!-- Feature cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(feature, i) in service.features"
            :key="i"
            class="group p-6 rounded-2xl border border-brand-border bg-brand-surface hover:bg-white hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 cursor-default"
          >
            <div
              class="w-12 h-12 flex items-center justify-center rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
              :class="cfg.featureIconBg"
            >
              <Icon :name="feature.icon" class="w-6 h-6" :class="cfg.featureIconText" aria-hidden="true" />
            </div>
            <h3 class="text-[15px] font-bold text-brand-text-primary mb-2 leading-snug">{{ feature.title }}</h3>
            <p class="text-sm text-brand-text-secondary leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         PROCESS
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-brand-surface">
      <div class="container-content">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4" :class="cfg.badgeBg">
            How We Work
          </span>
          <h2 class="text-brand-text-primary mb-4">Our Proven Process</h2>
          <p class="text-brand-text-secondary text-lg max-w-xl mx-auto">
            A structured, transparent approach that keeps you informed and in control at every step.
          </p>
        </div>

        <!-- Steps -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="(step, i) in service.process"
            :key="i"
            class="relative bg-white rounded-2xl p-6 border border-brand-border shadow-card flex flex-col"
          >
            <!-- Step number + icon row -->
            <div class="flex items-center gap-3 mb-5">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black font-display flex-shrink-0 shadow-sm"
                :class="cfg.stepBg"
              >
                {{ step.step }}
              </div>
              <div class="w-10 h-10 flex items-center justify-center rounded-xl" :class="cfg.featureIconBg">
                <Icon :name="step.icon" class="w-5 h-5" :class="cfg.featureIconText" aria-hidden="true" />
              </div>
              <!-- Connector arrow on larger screens -->
              <div v-if="i < service.process.length - 1" class="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                <div class="w-5 h-5 rounded-full bg-brand-border flex items-center justify-center">
                  <Icon name="mdi:chevron-right" class="w-3 h-3 text-brand-text-muted" />
                </div>
              </div>
            </div>

            <h3 class="text-[15px] font-bold text-brand-text-primary mb-2">{{ step.title }}</h3>
            <p class="text-sm text-brand-text-secondary leading-relaxed flex-1">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         WHY CHOOSE US
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-white">
      <div class="container-content">
        <div class="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          <!-- Left: benefits -->
          <div>
            <span class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4" :class="cfg.badgeBg">
              Why MetaGenDigital
            </span>
            <h2 class="text-brand-text-primary mb-3">Why 50+ Brands Choose Us</h2>
            <p class="text-brand-text-secondary text-lg mb-8 leading-relaxed">
              We're not just a vendor — we're a growth partner who cares about your results as much as you do.
            </p>

            <ul class="space-y-4 mb-8">
              <li
                v-for="benefit in service.benefits"
                :key="benefit"
                class="flex items-start gap-3.5"
              >
                <div
                  class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  :class="cfg.checkBg"
                >
                  <Icon name="mdi:check-bold" class="w-3.5 h-3.5" :class="cfg.checkText" aria-hidden="true" />
                </div>
                <span class="text-brand-text-secondary text-sm leading-relaxed">{{ benefit }}</span>
              </li>
            </ul>

            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold text-sm rounded-btn transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
              :class="cfg.btnBg"
            >
              Let's Get Started
              <Icon name="mdi:arrow-right" class="w-4 h-4" aria-hidden="true" />
            </NuxtLink>
          </div>

          <!-- Right: visual card -->
          <div class="relative">
            <!-- Decorative glow blob -->
            <div class="absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-gradient-to-br" :class="cfg.heroBg" />

            <div
              class="relative rounded-2xl overflow-hidden border border-brand-border shadow-card-hover bg-gradient-to-br"
              :class="cfg.heroBg"
            >
              <!-- Decorative circles inside -->
              <div class="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
              <div class="absolute -left-8 bottom-0 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />

              <div class="relative z-10 p-8">
                <!-- Icon -->
                <div class="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-5">
                  <Icon :name="service.icon" class="w-7 h-7 text-white" aria-hidden="true" />
                </div>

                <h3 class="text-white text-xl font-bold mb-1">{{ service.name }}</h3>
                <p class="text-white/65 text-sm mb-6">{{ service.tagline }}</p>

                <!-- Stats grid -->
                <div class="grid grid-cols-3 gap-3">
                  <div
                    v-for="stat in service.heroStats"
                    :key="stat.label"
                    class="text-center bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                  >
                    <div class="text-white font-black text-lg font-display leading-none mb-1">{{ stat.value }}</div>
                    <div class="text-white/55 text-[10px] leading-tight">{{ stat.label }}</div>
                  </div>
                </div>

                <!-- CTA inside card -->
                <div class="mt-6 pt-5 border-t border-white/15">
                  <NuxtLink
                    to="/contact"
                    class="flex items-center justify-between text-white/80 hover:text-white transition-colors duration-200 group/cta text-sm font-medium"
                  >
                    <span>Talk to our team</span>
                    <Icon name="mdi:arrow-right" class="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" aria-hidden="true" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         FAQ
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-brand-surface">
      <div class="container-content max-w-3xl">
        <div class="text-center mb-10">
          <span class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4" :class="cfg.badgeBg">
            FAQ
          </span>
          <h2 class="text-brand-text-primary mb-3">Common Questions</h2>
          <p class="text-brand-text-secondary">Everything you might want to know before we get started.</p>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, i) in service.faq"
            :key="i"
            class="bg-white rounded-2xl border transition-all duration-200 overflow-hidden"
            :class="openFaq === i ? ['shadow-card-hover', cfg.borderAccent] : 'border-brand-border'"
          >
            <button
              class="w-full flex items-center justify-between gap-4 px-6 py-4 text-left focus-visible:outline-none"
              :aria-expanded="openFaq === i"
              @click="toggleFaq(i)"
            >
              <span class="text-sm font-semibold text-brand-text-primary">{{ item.q }}</span>
              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                :class="openFaq === i ? [cfg.btnBg, 'text-white'] : 'bg-brand-surface text-brand-text-muted'"
              >
                <Icon
                  name="mdi:chevron-down"
                  class="w-4 h-4 transition-transform duration-200"
                  :class="openFaq === i ? 'rotate-180' : ''"
                  aria-hidden="true"
                />
              </div>
            </button>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="openFaq === i" class="px-6 pb-5">
                <div class="h-px w-full bg-brand-border mb-4" />
                <p class="text-sm text-brand-text-secondary leading-relaxed">{{ item.a }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
