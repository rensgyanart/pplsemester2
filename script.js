/**
 * PORTOFOLIO PPL MANDIRI - RENO MALIK AKBARKHAN, S.Ds. (RENO M®)
 * Interaktivitas: Mobile Nav, Cycle Tabs, Document Filter & Search, Photo & Video Placeholders
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Mobile Navigation Toggle --- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  /* --- 2. Active Navigation Link on Scroll & Pusat Berkas Bounce --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link:not(.nav-btn)');
  const navBtn = document.querySelector('.nav-btn');

  if (navBtn) {
    navBtn.addEventListener('click', () => {
      navBtn.classList.remove('bounce-active');
      void navBtn.offsetWidth; // trigger reflow for repeated clicks
      navBtn.classList.add('bounce-active');
    });
  }

  const onScroll = () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- 3. Cycle Tabs Switcher --- */
  const cycleTabs = document.querySelectorAll('.cycle-tab');
  const cyclePanels = document.querySelectorAll('.cycle-panel');

  cycleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cycleId = tab.getAttribute('data-cycle');

      cycleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      cyclePanels.forEach(panel => {
        if (panel.id === `cycle-${cycleId}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  /* --- 4. Document Filter (Category) --- */
  const filterBtns = document.querySelectorAll('.doc-filter-btn');
  const docCards = document.querySelectorAll('.doc-item-card');
  const searchInput = document.getElementById('docSearchInput');

  // Initial display: Default to UTS category (Topik 1, 2, 3)
  const initialActiveBtn = document.querySelector('.doc-filter-btn.active');
  const initialCategory = initialActiveBtn ? initialActiveBtn.getAttribute('data-filter') : 'uts';
  docCards.forEach(card => {
    const category = card.getAttribute('data-category');
    card.style.display = (category === initialCategory) ? 'flex' : 'none';
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      if (searchInput) searchInput.value = '';

      docCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (category === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --- 5. Document Search Box --- */
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const activeBtn = document.querySelector('.doc-filter-btn.active');
      const activeCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'uts';

      docCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const category = card.getAttribute('data-category');

        if (!query) {
          card.style.display = (category === activeCategory) ? 'flex' : 'none';
        } else {
          card.style.display = text.includes(query) ? 'flex' : 'none';
        }
      });
    });
  }

  /* --- 6. Photo Placeholder Helper --- */
  const placeholders = document.querySelectorAll('.photo-placeholder');
  placeholders.forEach(ph => {
    ph.addEventListener('click', () => {
      const slot = ph.getAttribute('data-slot') || 'Slot Foto';
      const desc = ph.querySelector('.placeholder-desc')?.textContent || '';
      alert(`📸 ${slot}\n\nPeruntukan:\n${desc}\n\nCatatan:\nAnda dapat menaruh berkas gambar pilihan di folder assets/images/ lalu menghubungkannya ke tag <img> pada slot ini.`);
    });
  });

  /* --- 7. Document Download Alert (if PDF not yet placed) --- */
  const docLinks = document.querySelectorAll('.btn-doc-download');
  docLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.startsWith('documents/')) {
        fetch(href, { method: 'HEAD' })
          .then(res => {
            if (!res.ok) {
              e.preventDefault();
              alert(`📄 Berkas PDF Belum Diletakkan\n\nTarget File: ${href}\n\nSaat ini naskah Word telah siap dan tersinkronisasi (KKTP 70 & Pengesahan Resmi). Setelah Mas Reno mengekspornya menjadi PDF dan menyimpannya di folder "${href}", tombol ini akan langsung membuka dokumen secara otomatis.`);
            }
          })
          .catch(() => {
            // Local file protocol or network error
          });
      }
    });
  });

  /* --- 8. Video Placeholder Helper --- */
  const videoPlaceholders = document.querySelectorAll('.video-placeholder');
  videoPlaceholders.forEach(ph => {
    ph.addEventListener('click', () => {
      const slot = ph.getAttribute('data-slot') || 'Slot Video';
      alert(`🎬 ${slot}\n\nCara Memasang Video YouTube:\n1. Buka video Anda di YouTube, klik Bagikan (Share) -> Sematkan (Embed).\n2. Salin link pada atribut src, misalnya: https://www.youtube.com/embed/KODE_VIDEO\n3. Buka file index.html, cari judul "${slot}", lalu tempelkan link tersebut ke atribut src pada tag <iframe> dan ubah style="display: none;" menjadi style="display: block;".`);
    });
  });

});
