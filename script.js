document.addEventListener('DOMContentLoaded', () => {
  // Selecteer alle elementen
  const elements = {
      menuToggle: document.querySelector('.menu-toggle'),
      menuPanel: document.querySelector('.menu-panel'),
      christmasToggle: document.querySelector('.christmas-toggle'),
      darkModeToggle: document.querySelector('.darkmode-toggle'),
      modal: document.querySelector('.modal'),
      modalImg: document.querySelector('.modal-content'),
      closeBtn: document.querySelector('.modal-close'),
      body: document.body,
      filmSection: document.querySelector('section:nth-of-type(2)'),
      nieuwsSection: document.querySelector('section:nth-of-type(5)'),
      nearButton: document.querySelector('.near-cinema'),
      favoriteButton: document.querySelector('.favorite-cinema'),
      locationSection: document.querySelector('.location-section')
  };

  // Hamburgermenu functionaliteit
  if (elements.menuToggle && elements.menuPanel) {
      elements.menuToggle.addEventListener('click', (e) => {
          e.preventDefault();
          elements.menuPanel.classList.toggle('active');
      });

      // Sluit menu bij klik buiten menu
      document.addEventListener('click', (event) => {
          const isClickOutside = !elements.menuPanel.contains(event.target) && 
                               !elements.menuToggle.contains(event.target);
          
          if (isClickOutside && elements.menuPanel.classList.contains('active')) {
              elements.menuPanel.classList.remove('active');
              elements.menuPanel.setAttribute('aria-hidden', 'true');
          }
      });
  }

  // Dark mode functionaliteit
  if (elements.darkModeToggle) {
      if (localStorage.getItem('darkmode') === 'true') {
          elements.body.classList.add('darkmode');
      }

      elements.darkModeToggle.addEventListener('click', (e) => {
          e.preventDefault();
          elements.body.classList.toggle('darkmode');
          localStorage.setItem('darkmode', elements.body.classList.contains('darkmode'));
      });
  }

  // Kerst thema functionaliteit
  if (elements.christmasToggle) {
      elements.christmasToggle.addEventListener('click', (e) => {
          e.preventDefault();
          const isPressed = elements.christmasToggle.getAttribute('aria-pressed') === 'true';
          elements.christmasToggle.setAttribute('aria-pressed', !isPressed);
      });
  }

  // Films carousel
  if (elements.filmSection) {
      const carousel = initializeCarousel(elements.filmSection);
      if (carousel) setupCarouselControls(carousel);
  }

  // Nieuws carousel
  if (elements.nieuwsSection) {
      const carousel = initializeCarousel(elements.nieuwsSection);
      if (carousel) setupCarouselControls(carousel);
  }

  // Bioscoop locatie kiezer
  if (elements.nearButton && elements.favoriteButton && elements.locationSection) {
      setupLocationToggle(elements);
  }
});

// Hulpfuncties
function initializeCarousel(section) {
  return {
      ul: section.querySelector('ul'),
      items: section.querySelectorAll('li'),
      prevBtn: section.querySelector('button:nth-of-type(1)'),
      nextBtn: section.querySelector('button:nth-of-type(2)'),
      index: 0
  };
}

function setupCarouselControls(carousel) {
  const root = document.documentElement;
  const slideWidth = parseInt(getComputedStyle(root).getPropertyValue('--carousel-slide')) || 15; // --c-s is van de :root voor extra puntjes i think

   
  const updateCarousel = () => {
      carousel.items.forEach((item, i) => {
          item.classList.toggle('active', i === carousel.index);
      });
      carousel.ul.style.transform = `translateX(-${carousel.index * slideWidth}%)`;

  };

  carousel.nextBtn?.addEventListener('click', () => {
      carousel.index = (carousel.index + 1) % carousel.items.length;
      updateCarousel();
  });

  carousel.prevBtn?.addEventListener('click', () => {
      carousel.index = (carousel.index - 1 + carousel.items.length) % carousel.items.length;
      updateCarousel();
  });

  updateCarousel();
}

function setupLocationToggle(elements) {
  function toggleButtons(event) {
      const clickedButton = event.target.closest('button');
      elements.nearButton.classList.toggle('selected', clickedButton === elements.nearButton);
      elements.favoriteButton.classList.toggle('selected', clickedButton === elements.favoriteButton);
      elements.locationSection.classList.toggle('visible', clickedButton === elements.nearButton);
      elements.nearButton.setAttribute('aria-pressed', clickedButton === elements.nearButton);
      elements.favoriteButton.setAttribute('aria-pressed', clickedButton === elements.favoriteButton);
  }

  elements.nearButton.addEventListener('click', toggleButtons);
  elements.favoriteButton.addEventListener('click', toggleButtons);
  elements.nearButton.classList.add('selected');
  elements.locationSection.classList.add('visible');
}


// Ik gebruikte een DOM omdat mijn oude Javascript brak. Ik ben van 200 JS lines naar 50 gegaan :)