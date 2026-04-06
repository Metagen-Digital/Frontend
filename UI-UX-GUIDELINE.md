# MetaGenDigital — UI/UX Guideline & Project Plan
**Nuxt.js Frontend | Digital Marketing Agency Website**

---

## 1. Brand Identity

### Color Palette

| Token | Value | Usage |
|---|---|---|
| Primary Color | `#0A0A0F` | Deep Black — page base |
| Background | `#0D0D1A` | Dark Navy — main bg |
| Surface | `#13131F` | Cards, panels |
| Card BG | `#1A1A2E` | Elevated cards |
| Border | `#2A2A3F` | Subtle borders |
| Border Strong | `#3A3A5C` | Active/hover borders |
| Accent Orange | `#FF6B35` | Primary CTA, highlights |
| Accent Purple | `#7C3AED` | Secondary accent |
| Accent Cyan | `#00D4FF` | Highlight, links |
| Text Primary | `#FFFFFF` | Headings, body |
| Text Secondary | `#A0A0B8` | Subtext |
| Text Muted | `#5C5C78` | Placeholders, captions |
| Success | `#22C55E` | Form success, toasts |
| Error | `#EF4444` | Validation errors |
| Warning | `#F59E0B` | Warnings |
| Overlay | `rgba(0,0,0,0.7)` | Modal backdrop |

> **Contrast Check (WCAG AA):**
> - White `#FFF` on `#0D0D1A` → ✅ 14.7:1
> - `#A0A0B8` on `#0D0D1A` → ✅ 5.2:1
> - `#FF6B35` on `#0D0D1A` → ✅ 4.6:1 (large text only — use white label on orange buttons)
> - `#5C5C78` on `#0D0D1A` → ⚠️ 2.8:1 — use only for decorative/muted text, never for critical info

---

### Typography

| Role | Font | Weight | Size Range |
|---|---|---|---|
| Display / Hero | `Plus Jakarta Sans` | 800 ExtraBold | 48–96px |
| Heading H1 | `Plus Jakarta Sans` | 700 Bold | 36–48px |
| Heading H2 | `Plus Jakarta Sans` | 700 Bold | 28–36px |
| Heading H3 | `Inter` | 600 SemiBold | 20–24px |
| Body Large | `Inter` | 400 Regular | 18px |
| Body | `Inter` | 400 Regular | 16px |
| Body Small | `Inter` | 400 Regular | 14px |
| Label / Badge | `Inter` | 500 Medium | 12–13px (uppercase, tracked) |
| Code / Tech | `Space Grotesk` | 400–500 | 14–16px |

**Line Heights:**
- Headings: `1.1–1.2`
- Body: `1.6–1.7`
- Labels: `1.0`

**Letter Spacing:**
- Display: `-0.02em`
- Labels/badges: `+0.08em` (uppercase)

---

### Gradients & Glows

```css
/* Brand gradients */
--gradient-brand:   linear-gradient(135deg, #FF6B35 0%, #7C3AED 100%);
--gradient-cyan:    linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%);
--gradient-dark:    linear-gradient(180deg, #0D0D1A 0%, #13131F 100%);
--gradient-card:    linear-gradient(135deg, #1A1A2E 0%, #13131F 100%);

/* Glow effects */
--glow-orange:  0 0 40px rgba(255, 107, 53, 0.3);
--glow-purple:  0 0 40px rgba(124, 58, 237, 0.3);
--glow-cyan:    0 0 40px rgba(0, 212, 255, 0.3);
--glow-card:    0 4px 32px rgba(0, 0, 0, 0.4);
```

**Glow usage rules:**
- Orange glow → primary CTA buttons, active nav, hero elements
- Purple glow → service cards hover
- Cyan glow → highlight/accent elements, links on dark

---

### Animation Timing Tokens

```css
--duration-instant:  80ms;
--duration-fast:     150ms;
--duration-base:     250ms;
--duration-slow:     400ms;
--duration-slower:   600ms;
--duration-reveal:   800ms;

--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);    /* spring-like */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

### Z-Index Scale

```
z-base:       0
z-raised:     10   (cards, dropdowns)
z-sticky:     100  (sticky header)
z-overlay:    200  (modal backdrop)
z-modal:      300  (modal content)
z-toast:      400  (notifications)
z-tooltip:    500
```

---

## 2. Site Architecture (Pages)

```
/                          → Home
/about                     → About Us
/services                  → All Services (overview)
/services/digital-marketing
/services/social-media-marketing
/services/photography-videography
/services/website-development
/services/ecommerce-development
/portfolio                 → Work Showcase
/portfolio/[slug]          → Case Study Detail
/pricing                   → Pricing Plans
/blog                      → Blog / Insights
/blog/[slug]               → Blog Post Detail
/contact                   → Contact Us
/thank-you                 → Post-form success page
/privacy-policy
/terms
404                        → Custom Not Found page
```

---

## 3. Component Architecture (Nuxt)

```
components/
├── layout/
│   ├── AppHeader.vue          ← Sticky nav, transparent → solid on scroll
│   ├── AppFooter.vue
│   ├── MobileMenu.vue         ← Full-screen slide overlay
│   └── BackToTop.vue          ← Appears after 300px scroll
├── ui/
│   ├── GradientButton.vue     ← Primary / Secondary / Ghost variants
│   ├── SectionBadge.vue       ← Pill labels ("Our Services", "Why Us")
│   ├── ServiceCard.vue
│   ├── TestimonialCard.vue
│   ├── PortfolioCard.vue
│   ├── BlogCard.vue
│   ├── StatCounter.vue        ← Animated numbers on viewport enter
│   ├── GlowDivider.vue
│   ├── SkeletonLoader.vue     ← Loading placeholder for cards/lists
│   ├── ToastNotification.vue  ← Success / error / warning toasts
│   ├── BaseModal.vue          ← Accessible dialog wrapper
│   ├── AppBreadcrumb.vue
│   ├── BasePagination.vue
│   ├── FaqAccordion.vue
│   ├── PricingCard.vue
│   └── TagBadge.vue           ← Blog/portfolio category tags
├── sections/
│   ├── HeroSection.vue
│   ├── TrustedBySection.vue   ← Client logo marquee
│   ├── ServicesSection.vue
│   ├── WhyUsSection.vue
│   ├── ProcessSection.vue     ← Horizontal timeline
│   ├── PortfolioSection.vue
│   ├── TestimonialsSection.vue
│   ├── CtaSection.vue
│   ├── BlogSection.vue
│   └── ContactSection.vue
└── pages/
    └── (page-specific one-off sections)
```

---

## 4. Component States Specification

Every interactive component must implement all states:

### Button States
| State | Visual |
|---|---|
| Default | Gradient bg, white text |
| Hover | Gradient shifts 15deg, scale 1.02, glow shadow |
| Active / Pressed | Scale 0.97, brightness -10% |
| Focus (keyboard) | `outline: 2px solid #00D4FF`, offset 2px — never remove outline |
| Loading | Spinner replaces text, disabled pointer |
| Disabled | Opacity 0.4, cursor not-allowed |

### Card States
| State | Visual |
|---|---|
| Default | `bg-brand-card`, `border border-brand-border` |
| Hover | Border → `#FF6B35` glow, `translateY(-4px)`, shadow deepens |
| Active | `translateY(-1px)` |
| Focus | Cyan outline for keyboard users |

### Input / Form States
| State | Visual |
|---|---|
| Default | `border border-brand-border`, dark bg |
| Focus | `border-brand-orange`, subtle orange glow |
| Valid | `border-brand-success` (`#22C55E`) |
| Invalid | `border-brand-error` (`#EF4444`) + error message below |
| Disabled | Opacity 0.5, no interaction |

---

## 5. Page-by-Page Layout Plan

### HOME PAGE `/`

```
[HEADER]
  Logo | Nav Links | "Get a Quote" CTA button

[HERO SECTION]
  - Full viewport height (100svh — mobile safe)
  - Animated gradient mesh background + floating particle orbs
  - Eyebrow badge: "Your Growth Partner"
  - Headline: "We Grow Your Business Online"
  - Subheadline: Services tagline (18px, text-secondary)
  - 2 CTA buttons: "View Our Services" (primary) | "Contact Us" (ghost)
  - Social proof strip: "50+ Clients | 100+ Projects | 5★ Rating"
  - Scroll indicator arrow (animated bounce)
  - Background: Abstract 3D mesh / floating blobs (CSS or GSAP)

[TRUSTED BY]
  - "Trusted by growing businesses" label
  - Auto-scrolling logo marquee (infinite, pausable on hover)

[SERVICES SECTION]
  - Section badge + H2 headline
  - Grid of 5 service cards
    - Icon (Lottie or SVG, plays on hover)
    - Service name
    - 2-line description
    - "Explore →" link
  - Hover: purple glow border + lift

[WHY CHOOSE US]
  - 4-column animated stat counters (number + label)
  - Feature grid: icon + title + 1-line description (6 features)

[PORTFOLIO SHOWCASE]
  - Filter tabs: All | Web | Photo | Social | Video
  - Masonry/grid of 6 recent works
  - Hover overlay: project title + category + "View" button

[PROCESS SECTION]
  - Horizontal numbered timeline (1→4)
  - Steps: Discovery → Strategy → Execute → Deliver
  - Each step: icon + title + 2-line description

[TESTIMONIALS]
  - Auto-play carousel / infinite marquee
  - Card: avatar + name + company + rating stars + quote

[BLOG / INSIGHTS]
  - 3 latest blog cards (thumbnail + category + title + date + read time)

[CTA BANNER]
  - Full-width gradient banner (orange → purple)
  - "Ready to scale your business?" headline
  - "Let's Talk" button (white)

[FOOTER]
  Logo | Tagline | Nav Links | Services Links | Social Icons | Copyright
```

---

### SERVICES PAGE `/services`

```
[PAGE HERO]
  - Breadcrumb: Home > Services
  - Title + short description
  - Background: subtle grid pattern

[SERVICE CARDS GRID]  (2-col tablet, 3-col desktop)
  - Each card:
    - Animated icon (hover triggers Lottie)
    - Service name (H3)
    - Description (3–4 lines)
    - Key features list (checkmark icons)
    - "Learn More →" link
  - Card hover: border glow + lift

[PROCESS / APPROACH SECTION]
  - "Our Approach" label
  - 4-step numbered grid

[CTA]  "Have a project in mind?" + button
```

---

### INDIVIDUAL SERVICE PAGE `/services/[slug]`

```
[HERO]
  - Service icon (large, animated)
  - Service name (H1) + tagline
  - "Get a Quote" CTA

[OVERVIEW]
  - 2-col layout: text left, illustration/mockup right
  - What we do, why it matters (2–3 paragraphs)

[WHAT'S INCLUDED]
  - Icon + title + description cards (2-3 col grid)

[OUR PROCESS]
  - Vertical numbered steps (mobile) / horizontal (desktop)
  - Each step: number badge + title + description

[RESULTS / CASE STUDIES]
  - 2–3 mini portfolio cards with result metrics overlay

[PRICING TEASER]
  - Simplified plan cards or "Custom quote" prompt

[FAQ ACCORDION]
  - 6–8 relevant questions
  - Smooth expand/collapse animation

[CTA]  "Start a Project" full-width section
```

---

### PORTFOLIO PAGE `/portfolio`

```
[PAGE HERO]  Title + breadcrumb

[FILTER TABS]
  All | Web Dev | Social Media | Photography | Video | E-commerce
  (Animated underline indicator)

[MASONRY / GRID]
  - Each card: thumbnail (16:9) + category tag + title
  - Hover overlay: gradient + title + "View Case Study" button
  - Smooth filter transition (FLIP animation or Framer)

[CASE STUDY MODAL or /portfolio/[slug]]
  - Full case study: problem → solution → results
  - Result metrics highlighted (e.g., "+300% traffic")

[LOAD MORE]  Button or infinite scroll with skeleton loader
```

---

### PRICING PAGE `/pricing`

```
[PAGE HERO]  "Simple, Transparent Pricing"

[BILLING TOGGLE]  Monthly / Yearly (save 20%)

[PRICING CARDS]  3-column (Starter | Growth | Enterprise)
  - Highlighted card: "Most Popular" badge, glowing border
  - Plan name, price, billing period
  - Feature list (checkmarks)
  - CTA button

[COMPARISON TABLE]  Full feature comparison (collapsible on mobile)

[FAQ ACCORDION]  Pricing-specific questions

[CUSTOM QUOTE CTA]  "Need something custom? Let's talk."
```

---

### BLOG PAGE `/blog`

```
[PAGE HERO]  Title + search bar

[FILTER TABS]  All | SEO | Social Media | Web Dev | Case Studies

[FEATURED POST]  Large card (first post, full-width)

[POST GRID]  3-col cards
  - Thumbnail + Category tag + Title + Excerpt + Date + Read time

[SIDEBAR (desktop)]
  - Popular posts
  - Newsletter signup
  - Tag cloud

[PAGINATION]
```

---

### BLOG DETAIL `/blog/[slug]`

```
[READING PROGRESS BAR]  Thin orange line at top of viewport

[ARTICLE HEADER]
  - Category + Date + Read time
  - H1 title
  - Author avatar + name

[FEATURED IMAGE]  Full-width, rounded

[ARTICLE CONTENT]
  - Prose styles: headings, blockquotes, code blocks, lists
  - Max-width: 720px, centered

[TABLE OF CONTENTS]  Sticky sidebar on desktop

[SHARE BUTTONS]  LinkedIn, Twitter/X, Copy link

[AUTHOR BIO CARD]

[RELATED POSTS]  3 cards below article
```

---

### CONTACT PAGE `/contact`

```
[SPLIT LAYOUT]
  Left:
    - "Let's Work Together" H1
    - Contact info: email, phone, WhatsApp button
    - Social icons
    - Working hours
    - Location (city, country)
  Right:
    - Form: Name | Email | Service (dropdown) | Budget range | Message
    - reCAPTCHA v3 (invisible)
    - Submit button with loading state
    - Real-time inline validation

[THANK YOU STATE]
  - After submit: inline success message or redirect to /thank-you
  - Show: "We'll reply within 24 hours"

[MAP EMBED]  Google Maps (lazy loaded)
```

---

### THANK YOU PAGE `/thank-you`

```
- Animated checkmark / confetti
- "Message received!" heading
- Estimated response time
- "Return Home" + "View Our Work" links
```

---

### 404 PAGE

```
- Illustrated or animated 404 graphic
- "Page not found" heading
- Brief message
- Search bar (optional)
- Suggested links: Home | Services | Portfolio | Contact
```

---

## 6. Design System Tokens (Tailwind Config)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          black:           '#0A0A0F',
          bg:              '#0D0D1A',
          surface:         '#13131F',
          card:            '#1A1A2E',
          border:          '#2A2A3F',
          'border-strong': '#3A3A5C',
          orange:          '#FF6B35',
          purple:          '#7C3AED',
          cyan:            '#00D4FF',
          success:         '#22C55E',
          error:           '#EF4444',
          warning:         '#F59E0B',
          'text-primary':   '#FFFFFF',
          'text-secondary': '#A0A0B8',
          'text-muted':     '#5C5C78',
        }
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        mono:    ['Space Grotesk', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['96px', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-xl':  ['72px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg':  ['56px', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md':  ['48px', { lineHeight: '1.15' }],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #FF6B35 0%, #7C3AED 100%)',
        'gradient-cyan':  'linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)',
        'gradient-dark':  'linear-gradient(180deg, #0D0D1A 0%, #13131F 100%)',
        'glow-orange':    'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)',
        'glow-purple':    'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
        'grid-pattern':   'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid':  '32px 32px',
      },
      boxShadow: {
        'glow-orange': '0 0 40px rgba(255, 107, 53, 0.3)',
        'glow-purple': '0 0 40px rgba(124, 58, 237, 0.3)',
        'glow-cyan':   '0 0 40px rgba(0, 212, 255, 0.3)',
        'card':        '0 4px 32px rgba(0,0,0,0.4)',
        'card-hover':  '0 16px 48px rgba(0,0,0,0.6)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '80':  '80ms',
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      borderRadius: {
        'card': '16px',
        'btn':  '8px',
      },
    }
  }
}
```

---

## 7. UX Principles & Interactions

### Navigation
- Sticky header: `backdrop-blur-md` + transparent → `bg-brand-surface/90` on scroll
- Transition: 250ms ease on background
- Mobile: hamburger → full-screen slide overlay (z-modal)
- Active route: orange underline indicator (`h-0.5 bg-brand-orange`)
- Dropdown menus: on hover (desktop) / tap (mobile) with smooth fade+translate

### Micro-interactions Specification

| Element | Trigger | Animation |
|---|---|---|
| CTA Button | Hover | Gradient rotates 15deg, scale 1.02, glow appears (250ms spring) |
| CTA Button | Click | Scale 0.97 (80ms), bounce back (150ms) |
| Service Card | Hover | translateY(-4px), border color → orange, shadow deepens |
| Portfolio Card | Hover | Overlay fades in (250ms), thumbnail subtle zoom 1.05 |
| Nav Link | Hover | Orange underline slides in from left (200ms) |
| Stat Counter | In viewport | Count from 0 → final value over 2s, ease-out |
| Accordion FAQ | Click | Content height animates from 0, chevron rotates 180deg |
| Mobile menu | Open | Slides in from right, items stagger-fade in |
| Toast | Appear | Slide in from bottom-right + fade, auto-dismiss 4s |
| Logo marquee | Default | Continuous scroll, pauses on hover |
| Form submit | Loading | Button text → spinner, fields disabled |
| Page transition | Route change | Fade out (150ms) → fade in (250ms) |

### Scroll Behavior
- Smooth scroll: `scroll-behavior: smooth` + `nuxt/scroll-behavior`
- Section reveal: `@vueuse/motion` — `fade + translateY(30px)` with 0.1s stagger
- Back-to-top button: appears after 300px scroll, smooth scroll to top
- Parallax: hero background at 0.5x scroll speed (optional, disable on mobile)

### Loading & Skeleton States
- **Initial page load:** Skeleton loaders for cards (pulsing shimmer effect)
- **Image loading:** Blur-up placeholder → full image
- **Lazy sections:** IntersectionObserver triggers component mount
- **Form submit:** Button spinner + fields disabled, no double-submit
- **Portfolio filter:** Skeleton while filtering, smooth FLIP animation

```vue
<!-- Skeleton shimmer pattern -->
<div class="animate-pulse bg-brand-surface rounded-card h-48 w-full" />
```

### Forms
- Real-time validation: validate `on-blur`, not on-keystroke (less intrusive)
- Error messages: appear below field with slide-down animation
- Success state: green border + checkmark icon
- Submit: Loading spinner on button, disabled state, then redirect/toast
- reCAPTCHA v3 (invisible) — no user friction

---

## 8. Accessibility (WCAG 2.1 AA)

### Core Requirements
- All interactive elements reachable and operable via keyboard (Tab, Enter, Space, Arrow keys, Escape)
- Focus ring: always visible — `outline: 2px solid #00D4FF; outline-offset: 2px`
- Never use `outline: none` without a custom focus style replacement
- Skip-to-content link at page top (visible on focus)
- Logical heading hierarchy (H1 → H2 → H3, never skip levels)

### ARIA Labels
```html
<!-- Mobile menu toggle -->
<button aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu">

<!-- Icon-only buttons -->
<button aria-label="Close modal">
  <Icon name="mdi:close" aria-hidden="true" />
</button>

<!-- Carousel -->
<div role="region" aria-label="Client testimonials">

<!-- Live regions for notifications -->
<div aria-live="polite" aria-atomic="true">{{ toastMessage }}</div>
```

### Images & Media
- All `<img>` and `<NuxtImg>` must have meaningful `alt` text
- Decorative images: `alt=""` (empty, not missing)
- Videos: captions or transcript provided
- Animations: respect `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color
- Never rely on color alone to convey state — pair with icon or text
- Error fields: red border + error icon + error text message

---

## 9. Icon System

**Primary library:** `nuxt-icon` with `@iconify/vue`

| Category | Icon Set | Example |
|---|---|---|
| Services | `mdi:` | `mdi:trending-up`, `mdi:instagram` |
| UI / Actions | `mdi:` or `heroicons:` | `mdi:arrow-right`, `heroicons:check` |
| Social | `mdi:` | `mdi:linkedin`, `mdi:twitter` |
| Tech accent | `simple-icons:` | `simple-icons:nuxtdotjs` |

**Usage rules:**
- Icon size: 24px default, 20px in text, 32–48px in cards
- Always `aria-hidden="true"` when decorative
- Use consistent set per page — don't mix MDI and Heroicons randomly
- Service icons: custom SVG Lottie (animated on hover) for uniqueness

---

## 10. Image & Asset Strategy

- All images via `<NuxtImg>` (auto WebP conversion, lazy loading)
- Hero backgrounds: CSS gradients or minimal WebP (< 200KB)
- Portfolio thumbnails: 800×600 WebP, 2x srcset
- Blog thumbnails: 640×360 WebP
- Team photos: 400×400 WebP, square crop
- Icons: SVG only (never PNG for icons)
- Lottie files: only for hero/service icons, keep < 50KB each
- Public folder: `/public/images/`, `/public/videos/`, `/public/og/` (OG images)

---

## 11. Nuxt.js Setup Plan

### Dependencies

```bash
# Core
nuxt@3
@nuxtjs/tailwindcss
@nuxtjs/google-fonts
@vueuse/nuxt
nuxt-icon

# Animation
@vueuse/motion   # Scroll-triggered reveals
gsap             # Complex timelines (hero, counters)

# UI Components
@headlessui/vue  # Accessible modals, dropdowns
swiper           # Carousels

# Forms & Validation
vee-validate
yup

# SEO & Performance
@nuxtjs/sitemap
@nuxtjs/robots
@nuxtjs/seo      # useSeoMeta helper

# Content (Blog)
@nuxt/content
```

### `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-icon',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/content',
  ],
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
      'Plus Jakarta Sans': [600, 700, 800],
      'Space Grotesk': [400, 500],
    },
    display: 'swap',
    preload: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon/favicon.png' }],
    },
  },
  image: {
    format: ['webp'],
    quality: 85,
  },
})
```

---

## 12. Folder Structure

```
MetagenFrontend/
├── assets/
│   ├── css/
│   │   ├── main.css            ← Global styles, scrollbar, fonts, prose
│   │   └── animations.css      ← Reusable keyframes
│   ├── images/                 ← Source images (processed by NuxtImg)
│   └── lottie/                 ← Lottie JSON files for service icons
├── components/                 ← (see Section 3)
├── composables/
│   ├── useScrollAnimation.ts   ← Intersection Observer helpers
│   ├── useContactForm.ts       ← Form state + validation + submit
│   ├── useToast.ts             ← Toast notification state
│   └── useCounter.ts           ← Animated stat counter
├── content/
│   └── blog/                   ← MDC blog posts (Nuxt Content)
├── layouts/
│   ├── default.vue             ← Header + Footer
│   └── minimal.vue             ← Blog posts, legal pages
├── pages/                      ← (see Section 2)
├── public/
│   ├── images/
│   ├── videos/
│   ├── og/                     ← Open Graph images (1200×630)
│   └── favicon/
├── server/
│   └── api/
│       └── contact.post.ts     ← Contact form email handler
├── types/
│   └── index.ts                ← Portfolio, Blog, Service types
├── nuxt.config.ts
├── tailwind.config.js
└── .env
```

---

## 13. Services Content Plan

| Service | Icon | Key Benefits | Target Keyword |
|---|---|---|---|
| Digital Marketing | `mdi:trending-up` | ROI-focused, Analytics, Paid Ads | Digital marketing Bangladesh |
| Social Media Marketing | `mdi:instagram` | Content creation, Community, Growth | SMM agency Dhaka |
| Photography & Videography | `mdi:camera` | Product shoots, Reels, Brand films | Product photography Dhaka |
| Website Development | `mdi:web` | Custom design, Fast, SEO-ready | Web design Bangladesh |
| E-commerce Development | `mdi:shopping` | Shopify, WooCommerce, Full setup | E-commerce development BD |

---

## 14. SEO & Meta Strategy

- `useSeoMeta()` on every page with unique title + description
- Title format: `"Page Title | MetaGenDigital"` (max 60 chars)
- Meta description: 150–160 chars, include primary keyword
- OG images: 1200×630px per page, stored in `/public/og/`
- Canonical URLs on all pages
- Structured data schemas:
  - `Organization` — homepage
  - `LocalBusiness` — contact/about page
  - `Service` — each service page
  - `BlogPosting` — blog posts
  - `BreadcrumbList` — all inner pages
- Sitemap auto-generated via `@nuxtjs/sitemap`
- `/robots.txt` via `@nuxtjs/robots`

---

## 15. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FID / INP | < 200ms |
| Total JS Bundle (initial) | < 200KB gzipped |

**Strategies:**
- Lazy load all sections below the fold
- `<NuxtImg>` for all images (WebP + lazy)
- Dynamic import heavy components (Swiper, GSAP) client-side only
- Preload Google Fonts (swap)
- No render-blocking scripts

---

## 16. Responsive Breakpoints

| Name | Breakpoint | Usage |
|---|---|---|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large screens |

**Grid system:**
- Mobile: 1 col, 16px gutter
- Tablet: 2 col, 24px gutter
- Desktop: 3–4 col, 32px gutter
- Max content width: `1280px`, centered

**Mobile-specific UX:**
- Touch targets: minimum `44×44px` (WCAG 2.5.5)
- Tap highlight: `webkit-tap-highlight-color: transparent`
- Viewport: `width=device-width, initial-scale=1, viewport-fit=cover`
- Use `100svh` (safe viewport height) for hero — avoids mobile browser chrome overlap
- Disable hover-only interactions on touch devices (use `@media (hover: hover)`)

---

## 17. Phase-wise Development Plan

### Phase 1 — Foundation (Week 1–2)
- [ ] Nuxt 3 project setup with Tailwind, fonts, icons
- [ ] Design tokens + Tailwind config
- [ ] Global CSS (scrollbar, prose, animations, focus styles)
- [ ] Layout components: Header, Footer, MobileMenu, BackToTop
- [ ] Reusable UI: GradientButton, SectionBadge, GlowDivider, SkeletonLoader, ToastNotification

### Phase 2 — Home Page (Week 2–3)
- [ ] HeroSection (animation + particles)
- [ ] TrustedBy marquee
- [ ] ServicesSection
- [ ] WhyUsSection + StatCounters
- [ ] ProcessSection (timeline)
- [ ] PortfolioSection (filtered grid)
- [ ] TestimonialsSection (carousel)
- [ ] BlogSection (3 cards)
- [ ] CtaSection (banner)
- [ ] Page transitions

### Phase 3 — Inner Pages (Week 3–5)
- [ ] Services overview page
- [ ] 5 individual service pages (slug routing)
- [ ] Portfolio page + case study detail
- [ ] Pricing page
- [ ] About page
- [ ] Contact page + form API (`server/api/contact.post.ts`)
- [ ] Thank You page
- [ ] 404 page

### Phase 4 — Blog & Content (Week 5–6)
- [ ] Blog listing + filter
- [ ] Blog detail (reading progress, TOC, share)
- [ ] Nuxt Content MDC setup
- [ ] Prose styling

### Phase 5 — SEO & Analytics (Week 6)
- [ ] `useSeoMeta()` on all pages
- [ ] OG images for all key pages
- [ ] Structured data schemas
- [ ] Sitemap + robots.txt
- [ ] Google Analytics 4 setup

### Phase 6 — Polish & Deploy (Week 7)
- [ ] `prefers-reduced-motion` implementation
- [ ] Full accessibility audit (keyboard, ARIA, contrast)
- [ ] Lighthouse audit (target ≥ 90 all metrics)
- [ ] Mobile QA (iOS Safari, Android Chrome)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Deploy to Vercel / Netlify

---

*Document updated: 2026-04-06 | MetaGenDigital Frontend Planning*
