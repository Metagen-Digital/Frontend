<template>
  <div class="flex flex-col min-h-dvh bg-brand-bg">
    <ScrollProgressBar />

    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[500] focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:rounded-btn focus:font-semibold"
    >
      Skip to main content
    </a>

    <!-- Minimal header: logo + back link only -->
    <header class="border-b border-brand-border">
      <div class="container-content flex items-center justify-between h-16">
        <NuxtLink to="/" aria-label="MetaGenDigital home">
          <img
            src="/images/MetaGen-Logo.svg"
            alt="MetaGenDigital"
            class="h-7 w-auto"
          />
        </NuxtLink>
        <NuxtLink
          to="/"
          class="text-sm text-brand-text-secondary hover:text-brand-orange transition-colors duration-150 flex items-center gap-1.5"
        >
          <Icon name="mdi:arrow-left" class="w-4 h-4" aria-hidden="true" />
          Back to Home
        </NuxtLink>
      </div>
    </header>

    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
