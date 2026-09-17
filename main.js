/**
 * LUNAR LOFT — Architectural Minimal Interactions
 * Quiet entrance reveals, menu tab switching, and reservation drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  initIntersectionObserver();
  initMenuTabs();
  initMobileDrawer();
  initReservationModal();
  initHeaderScrollEffect();
});

/* Quiet Entrance Reveals via Intersection Observer */
function initIntersectionObserver() {
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* Menu Category Tab Switching */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const contents = document.querySelectorAll('.menu-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const activeContent = document.getElementById(`tab-${targetTab}`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

/* Mobile Drawer Navigation */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('is-open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('is-open');
    });
  });
}

/* Modal Reservation Toggle */
function initReservationModal() {
  const openBtn = document.getElementById('openReserveBtn');
  const mobileOpenBtn = document.getElementById('mobileReserveBtn');
  const closeBtn = document.getElementById('closeReserveBtn');
  const modal = document.getElementById('reserveModal');
  const mobileDrawer = document.getElementById('mobileDrawer');

  const openModal = () => {
    if (modal) modal.classList.add('is-active');
    if (mobileDrawer) mobileDrawer.classList.remove('is-open');
  };

  const closeModal = () => {
    if (modal) modal.classList.remove('is-active');
  };

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (mobileOpenBtn) mobileOpenBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

/* Header Subtle Scroll State */
function initHeaderScrollEffect() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.paddingTop = '1rem';
      header.style.paddingBottom = '1rem';
    } else {
      header.style.paddingTop = '';
      header.style.paddingBottom = '';
    }
  });
}

/* Reservation Form Submissions */
function handleReserveSubmit() {
  const feedback = document.getElementById('formFeedback');
  if (feedback) {
    feedback.style.color = '#34D399';
    feedback.textContent = '✓ RESERVATION REQUESTED. WE WILL CONFIRM VIA SMS WITHIN 15 MINUTES.';
    setTimeout(() => {
      document.getElementById('reserveForm').reset();
      feedback.textContent = '';
    }, 4000);
  }
}

function handleModalSubmit() {
  alert('Thank you. Your table reservation request at Lunar Loft has been submitted.');
  const modal = document.getElementById('reserveModal');
  if (modal) modal.classList.remove('is-active');
}
