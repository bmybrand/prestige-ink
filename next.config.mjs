/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    const pages = [
      'about-us', 'audiobook-production', 'book-design', 'book-editing',
      'book-marketing', 'book-publishing', 'book-writing',
      'children-book-publishing', 'contact-us', 'faq',
    ];
    return [
      { source: '/index.html', destination: '/', permanent: true },
      ...pages.map((page) => ({
        source: `/${page}/index.html`, destination: `/${page}`, permanent: true,
      })),
    ];
  },
};

export default nextConfig;
