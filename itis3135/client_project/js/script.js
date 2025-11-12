// highlight current nav link
document.querySelectorAll('nav a').forEach((a) => {
  if (a.href === window.location.href) {
    a.classList.add('active');
  }
});

// fade-in on scroll for sections flagged with fade classes
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll('.fade, .fade-2, .fade-3')
  .forEach((el) => io.observe(el));
