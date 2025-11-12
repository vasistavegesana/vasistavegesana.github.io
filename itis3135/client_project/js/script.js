/* Highlight current nav link (lint: spacing, parens, semicolons) */
document.querySelectorAll('nav a').forEach((a) => {
  if (a.href === window.location.href) {
    a.classList.add('active');
  }
});

/* Fade-in on scroll using IntersectionObserver (lint-clean) */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade').forEach((el) => {
  io.observe(el);
});
