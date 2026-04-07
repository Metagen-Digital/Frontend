// ─── Service ─────────────────────────────────────────────────
export interface Service {
  slug: string
  name: string
  icon: string
  tagline: string
  description: string
  features: string[]
  color: 'orange' | 'purple' | 'cyan'
}

// ─── Portfolio ────────────────────────────────────────────────
export type PortfolioCategory = 'Web Dev' | 'Social Media' | 'Photography' | 'Video' | 'E-commerce'

export interface PortfolioItem {
  slug: string
  title: string
  category: PortfolioCategory
  thumbnail: string
  client?: string
  year?: number
  summary?: string
  results?: { label: string; value: string }[]
  images?: string[]
}

// ─── Blog ─────────────────────────────────────────────────────
export type BlogCategory = 'SEO' | 'Social Media' | 'Web Dev' | 'Case Studies' | 'Marketing'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  thumbnail: string
  date: string        // ISO 8601
  readTime: string    // e.g. "5 min read"
  author: Author
  tags?: string[]
}

export interface Author {
  name: string
  avatar?: string
  role?: string
}

// ─── Pricing ──────────────────────────────────────────────────
export interface PricingFeature {
  text: string
  included: boolean
}

export interface PricingPlan {
  name: string
  price: number | string
  period?: string
  description?: string
  features: PricingFeature[]
  featured?: boolean
  ctaLabel?: string
  ctaTo?: string
}

// ─── Testimonial ──────────────────────────────────────────────
export interface Testimonial {
  name: string
  company: string
  avatar?: string
  rating: number
  quote: string
}

// ─── FAQ ──────────────────────────────────────────────────────
export interface FaqItem {
  question: string
  answer: string
}

// ─── Contact form ─────────────────────────────────────────────
export interface ContactPayload {
  name: string
  email: string
  service: string
  budget?: string
  message: string
}

// ─── Stat ─────────────────────────────────────────────────────
export interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
}
