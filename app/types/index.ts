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

// ─── API Response Wrapper ─────────────────────────────────
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  locale?: string
  meta?: PaginationMeta
}

export interface PaginationMeta {
  current_page: number
  per_page: number
  total: number
  last_page: number
}

// ─── Service API Types ────────────────────────────────────
export interface ServiceApiItem {
  id: number
  title: string
  slug: string
  short_description: string
  description: string
  icon: string | null
  featured_image: string | null
  gallery: string[]
  starting_price: number | null
  formatted_price: string | null
  features: string[]
  technologies: string[]
  category: string | null
  delivery_time: number | null
  revisions: number | null
  is_featured: boolean
  packages: ServicePackageApiItem[]
  faqs: ServiceFaqApiItem[]
  seo: SeoData
}

export interface ServicePackageApiItem {
  id: number
  name: string
  description: string
  price: number
  formatted_price: string
  delivery_time: number
  formatted_delivery_time: string
  revisions: number
  formatted_revisions: string
  features: string[]
  extra_features: string[]
  is_popular: boolean
}

export interface ServiceFaqApiItem {
  id: number
  question: string
  answer: string
}

// ─── Blog API Types ───────────────────────────────────────
export interface BlogApiItem {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string | null
  categories: BlogCategoryItem[]
  categoriesList?: string
  categoryClass?: string
  tags?: string[]
  authorName: string
  authorImage: string | null
  authorBio?: string | null
  featuredImage: string | null
  galleryImages?: string[]
  readTime: number
  readTimeText: string
  views: number
  publishedAt?: string | null
  formattedPublishedDate?: string | null
  isFeatured: boolean
  isPublished?: boolean
}

export interface BlogApiDetail extends BlogApiItem {
  content: string
  metaTitle?: string | null
  metaDescription?: string | null
  metaKeywords?: string[] | null
  schemaMarkup?: object | null
  seo?: SeoData
}

export interface BlogCategoryItem {
  id: number
  name: string
  slug: string
  description?: string | null
  color?: string | null
  icon?: string | null
  count?: number
}

// ─── Case Study / Portfolio API Types ─────────────────────
export interface CaseStudyApiItem {
  id: number
  title: string
  slug: string
  category: string
  categoryClass?: string
  description: string
  summary?: string | null
  image: string | null
  bgColor?: string | null
  buttonClass?: string | null
  technologies: string[]
  metrics: CaseStudyMetric[]
  type: string
  clientName?: string | null
  projectDuration?: string | null
  projectStartDate?: string | null
  projectEndDate?: string | null
  projectUrl?: string | null
  galleryImages?: string[]
  challenges?: Array<Record<string, string>>
  solutions?: Array<Record<string, string>>
  results?: Array<Record<string, string>>
  isFeatured?: boolean
  isPublished?: boolean
  createdAt?: string | null
  seo?: SeoData
}

export interface CaseStudyApiDetail extends CaseStudyApiItem {
  detailedDescription?: string | null
}

export interface CaseStudyMetric {
  label: string
  value: string
}

// ─── Testimonial API Types ────────────────────────────────
export interface TestimonialApiItem {
  id: number
  name: string
  position: string
  company: string
  quote: string
  image?: string | null
  rating: number
  website_url?: string | null
  linkedin_url?: string | null
  is_featured: boolean
}

// ─── Partner API Types ────────────────────────────────────
export interface PartnerApiItem {
  id: number
  name: string
  slug: string
  logo: string | null
  website_url?: string | null
  description?: string | null
  type: string
  is_featured: boolean
}

// ─── SEO Data ─────────────────────────────────────────────
export interface SeoData {
  meta_title: string | null
  meta_description: string | null
  meta_keywords?: string[] | null
  og_title?: string | null
  og_description?: string | null
  og_image?: string | null
  twitter_title?: string | null
  twitter_description?: string | null
  twitter_image?: string | null
  schema_markup: object | null
}

// ─── Career API Types ─────────────────────────────────────
export interface CareerJobApiItem {
  id: number
  title: string
  slug: string
  department: string
  location: string
  type: string
  experience_level: string
  salary_range: string | null
  salary_period: string | null
  description: string
  requirements: string[]
  is_featured: boolean
  application_deadline: string | null
  created_at: string
}

export interface CareerJobApiDetail extends CareerJobApiItem {
  responsibilities: string[]
  benefits: string[]
  meta_title: string | null
  meta_description: string | null
}

// ─── Product API Types ────────────────────────────────────
export interface ProductApiItem {
  id: number
  name: string
  slug: string
  tagline: string
  short_description: string
  featured_image: string | null
  category: string | null
  categoryId: string | null
  badge: string | null
  badge_color: string | null
  badgeClass: string
  price_display: string | null
  price_period: string | null
  price_amount: string | null
  features: string[]
  rating: number | null
  reviews_count: number
  is_featured: boolean
  bg_gradient: string | null
  icon_path: string | null
  purchase_link: string | null
}

export interface ProductApiDetail extends ProductApiItem {
  description: string | null
  pricing_note: string | null
  gallery: string[]
  stats: Array<{ label: string; value: string }>
  highlights: string[]
  plans: Array<{
    name: string
    price: string
    period?: string
    description?: string
    features: string[]
    is_popular?: boolean
  }>
  seo: SeoData
}

// ─── Contact Form API Payload ─────────────────────────────
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  service: string
  message: string
  newsletter_subscription?: boolean
}
