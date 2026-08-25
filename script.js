const toggle = document.querySelector('.toc-toggle');
const toc = document.querySelector('.toc');
const tocLinks = [...document.querySelectorAll('.toc a')];
const sections = tocLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function closeToc() {
  toc.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

toggle.addEventListener('click', () => {
  const open = !toc.classList.contains('is-open');
  toc.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

toc.addEventListener('click', event => {
  if (event.target === toc || event.target.closest('a')) closeToc();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeToc();
});

const observer = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;
  tocLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${visible.target.id}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-15% 0px -65% 0px', threshold: [0, .15, .4] });

sections.forEach(section => observer.observe(section));
