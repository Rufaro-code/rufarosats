// CATEGORY FILTER
function filterCategory(category) {
  const cards = document.querySelectorAll('#blogGrid .blog-card');
  cards.forEach(card => {
    card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
  });
}

// SIMPLE CAROUSEL
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn.left');
const nextBtn = document.querySelector('.carousel-btn.right');
let index = 0;

function updateCarousel() {
  const width = items[0].offsetWidth + 16; // gap
  track.style.transform = `translateX(-${index * width}px)`;
}

prevBtn.addEventListener('click', () => {
  index = Math.max(index - 1, 0);
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  index = Math.min(index + 1, items.length - 1);
  updateCarousel();
});
