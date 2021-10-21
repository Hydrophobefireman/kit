function scrollIntoViewIfNeeded(this: Element, center?: boolean) {
  const container = this.parentElement
      ? this.parentElement.getBoundingClientRect()
      : document.body.getBoundingClientRect(),
    rect = this.getBoundingClientRect();
  if (
    rect.top < container.top ||
    rect.bottom > container.bottom ||
    rect.right > container.right ||
    rect.left < container.left
  )
    center ? this.scrollIntoView({ block: "center" }) : this.scrollIntoView();
}
export function scrollIntoViewIfNeededPolyfill() {
  if (!(Element.prototype as any).scrollIntoViewIfNeeded)
    Object.defineProperty(Element.prototype, "scrollIntoViewIfNeeded", {
      value: scrollIntoViewIfNeeded,
      configurable: true,
      writable: true,
    });
}
