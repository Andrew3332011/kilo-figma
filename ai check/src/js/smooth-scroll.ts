import Lenis from 'lenis';
import gsap from 'gsap';

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  lenis.on('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
      if (lenis.scroll > 100) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}