import { readSharedFragment } from '@/lib/content';
import { HtmlFragment } from '@/components/content/HtmlFragment';

export function SiteHeader() {
  return <HtmlFragment html={readSharedFragment('header')} />;
}
