/**
 * VANGUARD LEGAL - Core Website Interactivity & WhatsApp Integration
 * Phone Target: 8337080597 (+91 8337080597)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Dynamic Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Sticky Navbar Class on Scroll
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 4. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('show');
      mobileToggle.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('show');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 5. Scrollspy for Active Desktop Nav Link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const updateActiveNavLink = () => {
    const scrollPos = window.scrollY + 150;
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
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // 6. Animated Counter for Hero Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  const countUp = (el, target) => {
    let current = 0;
    const duration = 1800; // 1.8 seconds
    const increment = target / (duration / 25);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.childNodes[0].nodeValue = Math.floor(current).toLocaleString();
    }, 25);
  };

  const statsObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
              countUp(stat, target);
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const heroStatsSection = document.querySelector('.hero-stats');
  if (heroStatsSection) {
    statsObserver.observe(heroStatsSection);
  }

  // 7. FAQ Accordion Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('active');
        const btn = other.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 8. Scroll Reveal Animations
  const revealElements = document.querySelectorAll(
    '.practice-card, .result-card, .attorney-card, .testimonial-card, .value-item, .luxury-shield-card'
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // 9. Consultation Form Validation & WhatsApp Forwarding
  const form = document.getElementById('consultationForm');
  const modal = document.getElementById('submissionModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalSummaryContent = document.getElementById('modalSummaryContent');
  const modalDirectWaBtn = document.getElementById('modalDirectWaBtn');

  // WhatsApp Target Number: 8337080597 with India country code +91
  const WHATSAPP_PHONE = '918337080597';

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      // Reset errors
      let hasError = false;
      const clearError = (inputEl, errorId) => {
        inputEl.closest('.form-group')?.classList.remove('has-error');
        const errEl = document.getElementById(errorId);
        if (errEl) errEl.style.display = 'none';
      };

      const setError = (inputEl, errorId) => {
        inputEl.closest('.form-group')?.classList.add('has-error');
        const errEl = document.getElementById(errorId);
        if (errEl) errEl.style.display = 'block';
        hasError = true;
      };

      // Inputs
      const fullName = document.getElementById('fullName');
      const phoneNumber = document.getElementById('phoneNumber');
      const emailAddress = document.getElementById('emailAddress');
      const practiceArea = document.getElementById('practiceArea');
      const urgencyLevel = document.getElementById('urgencyLevel');
      const consultationMode = document.getElementById('consultationMode');
      const caseSummary = document.getElementById('caseSummary');
      const consentCheck = document.getElementById('consentCheck');

      clearError(fullName, 'fullNameError');
      clearError(phoneNumber, 'phoneNumberError');
      clearError(practiceArea, 'practiceAreaError');
      clearError(caseSummary, 'caseSummaryError');

      // Validations
      if (!fullName.value.trim()) {
        setError(fullName, 'fullNameError');
      }

      const phoneVal = phoneNumber.value.trim().replace(/[^0-9+]/g, '');
      if (!phoneVal || phoneVal.length < 8) {
        setError(phoneNumber, 'phoneNumberError');
      }

      if (!practiceArea.value) {
        setError(practiceArea, 'practiceAreaError');
      }

      if (!caseSummary.value.trim()) {
        setError(caseSummary, 'caseSummaryError');
      }

      if (!consentCheck.checked) {
        alert('Please accept the confidentiality disclaimer to continue.');
        return;
      }

      if (hasError) {
        // Focus first invalid element
        const firstInvalid = form.querySelector('.has-error input, .has-error select, .has-error textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Format WhatsApp Message
      const name = fullName.value.trim();
      const phone = phoneNumber.value.trim();
      const email = emailAddress.value.trim() || 'Not Provided';
      const service = practiceArea.value;
      const urgency = urgencyLevel.value;
      const mode = consultationMode.value;
      const details = caseSummary.value.trim();

      const waMessage = 
`⚖️ *LEGAL CONSULTATION INTAKE* ⚖️
━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${name}
📞 *Contact Number:* ${phone}
📧 *Email:* ${email}
🏛️ *Practice Area:* ${service}
🚨 *Urgency Level:* ${urgency}
🗣️ *Consultation Mode:* ${mode}
━━━━━━━━━━━━━━━━━━
📝 *Matter Summary:*
"${details}"
━━━━━━━━━━━━━━━━━━
_Submitted via Vanguard Legal Portal for immediate advocate review._`;

      const encodedMessage = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

      // Populate Modal details
      if (modalSummaryContent) {
        modalSummaryContent.innerHTML = `
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Domain:</strong> ${escapeHtml(service)}</p>
          <p><strong>Urgency:</strong> ${escapeHtml(urgency)}</p>
          <p><strong>Preferred:</strong> ${escapeHtml(mode)}</p>
          <p><strong>Brief:</strong> ${escapeHtml(details.substring(0, 140))}${details.length > 140 ? '...' : ''}</p>
        `;
      }

      if (modalDirectWaBtn) {
        modalDirectWaBtn.href = waUrl;
      }

      // Show Modal
      if (modal) {
        modal.classList.add('active');
      }

      // Automatically open WhatsApp in new tab / application
      const openedWindow = window.open(waUrl, '_blank');
      if (!openedWindow) {
        // Pop-up was blocked: Fallback to direct modal action or location
        console.warn('Popup blocked. Modal button provides direct redirect.');
      }
    });
  }

  // Close modal
  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});

// Helper for selecting practice area from cards
function prefillPractice(serviceName) {
  const practiceSelect = document.getElementById('practiceArea');
  const consultationSection = document.getElementById('consultation');

  if (practiceSelect && consultationSection) {
    consultationSection.scrollIntoView({ behavior: 'smooth' });

    // Find and select matching option
    for (let i = 0; i < practiceSelect.options.length; i++) {
      if (practiceSelect.options[i].value === serviceName) {
        practiceSelect.selectedIndex = i;
        break;
      }
    }

    setTimeout(() => {
      practiceSelect.focus();
    }, 600);
  }
}

// Utility to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

