import { createElement } from 'react';
import { ContentSection } from './ContentSection';

const attributeNames = { class: 'className', tabindex: 'tabIndex' };

function reactAttributes(attributes = {}) {
  return Object.fromEntries(
    Object.entries(attributes).map(([key, value]) => [attributeNames[key] ?? key, value]),
  );
}

export function ContentPage({ route, page }) {
  const sections = page.sections.map((reference) => (
    <ContentSection key={reference} route={route} reference={reference} />
  ));
  const content = page.wrapper
    ? createElement(page.wrapper.tag, reactAttributes(page.wrapper.attributes), sections)
    : sections;

  return createElement('main', reactAttributes(page.mainAttributes), content);
}
