import './scss/main.scss';
import { initLoader } from './js/loader';
import { initHero3D } from './js/hero-3d';
import { initGallery3D } from './js/gallery-3d';
import { initNavigation } from './js/navigation';
import { initSmoothScroll } from './js/smooth-scroll';
import { initAnimations } from './js/animations';

initLoader();
initSmoothScroll();
initNavigation();
initHero3D();
initGallery3D();
initAnimations();