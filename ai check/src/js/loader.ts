export function initLoader() {
  const loader = document.getElementById('loader');
  const progressBar = loader?.querySelector('.loader__bar') as HTMLElement;
  const percentage = loader?.querySelector('.loader__percentage') as HTMLElement;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      setTimeout(() => {
        if (loader) loader.classList.add('loader--hidden');
        document.body.style.overflow = 'visible';
      }, 500);
    }
    
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (percentage) percentage.textContent = `${Math.round(progress)}%`;
  }, 100);
}