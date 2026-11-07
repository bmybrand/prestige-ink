import { notFound } from 'next/navigation';
import { ContentPage } from '@/components/content/ContentPage';
import { getManifest, getPage } from '@/lib/content';

const manifest = getManifest();
export const dynamicParams = false;

function routeFromSlug(slug = []) {
  if (slug.length === 0) return 'home';
  return slug.join('/');
}

export function generateStaticParams() {
  return Object.keys(manifest).map((route) => ({ slug: route === 'home' ? [] : [route] }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const route = routeFromSlug(slug);
  const page = getPage(route);
  if (!page) notFound();
  return <ContentPage route={route} page={page} />;
}
