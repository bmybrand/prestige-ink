'use client';

import { useEffect } from 'react';

function revealAnimatedContent() {
  document.querySelectorAll('[data-aos]').forEach((element) => {
    element.classList.add('aos-init', 'aos-animate');
  });
}

function updateActiveNavigation() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const navigationLinks = document.querySelectorAll('nav a.group.relative.inline-flex[href]');

  navigationLinks.forEach((link) => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '') || '/';
    const isActive = linkPath === currentPath;
    const indicator = link.querySelector(':scope > span');

    link.classList.toggle('text-brand-600', isActive);
    link.classList.toggle('text-ink', !isActive);
    indicator?.classList.toggle('w-full', isActive);
    indicator?.classList.toggle('w-0', !isActive);
  });

  const serviceRoutes = [
    '/audiobook-production',
    '/book-design',
    '/book-editing',
    '/book-marketing',
    '/book-publishing',
    '/book-writing',
    '/children-book-publishing',
  ];
  const servicesButton = document.querySelector('nav button[aria-expanded]');
  const isServiceRoute = serviceRoutes.includes(currentPath);

  servicesButton?.classList.toggle('text-brand-600', isServiceRoute);
  servicesButton?.classList.toggle('text-ink', !isServiceRoute);
}

export function SiteClientInitializer() {
  useEffect(() => {
    updateActiveNavigation();

    let attempts = 0;
    const maximumAttempts = 20;

    const initializeAnimations = () => {
      attempts += 1;

      if (window.AOS) {
        window.AOS.init({ once: true, offset: 50, duration: 800 });
        window.AOS.refreshHard?.();
        return true;
      }

      if (attempts >= maximumAttempts) {
        revealAnimatedContent();
        return true;
      }

      return false;
    };

    if (initializeAnimations()) return undefined;

    const timer = window.setInterval(() => {
      if (initializeAnimations()) window.clearInterval(timer);
    }, 100);

    return () => window.clearInterval(timer);
  }, []);

  return null;
}
