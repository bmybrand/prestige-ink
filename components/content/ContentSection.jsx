import { readContentSection } from '@/lib/content';
import { HtmlFragment } from './HtmlFragment';

export function ContentSection({ route, reference }) {
  return <HtmlFragment html={readContentSection(route, reference)} />;
}
