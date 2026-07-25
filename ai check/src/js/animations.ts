import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  const heroContent = document.querySelector('.hero__content');
  const heroElements = heroContent?.children;

  if (heroElements) {
    gsap.to(heroElements, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      delay: 0.5,
      duration: 1,
      ease: 'power3.out',
    });
  }

  const galleryCards = document.querySelectorAll('.gallery__card');
  gsap.from(galleryCards, {
    scrollTrigger: {
      trigger: '.gallery',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out',
  });

  const heritageContent = document.querySelectorAll('.heritage__content > *');
  gsap.from(heritageContent, {
    scrollTrigger: {
      trigger: '.heritage',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    x: -30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out',
  });

  const innovationFeatures = document.querySelectorAll('.innovation__feature');
  gsap.from(innovationFeatures, {
    scrollTrigger: {
      trigger: '.innovation',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out',
  });
}