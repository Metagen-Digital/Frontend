/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black:          '#303c8e',
          bg:             '#FFFFFF',
          surface:        '#F0F2FF',
          'surface-alt':  '#E8ECFF',
          card:           '#FFFFFF',
          border:         '#E2E5F6',
          'border-strong':'#C7CDF0',
          primary:        '#303c8e',
          orange:         '#FF6B35',
          purple:         '#7C3AED',
          cyan:           '#0EA5E9',
          success:        '#22C55E',
          error:          '#EF4444',
          warning:        '#F59E0B',
          // ── Accent TEXT variants ─────────────────────────────────────
          // The accents above are tuned for fills — icons, pills, buttons,
          // borders — where WCAG contrast does not apply. As *text* on a light
          // surface they all fail AA badly (orange 2.84:1, cyan 2.77:1,
          // success 2.28:1, warning 2.15:1, error 3.76:1, and even purple only
          // scrapes 4.44:1 once it sits on a tinted pill), and the audit does
          // not care that they are brand colours.
          //
          // These are the same hues walked down until they clear 4.5:1 with
          // margin against EVERY background they actually land on. That set is
          // larger than it looks, and getting it wrong is how the first pass at
          // this still failed Lighthouse: a SectionBadge is `bg-brand-X/10`, so
          // its real backdrop is the accent at 10% composited over whatever the
          // section behind it is — #FFF0EB on a white section but #F2E5EB on a
          // brand-surface one. Contrast has to be computed against that
          // composite, not against white.
          //
          // Worst case across {white, #F0F2FF, #E8ECFF} x {plain, accent/10}:
          //   orange-text   4.87    success-text  4.88
          //   cyan-text     4.94    warning-text  4.83
          //   purple-text   4.85    error-text    4.88
          //
          // Rule of thumb: `text-brand-orange` on an <Icon> is fine and should
          // stay vivid; `text-brand-orange` on words is a bug — use
          // `text-brand-orange-text`. brand-primary (9.71:1 on white, 7.03:1 on
          // its own tint) already passes everywhere, so it has no variant.
          //
          // The same applies in reverse to white-on-accent: white on #FF6B35 is
          // 2.84:1, so a solid orange button needs bg-brand-orange-text rather
          // than bg-brand-orange.
          'orange-text':  '#A14321',
          'cyan-text':    '#096690',
          'purple-text':  '#7135D8',
          'success-text': '#137036',
          'warning-text': '#895806',
          'error-text':   '#AC3131',
          // ── Text scale: all three tiers clear WCAG AA (4.5:1) ────────
          // The old scale failed the Lighthouse color-contrast audit:
          // text-muted #9DA8CE was 2.35:1 on white, used 117x across 31 files.
          //
          // Fixing muted alone was not possible without collapsing the scale.
          // Any AA-passing value lands near 5.1:1 on white, which is exactly
          // where the OLD text-secondary (#5B6B9E, 5.20:1) sat — muted and
          // secondary would have been indistinguishable. So secondary moved
          // down a step too, keeping three visibly separate tiers:
          //
          //              on #FFFFFF   on #F0F2FF (brand-surface)
          //   primary       9.71         8.72
          //   secondary     6.98         6.26
          //   muted         5.08         4.56
          //
          // #F0F2FF is the darkest background any of these sit on — checked:
          // text-muted never appears on brand-surface-alt, footer-bg, or any
          // other dark surface, so darkening it regresses nothing.
          'text-primary':   '#303c8e',
          'text-secondary': '#4A5788',
          'text-muted':     '#626C9A',
          // Footer stays dark — matches metagendigital.com
          'footer-bg':     '#1D1D47',
          'footer-border': '#504F59',
          'footer-text':   '#E8E8E8',
        },
      },
      fontFamily: {
        // 'Hind Siliguri' is appended to each Latin family rather than applied
        // under :lang(bn). Font stacks resolve per GLYPH, so Latin text is found
        // in Inter / Plus Jakarta Sans and never reaches it, while Bengali text
        // — absent from both — falls through to it. English typography is
        // therefore unchanged, and Bangla stops rendering in an arbitrary OS
        // substitute. The family was already downloaded (nuxt.config.ts
        // googleFonts, bengali subset) but nothing had ever applied it.
        sans:    ['Inter', 'Hind Siliguri', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Hind Siliguri', 'sans-serif'],
        mono:    ['Space Grotesk', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['96px', { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        'display-xl':  ['72px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg':  ['56px', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md':  ['48px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'gradient-brand':  'linear-gradient(135deg, #303c8e 0%, #7C3AED 100%)',
        // Deeper cyan than the brand-cyan token on purpose: this gradient's
        // only consumer is GradientButton's `secondary` variant, which pairs it
        // with white text, and white on #0EA5E9 is 2.77:1 — a WCAG failure
        // waiting for the first person to use that variant. #0A72A1 (the same
        // value as brand-cyan-text) takes white to 5.34:1 at this end and
        // 9.71:1 at the navy end, so the variant is safe to reach for.
        'gradient-cyan':   'linear-gradient(135deg, #0A72A1 0%, #303c8e 100%)',
        'gradient-light':  'linear-gradient(180deg, #FFFFFF 0%, #F0F2FF 100%)',
        'gradient-card':   'linear-gradient(135deg, #FFFFFF 0%, #F0F2FF 100%)',
        'glow-primary':    'radial-gradient(circle, rgba(48,60,142,0.12) 0%, transparent 70%)',
        'glow-orange':     'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)',
        'glow-purple':     'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
        'grid-pattern':    'linear-gradient(rgba(48,60,142,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(48,60,142,.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '32px 32px',
      },
      boxShadow: {
        'glow-primary': '0 0 40px rgba(48, 60, 142, 0.20)',
        'glow-orange':  '0 0 40px rgba(255, 107, 53, 0.20)',
        'glow-purple':  '0 0 40px rgba(124, 58, 237, 0.20)',
        'glow-cyan':    '0 0 40px rgba(14, 165, 233, 0.20)',
        'card':         '0 1px 3px rgba(48,60,142,0.06), 0 4px 16px rgba(48,60,142,0.06)',
        'card-hover':   '0 4px 24px rgba(48,60,142,0.12), 0 1px 4px rgba(48,60,142,0.08)',
        'header':       '0 1px 0 rgba(48,60,142,0.08)',
      },
      borderRadius: {
        'card': '16px',
        'btn':  '8px',
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
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'bounce-y': {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%':      { transform: 'translateY(-8px)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
      },
      animation: {
        'marquee':          'marquee 30s linear infinite',
        'marquee-reverse':  'marquee-reverse 30s linear infinite',
        // fill-mode 'both', not 'forwards'. These are used with an
        // animation-delay (the hero staggers its rows that way instead of
        // paying for a v-motion directive per element); with 'forwards' the
        // element sits at its FINAL state during the delay and then snaps
        // back to opacity 0 the instant the animation starts, which reads as
        // a flash. 'both' applies the 0% keyframe during the delay too.
        // Identical to 'forwards' when there is no delay.
        'fade-up':   'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in':   'fade-in 0.4s ease both',
        'shimmer':   'shimmer 2s linear infinite',
        'float':     'float 4s ease-in-out infinite',
        'bounce-y':  'bounce-y 1.2s infinite',
      },
      maxWidth: {
        'content': '1280px',
      },
    },
  },
  plugins: [],
}
