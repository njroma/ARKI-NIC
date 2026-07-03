const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const year = document.querySelector('[data-year]');
const lightbox = document.querySelector('[data-lightbox]');
const lightboxImg = document.querySelector('[data-lightbox-img]');
const lightboxTitle = document.querySelector('[data-lightbox-title]');
const closeLightbox = document.querySelector('[data-close-lightbox]');

year.textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

document.querySelectorAll('.image-open').forEach((item) => {
  item.addEventListener('click', () => {
    const image = item.dataset.img;
    const title = item.dataset.title || item.querySelector('img')?.alt || 'Architecture image';

    lightboxImg.src = image;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightbox.hidden = false;
    document.body.classList.add('no-scroll');
  });
});

function hideLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = '';
  document.body.classList.remove('no-scroll');
}

closeLightbox.addEventListener('click', hideLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) hideLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.hidden) hideLightbox();
});
