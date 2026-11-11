/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    const pages = [
      'about-us', 'audiobook-production', 'book-design', 'book-editing',
      'book-marketing', 'book-publishing', 'book-writing',
      'children-book-publishing', 'contact-us', 'faq',
      'privacypolicy', 'refundpolicy', 'termsofservice', 'optout',
    ];
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/privacy-policy', destination: '/privacypolicy', permanent: true },
      { source: '/privacy', destination: '/privacypolicy', permanent: true },
      { source: '/terms-of-service', destination: '/termsofservice', permanent: true },
      { source: '/refund-policy', destination: '/refundpolicy', permanent: true },
      ...pages.map((page) => ({
        source: `/${page}/index.html`, destination: `/${page}`, permanent: true,
      })),
    ];
  },
};

export default nextConfig;
