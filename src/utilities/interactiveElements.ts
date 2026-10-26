/**
 * HTML interactive content, plus elements with their own activation behavior.
 * Keep context-specific additions (such as editable content) at the call site.
 */
const INTERACTIVE_ELEMENT_SELECTOR = [
  'a[href]',
  'audio[controls]',
  'button',
  'details',
  'embed',
  'iframe',
  'img[usemap]',
  'input:not([type="hidden"])',
  'label',
  'select',
  'textarea',
  'video[controls]',
  'area[href]',
].join(', ')

/** Find the closest interactive element, including the element itself. */
export function findInteractiveAncestor(element: Element, additionalSelector = ''): Element | null {
  return element.closest(additionalSelector
    ? `${INTERACTIVE_ELEMENT_SELECTOR}, ${additionalSelector}`
    : INTERACTIVE_ELEMENT_SELECTOR)
}
