<script setup lang="ts">
const { t } = useI18n()
definePageMeta({ layout: 'minimal' })
useSeoMeta({
  title: computed(() => t('privacyPage.title')),
  description: computed(() => t('privacyPage.description')),
})
</script>

<template>
  <div class="section-padding">
    <div class="container-content max-w-3xl">
      <AppBreadcrumb :crumbs="[{ label: t('privacyPage.breadcrumb') }]" class="mb-8" />
      <h1 class="text-white mb-6">{{ t('privacyPage.heading') }}</h1>
      <!--
        Same call as terms.vue: this body is binding legal text (data
        collection, retention, third-party sharing). Left English-only rather
        than auto-translated — needs professional/legal review before a bn
        version ships. See docs/ACTION_PLAN.md §2.1.
      -->
      <div class="prose-brand">
        <p>Last updated: June 2025</p>

        <h2>1. Introduction</h2>
        <p>MetaGenDigital ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website metagendigital.com and use our services including web development, digital marketing, hosting, and related offerings.</p>

        <h2>2. Information We Collect</h2>
        <h3>Personal Information</h3>
        <p>We may collect personally identifiable information that you voluntarily provide when you:</p>
        <ul>
          <li>Register for an account</li>
          <li>Place an order for our services</li>
          <li>Subscribe to our newsletter</li>
          <li>Fill out a contact form</li>
          <li>Apply for a career position</li>
        </ul>
        <p>This information may include your name, email address, phone number, company name, billing address, and payment transaction details.</p>

        <h3>Automatically Collected Information</h3>
        <p>When you access our website, we automatically collect certain information including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of your visits.</p>

        <h2>3. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide, operate, and maintain our services</li>
          <li>Process transactions and send related information (invoices, confirmations)</li>
          <li>Send administrative notifications and service updates</li>
          <li>Respond to your inquiries and support requests</li>
          <li>Send marketing communications (with your consent)</li>
          <li>Analyze usage patterns to improve our website and services</li>
          <li>Prevent fraudulent transactions and protect against illegal activity</li>
        </ul>

        <h2>4. Payment Information</h2>
        <p>We accept payments via bKash, Nagad, Rocket, Upay, and bank transfer. We collect transaction IDs and sender numbers for payment verification. We do not store your mobile banking PIN or full account credentials. Payment verification is handled through respective payment gateway APIs.</p>

        <h2>5. Information Sharing</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
        <ul>
          <li><strong>Service providers:</strong> Third-party companies that assist us in operating our website, conducting business, or servicing you (e.g., hosting providers, email services)</li>
          <li><strong>Legal requirements:</strong> When required by law or to protect our rights, safety, or property</li>
          <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
        </ul>

        <h2>6. Data Security</h2>
        <p>We implement appropriate technical and organizational security measures including encrypted sessions, secure authentication tokens, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

        <h2>7. Cookies</h2>
        <p>Our website uses cookies for authentication, language preferences, and analytics. You can control cookie preferences through your browser settings. Disabling cookies may affect some functionality of our website.</p>

        <h2>8. Third-Party Services</h2>
        <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>

        <h2>9. Newsletter</h2>
        <p>If you subscribe to our newsletter, we will use your email address to send marketing communications. You can unsubscribe at any time by clicking the unsubscribe link in any newsletter email or contacting us directly.</p>

        <h2>10. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access and receive a copy of your personal data</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your personal data</li>
          <li>Withdraw consent for marketing communications</li>
          <li>Lodge a complaint with relevant authorities</li>
        </ul>

        <h2>11. Data Retention</h2>
        <p>We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements.</p>

        <h2>12. Children's Privacy</h2>
        <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.</p>

        <h2>13. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>

        <h2>14. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us:</p>
        <ul>
          <li>Email: hello@metagendigital.com</li>
          <li>Website: metagendigital.com/contact</li>
        </ul>
      </div>
    </div>
  </div>
</template>
