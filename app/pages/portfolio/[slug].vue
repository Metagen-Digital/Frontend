<script setup lang="ts">
const route = useRoute()

type TagColor = 'orange' | 'purple' | 'cyan'

interface Phase       { icon: string; title: string; duration: string; tasks: string[] }
interface BeforeAfter { label: string; before: string; after: string; icon: string }
interface Testimonial { quote: string; author: string; role: string }

interface ProjectData {
  title: string
  category: string
  client: string
  industry: string
  year: number
  duration: string
  teamSize: string
  color: TagColor
  thumbnail: string
  summary: string
  challenge: string
  approach: string
  outcome: string
  services: string[]
  deliverables: string[]
  results: { label: string; value: string; icon: string }[]
  beforeAfter: BeforeAfter[]
  phases: Phase[]
  testimonial: Testimonial
  tags: string[]
  gallery: string[]
  nextSlug: string
  nextTitle: string
}

const projectMap: Record<string, ProjectData> = {
  'techcorp-website': {
    title: 'TechCorp BD Website Redesign',
    category: 'Web Dev',
    client: 'TechCorp BD',
    industry: 'Technology & IT',
    year: 2024,
    duration: '6 weeks',
    teamSize: '4 specialists',
    color: 'orange',
    thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=85&auto=format&fit=crop',
    summary: 'A complete website overhaul for one of Bangladesh\'s leading technology firms — transforming an outdated site into a high-performance, conversion-optimized platform that doubled their inbound leads.',
    challenge: 'TechCorp BD\'s website was 5 years old, loading in over 8 seconds, and failing to convert visitors into qualified leads. Their bounce rate was 78% and their Google PageSpeed score sat at 34. The brand looked dated compared to competitors and wasn\'t reflecting the quality of their services.',
    approach: 'We began with a full UX audit and competitor analysis. After mapping the user journey, we redesigned the information architecture from scratch, created a fresh visual identity aligned with their enterprise positioning, and built a custom Nuxt.js site with server-side rendering for maximum SEO performance.',
    outcome: 'The new site launched in 6 weeks and immediately delivered results. Organic traffic climbed 180% within 90 days, the bounce rate dropped to 38%, and lead form submissions tripled. The client\'s Google PageSpeed score hit 98 on mobile and 100 on desktop.',
    services: ['Website Development', 'UI/UX Design', 'SEO Optimization'],
    deliverables: [
      'Custom Nuxt.js website (8 pages)',
      'Full Figma design system',
      'SEO architecture & schema markup',
      'Sanity CMS integration',
      'Analytics & conversion tracking setup',
      'Team training & handover docs',
    ],
    results: [
      { label: 'Organic Traffic Growth', value: '+180%', icon: 'mdi:trending-up' },
      { label: 'PageSpeed Score', value: '98/100', icon: 'mdi:lightning-bolt-outline' },
      { label: 'Bounce Rate Reduced', value: '−40%', icon: 'mdi:arrow-bottom-right' },
      { label: 'Lead Form Submissions', value: '3×', icon: 'mdi:account-group-outline' },
    ],
    beforeAfter: [
      { label: 'Page Load Time', before: '8.2s', after: '1.4s', icon: 'mdi:clock-fast' },
      { label: 'PageSpeed Score', before: '34', after: '98', icon: 'mdi:speedometer' },
      { label: 'Monthly Leads', before: '12', after: '38', icon: 'mdi:account-plus-outline' },
    ],
    phases: [
      { icon: 'mdi:magnify', title: 'Discovery & Audit', duration: 'Week 1', tasks: ['UX audit of existing site', 'Competitor analysis', 'User journey mapping', 'Content inventory & gaps'] },
      { icon: 'mdi:vector-square', title: 'Wireframe & Design', duration: 'Week 2–3', tasks: ['Information architecture', 'Low-fi wireframes', 'High-fidelity Figma UI', 'Client review & approval'] },
      { icon: 'mdi:code-braces', title: 'Development', duration: 'Week 4–5', tasks: ['Nuxt.js build', 'CMS integration', 'Responsive QA all devices', 'Core Web Vitals optimization'] },
      { icon: 'mdi:rocket-launch-outline', title: 'Launch & Handover', duration: 'Week 6', tasks: ['DNS migration', 'SEO & analytics setup', 'Cross-browser testing', 'Team training session'] },
    ],
    testimonial: {
      quote: 'MetaGenDigital didn\'t just build us a website — they rebuilt our entire digital presence. The results in the first 3 months exceeded everything we expected. Our sales team is now getting 3× more qualified inquiries.',
      author: 'Tanvir Rahman',
      role: 'CEO, TechCorp BD',
    },
    tags: ['Nuxt.js', 'Tailwind CSS', 'Sanity CMS', 'SEO', 'Google Analytics 4', 'Figma'],
    gallery: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=900&q=80&auto=format&fit=crop',
    ],
    nextSlug: 'shopbd-social',
    nextTitle: 'ShopBD Social Media Campaign',
  },

  'shopbd-social': {
    title: 'ShopBD Social Media Campaign',
    category: 'Social Media',
    client: 'ShopBD',
    industry: 'E-commerce & Retail',
    year: 2024,
    duration: '3 months',
    teamSize: '3 specialists',
    color: 'purple',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&q=85&auto=format&fit=crop',
    summary: 'A full-scale social media transformation for ShopBD — Bangladesh\'s fast-growing online marketplace — resulting in 400% engagement growth and a direct revenue uplift from social channels.',
    challenge: 'ShopBD had a disorganized social presence across 4 platforms with inconsistent branding, low engagement rates (0.8%), and zero content strategy. Their team was posting randomly with no data-driven approach, and their follower base had stagnated for 6 months.',
    approach: 'We conducted an in-depth audience analysis, rebuilt their content pillars, and created a monthly content calendar across Instagram, Facebook, and TikTok. We introduced reels, UGC campaigns, and weekly story series. All content was produced in-house with a dedicated designer and video editor.',
    outcome: 'Within 3 months, total engagement grew by 400%, follower count increased by 22,000 across platforms, and the brand became a recognized name in the Dhaka lifestyle segment. Revenue attributed to social media grew by 60%.',
    services: ['Social Media Marketing', 'Content Strategy', 'Creative Production'],
    deliverables: [
      'Monthly content calendar (90 posts)',
      '24 short-form reels & videos',
      'Brand visual guidelines for social',
      'Story highlight covers & templates',
      'Monthly analytics & growth reports',
      'Community management (replies & DMs)',
    ],
    results: [
      { label: 'Engagement Rate Growth', value: '+400%', icon: 'mdi:heart-outline' },
      { label: 'New Followers Gained', value: '22K+', icon: 'mdi:account-plus-outline' },
      { label: 'Monthly Reach', value: '1.2M', icon: 'mdi:eye-outline' },
      { label: 'Social Revenue Lift', value: '+60%', icon: 'mdi:cash-multiple' },
    ],
    beforeAfter: [
      { label: 'Avg. Engagement Rate', before: '0.8%', after: '4.7%', icon: 'mdi:heart-outline' },
      { label: 'Monthly Reach', before: '18K', after: '1.2M', icon: 'mdi:eye-outline' },
      { label: 'Monthly Followers', before: '+120', after: '+7.3K', icon: 'mdi:account-plus-outline' },
    ],
    phases: [
      { icon: 'mdi:ear-hearing', title: 'Brand & Audience Audit', duration: 'Week 1–2', tasks: ['Competitor benchmarking', 'Audience persona mapping', 'Content performance audit', 'Platform selection strategy'] },
      { icon: 'mdi:map-outline', title: 'Strategy & Content Planning', duration: 'Week 3', tasks: ['Content pillar definition', '30-day calendar creation', 'Visual template design', 'Caption & hashtag strategy'] },
      { icon: 'mdi:creation-outline', title: 'Produce & Publish', duration: 'Month 1–3', tasks: ['Daily content publishing', 'Reels & video production', 'Story series management', 'Community engagement'] },
      { icon: 'mdi:chart-areaspline', title: 'Analyse & Optimise', duration: 'Monthly', tasks: ['Performance review calls', 'Content format A/B testing', 'Hashtag strategy refinement', 'Growth reporting'] },
    ],
    testimonial: {
      quote: 'Our social media was embarrassing before MetaGenDigital stepped in. Within 60 days we felt like a real brand. The reels they produce stop people mid-scroll — we get DMs every day now from customers who found us on Instagram.',
      author: 'Nafisa Hossain',
      role: 'Marketing Director, ShopBD',
    },
    tags: ['Instagram', 'Facebook', 'TikTok', 'Content Strategy', 'Reels Production', 'Community Management'],
    gallery: [
      'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a70d?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=900&q=80&auto=format&fit=crop',
    ],
    nextSlug: 'greengrow-photos',
    nextTitle: 'GreenGrow Product Photography',
  },

  'greengrow-photos': {
    title: 'GreenGrow Product Photography',
    category: 'Photography',
    client: 'GreenGrow',
    industry: 'Organic Beauty & Skincare',
    year: 2024,
    duration: '2 shoot days',
    teamSize: '3 specialists',
    color: 'cyan',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&q=85&auto=format&fit=crop',
    summary: 'A premium product photography series for GreenGrow\'s organic skincare line — turning raw products into aspirational lifestyle imagery that drove a 60% conversion rate increase on their e-commerce store.',
    challenge: 'GreenGrow\'s product photos were inconsistent, low-resolution, and shot on plain white backgrounds. Their premium pricing wasn\'t supported by the visual presentation, causing shoppers to scroll past without clicking on ads or product pages.',
    approach: 'We planned two shoot days — one studio session for clean e-commerce shots and one lifestyle session in a natural outdoor setting. We created a consistent moodboard, sourced props and styling, and post-produced all 80+ images with professional color grading.',
    outcome: 'The new imagery was deployed across their Shopify store, Meta ads, and Instagram. Within 6 weeks, product page conversion rate jumped from 1.2% to 1.9%, Meta ad CTR improved by 90%, and their Instagram following grew organically by 3,500.',
    services: ['Photography & Videography', 'Creative Direction', 'Post-Production'],
    deliverables: [
      '80+ professionally edited product images',
      'Studio white-background e-commerce shots',
      'Lifestyle & outdoor contextual imagery',
      'Social media crop variants (1:1, 4:5, 9:16)',
      'Full RAW files + edited exports',
      'Usage rights: unlimited commercial',
    ],
    results: [
      { label: 'Conversion Rate Lift', value: '+60%', icon: 'mdi:cart-arrow-down' },
      { label: 'Ad CTR Improvement', value: '+90%', icon: 'mdi:cursor-default-click-outline' },
      { label: 'Images Delivered', value: '80+', icon: 'mdi:image-multiple-outline' },
      { label: 'Instagram Growth', value: '+3.5K', icon: 'mdi:instagram' },
    ],
    beforeAfter: [
      { label: 'Product Page CVR', before: '1.2%', after: '1.9%', icon: 'mdi:cart-arrow-down' },
      { label: 'Meta Ad CTR', before: '0.6%', after: '1.14%', icon: 'mdi:cursor-default-click-outline' },
      { label: 'CPM Cost', before: '৳480', after: '৳336', icon: 'mdi:currency-bdt' },
    ],
    phases: [
      { icon: 'mdi:palette-outline', title: 'Creative Direction', duration: 'Day 1 (Pre)', tasks: ['Moodboard creation', 'Prop sourcing & styling', 'Shot list finalization', 'Studio booking & setup'] },
      { icon: 'mdi:camera-outline', title: 'Studio Shoot', duration: 'Day 2', tasks: ['White background e-com shots', 'Product detail close-ups', 'Multiple product groupings', '360-degree product angles'] },
      { icon: 'mdi:tree-outline', title: 'Lifestyle Shoot', duration: 'Day 3', tasks: ['Outdoor natural light setup', 'Model-in-context shots', 'Flat-lay compositions', 'In-use lifestyle imagery'] },
      { icon: 'mdi:image-edit-outline', title: 'Post-Production', duration: 'Days 4–5', tasks: ['Color grading & consistency', 'Background removal & cleanup', 'Format exports for all platforms', 'Client review & final delivery'] },
    ],
    testimonial: {
      quote: 'The photos MetaGenDigital delivered look like they belong on international beauty brand websites. Our customers now feel the premium quality before they even open the package. Sales speak for themselves.',
      author: 'Rabeya Sultana',
      role: 'Founder, GreenGrow',
    },
    tags: ['Product Photography', 'Lifestyle Shots', 'Color Grading', 'Retouching', 'E-commerce Ready'],
    gallery: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=900&q=80&auto=format&fit=crop',
    ],
    nextSlug: 'urbaneats-brand-film',
    nextTitle: 'UrbanEats Cinematic Brand Film',
  },

  'urbaneats-brand-film': {
    title: 'UrbanEats Cinematic Brand Film',
    category: 'Video',
    client: 'UrbanEats',
    industry: 'Food Delivery & Tech',
    year: 2024,
    duration: '3 weeks',
    teamSize: '6 specialists',
    color: 'orange',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1400&q=85&auto=format&fit=crop',
    summary: 'A 90-second cinematic brand film for UrbanEats, Dhaka\'s premium food delivery platform — a film that went viral locally, amassing 2 million views and significantly boosting brand awareness among the 25–40 demographic.',
    challenge: 'UrbanEats was struggling to differentiate from larger competitors. They needed a brand story, not just an ad — something that showed the human side of their service and made people feel something rather than just inform them.',
    approach: 'We spent a week in pre-production developing the narrative, storyboard, and casting. A 2-day shoot captured kitchen stories, delivery riders at golden hour, and the joy of people receiving food. Post-production took 10 days including color grading, original music scoring, and motion graphics.',
    outcome: 'The film launched on YouTube and Facebook simultaneously. It hit 500K views in 48 hours and 2M views within 3 weeks — entirely organic. App downloads increased by 38% in the month following release.',
    services: ['Photography & Videography', 'Brand Storytelling', 'Post-Production'],
    deliverables: [
      '90-second hero brand film (4K)',
      '30s & 15s cut-downs for ads',
      'Vertical 9:16 cut for Instagram/TikTok',
      'Original background music (licensed)',
      'Motion graphics & title cards',
      'RAW footage archive',
    ],
    results: [
      { label: 'Total Video Views', value: '2M+', icon: 'mdi:play-circle-outline' },
      { label: 'Views in 48 Hours', value: '500K', icon: 'mdi:clock-fast' },
      { label: 'App Downloads Lift', value: '+38%', icon: 'mdi:download-outline' },
      { label: 'Social Shares', value: '12K+', icon: 'mdi:share-outline' },
    ],
    beforeAfter: [
      { label: 'Monthly App Downloads', before: '1,200', after: '1,656', icon: 'mdi:download-outline' },
      { label: 'Brand Awareness (survey)', before: '34%', after: '61%', icon: 'mdi:eye-outline' },
      { label: 'Organic Social Reach', before: '8K/mo', after: '480K/mo', icon: 'mdi:trending-up' },
    ],
    phases: [
      { icon: 'mdi:script-text-outline', title: 'Pre-Production', duration: 'Week 1', tasks: ['Brand narrative development', 'Script & storyboard', 'Location scouting', 'Casting & styling'] },
      { icon: 'mdi:camera-outline', title: 'Principal Photography', duration: 'Days 8–9', tasks: ['Restaurant & kitchen shoots', 'Delivery rider golden-hour shots', 'Customer story scenes', 'B-roll & cutaway coverage'] },
      { icon: 'mdi:film-edit', title: 'Post-Production', duration: 'Days 10–19', tasks: ['Assembly & rough cut', 'Color grading (cinema LUTs)', 'Original music composition', 'Motion graphics & titles'] },
      { icon: 'mdi:rocket-launch-outline', title: 'Distribution', duration: 'Day 21', tasks: ['YouTube & Facebook premiere', 'Paid boost strategy', 'Influencer seeding', 'Press & PR outreach'] },
    ],
    testimonial: {
      quote: 'We knew it was special the moment we saw the rough cut. When it went live and hit 500K views in two days without spending a single taka on ads, we knew MetaGenDigital had created something extraordinary.',
      author: 'Arif Chowdhury',
      role: 'Co-founder, UrbanEats',
    },
    tags: ['Cinematography', 'Brand Storytelling', 'Color Grading', 'Motion Graphics', 'Music Scoring', '4K Production'],
    gallery: [
      'https://images.unsplash.com/photo-1536240478700-b869ad10e2c1?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=900&q=80&auto=format&fit=crop',
    ],
    nextSlug: 'stylehouse-store',
    nextTitle: 'StyleHouse E-commerce Platform',
  },

  'stylehouse-store': {
    title: 'StyleHouse E-commerce Platform',
    category: 'E-commerce',
    client: 'StyleHouse',
    industry: 'Fashion & Apparel',
    year: 2024,
    duration: '8 weeks',
    teamSize: '5 specialists',
    color: 'purple',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85&auto=format&fit=crop',
    summary: 'A fully custom Shopify store for StyleHouse — Bangladesh\'s emerging fashion brand — built with local payment integrations and conversion-optimized UX that tripled their online revenue in 4 months.',
    challenge: 'StyleHouse was selling on Facebook only, losing sales to cart friction, no formal checkout, and zero payment integration. They had a loyal audience of 45,000 followers but no infrastructure to scale e-commerce revenue beyond manual inbox orders.',
    approach: 'We designed and built a custom Shopify store tailored to Bangladeshi shoppers — with bKash, Nagad, and card payment support, local courier integrations (Pathao, Steadfast), and a mobile-first UX optimized for low-bandwidth users. We migrated 800+ product SKUs from their catalog.',
    outcome: 'Within 4 months of launch, monthly online revenue tripled. Their conversion rate sat at 3.2% — well above the industry average of 1.8%. Average order value increased by 40% thanks to upsell setups on the product page.',
    services: ['E-commerce Development', 'UI/UX Design', 'Payment Integration'],
    deliverables: [
      'Custom Shopify theme (mobile-first)',
      'bKash, Nagad & card payment setup',
      'Pathao & Steadfast courier integration',
      '800+ product SKU migration',
      'Inventory & order management system',
      'Staff training & operations handover',
    ],
    results: [
      { label: 'Revenue Growth', value: '3×', icon: 'mdi:cash-multiple' },
      { label: 'Conversion Rate', value: '3.2%', icon: 'mdi:chart-bar' },
      { label: 'Products Migrated', value: '800+', icon: 'mdi:package-variant' },
      { label: 'Avg. Order Value', value: '+40%', icon: 'mdi:receipt-outline' },
    ],
    beforeAfter: [
      { label: 'Monthly Revenue', before: '৳1.8L', after: '৳5.4L', icon: 'mdi:cash-multiple' },
      { label: 'Order Processing Time', before: '4–6 hrs', after: '< 1 hr', icon: 'mdi:clock-outline' },
      { label: 'Cart Abandonment', before: '~85%', after: '62%', icon: 'mdi:cart-remove' },
    ],
    phases: [
      { icon: 'mdi:store-outline', title: 'Store Strategy & Planning', duration: 'Week 1', tasks: ['Product catalog audit', 'Customer journey mapping', 'Platform & payment research', 'Tech stack finalization'] },
      { icon: 'mdi:draw-pen', title: 'UI/UX Design', duration: 'Week 2–3', tasks: ['Shopify wireframes', 'High-fidelity mockups', 'Mobile-first responsive design', 'Client approval & iteration'] },
      { icon: 'mdi:cog-outline', title: 'Development & Integration', duration: 'Week 4–7', tasks: ['Custom Shopify theme build', 'bKash & Nagad integration', 'Pathao courier setup', 'Product migration (800+ SKUs)'] },
      { icon: 'mdi:test-tube-outline', title: 'QA, Testing & Launch', duration: 'Week 8', tasks: ['End-to-end order testing', 'Payment gateway testing', 'Mobile & speed QA', 'Go-live & staff training'] },
    ],
    testimonial: {
      quote: 'Going from Facebook inbox orders to a real e-commerce store felt overwhelming until MetaGenDigital made it simple. Our revenue tripled and we now process 50+ orders a day with a team of 2. It\'s transformed our business.',
      author: 'Sabrina Islam',
      role: 'Founder, StyleHouse',
    },
    tags: ['Shopify', 'Custom Theme', 'bKash Integration', 'Pathao Courier', 'UX Design', 'Inventory Management'],
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80&auto=format&fit=crop',
    ],
    nextSlug: 'eduprime-marketing',
    nextTitle: 'EduPrime Digital Marketing Campaign',
  },

  'eduprime-marketing': {
    title: 'EduPrime Digital Marketing Campaign',
    category: 'Web Dev',
    client: 'EduPrime',
    industry: 'Online Education',
    year: 2023,
    duration: '4 months',
    teamSize: '4 specialists',
    color: 'cyan',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&auto=format&fit=crop',
    summary: 'A multi-channel digital marketing overhaul for EduPrime — combining Google Ads, Meta retargeting, and landing page CRO to achieve 5× return on ad spend and 240% growth in monthly enrollments.',
    challenge: 'EduPrime was spending $3,000/month on ads with a 1.2× ROAS and no consistent lead flow. Their landing pages were generic, their targeting was too broad, and they had no remarketing strategy to capture warm leads who didn\'t convert on first visit.',
    approach: 'We rebuilt their entire paid media strategy from the ground up. New audience segments were created based on intent signals. We built 4 dedicated landing pages for each course category, implemented a full remarketing funnel, and ran weekly creative tests to find winning ad formats.',
    outcome: 'Over 4 months, ROAS climbed from 1.2× to 5×. Cost per lead dropped by 65% and their monthly enrolled student count grew from 120 to 410. They reduced ad spend by 20% while doubling output.',
    services: ['Digital Marketing', 'Landing Page CRO', 'Paid Advertising'],
    deliverables: [
      '4 dedicated course landing pages',
      'Google Ads campaign restructure',
      'Meta retargeting funnel setup',
      'Weekly A/B creative testing',
      'Custom reporting dashboard (Looker)',
      'Monthly strategy review calls',
    ],
    results: [
      { label: 'Return on Ad Spend', value: '5×', icon: 'mdi:trending-up' },
      { label: 'Cost Per Lead', value: '−65%', icon: 'mdi:arrow-bottom-right' },
      { label: 'Monthly Enrollments', value: '+240%', icon: 'mdi:school-outline' },
      { label: 'Ad Budget Efficiency', value: '+80%', icon: 'mdi:target' },
    ],
    beforeAfter: [
      { label: 'ROAS', before: '1.2×', after: '5×', icon: 'mdi:trending-up' },
      { label: 'Cost Per Lead', before: '$18.40', after: '$6.44', icon: 'mdi:currency-usd' },
      { label: 'Monthly Enrollments', before: '120', after: '410', icon: 'mdi:school-outline' },
    ],
    phases: [
      { icon: 'mdi:magnify', title: 'Audit & Research', duration: 'Week 1–2', tasks: ['Full ad account audit', 'Audience & persona research', 'Competitor ad analysis', 'Landing page CRO assessment'] },
      { icon: 'mdi:map-outline', title: 'Strategy & Build', duration: 'Week 3–4', tasks: ['Campaign restructure plan', 'Audience segment creation', 'Landing page design & build', 'Tracking & attribution setup'] },
      { icon: 'mdi:rocket-launch-outline', title: 'Launch & Test', duration: 'Month 2', tasks: ['Campaign launch (Google + Meta)', 'Weekly creative A/B tests', 'Remarketing funnel activation', 'Bid strategy optimization'] },
      { icon: 'mdi:chart-bar', title: 'Optimize & Scale', duration: 'Month 3–4', tasks: ['Winner creative scaling', 'Budget reallocation by ROAS', 'Audience expansion testing', 'Monthly performance review'] },
    ],
    testimonial: {
      quote: 'We were about to give up on paid ads entirely. MetaGenDigital turned our $3,000/month from a money pit into a machine that generates 5× in revenue. Their data-driven approach changed how we think about marketing.',
      author: 'Dr. Karim Uddin',
      role: 'Founder, EduPrime',
    },
    tags: ['Google Ads', 'Meta Ads', 'Landing Page CRO', 'Remarketing', 'A/B Testing', 'Analytics'],
    gallery: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=900&q=80&auto=format&fit=crop',
    ],
    nextSlug: 'techcorp-website',
    nextTitle: 'TechCorp BD Website Redesign',
  },

  'naturabd-photography': {
    title: 'NaturaBD Lifestyle Photography',
    category: 'Photography',
    client: 'NaturaBD',
    industry: 'Organic Food & FMCG',
    year: 2023,
    duration: '3 shoot days',
    teamSize: '3 specialists',
    color: 'orange',
    thumbnail: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1400&q=85&auto=format&fit=crop',
    summary: 'A complete lifestyle photography overhaul for NaturaBD\'s organic food line — replacing flat product shots with rich, emotionally engaging imagery that boosted ad click-through rates by 90%.',
    challenge: 'NaturaBD\'s ad creative was underperforming with a 0.6% CTR and high CPM costs. Their product photography didn\'t communicate the natural, healthy values of the brand and failed to stop the scroll on crowded social feeds.',
    approach: 'We planned a 3-day lifestyle shoot — morning light outdoor sessions for hero imagery, and a studio day for e-commerce packshots. Every shot was art-directed to convey freshness, naturalness, and premium quality aligned with their brand positioning.',
    outcome: 'The new imagery was deployed across Meta ads, Google Shopping, and packaging. CTR on Meta ads increased by 90%, CPM dropped by 30%, and their Instagram account grew by 3,500 followers organically in 6 weeks.',
    services: ['Photography & Videography', 'Creative Direction', 'Art Direction'],
    deliverables: [
      '60+ professionally edited images',
      'Studio white-background packshots',
      'Outdoor lifestyle hero shots',
      'Flat-lay composition series',
      'All formats: web, print, social',
      'Full RAW archive + commercial rights',
    ],
    results: [
      { label: 'Ad CTR Improvement', value: '+90%', icon: 'mdi:cursor-default-click-outline' },
      { label: 'CPM Cost Reduction', value: '−30%', icon: 'mdi:currency-usd' },
      { label: 'Images Delivered', value: '60+', icon: 'mdi:image-multiple-outline' },
      { label: 'Instagram Growth', value: '+3.5K', icon: 'mdi:instagram' },
    ],
    beforeAfter: [
      { label: 'Meta Ad CTR', before: '0.6%', after: '1.14%', icon: 'mdi:cursor-default-click-outline' },
      { label: 'CPM', before: '৳520', after: '৳364', icon: 'mdi:currency-bdt' },
      { label: 'Product Page Bounce', before: '71%', after: '48%', icon: 'mdi:arrow-bottom-right' },
    ],
    phases: [
      { icon: 'mdi:palette-outline', title: 'Creative Direction', duration: 'Day 0 (Pre)', tasks: ['Brand values deep-dive', 'Moodboard & aesthetic direction', 'Prop & location sourcing', 'Shot list finalization'] },
      { icon: 'mdi:white-balance-sunny', title: 'Outdoor Lifestyle Shoot', duration: 'Days 1–2', tasks: ['Morning golden-hour shots', 'In-context food styling', 'Model-in-use scenes', 'Environmental storytelling'] },
      { icon: 'mdi:camera-outline', title: 'Studio Packshots', duration: 'Day 3', tasks: ['White-background product shots', 'Detail close-up photography', 'Multiple pack configurations', 'Flatlay compositions'] },
      { icon: 'mdi:image-edit-outline', title: 'Post-Production', duration: 'Days 4–5', tasks: ['Colour consistency grading', 'Background retouching', 'Multi-format exports', 'Client review & final delivery'] },
    ],
    testimonial: {
      quote: 'Our products look so beautiful now that customers screenshot our posts just to share them. The photography tells the story of our brand in a way we never could with words. Worth every taka.',
      author: 'Mithila Akter',
      role: 'Brand Manager, NaturaBD',
    },
    tags: ['Lifestyle Photography', 'Food Photography', 'Art Direction', 'Color Grading', 'Retouching'],
    gallery: [
      'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&q=80&auto=format&fit=crop',
    ],
    nextSlug: 'nexatech-social',
    nextTitle: 'NexaTech LinkedIn Growth Strategy',
  },

  'nexatech-social': {
    title: 'NexaTech LinkedIn Growth Strategy',
    category: 'Social Media',
    client: 'NexaTech',
    industry: 'B2B SaaS & Technology',
    year: 2023,
    duration: '3 months',
    teamSize: '3 specialists',
    color: 'purple',
    thumbnail: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1400&q=85&auto=format&fit=crop',
    summary: 'A focused LinkedIn strategy for NexaTech, a B2B SaaS startup — growing their page from 200 to 5,200 followers and generating 18 qualified enterprise sales conversations in 90 days.',
    challenge: 'NexaTech had a LinkedIn page with 200 followers, posting irregularly with technical content that resonated with developers but not decision-makers. They needed LinkedIn to generate enterprise sales leads, not just developer awareness.',
    approach: 'We repositioned their LinkedIn voice toward C-suite and operations leaders, created a thought leadership content calendar, and introduced employee advocacy posts. We ran LinkedIn Lead Gen forms targeting CTOs and Operations Directors in their target industries.',
    outcome: 'In 90 days, followers grew from 200 to 5,200. Posts averaged 8,400 impressions (up from 190). LinkedIn Lead Gen forms generated 47 form fills and 18 qualified sales calls — directly attributed to LinkedIn.',
    services: ['Social Media Marketing', 'B2B Content Strategy', 'LinkedIn Advertising'],
    deliverables: [
      'LinkedIn content strategy document',
      '90-day content calendar (3×/week)',
      '12 long-form thought leadership posts',
      'LinkedIn Lead Gen form campaigns',
      'Employee advocacy programme setup',
      'Monthly analytics & ROI reporting',
    ],
    results: [
      { label: 'Followers Gained', value: '+5K', icon: 'mdi:account-group-outline' },
      { label: 'Post Impressions', value: '8.4K avg', icon: 'mdi:eye-outline' },
      { label: 'Qualified Sales Leads', value: '18', icon: 'mdi:handshake-outline' },
      { label: 'Lead Gen Form Fills', value: '47', icon: 'mdi:form-textbox' },
    ],
    beforeAfter: [
      { label: 'LinkedIn Followers', before: '200', after: '5,200', icon: 'mdi:account-group-outline' },
      { label: 'Avg Post Impressions', before: '190', after: '8,400', icon: 'mdi:eye-outline' },
      { label: 'Monthly Sales Calls', before: '0', after: '6', icon: 'mdi:phone-outline' },
    ],
    phases: [
      { icon: 'mdi:target-account', title: 'ICP & Persona Research', duration: 'Week 1', tasks: ['Ideal customer profile definition', 'Decision-maker persona mapping', 'Competitor LinkedIn audit', 'Content gap analysis'] },
      { icon: 'mdi:pencil-outline', title: 'Voice & Content Strategy', duration: 'Week 2–3', tasks: ['Brand voice repositioning', 'Content pillar framework', '30-day calendar creation', 'Thought leadership topics'] },
      { icon: 'mdi:linkedin', title: 'Publish & Amplify', duration: 'Month 2–3', tasks: ['3× weekly post publishing', 'Employee advocacy activation', 'Lead Gen form campaigns', 'Engagement & networking'] },
      { icon: 'mdi:chart-line', title: 'Optimise & Report', duration: 'Monthly', tasks: ['Impressions & reach analysis', 'Lead quality assessment', 'Content format testing', 'Sales pipeline attribution'] },
    ],
    testimonial: {
      quote: 'Before MetaGenDigital, LinkedIn was just a profile. Now it\'s our #1 lead source. We closed two enterprise contracts worth $40K from LinkedIn leads within 4 months. The ROI is unmatched for B2B.',
      author: 'Imran Hasan',
      role: 'CRO, NexaTech',
    },
    tags: ['LinkedIn', 'B2B Content Strategy', 'Thought Leadership', 'LinkedIn Ads', 'Lead Generation'],
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop',
    ],
    nextSlug: 'shopbd-social',
    nextTitle: 'ShopBD Social Media Campaign',
  },
}

const project = computed(() => projectMap[route.params.slug as string])

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title:       computed(() => `${project.value?.title} | MetaGenDigital`),
  description: computed(() => project.value?.summary),
})

const colorConfig = {
  orange: {
    heroBg:        'from-[#FF6B35] via-[#FF7B45] to-[#FF9A5C]',
    textAccent:    'text-brand-orange',
    badgeBg:       'bg-orange-100 text-orange-700',
    iconBg:        'bg-orange-50',
    iconText:      'text-brand-orange',
    resultCard:    'border-orange-200 bg-orange-50/50',
    resultValue:   'text-brand-orange',
    tagBg:         'bg-orange-50 text-orange-700 border-orange-200',
    btnBg:         'bg-brand-orange hover:bg-orange-600',
    afterBg:       'bg-orange-50 border-orange-200',
    afterValue:    'text-brand-orange',
    testimonialBg: 'from-[#FF6B35] to-[#FF9A5C]',
    phaseDot:      'bg-brand-orange',
    serviceChip:   'bg-orange-100 text-orange-700 border-orange-200',
  },
  purple: {
    heroBg:        'from-[#7C3AED] via-[#8B4CF6] to-[#6D28D9]',
    textAccent:    'text-brand-purple',
    badgeBg:       'bg-violet-100 text-violet-700',
    iconBg:        'bg-violet-50',
    iconText:      'text-brand-purple',
    resultCard:    'border-violet-200 bg-violet-50/50',
    resultValue:   'text-brand-purple',
    tagBg:         'bg-violet-50 text-violet-700 border-violet-200',
    btnBg:         'bg-brand-purple hover:bg-violet-700',
    afterBg:       'bg-violet-50 border-violet-200',
    afterValue:    'text-brand-purple',
    testimonialBg: 'from-[#7C3AED] to-[#6D28D9]',
    phaseDot:      'bg-brand-purple',
    serviceChip:   'bg-violet-100 text-violet-700 border-violet-200',
  },
  cyan: {
    heroBg:        'from-[#0EA5E9] via-[#06B6D4] to-[#0284C7]',
    textAccent:    'text-brand-cyan',
    badgeBg:       'bg-sky-100 text-sky-700',
    iconBg:        'bg-sky-50',
    iconText:      'text-brand-cyan',
    resultCard:    'border-sky-200 bg-sky-50/50',
    resultValue:   'text-brand-cyan',
    tagBg:         'bg-sky-50 text-sky-700 border-sky-200',
    btnBg:         'bg-brand-cyan hover:bg-sky-600',
    afterBg:       'bg-sky-50 border-sky-200',
    afterValue:    'text-brand-cyan',
    testimonialBg: 'from-[#0EA5E9] to-[#0284C7]',
    phaseDot:      'bg-brand-cyan',
    serviceChip:   'bg-sky-100 text-sky-700 border-sky-200',
  },
}

const cfg = computed(() => colorConfig[project.value?.color ?? 'orange'])

const categoryIcon: Record<string, string> = {
  'Web Dev':      'mdi:web',
  'Social Media': 'mdi:instagram',
  'Photography':  'mdi:camera',
  'Video':        'mdi:video-outline',
  'E-commerce':   'mdi:shopping-outline',
}
</script>

<template>
  <div v-if="project" class="min-h-screen">

    <!-- ══════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════ -->
    <section class="relative pt-24 pb-0 overflow-hidden bg-gradient-to-br" :class="cfg.heroBg">
      <div class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />
      <div class="absolute left-0 bottom-0 w-64 h-64 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />
      <div class="absolute right-1/3 top-1/3 w-32 h-32 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />

      <div class="container-content relative z-10 pb-12">
        <div class="mb-8 opacity-75">
          <AppBreadcrumb :crumbs="[{ label: 'Portfolio', to: '/portfolio' }, { label: project.title }]" />
        </div>

        <!-- Meta badges -->
        <div class="flex flex-wrap items-center gap-2 mb-5">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            <Icon :name="categoryIcon[project.category] ?? 'mdi:folder'" class="w-3.5 h-3.5" aria-hidden="true" />
            {{ project.category }}
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white/80 text-xs font-semibold backdrop-blur-sm">
            <Icon name="mdi:office-building-outline" class="w-3.5 h-3.5" aria-hidden="true" />
            {{ project.industry }}
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white/80 text-xs font-semibold backdrop-blur-sm">
            <Icon name="mdi:calendar-outline" class="w-3.5 h-3.5" aria-hidden="true" />
            {{ project.year }}
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white/80 text-xs font-semibold backdrop-blur-sm">
            <Icon name="mdi:clock-outline" class="w-3.5 h-3.5" aria-hidden="true" />
            {{ project.duration }}
          </span>
        </div>

        <h1 class="text-white mb-3 max-w-3xl">{{ project.title }}</h1>
        <p class="text-white/70 text-lg max-w-2xl leading-relaxed mb-6">{{ project.summary }}</p>

        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Icon name="mdi:office-building-outline" class="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <span class="text-white/75 text-sm font-medium">{{ project.client }}</span>
        </div>
      </div>

      <!-- Hero image overlapping -->
      <div class="container-content relative z-10">
        <div class="rounded-t-2xl overflow-hidden shadow-2xl aspect-[21/9] bg-brand-surface">
          <img :src="project.thumbnail" :alt="project.title" class="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         KEY RESULTS
    ══════════════════════════════════════════════════ -->
    <section class="bg-white py-16 md:py-20">
      <div class="container-content">
        <div class="text-center mb-10">
          <span class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3" :class="cfg.badgeBg">Key Results</span>
          <h2 class="text-brand-text-primary">The Numbers That Matter</h2>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          <div
            v-for="result in project.results"
            :key="result.label"
            class="group p-6 rounded-2xl border text-center hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 cursor-default"
            :class="cfg.resultCard"
          >
            <div class="w-10 h-10 flex items-center justify-center rounded-xl mx-auto mb-3" :class="cfg.iconBg">
              <Icon :name="result.icon" class="w-5 h-5" :class="cfg.iconText" aria-hidden="true" />
            </div>
            <div class="text-3xl md:text-4xl font-black font-display mb-1" :class="cfg.resultValue">{{ result.value }}</div>
            <div class="text-xs text-brand-text-muted font-medium leading-snug">{{ result.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         FULL STORY + SIDEBAR
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-brand-surface">
      <div class="container-content">
        <div class="grid lg:grid-cols-[1fr_320px] gap-8 xl:gap-12 items-start">

          <!-- ── Main content ── -->
          <div>
            <div class="text-center lg:text-left mb-10">
              <span class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3" :class="cfg.badgeBg">Case Study</span>
              <h2 class="text-brand-text-primary">The Full Story</h2>
            </div>

            <div class="space-y-5">
              <div class="bg-white rounded-2xl border border-brand-border p-7 shadow-card">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="cfg.iconBg">
                    <Icon name="mdi:alert-circle-outline" class="w-5 h-5" :class="cfg.iconText" aria-hidden="true" />
                  </div>
                  <h3 class="text-[17px] font-bold text-brand-text-primary">The Challenge</h3>
                </div>
                <p class="text-brand-text-secondary leading-relaxed">{{ project.challenge }}</p>
              </div>

              <div class="bg-white rounded-2xl border border-brand-border p-7 shadow-card">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="cfg.iconBg">
                    <Icon name="mdi:lightbulb-outline" class="w-5 h-5" :class="cfg.iconText" aria-hidden="true" />
                  </div>
                  <h3 class="text-[17px] font-bold text-brand-text-primary">Our Approach</h3>
                </div>
                <p class="text-brand-text-secondary leading-relaxed">{{ project.approach }}</p>
              </div>

              <div class="bg-white rounded-2xl border border-brand-border p-7 shadow-card">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="cfg.iconBg">
                    <Icon name="mdi:trophy-outline" class="w-5 h-5" :class="cfg.iconText" aria-hidden="true" />
                  </div>
                  <h3 class="text-[17px] font-bold text-brand-text-primary">The Outcome</h3>
                </div>
                <p class="text-brand-text-secondary leading-relaxed">{{ project.outcome }}</p>
              </div>
            </div>
          </div>

          <!-- ── Sticky sidebar ── -->
          <div class="lg:sticky lg:top-24 space-y-4">

            <!-- Project details card -->
            <div class="bg-white rounded-2xl border border-brand-border shadow-card overflow-hidden">
              <div class="px-5 py-4 border-b border-brand-border">
                <p class="text-[11px] font-bold text-brand-text-muted uppercase tracking-widest">Project Details</p>
              </div>
              <div class="p-5 space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" :class="cfg.iconBg">
                    <Icon name="mdi:office-building-outline" class="w-4 h-4" :class="cfg.iconText" aria-hidden="true" />
                  </div>
                  <div>
                    <p class="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider mb-0.5">Client</p>
                    <p class="text-sm font-bold text-brand-text-primary">{{ project.client }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" :class="cfg.iconBg">
                    <Icon name="mdi:tag-outline" class="w-4 h-4" :class="cfg.iconText" aria-hidden="true" />
                  </div>
                  <div>
                    <p class="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider mb-0.5">Industry</p>
                    <p class="text-sm font-bold text-brand-text-primary">{{ project.industry }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" :class="cfg.iconBg">
                    <Icon name="mdi:clock-outline" class="w-4 h-4" :class="cfg.iconText" aria-hidden="true" />
                  </div>
                  <div>
                    <p class="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider mb-0.5">Timeline</p>
                    <p class="text-sm font-bold text-brand-text-primary">{{ project.duration }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" :class="cfg.iconBg">
                    <Icon name="mdi:account-group-outline" class="w-4 h-4" :class="cfg.iconText" aria-hidden="true" />
                  </div>
                  <div>
                    <p class="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider mb-0.5">Team</p>
                    <p class="text-sm font-bold text-brand-text-primary">{{ project.teamSize }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Services used -->
            <div class="bg-white rounded-2xl border border-brand-border shadow-card p-5">
              <p class="text-[11px] font-bold text-brand-text-muted uppercase tracking-widest mb-3">Services Used</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="svc in project.services"
                  :key="svc"
                  class="inline-block px-3 py-1.5 rounded-lg text-[11px] font-semibold border"
                  :class="cfg.serviceChip"
                >
                  {{ svc }}
                </span>
              </div>
            </div>

            <!-- Deliverables -->
            <div class="bg-white rounded-2xl border border-brand-border shadow-card p-5">
              <p class="text-[11px] font-bold text-brand-text-muted uppercase tracking-widest mb-3">Deliverables</p>
              <ul class="space-y-2.5">
                <li
                  v-for="item in project.deliverables"
                  :key="item"
                  class="flex items-start gap-2.5"
                >
                  <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" :class="cfg.iconBg">
                    <Icon name="mdi:check-bold" class="w-3 h-3" :class="cfg.iconText" aria-hidden="true" />
                  </div>
                  <span class="text-[12px] text-brand-text-secondary leading-snug">{{ item }}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         BEFORE → AFTER
    ══════════════════════════════════════════════════ -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container-content">
        <div class="text-center mb-10">
          <span class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3" :class="cfg.badgeBg">Transformation</span>
          <h2 class="text-brand-text-primary">Before & After</h2>
          <p class="text-brand-text-secondary mt-2 max-w-xl mx-auto">The measurable difference MetaGenDigital made across key metrics.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="item in project.beforeAfter"
            :key="item.label"
            class="rounded-2xl border border-brand-border overflow-hidden shadow-card"
          >
            <!-- Label bar -->
            <div class="px-5 py-3 bg-brand-surface border-b border-brand-border flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center" :class="cfg.iconBg">
                <Icon :name="item.icon" class="w-3.5 h-3.5" :class="cfg.iconText" aria-hidden="true" />
              </div>
              <span class="text-xs font-bold text-brand-text-primary">{{ item.label }}</span>
            </div>

            <!-- Before / After comparison -->
            <div class="grid grid-cols-2 divide-x divide-brand-border">
              <!-- Before -->
              <div class="p-5 text-center bg-white">
                <p class="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider mb-2">Before</p>
                <p class="text-2xl font-black text-brand-text-muted/60 font-display">{{ item.before }}</p>
              </div>
              <!-- After -->
              <div class="p-5 text-center" :class="cfg.afterBg">
                <p class="text-[10px] font-bold uppercase tracking-wider mb-2" :class="cfg.afterValue">After</p>
                <p class="text-2xl font-black font-display" :class="cfg.afterValue">{{ item.after }}</p>
              </div>
            </div>

            <!-- Improvement arrow -->
            <div class="px-5 py-3 bg-brand-surface border-t border-brand-border flex items-center justify-center gap-2">
              <Icon name="mdi:arrow-up-circle" class="w-4 h-4" :class="cfg.iconText" aria-hidden="true" />
              <span class="text-[11px] font-semibold" :class="cfg.iconText">Significant improvement</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         PROJECT PHASES / TIMELINE
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-brand-surface">
      <div class="container-content">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3" :class="cfg.badgeBg">Process</span>
          <h2 class="text-brand-text-primary">Project Timeline & Phases</h2>
          <p class="text-brand-text-secondary mt-2 max-w-xl mx-auto">How we structured this project from kickoff to delivery.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="(phase, i) in project.phases"
            :key="i"
            class="relative bg-white rounded-2xl border border-brand-border shadow-card p-6 flex flex-col"
          >
            <!-- Step number + connector -->
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0" :class="cfg.btnBg">
                {{ String(i + 1).padStart(2, '0') }}
              </div>
              <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" :class="cfg.iconBg">
                <Icon :name="phase.icon" class="w-4.5 h-4.5" :class="cfg.iconText" aria-hidden="true" />
              </div>
              <!-- Connector line -->
              <div v-if="i < project.phases.length - 1" class="hidden lg:block absolute right-0 top-10 translate-x-1/2 z-10">
                <div class="w-5 h-5 rounded-full bg-brand-border flex items-center justify-center">
                  <Icon name="mdi:chevron-right" class="w-3 h-3 text-brand-text-muted" />
                </div>
              </div>
            </div>

            <!-- Title + duration -->
            <div class="mb-3">
              <h3 class="text-[15px] font-bold text-brand-text-primary mb-1">{{ phase.title }}</h3>
              <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border" :class="cfg.tagBg">
                {{ phase.duration }}
              </span>
            </div>

            <!-- Task list -->
            <ul class="space-y-1.5 flex-1">
              <li
                v-for="task in phase.tasks"
                :key="task"
                class="flex items-start gap-2 text-[12px] text-brand-text-secondary"
              >
                <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" :class="cfg.phaseDot" />
                {{ task }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         CLIENT TESTIMONIAL
    ══════════════════════════════════════════════════ -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container-content max-w-4xl">
        <div class="relative rounded-3xl overflow-hidden shadow-card-hover bg-gradient-to-br p-8 md:p-12" :class="cfg.heroBg">
          <!-- Decorative circles -->
          <div class="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />
          <div class="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />

          <div class="relative z-10">
            <!-- Quote icon -->
            <div class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
              <Icon name="mdi:format-quote-open" class="w-6 h-6 text-white" aria-hidden="true" />
            </div>

            <!-- Quote text -->
            <blockquote class="text-white text-xl md:text-2xl font-semibold leading-relaxed mb-8 max-w-3xl">
              "{{ project.testimonial.quote }}"
            </blockquote>

            <!-- Stars -->
            <div class="flex items-center gap-1 mb-5">
              <Icon v-for="n in 5" :key="n" name="mdi:star" class="w-5 h-5 text-yellow-300" aria-hidden="true" />
            </div>

            <!-- Author -->
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg">
                {{ project.testimonial.author.charAt(0) }}
              </div>
              <div>
                <p class="text-white font-bold text-base">{{ project.testimonial.author }}</p>
                <p class="text-white/70 text-sm">{{ project.testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         GALLERY
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-brand-surface">
      <div class="container-content">
        <div class="text-center mb-10">
          <span class="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3" :class="cfg.badgeBg">Gallery</span>
          <h2 class="text-brand-text-primary">Project Visuals</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <div
            v-for="(img, i) in project.gallery"
            :key="i"
            class="group overflow-hidden rounded-2xl border border-brand-border shadow-card aspect-[4/3] bg-brand-surface"
          >
            <img
              :src="img"
              :alt="`${project.title} — gallery image ${i + 1}`"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         TOOLS & TECH
    ══════════════════════════════════════════════════ -->
    <section class="py-10 bg-white border-t border-brand-border">
      <div class="container-content">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <span class="text-sm font-bold text-brand-text-primary whitespace-nowrap flex-shrink-0">Tools & Tech Used:</span>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold border"
              :class="cfg.tagBg"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         NEXT PROJECT
    ══════════════════════════════════════════════════ -->
    <section class="py-14 bg-brand-surface border-t border-brand-border">
      <div class="container-content">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <NuxtLink
            to="/portfolio"
            class="inline-flex items-center gap-2 text-sm font-semibold text-brand-text-secondary hover:text-brand-primary transition-colors duration-200 group"
          >
            <Icon name="mdi:arrow-left" class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
            All Projects
          </NuxtLink>

          <NuxtLink
            :to="`/portfolio/${project.nextSlug}`"
            class="group flex items-center gap-4 p-4 rounded-2xl border border-brand-border bg-white hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-250"
          >
            <div class="text-right">
              <p class="text-[10px] text-brand-text-muted font-semibold uppercase tracking-widest mb-0.5">Next Project</p>
              <p class="text-sm font-bold text-brand-text-primary group-hover:text-brand-primary transition-colors duration-200">{{ project.nextTitle }}</p>
            </div>
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-all duration-200 group-hover:translate-x-1" :class="cfg.btnBg">
              <Icon name="mdi:arrow-right" class="w-5 h-5" aria-hidden="true" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
