export function initNavigation() {
  const menuToggle = document.querySelector('.header__menu-toggle') as HTMLButtonElement;
  const navigation = document.querySelector('.header__navigation');

  if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      
      if (!isOpen) {
        navigation.classList.add('header__navigation--open');
      } else {
        navigation.classList.remove('header__navigation--open');
      }
    });
  }

  const navLinks = document.querySelectorAll('.header__nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href')?.substring(1);
      const targetElement = target ? document.getElementById(target) : null;
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}