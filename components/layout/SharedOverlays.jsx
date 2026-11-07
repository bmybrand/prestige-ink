import { readSharedFragment } from '@/lib/content';
import { HtmlFragment } from '@/components/content/HtmlFragment';

export function SharedOverlays() {
  return <HtmlFragment html={readSharedFragment('overlays')} />;
}
