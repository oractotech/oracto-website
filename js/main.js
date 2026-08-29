/* ==========================================================================
   Relisto Marketing Website - Vanilla JavaScript Logic
   Includes: Lightbox Modal, Interactive List Simulator, Navigation & Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. App Screenshots Lightbox Data & Logic
     -------------------------------------------------------------------------- */
  const screenshotsData = [
    {
      id: 1,
      num: 'Reusable Lists',
      title: 'Save once. Reuse anytime.',
      desc: 'Keep your regular items ready instead of typing them again. Create reusable categories for shopping, travel, workouts, work, and household needs.',
      src: './assets/screenshots/screenshot-1.png'
    },
    {
      id: 2,
      num: 'Building a List',
      title: 'Just pick what you need.',
      desc: 'Add saved items to your active list with a quick tap or drag. Adjust quantities in seconds without recreating items from scratch.',
      src: './assets/screenshots/screenshot-2.png'
    },
    {
      id: 3,
      num: 'Grouped Notes',
      title: 'Keep related notes together.',
      desc: 'Keep workouts, recipes, ideas, references, and more neatly organized by category alongside your reusable lists.',
      src: './assets/screenshots/screenshot-3.png'
    },
    {
      id: 4,
      num: 'Simple Notes',
      title: 'Write it down. Find it easily.',
      desc: 'Keep notes simple with easy formatting, bold/italic highlights, quick bullet points, and pinning for instant access to what matters most.',
      src: './assets/screenshots/screenshot-4.png'
    },
    {
      id: 5,
      num: 'Backup & Restore',
      title: 'Your data. Always in your hands.',
      desc: 'Keep everything safely stored on your device. Export a backup file anytime and restore your data whenever you switch phones or reinstall.',
      src: './assets/screenshots/screenshot-5.png'
    }
  ];

  let currentLightboxIndex = 0;
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxNum = document.getElementById('lightbox-num');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxPrevBtn = document.getElementById('lightbox-prev');
  const lightboxNextBtn = document.getElementById('lightbox-next');
  const lightboxCloseBtn = document.getElementById('lightbox-close');

  function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = screenshotsData[currentLightboxIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxNum.textContent = item.num;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;
  }

  function nextLightbox() {
    currentLightboxIndex = (currentLightboxIndex + 1) % screenshotsData.length;
    updateLightboxContent();
  }

  function prevLightbox() {
    currentLightboxIndex = (currentLightboxIndex - 1 + screenshotsData.length) % screenshotsData.length;
    updateLightboxContent();
  }

  // Attach click listeners to screenshot cards & enlarge triggers
  document.querySelectorAll('.screenshot-card').forEach((card, idx) => {
    card.addEventListener('click', () => openLightbox(idx));
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);

  // Close when clicking overlay backdrop
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation for Lightbox & Modals
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });

  /* --------------------------------------------------------------------------
     2. Carousel Arrow Scrolling Controls (Desktop)
     -------------------------------------------------------------------------- */
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');

  if (track && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     3. Navbar Scroll Shadow & Mobile Menu Drawer
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
      document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Interactive Relisto List Simulator (Vanilla JS Live Demo)
     -------------------------------------------------------------------------- */
  const initialPredefined = [
    { id: '1', emoji: '🍅', name: 'Tomato' },
    { id: '2', emoji: '🥛', name: 'Milk' },
    { id: '3', emoji: '🥚', name: 'Egg' },
    { id: '4', emoji: '🍞', name: 'Bread' },
    { id: '5', emoji: '🍗', name: 'Chicken' },
    { id: '6', emoji: '🍎', name: 'Apples' },
    { id: '7', emoji: '🧀', name: 'Cheese' },
  ];

  let activeListItems = [
    { id: '6', emoji: '🍎', name: 'Apples', count: 1 }
  ];

  const simPredefinedContainer = document.getElementById('sim-predefined');
  const simActiveContainer = document.getElementById('sim-active');
  const simClearBtn = document.getElementById('sim-clear');
  const simItemCountBadge = document.getElementById('sim-count-badge');

  function renderSimulator() {
    if (!simPredefinedContainer || !simActiveContainer) return;

    // Render Predefined Buttons
    simPredefinedContainer.innerHTML = '';
    initialPredefined.forEach(item => {
      const activeObj = activeListItems.find(a => a.id === item.id);
      const btn = document.createElement('button');
      btn.className = `sim-item-btn ${activeObj ? 'added' : ''}`;
      btn.innerHTML = `<span>${item.emoji}</span> ${item.name} ${activeObj ? '✓' : '+'}`;
      btn.onclick = () => {
        if (!activeObj) {
          activeListItems.push({ ...item, count: 1 });
          renderSimulator();
        }
      };
      simPredefinedContainer.appendChild(btn);
    });

    // Render Active List Rows
    simActiveContainer.innerHTML = '';
    if (activeListItems.length === 0) {
      simActiveContainer.innerHTML = `
        <div style="text-align: center; color: var(--color-muted); padding: 2rem 0; font-size: 0.9rem;">
          Active list is empty. Tap any predefined item above to pick what you need!
        </div>
      `;
    } else {
      activeListItems.forEach(item => {
        const row = document.createElement('div');
        row.className = 'sim-active-row';
        row.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600;">
            <span style="background: white; padding: 2px 6px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; color: var(--primary-mint);">x${item.count}</span>
            <span>${item.emoji}</span> ${item.name}
          </div>
          <button style="color: #94A3B8; font-weight: bold; cursor: pointer; padding: 4px;" title="Remove from active list">✕</button>
        `;
        row.querySelector('button').onclick = () => {
          activeListItems = activeListItems.filter(a => a.id !== item.id);
          renderSimulator();
        };
        simActiveContainer.appendChild(row);
      });
    }

    // Update Badge & Clear button
    if (simItemCountBadge) {
      simItemCountBadge.textContent = `${activeListItems.length} active item${activeListItems.length !== 1 ? 's' : ''}`;
    }
    if (simClearBtn) {
      simClearBtn.style.opacity = activeListItems.length > 0 ? '1' : '0.5';
      simClearBtn.style.pointerEvents = activeListItems.length > 0 ? 'auto' : 'none';
    }
  }

  if (simClearBtn) {
    simClearBtn.addEventListener('click', () => {
      activeListItems = [];
      renderSimulator();
    });
  }

  renderSimulator();

  /* --------------------------------------------------------------------------
     5. Legal & Support Modals Handler (Privacy, Terms, Support)
     -------------------------------------------------------------------------- */
  const legalModal = document.getElementById('legal-modal');
  const legalTitle = document.getElementById('legal-title');
  const legalBody = document.getElementById('legal-body');
  const legalClose = document.getElementById('legal-close');

  const legalContentMap = {
    privacy: {
      title: 'Privacy Policy',
      content: `
        <p><strong>Effective Date: 2026</strong></p>
        <p>Relisto ("we", "our", or "us") is built from the ground up with local-first privacy as its foundational principle.</p>
        <h4>1. Zero Data Collection</h4>
        <p>Relisto does not collect, record, track, or transmit your personal data, shopping items, lists, or notes to external servers. All information created within the app remains exclusively on your local device storage.</p>
        <h4>2. No Account Required</h4>
        <p>You can use Relisto fully without registering an account, providing an email address, or logging in. Your identity remains 100% private.</p>
        <h4>3. Local Backups & Data Portability</h4>
        <p>Relisto allows you to export your data into a local backup file (.sqlite format). You control where this backup file is stored (e.g., local storage, external drive, or your personal cloud storage). Restoring a backup is entirely performed locally on your device.</p>
        <h4>4. Analytics & Tracking</h4>
        <p>Relisto contains zero third-party advertising SDKs, tracking pixels, or cross-site behavioral analytics.</p>
        <h4>Contact</h4>
        <p>If you have any questions regarding this Privacy Policy, please reach out via our Support section.</p>
      `
    },
    terms: {
      title: 'Terms of Use',
      content: `
        <p><strong>Effective Date: 2026</strong></p>
        <p>By downloading or using Relisto, you agree to these simple Terms of Use.</p>
        <h4>1. License & Scope</h4>
        <p>Mohammed Javad grants you a personal, non-transferable, non-exclusive license to download, install, and use Relisto on your personal iOS devices in accordance with App Store guidelines.</p>
        <h4>2. Data Responsibility</h4>
        <p>Because Relisto operates locally on your device without cloud synchronization, you are responsible for maintaining your own backup files using the built-in Export Backup feature.</p>
        <h4>3. Limitation of Liability</h4>
        <p>Relisto is provided "as is" without warranty of any kind. In no event shall the author be liable for any direct, indirect, or incidental data loss resulting from device hardware failure or lost devices.</p>
      `
    },
    /* support popup modal disabled in favor of direct mailto: link and https://oracto.com/relisto-support.html */
    /*
    support: {
      title: 'Support & Help',
      content: `...`
    }
    */
  };

  function openLegalModal(type) {
    const data = legalContentMap[type];
    if (!data) return;
    legalTitle.textContent = data.title;
    legalBody.innerHTML = data.content;
    legalModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLegalModal() {
    legalModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalType = trigger.getAttribute('data-modal');
      openLegalModal(modalType);
    });
  });

  if (legalClose) legalClose.addEventListener('click', closeLegalModal);
  if (legalModal) {
    legalModal.addEventListener('click', (e) => {
      if (e.target === legalModal) closeLegalModal();
    });
  }

});
