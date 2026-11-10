/* =====================================================
   script.js  - animations & interactions
   (GSAP is loaded in index.html; everything here is free)
   ===================================================== */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. NAV: underline follows the section you are in ---------- */
const navLinks = document.querySelectorAll('.nav-link[data-target]');
const spyIds = ['home', 'about', 'work', 'contact'];

const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id === 'contact' ? null : entry.target.id;
    navLinks.forEach((a) => a.classList.toggle('active', a.dataset.target === id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });

spyIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) spy.observe(el);
});

/* ---------- 2. SCROLL REVEAL (fade/slide in) ---------- */
document.querySelectorAll('.about-card, .links, .scene .girl, .work h2').forEach((el) => el.classList.add('reveal'));

const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));

/* (The hero meadow animation is the video images/hero-meadow.mp4 - no code needed.) */

/* ---------- 5. ABOUT: clouds float, tags bob ---------- */
if (!reduceMotion && window.gsap) {
  gsap.utils.toArray('.cloud').forEach((c, i) => {
    gsap.to(c, { y: i % 2 ? 12 : -12, x: i % 2 ? -8 : 8, duration: 3 + i, ease: 'sine.inOut', repeat: -1, yoyo: true });
  });
  gsap.utils.toArray('.tag').forEach((t, i) => {
    gsap.to(t, { y: -8, duration: 1.8 + i * 0.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.3 });
  });
  gsap.to('.about-butterfly', { y: -10, rotation: 6, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true });
}

/* ---------- 6. CONTACT: speech bubble swaps its message ---------- */
const bubble = document.getElementById('bubble');
const bubbleText = document.getElementById('bubble-text');

// CHANGE: edit or add messages here
const messages = [
  '“Enjoying the creative vibes? Drop a message and let’s bring some cool ideas to life.”',
  '“Spotting a vibe with my creative work? Don’t be shy— let’s connect!”'
];
let msgIndex = 0;

if (!reduceMotion) {
  setInterval(() => {
    bubble.classList.add('fade');                         // fade out
    setTimeout(() => {
      msgIndex = (msgIndex + 1) % messages.length;
      bubbleText.textContent = messages[msgIndex];
      bubble.classList.remove('fade');                    // fade in
    }, 650);
  }, 4500);
}
