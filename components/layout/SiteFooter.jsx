import { readSharedFragment } from '@/lib/content';
import { HtmlFragment } from '@/components/content/HtmlFragment';

export function SiteFooter() {
  return <HtmlFragment html={readSharedFragment('footer')} />;
}
