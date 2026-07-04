/**
 * Dentiva Hero Section Interactive Engine
 * Handles entrance animations, interactive pricing hover states, and smooth stats count-ups.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Stats Counters
  animateCounters();

  // Initialize Tooltip Hover Connections
  setupTooltipInteractions();

  // Initialize Control Bar Dot Navigation
  setupControlBar();

  // Trigger Page Entrance Animation
  triggerEntranceAnimations();

  // Setup Services Staggered Scroll Reveal
  setupScrollReveal();

  // Setup Why Choose Us scroll reveal
  setupWhyCardReveal();

  // Setup Testimonial Slideshow
  setupSlideshow();

  // Setup Services Vertical Slideshow
  setupVerticalSlideshow();

  // Setup Desktop scroll glass header
  setupScrollHeader();

  // Setup Mobile Hamburger Menu
  setupHamburgerMenu();

  // Setup Scroll Spy active nav links
  setupScrollSpy();
});

/**
 * Desktop scroll effect — glass navbar on scroll.
 */
function setupScrollHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        if (scrollY > 60) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Mobile hamburger menu — slide-in nav with overlay backdrop.
 */
function setupHamburgerMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (!hamburger || !navLinks) return;

  // Create overlay backdrop
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay-bg';
  document.body.appendChild(overlay);

  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Toggle on hamburger click
  hamburger.addEventListener('click', toggleMenu);

  // Close on overlay click
  overlay.addEventListener('click', closeMenu);

  // Close on nav link click (smooth UX)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close menu on resize if viewport grows past mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * Animates numbers from 0 to their target values on page load with easeOutQuad easing.
 */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const duration = 1800; // Total duration in milliseconds

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const start = 0;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const rate = Math.min(progress / duration, 1);
      
      // Easing: easeOutQuad
      const easedRate = rate * (2 - rate);
      const currentVal = Math.floor(start + easedRate * (target - start));
      
      counter.textContent = currentVal;

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        counter.textContent = target;
      }
    }

    window.requestAnimationFrame(step);
  });
}

/**
 * Connects the interactive tooltips to specific segments of the SVG implant model on hover.
 */
function setupTooltipInteractions() {
  const rootCanalTooltip = document.getElementById('tooltip-root-canal');
  const checkupTooltip = document.getElementById('tooltip-checkup');
  
  const lineLeft = document.getElementById('line-left');
  const lineRight = document.getElementById('line-right');
  
  const dotLeft = document.getElementById('dot-left-end');
  const dotRight = document.getElementById('dot-right-end');
  
  const implantImage = document.querySelector('.implant-image');

  // Helper functions to toggle active states
  function highlightRootCanal(isHighlighted) {
    if (isHighlighted) {
      lineLeft.classList.add('highlighted');
      dotLeft.classList.add('highlighted');
      if (implantImage) implantImage.classList.add('highlighted');
    } else {
      lineLeft.classList.remove('highlighted');
      dotLeft.classList.remove('highlighted');
      if (implantImage) implantImage.classList.remove('highlighted');
    }
  }

  function highlightCheckup(isHighlighted) {
    if (isHighlighted) {
      lineRight.classList.add('highlighted');
      dotRight.classList.add('highlighted');
      if (implantImage) implantImage.classList.add('highlighted');
    } else {
      lineRight.classList.remove('highlighted');
      dotRight.classList.remove('highlighted');
      if (implantImage) implantImage.classList.remove('highlighted');
    }
  }

  // Bind Mouse Events
  if (rootCanalTooltip) {
    rootCanalTooltip.addEventListener('mouseenter', () => highlightRootCanal(true));
    rootCanalTooltip.addEventListener('mouseleave', () => highlightRootCanal(false));
  }

  if (checkupTooltip) {
    checkupTooltip.addEventListener('mouseenter', () => highlightCheckup(true));
    checkupTooltip.addEventListener('mouseleave', () => highlightCheckup(false));
  }
}

/**
 * Handles sliding panel dot clicks and interactions.
 */
function setupControlBar() {
  const dots = document.querySelectorAll('.nav-dot');
  
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      // Remove active states
      dots.forEach(d => d.classList.remove('active'));
      // Add active state to clicked dot
      dot.classList.add('active');
      
      // Perform subtle rotation or effect based on slide clicked
      const slideNum = dot.getAttribute('data-slide');
      console.log(`Slide ${slideNum} activated.`);
    });
  });

  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const controlBar = document.querySelector('.vertical-control-bar');
      if (controlBar) {
        controlBar.style.transition = 'all 0.5s ease';
        controlBar.style.opacity = '0';
        controlBar.style.transform = 'translateY(-50%) translateX(50px)';
        
        // Show restore button after standard delay
        setTimeout(() => {
          controlBar.style.display = 'none';
        }, 500);
      }
    });
  }
}

/**
 * Triggers premium entrance animations sequentially for key hero sections.
 */
function triggerEntranceAnimations() {
  // Add base opacity transitions and delay classes in JavaScript if not preset in CSS
  const elementsToReveal = [
    { selector: '.header', delay: 100 },
    { selector: '.trusted-badge', delay: 300 },
    { selector: '.headline-left', delay: 450 },
    { selector: '.description-text', delay: 600 },
    { selector: '.left-actions-container', delay: 750 },
    { selector: '.headline-right', delay: 600 },
    { selector: '.right-stats-container', delay: 750 },
    { selector: '.vertical-control-bar', delay: 900 },
    { selector: '.implant-container', delay: 500 },
    { selector: '.tooltip-left', delay: 1000 },
    { selector: '.tooltip-right', delay: 1100 }
  ];

  elementsToReveal.forEach(item => {
    const el = document.querySelector(item.selector);
    if (el) {
      // Set initial hidden state
      el.style.opacity = '0';
      el.style.transform = getInitialTransform(item.selector);
      el.style.transition = 'opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1)';

      // Animate in after designated delay
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translate(0) scale(1)';
        
        // Clear inline style constraints once animation completes to allow CSS rules (e.g. translateY(-50%) on control bar, hover effects) to work
        setTimeout(() => {
          el.style.transform = '';
          el.style.transition = '';
        }, 1000);
      }, item.delay);
    }
  });
}

/**
 * Computes appropriate start transformation for entrance animations.
 */
function getInitialTransform(selector) {
  if (selector.includes('left') || selector === '.trusted-badge' || selector === '.description-text') {
    return 'translateX(-30px)';
  }
  if (selector.includes('right') || selector === '.vertical-control-bar') {
    return 'translateX(30px)';
  }
  if (selector === '.header') {
    return 'translateY(-20px)';
  }
  if (selector === '.implant-container') {
    return 'scale(0.95) translateY(20px)';
  }
  return 'translateY(15px)';
}

/**
 * Handles staggered scroll-entrance animations for service cards using IntersectionObserver.
 */
function setupScrollReveal() {
  const cards = document.querySelectorAll('.service-card');
  if (!cards.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 100px 0px',
    threshold: 0.01
  };

  const observer = new IntersectionObserver((entries) => {
    let shouldAnimate = false;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        shouldAnimate = true;
      }
    });

    if (shouldAnimate) {
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('reveal-visible');
        }, index * 150);
      });
      // Stop observing once animated
      cards.forEach(card => observer.unobserve(card));
    }
  }, observerOptions);

  cards.forEach(card => observer.observe(card));
}

/**
 * Staggered scroll reveal for the Why Choose Us trust point cards.
 */
function setupWhyCardReveal() {
  const cards = document.querySelectorAll('.why-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('reveal-visible'), i * 130);
      });
      cards.forEach(card => observer.unobserve(card));
    }
  }, { root: null, rootMargin: '0px 0px 80px 0px', threshold: 0.05 });

  cards.forEach(card => observer.observe(card));
}

/**
 * Testimonial slideshow with auto-play, progress bar, dot navigation, prev/next buttons.
 */
function setupSlideshow() {
  const track = document.getElementById('slideshowTrack');
  const dots = document.querySelectorAll('.slide-dot');
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  const progressFill = document.getElementById('slideProgressFill');

  if (!track) return;

  const totalSlides = track.children.length;
  let current = 0;
  let autoTimer = null;
  const AUTO_DELAY = 5000; // 5 seconds per slide

  function goTo(index) {
    current = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${current * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));

    // Reset & restart progress bar
    resetProgress();
  }

  function resetProgress() {
    if (!progressFill) return;
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    // Trigger reflow
    void progressFill.offsetWidth;
    progressFill.style.transition = `width ${AUTO_DELAY}ms linear`;
    progressFill.style.width = '100%';
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), AUTO_DELAY);
    resetProgress();
  }

  function stopAuto() {
    clearInterval(autoTimer);
    autoTimer = null;
    if (progressFill) {
      progressFill.style.transition = 'none';
      progressFill.style.width = '0%';
    }
  }

  // Prev / Next buttons
  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // Dot clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.slide));
      startAuto();
    });
  });

  // Pause on hover
  const wrapper = track.closest('.slideshow-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAuto);
    wrapper.addEventListener('mouseleave', startAuto);
  }

  // Kick things off
  goTo(0);
  startAuto();
}

/**
 * Handles appointment form submission with a success state animation.
 */
function handleFormSubmit(event) {
  event.preventDefault();
  const btn = document.getElementById('formSubmitBtn');
  const success = document.getElementById('formSuccess');
  const form = event.target;

  if (btn) {
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';
    const txt = btn.querySelector('.btn-text');
    if (txt) txt.textContent = 'Sending…';
  }

  // Simulate async submission delay
  setTimeout(() => {
    if (btn) btn.style.display = 'none';
    if (success) {
      // Support both old and new class names
      success.classList.add('visible');
    }
    form.reset();
  }, 1200);
}

/**
 * Initialises and controls the premium vertical slideshow for the services section.
 */
function setupVerticalSlideshow() {
  const track = document.getElementById('svTrack');
  const dots = document.querySelectorAll('.sv-dot');
  const prevBtn = document.getElementById('svPrev');
  const nextBtn = document.getElementById('svNext');
  const progressFill = document.getElementById('svProgressFill');
  const viewport = document.querySelector('.sv-viewport');

  if (!track || dots.length === 0) return;

  const totalSlides = track.children.length;
  let activeIndex = 0;
  let lastWheelTime = 0;

  function goToSlide(index) {
    // Clamp slide index
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    activeIndex = index;

    // Apply Y translation only on desktop views
    if (window.innerWidth > 1024) {
      const slideHeight = track.children[0].offsetHeight || 500;
      track.style.transform = `translateY(-${activeIndex * slideHeight}px)`;
    } else {
      track.style.transform = '';
      const slide = track.children[activeIndex];
      if (slide && viewport) {
        viewport.scrollTo({
          left: slide.offsetLeft,
          behavior: 'smooth'
        });
      }
    }

    // Update dots styling
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIndex);
    });

    // Update active tab scroll centering
    updateDotsScroll();

    // Update progress bar fill width
    if (progressFill) {
      const progressPercent = ((activeIndex + 1) / totalSlides) * 100;
      progressFill.style.width = `${progressPercent}%`;
    }

    // Disable/enable navigation buttons
    if (prevBtn) prevBtn.disabled = (activeIndex === 0);
    if (nextBtn) nextBtn.disabled = (activeIndex === totalSlides - 1);
  }

  function updateDotsScroll() {
    if (window.innerWidth <= 1024) {
      const activeDot = dots[activeIndex];
      const dotsContainer = document.getElementById('svDots');
      if (activeDot && dotsContainer) {
        const containerWidth = dotsContainer.offsetWidth;
        const dotOffset = activeDot.offsetLeft;
        const dotWidth = activeDot.offsetWidth;
        dotsContainer.scrollTo({
          left: dotOffset - (containerWidth / 2) + (dotWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }

  // Set click handlers for dot navigation
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
    });
  });

  // Set click handlers for arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(activeIndex + 1);
    });
  }

  // Mobile only: update active dot on swipe scroll
  let isScrolling = false;
  viewport.addEventListener('scroll', () => {
    if (window.innerWidth <= 1024) {
      if (isScrolling) clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        const viewportCenter = viewport.scrollLeft + (viewport.offsetWidth / 2);
        let closestSlide = 0;
        let minDistance = Infinity;
        
        Array.from(track.children).forEach((slide, idx) => {
          const slideCenter = slide.offsetLeft + (slide.offsetWidth / 2);
          const distance = Math.abs(viewportCenter - slideCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestSlide = idx;
          }
        });

        if (closestSlide !== activeIndex && closestSlide >= 0 && closestSlide < totalSlides) {
          activeIndex = closestSlide;
          
          dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeIndex);
          });
          
          updateDotsScroll();

          if (progressFill) {
            const progressPercent = ((activeIndex + 1) / totalSlides) * 100;
            progressFill.style.width = `${progressPercent}%`;
          }

          if (prevBtn) prevBtn.disabled = (activeIndex === 0);
          if (nextBtn) nextBtn.disabled = (activeIndex === totalSlides - 1);
        }
      }, 100);
    }
  });

  // Desktop only: mouse wheel trapping scroll inside the viewport
  if (viewport) {
    viewport.addEventListener('wheel', (e) => {
      // Ignore if screen size falls back to standard block layout
      if (window.innerWidth <= 1024) return;

      const now = Date.now();
      // Debounce delta timing to prevent scrolling multiple slides rapidly
      if (now - lastWheelTime < 800) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 15) {
        // Scroll down: show next slide
        if (activeIndex < totalSlides - 1) {
          e.preventDefault();
          goToSlide(activeIndex + 1);
          lastWheelTime = now;
        }
      } else if (e.deltaY < -15) {
        // Scroll up: show previous slide
        if (activeIndex > 0) {
          e.preventDefault();
          goToSlide(activeIndex - 1);
          lastWheelTime = now;
        }
      }
    }, { passive: false });
  }

  // Handle window resizing to adjust translate offset height correctly
  window.addEventListener('resize', () => {
    // If desktop view is active, update offset
    if (window.innerWidth > 1024) {
      goToSlide(activeIndex);
    } else {
      // Clear translation style in mobile view where vertical flow applies
      track.style.transform = '';
    }
  });

  // Initialize first slide states
  goToSlide(0);
}

/**
 * Scroll Spy to highlight the active navigation section as the user scrolls.
 */
function setupScrollSpy() {
  const sections = document.querySelectorAll('main.hero-section, section.sv-section, section.why-section, section.appt-section');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY || window.pageYOffset;
    const headerHeight = document.querySelector('.header').offsetHeight || 80;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = sectionId;
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}



