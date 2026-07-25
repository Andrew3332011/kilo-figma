document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.racing__number');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = parseInt(counter.textContent, 10);

        let current = 0;
        const duration = 3000; // 2 seconds
        const increment = Math.max(1, Math.ceil(target / (duration / 16)));

        const updateCounter = () => {
          current += increment;

          if (current >= target) {
            counter.textContent = target;
          } else {
            counter.textContent = current;
            requestAnimationFrame(updateCounter);
          }
        };

        counter.textContent = '0';
        requestAnimationFrame(updateCounter);

        obs.unobserve(counter);
      });
    },
    {
      threshold: 0.5,
    }
  );

  counters.forEach((counter) => observer.observe(counter));
});