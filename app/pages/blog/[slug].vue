<script setup lang="ts">
import type { BlogApiDetail, BlogApiItem } from "~/types";

const route = useRoute();

type CategoryColor = "orange" | "purple" | "cyan";

interface TocItem {
  id: string;
  title: string;
}
interface AuthorInfo {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}
interface PostData {
  title: string;
  category: string;
  categoryColor: CategoryColor;
  date: string;
  readTime: string;
  thumbnail: string;
  author: AuthorInfo;
  tags: string[];
  toc: TocItem[];
  body: string;
  relatedSlugs: string[];
}

/* ─── Article data ─────────────────────────────────────────── */
const postMap: Record<string, PostData> = {
  "digital-marketing-trends-2025": {
    title: "Digital Marketing Trends You Cannot Ignore in 2025",
    category: "Marketing",
    categoryColor: "orange",
    date: "2025-04-01",
    readTime: "8 min read",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&auto=format&fit=crop",
    author: {
      name: "Meem Chowdhury",
      role: "Marketing Lead",
      avatar: "M",
      bio: "Meem leads digital strategy at MetaGenDigital with 6 years of experience running multi-channel campaigns for FMCG, e-commerce, and B2B brands across South Asia.",
    },
    tags: ["Digital Marketing", "AI", "SEO", "Content Strategy", "2025 Trends"],
    toc: [
      { id: "ai-personalisation", title: "1. AI-Powered Personalisation" },
      { id: "zero-click-search", title: "2. Zero-Click Search" },
      { id: "short-form-video", title: "3. Short-Form Video Dominance" },
      { id: "first-party-data", title: "4. First-Party Data Strategy" },
      { id: "conversational-marketing", title: "5. Conversational Marketing" },
    ],
    body: `<p>The digital marketing landscape shifts fast — but 2025 is bringing changes that feel more like a tectonic shift than an iteration. Brands that adapt now will pull ahead; those that don't will find themselves paying more to reach fewer people. Here are the five trends defining how the best marketers are winning right now.</p>

<h2 id="ai-personalisation">1. AI-Powered Personalisation at Scale</h2>
<p>Consumers now expect content that feels made for them. AI tools are enabling marketers to deliver dynamically personalised email sequences, ad copy variations, and website experiences based on user behaviour — all without manual effort at scale. Tools like Adobe Sensei, HubSpot AI, and custom GPT-based content engines are moving from novelty to necessity.</p>
<p>The brands winning with AI aren't replacing their teams — they're amplifying them. An AI can generate 100 headline variations in seconds; a human strategist decides which one aligns with the brand and the moment.</p>

<h2 id="zero-click-search">2. Zero-Click Search is Eating Traffic</h2>
<p>Google's AI Overviews and featured snippets mean a growing proportion of searches now end without a click. Studies suggest over 65% of Google searches in 2024 were zero-click. This is a fundamental challenge for businesses that rely on organic traffic.</p>
<ul>
  <li>Optimise for <strong>brand visibility</strong> in AI-generated answers, not just click-throughs</li>
  <li>Invest in <strong>structured data markup</strong> to increase the chance of being cited</li>
  <li>Build authority via <strong>long-tail informational content</strong> where AI answers are less dominant</li>
  <li>Double down on <strong>owned channels</strong> — email and social — that zero-click doesn't affect</li>
</ul>

<h2 id="short-form-video">3. Short-Form Video is the Highest-ROI Content Format</h2>
<p>Instagram Reels, TikTok, and YouTube Shorts are now delivering 3–5× more organic reach than any other content type. More importantly, they're working at the bottom of the funnel — not just awareness. Brands that nail short-form video are seeing it directly drive clicks, sign-ups, and purchases.</p>
<blockquote>Accounts posting 4+ Reels per week see, on average, 45% faster follower growth and a 38% higher conversion rate from social traffic than those that don't.</blockquote>
<p>The barrier to entry is lower than you think. You don't need a studio — you need a clear hook, a simple structure (hook → value → CTA), and consistency. The algorithm rewards cadence over production value.</p>

<h2 id="first-party-data">4. First-Party Data is the New Competitive Advantage</h2>
<p>With third-party cookies largely gone and privacy regulations tightening globally, brands without a strong first-party data strategy are flying blind on paid media. Building owned data assets — email lists, SMS subscribers, loyalty programmes, and CRM databases — is now a core competitive moat.</p>
<p>Start by auditing every touchpoint where you can capture consent-based data. Optimise your lead magnets, gated content, and loyalty schemes. First-party data doesn't just reduce reliance on ad platforms — it enables the personalisation that AI tools need to be effective.</p>

<h2 id="conversational-marketing">5. Conversational Marketing via Chat and DM</h2>
<p>WhatsApp Business, Instagram DMs, and AI-powered chat are becoming high-converting sales channels — especially in markets like Bangladesh where messaging apps are the primary communication tool. Brands using conversational marketing report 3–5× higher conversion rates compared to form-based lead capture.</p>
<p>The best approach combines automation (for instant responses and qualification) with human escalation (for high-value leads). If you're not actively using your DMs as a sales channel, you're leaving significant revenue on the table in 2025.</p>`,
    relatedSlugs: [
      "google-ads-beginners-guide",
      "how-to-grow-on-social-media",
      "seo-tips-for-small-businesses",
    ],
  },

  "how-to-grow-on-social-media": {
    title: "How to Grow Your Brand on Social Media in 2025",
    category: "Social Media",
    categoryColor: "purple",
    date: "2025-03-15",
    readTime: "5 min read",
    thumbnail:
      "https://images.unsplash.com/photo-1611162616305-c69d394736a4?w=1400&q=85&auto=format&fit=crop",
    author: {
      name: "Nafisa Hossain",
      role: "Social Media Strategist",
      avatar: "N",
      bio: "Nafisa has managed social media for 40+ brands, specialising in Instagram and TikTok growth strategy for e-commerce and lifestyle brands.",
    },
    tags: ["Social Media", "Instagram", "TikTok", "Content Strategy", "Growth"],
    toc: [
      { id: "know-your-audience", title: "1. Know Your Audience" },
      { id: "content-strategy", title: "2. Build a Content Strategy" },
      { id: "short-form-video", title: "3. Prioritise Short-Form Video" },
      { id: "engage-genuinely", title: "4. Engage Genuinely" },
      { id: "track-and-iterate", title: "5. Track & Iterate" },
    ],
    body: `<p>Social media is no longer optional for businesses — it's where your customers are spending hours every day. But simply having accounts isn't enough. Growing a brand on social in 2025 requires strategy, consistency, and genuine human connection. Here's exactly how to do it.</p>

<h2 id="know-your-audience">1. Know Your Audience Inside Out</h2>
<p>Before you create a single post, understand exactly who you're talking to. Which platforms do they use most? What content formats do they engage with? What problems are they trying to solve? Use platform analytics, customer surveys, and competitor analysis to build a detailed picture of your ideal follower.</p>
<p>A common mistake is trying to be everywhere at once. Pick the 2–3 platforms where your audience is most active and do those brilliantly before expanding.</p>

<h2 id="content-strategy">2. Build a Consistent Content Strategy</h2>
<p>Consistency is the single biggest growth driver on social media. Brands that post 4–7 times per week consistently outperform those that post sporadically. Use a content calendar that mixes formats and topics in roughly this ratio:</p>
<ul>
  <li><strong>70% Educational</strong> — tips, how-tos, insights, explainers</li>
  <li><strong>20% Engagement</strong> — questions, polls, behind-the-scenes, community</li>
  <li><strong>10% Promotional</strong> — products, services, offers, testimonials</li>
</ul>
<p>Batching content — creating 2–3 weeks' worth in one session — removes the daily stress and keeps quality high.</p>

<h2 id="short-form-video">3. Prioritise Short-Form Video</h2>
<p>Instagram Reels, TikTok, and YouTube Shorts are getting 3–5× more organic reach than static posts in 2025. You don't need a professional studio — good lighting, clear audio, and a genuinely useful idea are enough. Aim for 15–30 second videos with a strong hook in the first 2 seconds, because that's all you get before someone scrolls past.</p>
<blockquote>Accounts posting 3+ Reels per week see on average 40% faster follower growth than those relying only on static posts.</blockquote>

<h2 id="engage-genuinely">4. Engage — Don't Just Broadcast</h2>
<p>Social media is a two-way conversation, not a broadcast channel. Reply to every comment in the first hour of posting — this signals to the algorithm that your content is worth distributing. Engage with content in your niche. Follow accounts your target audience follows and interact with their content genuinely. Building real relationships builds loyal followers who eventually become paying customers.</p>

<h2 id="track-and-iterate">5. Track Metrics and Iterate Weekly</h2>
<p>Growth without data is guesswork. Track these key metrics every week: reach per post, engagement rate, follower growth rate, and profile visits. Double down on formats and topics that consistently outperform your average. Cut what underperforms. The brands growing fastest on social are those that treat it like a product — testing, measuring, and improving continuously.</p>`,
    relatedSlugs: [
      "instagram-reels-guide",
      "digital-marketing-trends-2025",
      "brand-photography-tips",
    ],
  },

  "seo-tips-for-small-businesses": {
    title: "10 SEO Tips Every Small Business Should Know",
    category: "SEO",
    categoryColor: "orange",
    date: "2025-02-28",
    readTime: "7 min read",
    thumbnail:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1400&q=85&auto=format&fit=crop",
    author: {
      name: "Rakib Hassan",
      role: "SEO Specialist",
      avatar: "R",
      bio: "Rakib is a technical SEO specialist with 5+ years of experience helping small businesses rank on page one without big-agency budgets.",
    },
    tags: ["SEO", "Small Business", "Google", "Technical SEO", "Content"],
    toc: [
      { id: "google-business", title: "1. Claim Your Google Business Profile" },
      { id: "keyword-research", title: "2. Target Long-Tail Keywords" },
      { id: "on-page-seo", title: "3. Nail On-Page Basics" },
      { id: "page-speed", title: "4. Fix Your Page Speed" },
      { id: "local-seo", title: "5. Build Local Authority" },
    ],
    body: `<p>You don't need a six-figure SEO budget to rank on Google. Most small businesses are losing organic traffic to basic, fixable mistakes. These 10 tips cover what actually moves the needle — without requiring a developer or agency retainer.</p>

<h2 id="google-business">1. Claim and Optimise Your Google Business Profile</h2>
<p>If you serve local customers, your Google Business Profile (GBP) is more important than your website. Claim it, fill in every field, add photos every week, respond to every review, and post updates regularly. A well-managed GBP can put you in the "Map Pack" — the top 3 local results that get the majority of clicks.</p>

<h2 id="keyword-research">2. Target Long-Tail Keywords You Can Actually Win</h2>
<p>Ranking for "digital marketing" is nearly impossible for a small business. But "digital marketing agency in Dhaka for restaurants" is achievable. Long-tail keywords (3–5 words) have lower competition, higher conversion intent, and are far easier to rank for. Use free tools like Google Search Console, Ubersuggest, or even the Google autocomplete suggestions to find them.</p>
<ul>
  <li>Focus on <strong>location + service + qualifier</strong> combinations</li>
  <li>Look at what keywords your competitors rank for using Ubersuggest</li>
  <li>Target one primary keyword per page — don't try to rank for five things at once</li>
</ul>

<h2 id="on-page-seo">3. Nail the On-Page Basics on Every Page</h2>
<p>Each page on your site should have: a unique title tag (under 60 characters) including your primary keyword, a meta description (under 160 characters) that compels clicks, your keyword in the H1 heading, and naturally throughout the body copy. Add alt text to every image. Use a logical heading hierarchy (H1 → H2 → H3). These basics alone put you ahead of most local competitors.</p>

<h2 id="page-speed">4. Fix Your Page Speed — It Directly Affects Rankings</h2>
<p>Google uses Core Web Vitals as a ranking signal. A site loading in over 4 seconds loses approximately 25% of visitors before they even see your content. Run your site through Google PageSpeed Insights (free). The top fixes for most small business sites are: compress images to WebP format, remove unused plugins and scripts, and enable browser caching.</p>
<blockquote>A 1-second improvement in page load time increases conversions by an average of 7%. Speed is not just an SEO issue — it's a revenue issue.</blockquote>

<h2 id="local-seo">5. Build Local Authority with Citations and Reviews</h2>
<p>List your business consistently (same name, address, phone number) on Google, Facebook, Yelp, Yellow Pages, and any relevant local directories. Each consistent citation tells Google you're a legitimate local business. Then, actively ask your satisfied customers to leave Google reviews — this is the single most powerful local ranking signal. A business with 50 positive reviews will almost always outrank a competitor with 5, regardless of their website quality.</p>`,
    relatedSlugs: [
      "website-speed-and-seo",
      "digital-marketing-trends-2025",
      "google-ads-beginners-guide",
    ],
  },

  "ecommerce-store-launch-checklist": {
    title: "The Ultimate E-commerce Store Launch Checklist",
    category: "Web Dev",
    categoryColor: "cyan",
    date: "2025-02-10",
    readTime: "6 min read",
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1400&q=85&auto=format&fit=crop",
    author: {
      name: "Rifat Ahmed",
      role: "Web Developer",
      avatar: "R",
      bio: "Rifat specialises in e-commerce development, having launched 40+ Shopify and WooCommerce stores for brands across fashion, food, and lifestyle categories.",
    },
    tags: ["E-commerce", "Shopify", "Launch", "Checklist", "Web Dev"],
    toc: [
      { id: "store-setup", title: "1. Core Store Setup" },
      { id: "payments-shipping", title: "2. Payments & Shipping" },
      { id: "content-seo", title: "3. Content & SEO" },
      { id: "mobile-speed", title: "4. Mobile & Speed" },
      { id: "pre-launch-testing", title: "5. Pre-Launch Testing" },
    ],
    body: `<p>Launching an e-commerce store without running through a proper checklist is like opening a restaurant without a test menu. Small oversights — a broken payment gateway, missing mobile styles, or no returns policy — can cost you customers and trust from day one. Use this checklist before you go live.</p>

<h2 id="store-setup">1. Core Store Setup</h2>
<ul>
  <li>Custom domain connected and SSL certificate active (https://)</li>
  <li>Logo, favicon, and brand colours applied consistently</li>
  <li>All product listings complete: title, description, price, SKU, weight, images</li>
  <li>Product categories and navigation menu logical and tested</li>
  <li>Terms &amp; conditions, privacy policy, and returns/refund policy pages live</li>
  <li>Contact page with working form, phone, and WhatsApp link</li>
</ul>

<h2 id="payments-shipping">2. Payments & Shipping</h2>
<p>This is where most launches go wrong. Test every payment method end-to-end — including bKash, Nagad, card, and cash on delivery if applicable. A failed checkout is the most expensive mistake you can make.</p>
<ul>
  <li>All payment gateways tested with real transactions (then refunded)</li>
  <li>Shipping zones and rates configured correctly by location</li>
  <li>Courier integrations tested: Pathao, Steadfast, RedX, etc.</li>
  <li>Order confirmation emails tested and landing in inbox (not spam)</li>
  <li>Inventory tracking enabled so out-of-stock items are managed</li>
</ul>

<h2 id="content-seo">3. Content & SEO Foundations</h2>
<p>Your store needs to be discoverable from day one. The basics take only a few hours but make a significant difference to organic traffic in the first months.</p>
<ul>
  <li>Every product and category page has a unique title tag and meta description</li>
  <li>Product image alt text filled in for all images</li>
  <li>XML sitemap submitted to Google Search Console</li>
  <li>Robots.txt file configured correctly (not blocking search engines)</li>
  <li>Google Analytics 4 and Facebook Pixel (if running ads) installed and verified</li>
</ul>

<h2 id="mobile-speed">4. Mobile UX & Page Speed</h2>
<blockquote>Over 75% of e-commerce purchases in Bangladesh are made on mobile. If your store isn't perfect on a phone, you're losing the majority of your potential customers.</blockquote>
<p>Test every page on real mobile devices, not just a desktop browser preview. Check the checkout flow especially carefully — thumb-friendly buttons, readable font sizes, and no fields requiring pinch-to-zoom. Run Google PageSpeed Insights and resolve any critical issues before launch.</p>

<h2 id="pre-launch-testing">5. Pre-Launch Testing (Do This the Day Before)</h2>
<ul>
  <li>Place a complete test order through every payment method</li>
  <li>Check all product images load correctly and at full quality</li>
  <li>Test the search function and filter/sort features</li>
  <li>Click every link in the navigation, footer, and email templates</li>
  <li>Check the store on Chrome, Safari, and Firefox on both desktop and mobile</li>
  <li>Verify that abandoned cart emails trigger correctly after 1 hour</li>
</ul>`,
    relatedSlugs: [
      "website-speed-and-seo",
      "seo-tips-for-small-businesses",
      "digital-marketing-trends-2025",
    ],
  },

  "instagram-reels-guide": {
    title: "Instagram Reels Strategy That Actually Grows Your Account",
    category: "Social Media",
    categoryColor: "purple",
    date: "2025-01-22",
    readTime: "5 min read",
    thumbnail:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&q=85&auto=format&fit=crop",
    author: {
      name: "Nafisa Hossain",
      role: "Social Media Strategist",
      avatar: "N",
      bio: "Nafisa has managed social media for 40+ brands, specialising in Instagram and TikTok growth strategy for e-commerce and lifestyle brands.",
    },
    tags: ["Instagram", "Reels", "Social Media", "Short-Form Video", "Growth"],
    toc: [
      { id: "hook-formula", title: "1. Master the 2-Second Hook" },
      { id: "structure", title: "2. Structure Every Reel" },
      { id: "posting-cadence", title: "3. Posting Cadence" },
      { id: "hashtags-audio", title: "4. Hashtags & Audio Strategy" },
      { id: "analyse", title: "5. Analyse & Double Down" },
    ],
    body: `<p>Instagram Reels are delivering the highest organic reach of any content format on the platform — often 5–10× the reach of a standard photo post. But most accounts are leaving that reach on the table because their Reels strategy lacks structure. Here's what actually works.</p>

<h2 id="hook-formula">1. Master the 2-Second Hook</h2>
<p>You have exactly 2 seconds to stop someone from scrolling. The hook is the single most important element of any Reel. A strong hook creates curiosity, promises value, or creates pattern interruption — something visually or verbally unexpected.</p>
<ul>
  <li><strong>Question hook:</strong> "Why does your Instagram grow slowly even when you post every day?"</li>
  <li><strong>Shocking stat:</strong> "65% of Instagram accounts never reach 1,000 followers. Here's why."</li>
  <li><strong>Visual hook:</strong> Start mid-action — no slow intros, no 3-second logo holds</li>
  <li><strong>Bold statement:</strong> "Stop using hashtags this way immediately."</li>
</ul>

<h2 id="structure">2. Structure Every Reel Like a Mini Story</h2>
<p>The best-performing Reels follow a simple 3-part structure: Hook (0–2s) → Value (3–20s) → CTA (last 2–3s). The value section should deliver on the promise of the hook — tips, a how-to, a transformation, or an insight. The CTA should be specific: "Save this for later," "Comment your question," or "Follow for more."</p>
<blockquote>Reels with a verbal CTA in the caption and a spoken CTA in the video get 28% more saves and follows than those with only one CTA.</blockquote>

<h2 id="posting-cadence">3. Posting Cadence: Consistency Over Virality</h2>
<p>Most accounts focus too much on creating viral Reels and not enough on consistent output. The algorithm rewards accounts that post Reels at least 3 times per week. One viral Reel followed by nothing is less effective than three solid Reels per week for 3 months. Set a realistic schedule — 3–4 Reels per week — and stick to it for 90 days before evaluating your strategy.</p>

<h2 id="hashtags-audio">4. Hashtags & Audio — Use Both Strategically</h2>
<p>Use 3–8 hashtags (not 30) that are a mix of niche-specific (under 500K posts) and medium-size (500K–2M posts). Avoid using only massive hashtags like #love or #food — your content gets buried instantly. For audio, use trending audio when it fits naturally — Instagram explicitly boosts Reels using trending sounds. You can find trending audio in the Reels creation screen or by watching the Explore tab.</p>

<h2 id="analyse">5. Analyse Weekly and Double Down on Winners</h2>
<p>Check your Reels analytics every Monday. Look at reach, plays, saves, and follows from each Reel. Find the top 2–3 performers from the past month and ask: what was the topic? What was the format? What was the hook style? Then make more Reels like those. Double down on what your specific audience responds to — not what works for someone else's account.</p>`,
    relatedSlugs: [
      "how-to-grow-on-social-media",
      "brand-photography-tips",
      "digital-marketing-trends-2025",
    ],
  },

  "website-speed-and-seo": {
    title: "Why Website Speed is Your Most Important SEO Factor",
    category: "Web Dev",
    categoryColor: "cyan",
    date: "2025-01-08",
    readTime: "6 min read",
    thumbnail:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1400&q=85&auto=format&fit=crop",
    author: {
      name: "Rifat Ahmed",
      role: "Web Developer",
      avatar: "R",
      bio: "Rifat specialises in e-commerce development, having launched 40+ Shopify and WooCommerce stores for brands across fashion, food, and lifestyle categories.",
    },
    tags: [
      "Web Performance",
      "Core Web Vitals",
      "SEO",
      "PageSpeed",
      "Technical SEO",
    ],
    toc: [
      { id: "why-speed-matters", title: "1. Why Speed = Rankings" },
      { id: "core-web-vitals", title: "2. Core Web Vitals Explained" },
      { id: "diagnose", title: "3. How to Diagnose Issues" },
      { id: "quick-wins", title: "4. Quick Wins for Most Sites" },
      { id: "beyond-technical", title: "5. Beyond Technical Fixes" },
    ],
    body: `<p>Google has been explicit: page speed is a ranking factor. But beyond rankings, slow sites lose money. A site taking 4 seconds to load loses roughly 25% of visitors before they see any content. Here's everything you need to know about site speed and what to actually do about it.</p>

<h2 id="why-speed-matters">1. Why Speed Directly Impacts Rankings and Revenue</h2>
<p>Google's algorithm measures user experience signals including how fast your pages load and how quickly they become interactive. Sites that pass Core Web Vitals thresholds get a ranking boost over those that don't — all else being equal. But the real cost is in conversions: every 100ms delay in page load time reduces conversions by approximately 1%.</p>
<blockquote>Amazon calculated that a 100ms delay would cost them 1% in sales — equivalent to billions of dollars annually. For a small business, the math is the same, just smaller scale.</blockquote>

<h2 id="core-web-vitals">2. Core Web Vitals — What Google Actually Measures</h2>
<p>Google's Core Web Vitals consist of three metrics:</p>
<ul>
  <li><strong>LCP (Largest Contentful Paint)</strong> — how fast the main content loads. Target: under 2.5 seconds</li>
  <li><strong>FID / INP (Interaction to Next Paint)</strong> — how quickly the page responds to clicks. Target: under 200ms</li>
  <li><strong>CLS (Cumulative Layout Shift)</strong> — how much content moves around as the page loads. Target: under 0.1</li>
</ul>
<p>You can check all three for free at <strong>Google PageSpeed Insights</strong> (pagespeed.web.dev) or in Google Search Console under "Core Web Vitals."</p>

<h2 id="diagnose">3. How to Diagnose Your Site's Speed Issues</h2>
<p>Run your homepage and your most important landing page through Google PageSpeed Insights. Pay attention to the "Opportunities" and "Diagnostics" sections — these tell you exactly what to fix. The most common culprits on most sites are: oversized uncompressed images, render-blocking JavaScript, third-party scripts (chat widgets, analytics, ad tags), and lack of browser caching.</p>

<h2 id="quick-wins">4. Quick Wins That Work on Almost Every Site</h2>
<ul>
  <li><strong>Convert images to WebP format</strong> — typically 25–35% smaller than JPG with identical quality</li>
  <li><strong>Lazy load images below the fold</strong> — only load images when the user scrolls to them</li>
  <li><strong>Remove unused plugins and scripts</strong> — each one adds HTTP requests and blocks rendering</li>
  <li><strong>Enable browser caching</strong> — returning visitors load your site from their local cache, not the server</li>
  <li><strong>Use a CDN</strong> (Cloudflare free tier) — serve files from a server geographically close to your visitors</li>
</ul>

<h2 id="beyond-technical">5. Beyond Technical Fixes: Perceived Performance</h2>
<p>Even after technical optimisation, you can improve the experience with perceived performance techniques. Skeleton loading screens make a page feel faster even if the actual load time is identical. Lazy loading below-fold content, optimistic UI updates, and above-the-fold prioritisation (loading visible content first) are all techniques used by the world's fastest sites to create a snappy feel regardless of actual millisecond counts.</p>`,
    relatedSlugs: [
      "seo-tips-for-small-businesses",
      "ecommerce-store-launch-checklist",
      "digital-marketing-trends-2025",
    ],
  },

  "google-ads-beginners-guide": {
    title: "Google Ads for Beginners: Get Results Without Wasting Budget",
    category: "Marketing",
    categoryColor: "orange",
    date: "2024-12-18",
    readTime: "9 min read",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1400&q=85&auto=format&fit=crop",
    author: {
      name: "Meem Chowdhury",
      role: "Marketing Lead",
      avatar: "M",
      bio: "Meem leads digital strategy at MetaGenDigital with 6 years of experience running multi-channel campaigns for FMCG, e-commerce, and B2B brands across South Asia.",
    },
    tags: [
      "Google Ads",
      "PPC",
      "Digital Advertising",
      "Beginners Guide",
      "ROAS",
    ],
    toc: [
      { id: "campaign-structure", title: "1. Campaign Structure" },
      { id: "keyword-match-types", title: "2. Keyword Match Types" },
      { id: "ad-copy", title: "3. Writing Ad Copy That Clicks" },
      { id: "landing-pages", title: "4. Landing Page Alignment" },
      { id: "budget-bidding", title: "5. Budget & Bidding Strategy" },
    ],
    body: `<p>Google Ads can be the most efficient marketing channel you run — or the fastest way to burn cash with nothing to show. The difference is almost always structural. Most beginners make the same 5 mistakes. This guide shows you exactly what they are and how to avoid them.</p>

<h2 id="campaign-structure">1. Campaign Structure — Get This Right First</h2>
<p>Organise your account in a clear hierarchy: Account → Campaigns (by objective or product category) → Ad Groups (by keyword theme) → Ads. A common beginner mistake is dumping all keywords into one ad group. This makes it impossible to write relevant ad copy and wastes budget showing generic ads to specific searches.</p>
<ul>
  <li>One campaign per major product or service category</li>
  <li>One ad group per specific keyword theme (e.g., "Shopify developer Dhaka" ≠ "website design Bangladesh")</li>
  <li>At least 2–3 ad variations per ad group for A/B testing</li>
  <li>Use Responsive Search Ads (RSA) — Google's preferred format</li>
</ul>

<h2 id="keyword-match-types">2. Master Keyword Match Types Before Spending a Taka</h2>
<p>Match types determine which searches trigger your ads. Using only broad match (the default) is how most beginners waste 60% of their budget on irrelevant searches.</p>
<ul>
  <li><strong>Broad Match</strong> — shows for related searches, highest reach, lowest relevance. Use sparingly.</li>
  <li><strong>Phrase Match</strong> ("digital marketing agency") — shows for searches containing your phrase in order. Good balance.</li>
  <li><strong>Exact Match</strong> ([digital marketing agency Dhaka]) — only shows for that exact query. Highest relevance, lowest volume.</li>
</ul>
<p>Start with Phrase and Exact match for control. Add Negative Keywords immediately — terms you never want to show for (e.g., "free," "jobs," "course" if you sell services).</p>

<h2 id="ad-copy">3. Writing Ad Copy That Gets Clicked</h2>
<p>Your headline is everything. Include your primary keyword in at least one headline, add a clear benefit or differentiator, and include a number when possible (e.g., "Grow Traffic by 180%"). Your description should reinforce the headline's promise and include a clear CTA. Always include your location if you serve locally — it increases CTR significantly in competitive markets.</p>
<blockquote>Ads that include the exact search keyword in the headline achieve, on average, 20–30% higher click-through rates than those using generic copy.</blockquote>

<h2 id="landing-pages">4. Landing Page Alignment is Non-Negotiable</h2>
<p>If your ad promises "50% off Shopify development" and your landing page is your generic homepage, your Quality Score drops, your cost-per-click goes up, and your conversion rate crashes. Every ad group should have a dedicated landing page that exactly matches the promise of the ad. This single change typically reduces cost-per-lead by 40–60%.</p>

<h2 id="budget-bidding">5. Start Small, Then Scale What Works</h2>
<p>Don't start with Smart Bidding. Google's automated bidding strategies need at least 30–50 conversions per month to optimise effectively. Start with Manual CPC or Maximise Clicks with a daily budget cap. Once you have conversion data, switch to Target CPA or Target ROAS. Set a daily budget you're comfortable losing entirely for the first 2 weeks — that's your learning budget, not your production budget.</p>`,
    relatedSlugs: [
      "digital-marketing-trends-2025",
      "seo-tips-for-small-businesses",
      "how-to-grow-on-social-media",
    ],
  },

  "brand-photography-tips": {
    title: "How Great Photography Doubles Your Conversion Rate",
    category: "Case Studies",
    categoryColor: "cyan",
    date: "2024-11-30",
    readTime: "4 min read",
    thumbnail:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&q=85&auto=format&fit=crop",
    author: {
      name: "Nazia Islam",
      role: "Content Strategist",
      avatar: "N",
      bio: "Nazia bridges the gap between visual content and business performance, having overseen creative strategy for 30+ brand photography projects.",
    },
    tags: [
      "Photography",
      "Brand",
      "Conversion Rate",
      "E-commerce",
      "Creative Strategy",
    ],
    toc: [
      {
        id: "visual-first-economy",
        title: "1. We Live in a Visual-First Economy",
      },
      {
        id: "what-bad-photos-cost",
        title: "2. What Bad Photos Actually Cost You",
      },
      {
        id: "elements-of-great-brand-photo",
        title: "3. Elements of Great Brand Photography",
      },
      {
        id: "brief-your-photographer",
        title: "4. How to Brief a Photographer",
      },
      {
        id: "roi-calculation",
        title: "5. The ROI of Professional Photography",
      },
    ],
    body: `<p>Most businesses underinvest in photography and overspend on ads. The result: expensive traffic landing on pages with images that kill purchase intent. Great photography doesn't just look nice — it's a direct conversion rate lever. Here's the data that proves it, and what to do about it.</p>

<h2 id="visual-first-economy">1. We Live in a Visual-First Economy</h2>
<p>Human beings process images 60,000 times faster than text. In e-commerce, 75% of shoppers cite product images as the most influential factor in their purchasing decision — ahead of price, reviews, and descriptions. On social media, posts with high-quality photography achieve 3× more engagement than those with stock or low-quality images. The quality of your visuals is directly communicating the quality of your product, before a single word is read.</p>

<h2 id="what-bad-photos-cost">2. What Bad Photography is Actually Costing You</h2>
<p>Low-quality photos don't just fail to sell — they actively repel customers. In a study of e-commerce behaviour, products with professional photography converted at an average of 2.1%, while identical products with amateur photography converted at 0.8%. That's a 162% difference in revenue from the same traffic. When you run paid ads with poor creative, you also pay more per click — platforms like Meta and Google reward high engagement rates with lower CPM.</p>
<blockquote>One of our clients, GreenGrow, saw a 60% increase in product page conversions simply by replacing their DIY photos with a single professional shoot. The shoot cost ৳40,000. The revenue uplift in the first month was over ৳2 lakh.</blockquote>

<h2 id="elements-of-great-brand-photo">3. Elements of Great Brand Photography</h2>
<ul>
  <li><strong>Consistent lighting</strong> — natural light or professional strobes, never mixed or harsh shadows</li>
  <li><strong>Brand colour palette</strong> — props, backgrounds, and styling should reinforce your brand colours</li>
  <li><strong>Context and lifestyle</strong> — show the product being used, not just on a white background</li>
  <li><strong>Multiple angles</strong> — front, side, detail, in-use. Shoppers want to feel like they're holding it</li>
  <li><strong>Human element</strong> — images with people performing 40% better than product-only shots in most categories</li>
</ul>

<h2 id="brief-your-photographer">4. How to Brief a Photographer for Maximum ROI</h2>
<p>Before your shoot, create a moodboard (Pinterest works perfectly) of 15–20 reference images that capture the look and feel you want. Define the purpose of each image: which ones are for the website hero, which are for product listings, which are for ads, and which are for social. Share your brand guidelines (colours, fonts, values). The clearer your brief, the less time is wasted on set and the more usable shots you get from every hour.</p>

<h2 id="roi-calculation">5. The ROI of Professional Photography: A Simple Calculation</h2>
<p>A professional product photography shoot costs between ৳30,000–৳80,000 for a small product line. If your monthly ad spend is ৳50,000 and better creative improves your conversion rate from 1% to 1.7%, you've effectively made your ad budget 70% more efficient — generating ৳35,000 more revenue per month without spending an extra taka on ads. The photography pays for itself within 30–60 days in most cases. It then keeps paying for 2–3 years across your website, social, and ad creatives.</p>`,
    relatedSlugs: [
      "how-to-grow-on-social-media",
      "instagram-reels-guide",
      "ecommerce-store-launch-checklist",
    ],
  },
};

/* ─── Runtime ──────────────────────────────────────────────── */
const { get } = useApi();
const slug = route.params.slug as string;
const { data: blogResponse, error: blogError } = await get<BlogApiDetail>(
  `/blogs/${slug}`,
);
const { data: relatedResponse } = await get<BlogApiItem[]>(
  `/blogs/${slug}/related`,
);

function categoryColor(category?: string | null): CategoryColor {
  if (category === "Social Media") return "purple";
  if (category === "Web Dev" || category === "Case Studies") return "cyan";
  return "orange";
}

function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /<h2\s+id="([^"]+)">([^<]+)<\/h2>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    items.push({ id: match[1], title: match[2] });
  }

  return items;
}

const apiPost = computed<PostData | null>(() => {
  const data = blogResponse.value?.data;
  if (!data) return null;

  return {
    title: data.title,
    category: data.category || "Marketing",
    categoryColor: categoryColor(data.category),
    date: data.publishedAt || new Date().toISOString().slice(0, 10),
    readTime: data.readTimeText,
    thumbnail:
      data.featuredImage ||
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&auto=format&fit=crop",
    author: {
      name: data.authorName,
      role: data.category || "Content Team",
      bio: data.authorBio || "Content contributor at MetaGenDigital.",
      avatar: data.authorName?.charAt(0) || "M",
    },
    tags: data.tags || [],
    toc: extractToc(data.content || ""),
    body: data.content || "",
    relatedSlugs: (relatedResponse.value?.data || []).map((item) => item.slug),
  };
});

const post = computed(() => apiPost.value || postMap[slug]);

if (!post.value) {
  if (blogError.value?.statusCode === 404) {
    throw createError({ statusCode: 404, statusMessage: "Post not found" });
  }
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

useSeoMeta({
  title: computed(() => `${post.value?.title} | MetaGenDigital Blog`),
  description: computed(() =>
    post.value?.body.replace(/<[^>]+>/g, "").slice(0, 160),
  ),
});

// Active TOC item
const activeToc = ref("");
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) activeToc.value = e.target.id;
      });
    },
    { rootMargin: "-80px 0px -60% 0px" },
  );
  post.value?.toc.forEach((t) => {
    const el = document.getElementById(t.id);
    if (el) observer.observe(el);
  });
  onUnmounted(() => observer.disconnect());
});

// Share URL
const shareUrl = computed(() =>
  typeof window !== "undefined" ? window.location.href : "",
);
const copied = ref(false);
function copyLink() {
  navigator.clipboard.writeText(shareUrl.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}

// Related posts data (lightweight)
const allPosts = [
  {
    slug: "digital-marketing-trends-2025",
    title: "Digital Marketing Trends 2025",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=70",
    category: "Marketing",
    categoryColor: "orange" as CategoryColor,
    date: "2025-04-01",
    readTime: "8 min",
  },
  {
    slug: "how-to-grow-on-social-media",
    title: "How to Grow on Social Media in 2025",
    thumbnail:
      "https://images.unsplash.com/photo-1611162616305-c69d394736a4?w=400&q=70",
    category: "Social Media",
    categoryColor: "purple" as CategoryColor,
    date: "2025-03-15",
    readTime: "5 min",
  },
  {
    slug: "seo-tips-for-small-businesses",
    title: "10 SEO Tips Every Small Business Needs",
    thumbnail:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=70",
    category: "SEO",
    categoryColor: "orange" as CategoryColor,
    date: "2025-02-28",
    readTime: "7 min",
  },
  {
    slug: "ecommerce-store-launch-checklist",
    title: "Ultimate E-commerce Launch Checklist",
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=70",
    category: "Web Dev",
    categoryColor: "cyan" as CategoryColor,
    date: "2025-02-10",
    readTime: "6 min",
  },
  {
    slug: "instagram-reels-guide",
    title: "Instagram Reels Strategy That Works",
    thumbnail:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=70",
    category: "Social Media",
    categoryColor: "purple" as CategoryColor,
    date: "2025-01-22",
    readTime: "5 min",
  },
  {
    slug: "website-speed-and-seo",
    title: "Website Speed & SEO: The Full Guide",
    thumbnail:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=70",
    category: "Web Dev",
    categoryColor: "cyan" as CategoryColor,
    date: "2025-01-08",
    readTime: "6 min",
  },
  {
    slug: "google-ads-beginners-guide",
    title: "Google Ads for Beginners",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=70",
    category: "Marketing",
    categoryColor: "orange" as CategoryColor,
    date: "2024-12-18",
    readTime: "9 min",
  },
  {
    slug: "brand-photography-tips",
    title: "How Photography Doubles Conversions",
    thumbnail:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=70",
    category: "Case Studies",
    categoryColor: "cyan" as CategoryColor,
    date: "2024-11-30",
    readTime: "4 min",
  },
];

const relatedPosts = computed(() => {
  const apiRelated = relatedResponse.value?.data ?? [];

  if (apiRelated.length) {
    return apiRelated.map((item) => ({
      slug: item.slug,
      title: item.title,
      thumbnail:
        item.featuredImage ||
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=70",
      category: item.category || "Marketing",
      categoryColor: categoryColor(item.category),
      date: item.publishedAt || new Date().toISOString().slice(0, 10),
      readTime: item.readTimeText,
    }));
  }

  return (post.value?.relatedSlugs ?? [])
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter(Boolean);
});

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const colorConfig = {
  orange: {
    heroBg: "from-[#FF6B35] via-[#FF7B45] to-[#FF9A5C]",
    badge: "bg-brand-orange",
    text: "text-brand-orange",
    iconBg: "bg-orange-50",
    iconText: "text-brand-orange",
    tagBg: "bg-orange-50 text-orange-700 border-orange-200",
    tocActive: "text-brand-orange border-l-2 border-brand-orange",
    btnBg: "bg-brand-orange hover:bg-orange-600",
  },
  purple: {
    heroBg: "from-[#7C3AED] via-[#8B4CF6] to-[#6D28D9]",
    badge: "bg-brand-purple",
    text: "text-brand-purple",
    iconBg: "bg-violet-50",
    iconText: "text-brand-purple",
    tagBg: "bg-violet-50 text-violet-700 border-violet-200",
    tocActive: "text-brand-purple border-l-2 border-brand-purple",
    btnBg: "bg-brand-purple hover:bg-violet-700",
  },
  cyan: {
    heroBg: "from-[#0EA5E9] via-[#06B6D4] to-[#0284C7]",
    badge: "bg-brand-cyan",
    text: "text-brand-cyan",
    iconBg: "bg-sky-50",
    iconText: "text-brand-cyan",
    tagBg: "bg-sky-50 text-sky-700 border-sky-200",
    tocActive: "text-brand-cyan border-l-2 border-brand-cyan",
    btnBg: "bg-brand-cyan hover:bg-sky-600",
  },
};

const cfg = computed(() => colorConfig[post.value?.categoryColor ?? "orange"]);

const categoryIcon: Record<string, string> = {
  SEO: "mdi:magnify",
  "Social Media": "mdi:instagram",
  "Web Dev": "mdi:web",
  Marketing: "mdi:trending-up",
  "Case Studies": "mdi:briefcase-outline",
};
</script>

<template>
  <div v-if="post" class="min-h-screen">
    <!-- ══════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════ -->
    <section
      class="relative pt-24 pb-0 overflow-hidden bg-gradient-to-br"
      :class="cfg.heroBg"
    >
      <div
        class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute left-0 -bottom-8 w-64 h-64 rounded-full bg-white/10 pointer-events-none"
        aria-hidden="true"
      />

      <div class="container-content relative z-10 pb-12">
        <!-- Breadcrumb -->
        <div class="mb-8 opacity-75">
          <AppBreadcrumb
            :crumbs="[{ label: 'Blog', to: '/blog' }, { label: post.category }]"
          />
        </div>

        <!-- Category + meta badges -->
        <div class="flex flex-wrap items-center gap-2 mb-5">
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
          >
            <Icon
              :name="categoryIcon[post.category] ?? 'mdi:newspaper'"
              class="w-3.5 h-3.5"
              aria-hidden="true"
            />
            {{ post.category }}
          </span>
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white/80 text-xs font-semibold backdrop-blur-sm"
          >
            <Icon
              name="mdi:clock-outline"
              class="w-3.5 h-3.5"
              aria-hidden="true"
            />
            {{ post.readTime }}
          </span>
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white/80 text-xs font-semibold backdrop-blur-sm"
          >
            <Icon
              name="mdi:calendar-outline"
              class="w-3.5 h-3.5"
              aria-hidden="true"
            />
            {{ formatDate(post.date) }}
          </span>
        </div>

        <h1 class="text-white mb-5 max-w-3xl leading-tight">
          {{ post.title }}
        </h1>

        <!-- Author row -->
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-white font-bold"
          >
            {{ post.author.avatar }}
          </div>
          <div>
            <p class="text-white font-semibold text-sm">
              {{ post.author.name }}
            </p>
            <p class="text-white/60 text-xs">{{ post.author.role }}</p>
          </div>
        </div>
      </div>

      <!-- Hero image -->
      <div class="container-content relative z-10">
        <div
          class="rounded-t-2xl overflow-hidden shadow-2xl aspect-[21/8] bg-brand-surface"
        >
          <img
            :src="post.thumbnail"
            :alt="post.title"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         ARTICLE + SIDEBAR
    ══════════════════════════════════════════════════ -->
    <section class="bg-white py-12 md:py-16">
      <div class="container-content">
        <div
          class="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-10 xl:gap-16 items-start"
        >
          <!-- ── Article body ── -->
          <article>
            <!-- Body content -->
            <div class="prose-brand max-w-none" v-html="post.body" />

            <!-- Tags -->
            <div class="mt-10 pt-8 border-t border-brand-border">
              <p
                class="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-3"
              >
                Tags
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold border"
                  :class="cfg.tagBg"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Author bio -->
            <div
              class="mt-10 rounded-2xl border border-brand-border bg-brand-surface p-6 flex items-start gap-4"
            >
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black flex-shrink-0"
                :class="cfg.btnBg.split(' ')[0]"
              >
                {{ post.author.avatar }}
              </div>
              <div>
                <p class="font-bold text-brand-text-primary mb-0.5">
                  {{ post.author.name }}
                </p>
                <p class="text-xs font-semibold mb-2" :class="cfg.text">
                  {{ post.author.role }} · MetaGenDigital
                </p>
                <p class="text-sm text-brand-text-secondary leading-relaxed">
                  {{ post.author.bio }}
                </p>
              </div>
            </div>

            <!-- Share row -->
            <div class="mt-8 flex flex-wrap items-center gap-3">
              <span class="text-sm font-bold text-brand-text-primary"
                >Share this article:</span
              >
              <button
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-border bg-brand-surface text-sm font-semibold text-brand-text-secondary hover:border-brand-primary hover:text-brand-primary transition-all duration-200"
                @click="copyLink"
              >
                <Icon
                  :name="copied ? 'mdi:check' : 'mdi:link-variant'"
                  class="w-4 h-4"
                  aria-hidden="true"
                />
                {{ copied ? "Copied!" : "Copy Link" }}
              </button>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-border bg-brand-surface text-sm font-semibold text-brand-text-secondary hover:border-[#0A66C2] hover:text-[#0A66C2] transition-all duration-200"
              >
                <Icon name="mdi:linkedin" class="w-4 h-4" aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href="https://twitter.com/intent/tweet"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-border bg-brand-surface text-sm font-semibold text-brand-text-secondary hover:border-black hover:text-black transition-all duration-200"
              >
                <Icon name="mdi:twitter" class="w-4 h-4" aria-hidden="true" />
                X / Twitter
              </a>
            </div>
          </article>

          <!-- ── Sticky sidebar ── -->
          <aside class="lg:sticky lg:top-24 space-y-5">
            <!-- Table of Contents -->
            <div
              class="bg-white rounded-2xl border border-brand-border shadow-card overflow-hidden"
            >
              <div
                class="px-5 py-4 border-b border-brand-border flex items-center gap-2"
              >
                <Icon
                  name="mdi:format-list-bulleted"
                  class="w-4 h-4"
                  :class="cfg.text"
                  aria-hidden="true"
                />
                <p
                  class="text-[12px] font-bold text-brand-text-primary uppercase tracking-widest"
                >
                  Table of Contents
                </p>
              </div>
              <nav class="p-4 space-y-1">
                <a
                  v-for="item in post.toc"
                  :key="item.id"
                  :href="`#${item.id}`"
                  class="block px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200"
                  :class="
                    activeToc === item.id
                      ? ['bg-brand-surface font-semibold', cfg.text]
                      : 'text-brand-text-secondary hover:text-brand-primary hover:bg-brand-surface'
                  "
                >
                  {{ item.title }}
                </a>
              </nav>
            </div>

            <!-- Est. read time widget -->
            <div
              class="bg-brand-surface rounded-2xl border border-brand-border p-5 flex items-center gap-3"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                :class="cfg.iconBg"
              >
                <Icon
                  name="mdi:clock-outline"
                  class="w-5 h-5"
                  :class="cfg.iconText"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p
                  class="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider mb-0.5"
                >
                  Reading Time
                </p>
                <p class="text-sm font-bold text-brand-text-primary">
                  {{ post.readTime }}
                </p>
              </div>
            </div>

            <!-- CTA widget -->
            <div
              class="rounded-2xl border border-brand-border overflow-hidden shadow-card bg-gradient-to-br"
              :class="cfg.heroBg"
            >
              <div class="absolute inset-0 bg-white/5" />
              <div class="relative p-5">
                <p class="text-white font-bold text-sm mb-1">
                  Need help with {{ post.category }}?
                </p>
                <p class="text-white/70 text-xs mb-4 leading-relaxed">
                  Our team is ready to implement these strategies for your
                  business.
                </p>
                <NuxtLink
                  to="/contact"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-white text-sm font-semibold rounded-btn transition-all duration-200 hover:bg-white/90"
                  :class="cfg.text"
                >
                  Get a Free Consultation
                  <Icon
                    name="mdi:arrow-right"
                    class="w-4 h-4"
                    aria-hidden="true"
                  />
                </NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         RELATED POSTS
    ══════════════════════════════════════════════════ -->
    <section class="section-padding bg-brand-surface">
      <div class="container-content">
        <div class="mb-10">
          <p
            class="text-[11px] font-bold text-brand-text-muted uppercase tracking-widest mb-2"
          >
            Keep Reading
          </p>
          <h2 class="text-brand-text-primary">Related Articles</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          <BlogCard
            v-for="related in relatedPosts"
            :key="related!.slug"
            :title="related!.title"
            excerpt=""
            :category="related!.category"
            :category-color="related!.categoryColor"
            :date="related!.date"
            :read-time="related!.readTime + ' read'"
            :thumbnail="related!.thumbnail"
            :to="`/blog/${related!.slug}`"
          />
        </div>
      </div>
    </section>

    <!-- Back to blog -->
    <section class="py-10 bg-white border-t border-brand-border">
      <div class="container-content">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 text-sm font-semibold text-brand-text-secondary hover:text-brand-primary transition-colors duration-200 group"
        >
          <Icon
            name="mdi:arrow-left"
            class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Back to All Articles
        </NuxtLink>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
