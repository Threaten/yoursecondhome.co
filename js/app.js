/**
 * yoursecondhome.co - Studio Interactions
 * Dependency-free, lightweight, purposeful
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initDiagnosticTool();
  initFaqAccordion();
  initContactDialog();
  initFormHandling();
});

/* ==========================================================================
   1. Theme Management (Editorial Dark & Warm Paper Light)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('ysh_theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(toggleBtn, savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('ysh_theme', nextTheme);
    updateThemeIcon(toggleBtn, nextTheme);
  });
}

function updateThemeIcon(btn, theme) {
  if (theme === 'light') {
    btn.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    btn.setAttribute('aria-label', 'Switch to dark theme');
  } else {
    btn.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    btn.setAttribute('aria-label', 'Switch to light theme');
  }
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isShown = navMenu.style.display === 'flex';
    if (isShown) {
      navMenu.style.display = '';
    } else {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '70px';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = 'var(--bg-surface)';
      navMenu.style.padding = '1.5rem';
      navMenu.style.borderBottom = '1px solid var(--border-medium)';
      navMenu.style.boxShadow = 'var(--shadow-lg)';
    }
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 720) {
        navMenu.style.display = '';
      }
    });
  });
}

/* ==========================================================================
   3. Interactive Bottleneck Diagnostic & Estimator
   ========================================================================== */
function initDiagnosticTool() {
  const scenarioItems = document.querySelectorAll('#diagnostic-scenarios .scenario-item');
  const timeEl = document.getElementById('diag-time');
  const titleEl = document.getElementById('diag-title');
  const subEl = document.getElementById('diag-subtitle');
  const delivList = document.getElementById('diag-deliverables');
  const diagCtaBtn = document.getElementById('diag-cta-btn');

  if (!scenarioItems.length) return;

  const solutionsData = {
    ingestion: {
      time: 'Typical Turnaround: 2 — 3 Weeks',
      title: 'Automated Document Ingestion & Accounting Sync',
      subtitle: 'Replaces manual data entry with reliable automated extraction',
      deliverables: [
        {
          heading: 'Smart Ingestion Pipeline',
          detail: 'Incoming invoices or customer PDFs are automatically read and validated via API.'
        },
        {
          heading: 'Direct Accounting Link',
          detail: 'Verified line items sync straight into QuickBooks or Xero without typos or delays.'
        },
        {
          heading: 'Exception Notification Hub',
          detail: 'Your team only reviews items flagged as incomplete, saving 15+ hours weekly.'
        }
      ]
    },
    portal: {
      time: 'Typical Turnaround: 4 — 5 Weeks',
      title: 'Customer Self-Service Hub & Status Portal',
      subtitle: 'Eliminates repetitive "where is my order/quote?" emails and phone calls',
      deliverables: [
        {
          heading: 'Client Login & Live Status',
          detail: 'Clients can see the exact progress of their project or delivery 24/7 on their phone.'
        },
        {
          heading: 'Instant Proposal Sign-off',
          detail: 'Clients click to approve quotes and pay deposits directly via Stripe or bank transfer.'
        },
        {
          heading: 'Secure Document Repository',
          detail: 'All specs, drawings, and invoices organized in one place with zero email back-and-forth.'
        }
      ]
    },
    sync: {
      time: 'Typical Turnaround: 3 — 4 Weeks',
      title: 'Central Operations Hub & Cross-Tool Sync',
      subtitle: 'Connects your disparate tools into a single source of truth',
      deliverables: [
        {
          heading: 'Single Operational Database',
          detail: 'A clean PostgreSQL backend unifying inventory counts, job schedules, and client contacts.'
        },
        {
          heading: 'Real-time Two-Way Sync',
          detail: 'Updating a job in one place immediately updates billing and field calendars.'
        },
        {
          heading: 'Executive Morning Dashboard',
          detail: 'A simple, single-page summary showing daily revenue and bottlenecks at a glance.'
        }
      ]
    },
    mobile: {
      time: 'Typical Turnaround: 3 — 5 Weeks',
      title: 'Offline-Ready Mobile Web App for Field Staff',
      subtitle: 'Retires paper clipboards, lost slips, and delayed evening paperwork',
      deliverables: [
        {
          heading: 'Mobile Job Completion App',
          detail: 'Works smoothly on iOS & Android phones, even in spotty network or basement areas.'
        },
        {
          heading: 'Photo & Digital Signature Capture',
          detail: 'Staff snaps photos of completed jobs and customer signs directly on screen.'
        },
        {
          heading: 'Instant Invoicing Trigger',
          detail: 'The second a job is marked completed on-site, the invoice is generated and queued.'
        }
      ]
    }
  };

  scenarioItems.forEach(item => {
    item.addEventListener('click', () => {
      // Unselect others
      scenarioItems.forEach(i => {
        i.classList.remove('selected');
        const box = i.querySelector('.checkbox');
        if (box) box.textContent = '';
      });

      // Select clicked
      item.classList.add('selected');
      const box = item.querySelector('.checkbox');
      if (box) box.textContent = '✓';

      const key = item.dataset.solution || 'ingestion';
      const data = solutionsData[key];

      if (data) {
        timeEl.textContent = data.time;
        titleEl.textContent = data.title;
        subEl.textContent = data.subtitle;

        delivList.innerHTML = data.deliverables.map(d => `
          <li>
            <strong>${d.heading}</strong>
            ${d.detail}
          </li>
        `).join('');
      }
    });
  });

  if (diagCtaBtn) {
    diagCtaBtn.addEventListener('click', () => {
      const activeItem = document.querySelector('#diagnostic-scenarios .scenario-item.selected');
      const context = activeItem ? activeItem.querySelector('span').textContent.trim() : 'Workflow Automation';
      openContactDialog(`Selected Bottleneck: ${titleEl.textContent} ("${context}")`);
    });
  }
}

/* ==========================================================================
   4. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqRows = document.querySelectorAll('.faq-row');
  faqRows.forEach(row => {
    const trigger = row.querySelector('.faq-trigger');
    const body = row.querySelector('.faq-body');

    trigger.addEventListener('click', () => {
      const isOpen = row.classList.contains('open');

      // Close all other rows
      faqRows.forEach(other => {
        if (other !== row) {
          other.classList.remove('open');
          const otherBody = other.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (isOpen) {
        row.classList.remove('open');
        body.style.maxHeight = null;
      } else {
        row.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   5. Contact / Booking Dialog (<dialog>)
   ========================================================================== */
let contactDialog = null;

function initContactDialog() {
  contactDialog = document.getElementById('contact-dialog');
  if (!contactDialog) return;

  const triggers = document.querySelectorAll('[data-dialog-trigger]');
  const closeBtn = contactDialog.querySelector('.dialog-close');

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = btn.dataset.topic || '';
      openContactDialog(topic);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => contactDialog.close());
  }

  // Dismiss on backdrop click
  contactDialog.addEventListener('click', (e) => {
    const rect = contactDialog.getBoundingClientRect();
    const inDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
      && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!inDialog) {
      contactDialog.close();
    }
  });
}

function openContactDialog(prefillContext = '') {
  if (!contactDialog) return;
  const noteField = document.getElementById('note');
  if (noteField && prefillContext) {
    noteField.value = `[Regarding: ${prefillContext}]\n\n`;
  }
  contactDialog.showModal();
}

/* ==========================================================================
   6. Form Submissions
   ========================================================================== */
function initFormHandling() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('dialog-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Sending note...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Note Sent ✓';
        if (statusEl) {
          statusEl.style.display = 'block';
        }
        form.reset();

        setTimeout(() => {
          if (contactDialog) contactDialog.close();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          if (statusEl) statusEl.style.display = 'none';
        }, 3000);
      }, 700);
    });
  }
}
