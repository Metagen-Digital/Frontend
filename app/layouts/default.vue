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

    <AppFooter />
    <BackToTop />
    <ToastNotification />
  </div>
</template>
