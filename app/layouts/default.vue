<template>
  <div class="flex flex-col min-h-dvh bg-brand-bg">
    <ScrollProgressBar />

    <!-- Skip to content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[500] focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:rounded-btn focus:font-semibold"
    >
      Skip to main content
    </a>

    <AppHeader />
    <MobileMenu />

    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <!-- Below the fold on every page: hydrate when scrolled to, not on load. -->
    <LazyNewsletterSection hydrate-on-visible />
    <LazyAppFooter hydrate-on-visible />

    <!-- Floating widgets. These ARE in the initial viewport, so
         hydrate-on-visible would fire immediately and buy nothing —
         hydrate-on-idle keeps them off the hydration pass that LCP waits on
         while still having them interactive long before a real user reaches
         for them. ToastNotification stays eager on purpose: a toast can be
         triggered by a form on the same page, and it has to be mounted and
         listening when that happens. -->
    <LazyBackToTop hydrate-on-idle />
    <LazyChatWidget hydrate-on-idle />
    <ToastNotification />
  </div>
</template>
