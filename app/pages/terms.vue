<script setup lang="ts">
const { t } = useI18n()
definePageMeta({ layout: 'minimal' })
useSeoMeta({
  title: computed(() => t('termsPage.title')),
  description: computed(() => t('termsPage.description')),
})
</script>

<template>
  <div class="section-padding">
    <div class="container-content max-w-3xl">
      <AppBreadcrumb :crumbs="[{ label: t('termsPage.breadcrumb') }]" class="mb-8" />
      <h1 class="text-white mb-6">{{ t('termsPage.heading') }}</h1>
      <!--
        The body below is binding legal text (liability, refunds, governing
        law, IP). It is deliberately left English-only rather than
        auto-translated: an inaccurate rendering of a liability or refund
        clause is a legal-exposure risk, not a copy-quality one, and this
        needs a professional/legal translation review before it goes into
        the bn locale — not a mechanical i18n pass. See docs/ACTION_PLAN.md §2.1.
      -->
      <div class="prose-brand">
        <p>Last updated: June 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using the MetaGenDigital website (metagendigital.com) and its subdomains, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.</p>

        <h2>2. Services</h2>
        <p>MetaGenDigital provides digital services including but not limited to:</p>
        <ul>
          <li>Web design and development</li>
          <li>Digital marketing and SEO</li>
          <li>Domain registration and web hosting</li>
          <li>Graphic design and branding</li>
          <li>Custom software solutions</li>
        </ul>

        <h2>3. User Accounts</h2>
        <p>When creating an account, you agree to:</p>
        <ul>
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain the security of your password and account</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Notify us immediately of any unauthorized use</li>
        </ul>
        <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>

        <h2>4. Orders and Payments</h2>
        <ul>
          <li>All prices are listed in Bangladeshi Taka (BDT/৳) unless stated otherwise</li>
          <li>Payment is required before service activation for hosting and domain services</li>
          <li>We accept bKash, Nagad, Rocket, Upay, and bank transfers</li>
          <li>Orders are subject to verification before processing</li>
          <li>We reserve the right to refuse or cancel orders at our discretion</li>
        </ul>

        <h2>5. Hosting Services</h2>
        <ul>
          <li>Hosting services are activated within 24 hours of payment verification</li>
          <li>Service continuity depends on timely renewal payments</li>
          <li>We do not guarantee 100% uptime but aim for maximum availability</li>
          <li>Hosting accounts must not be used for illegal content, spam, or activities that violate Bangladesh law</li>
          <li>We reserve the right to suspend accounts that consume excessive resources or violate acceptable use policies</li>
        </ul>

        <h2>6. Domain Registration</h2>
        <ul>
          <li>Domain registration is subject to availability and registrar terms</li>
          <li>Domain renewal is the client's responsibility; we will send reminders but are not liable for expired domains</li>
          <li>Domain transfer requests must comply with ICANN policies</li>
        </ul>

        <h2>7. Intellectual Property</h2>
        <p>All content on the MetaGenDigital website — including text, graphics, logos, icons, images, and software — is the property of MetaGenDigital or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our written permission.</p>

        <h2>8. Client Projects</h2>
        <ul>
          <li>Upon full payment, clients receive ownership of custom work produced specifically for them</li>
          <li>We retain the right to showcase completed projects in our portfolio unless otherwise agreed</li>
          <li>Third-party assets (stock images, fonts, plugins) are subject to their respective licenses</li>
          <li>Source code delivery and ownership terms are specified in individual project agreements</li>
        </ul>

        <h2>9. Refund Policy</h2>
        <ul>
          <li>Hosting services: Refund requests within 7 days of activation may be considered on a case-by-case basis</li>
          <li>Domain registration: Non-refundable once the domain is registered</li>
          <li>Custom projects: Refund terms are outlined in individual project contracts</li>
          <li>Refunds are processed via the original payment method within 7-14 business days</li>
        </ul>

        <h2>10. Limitation of Liability</h2>
        <p>MetaGenDigital shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangibles resulting from:</p>
        <ul>
          <li>Your use or inability to use our services</li>
          <li>Unauthorized access to or alteration of your data</li>
          <li>Service interruptions or downtime</li>
          <li>Any third-party content or conduct</li>
        </ul>

        <h2>11. Prohibited Activities</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use our services for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Transmit malware, viruses, or harmful code</li>
          <li>Engage in activities that disrupt or burden our infrastructure</li>
          <li>Impersonate any person or entity</li>
          <li>Use our services to send unsolicited communications (spam)</li>
        </ul>

        <h2>12. Privacy</h2>
        <p>Your use of our services is also governed by our <NuxtLink to="/privacy-policy" class="text-brand-primary hover:underline">Privacy Policy</NuxtLink>, which describes how we collect, use, and protect your personal information.</p>

        <h2>13. Governing Law</h2>
        <p>These terms are governed by and construed in accordance with the laws of Bangladesh. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Dhaka, Bangladesh.</p>

        <h2>14. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms of Use at any time. Changes take effect immediately upon posting to this page. Continued use of our services after changes constitutes acceptance of the updated terms.</p>

        <h2>15. Contact</h2>
        <p>For questions about these Terms of Use, contact us:</p>
        <ul>
          <li>Email: hello@metagendigital.com</li>
          <li>Website: metagendigital.com/contact</li>
        </ul>
      </div>
    </div>
  </div>
</template>
