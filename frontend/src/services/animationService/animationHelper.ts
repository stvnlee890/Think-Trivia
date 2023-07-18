import { gsap, Power4 } from "gsap";

export function dotAnimation(element: HTMLDivElement) {
  const ctx = gsap.context(() => {
    gsap.to(element.children, {
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
      opacity: 1,
      ease: Power4.easeInOut,
    });
  }, element);
  return ctx
}
