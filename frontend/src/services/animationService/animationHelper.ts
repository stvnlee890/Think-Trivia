import { gsap, Power4 } from "gsap";

export function dotAnimation(element: HTMLCollection) {
  gsap.to(element, {
    repeat: -1,
    yoyo: true,
    stagger: .1,
    opacity: 1,
    ease: Power4.easeInOut
  });
}
