import Script from 'next/script';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SharedOverlays } from '@/components/layout/SharedOverlays';
import { SiteClientInitializer } from '@/components/layout/SiteClientInitializer';
import { readSharedStyles } from '@/lib/content';

export const metadata = {
  metadataBase: new URL('https://prestigeinkllc.com'),
  title: {
    default: 'Prestige Ink LLC | Book Writing, Publishing & Marketing',
    template: '%s | Prestige Ink LLC',
  },
  description:
    'Prestige Ink LLC helps authors with book writing, editing, design, publishing, marketing, and audiobook production.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://prestigeinkllc.com',
    siteName: 'Prestige Ink LLC',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/site/css/a360b3b7e3d49856.css" />
        <link rel="stylesheet" href="/site/css/a0383f0e3133c9ec.css" />
        <link rel="stylesheet" href="/site/css/206130389c18b556.css" />
        <link rel="stylesheet" href="/site/css/8dbb138944e9490e.css" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@25.10.5/build/css/intlTelInput.css" />
        <style dangerouslySetInnerHTML={{ __html: readSharedStyles() }} />
      </head>
      <body
        className="__variable_51684b __variable_34eb21 __variable_1bcde6"
        suppressHydrationWarning
      >
        <SiteHeader />
        {children}
        <SiteFooter />
        <SharedOverlays />
        <SiteClientInitializer />
        <Script src="https://unpkg.com/aos@next/dist/aos.js" strategy="afterInteractive" />
        <Script
          src="https://cdn.jsdelivr.net/npm/intl-tel-input@25.10.5/build/js/intlTelInput.min.js"
          strategy="afterInteractive"
        />
        <Script src="/custom.js" strategy="afterInteractive" />
        <Script src="/form-validation.js" strategy="afterInteractive" />
        <Script src="/site/inline.js" strategy="afterInteractive" />
        <Script src="/vendor/lead-form-protection.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
