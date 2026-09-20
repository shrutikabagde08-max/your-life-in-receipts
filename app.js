/**
 * "Your Life, In Receipts" — Stage 2 Frontend Logic (Vanilla JS)
 * Zero frameworks, zero external dependencies, zero backend.
 * Implements:
 * 1. Hero stats & persona binding
 * 2. Visual Journey: 2013-2024 horizontal timeline, 5 chapter bands, hours bars & spending
 * 3. 5 Life Chapters stepper & navigation (Data vs Story separation)
 * 4. Pattern Discovery: 24-hour listening clock (IST) with late-night vs daytime split
 * 5. Cross-Dataset Relationships: 5 same-day connected moments (receipt + music side-by-side)
 * 6. Receipts Explorer with related moments jump links in modal
 * 7. Full keyboard accessibility & focus trap management
 */

(function() {
  'use strict';

  // Ensure dataset is loaded
  if (!window.LIFE_DATA) {
    console.error('Error: window.LIFE_DATA not found. Make sure data.js is loaded first.');
    return;
  }

  const { profile, chapters, receipts, journeyTimeline, clockData, connectedMoments } = window.LIFE_DATA;

  // State
  let currentChapterIndex = 0;
  let activeEra = 'All';
  let activeCategory = 'All';
  let searchQuery = '';
  let lastFocusedElement = null;

  // DOM Elements Cache
  const DOM = {
    // Hero
    statStreams: document.getElementById('stat-streams'),
    statHours: document.getElementById('stat-hours'),
    statTxns: document.getElementById('stat-txns'),
    statTopArtist: document.getElementById('stat-top-artist'),
    profileTagline: document.getElementById('profile-tagline'),

    // Journey Timeline
    timelineBandsTrack: document.getElementById('timeline-bands-track'),
    timelineBarsGrid: document.getElementById('timeline-bars-grid'),

    // Chapters
    chapterStepper: document.getElementById('chapter-stepper'),
    chBadge: document.getElementById('ch-badge'),
    chTitle: document.getElementById('ch-title'),
    chDates: document.getElementById('ch-dates'),
    chDataList: document.getElementById('ch-data-list'),
    chStoryText: document.getElementById('ch-story-text'),
    prevChapterBtn: document.getElementById('prev-chapter-btn'),
    nextChapterBtn: document.getElementById('next-chapter-btn'),
    chStepCounter: document.getElementById('ch-step-counter'),

    // Clock
    clockSvgWrapper: document.getElementById('clock-svg-wrapper'),

    // Connections
    connectionsList: document.getElementById('connections-list'),

    // Receipts Explorer
    receiptSearch: document.getElementById('receipt-search'),
    receiptsContainer: document.getElementById('receipts-container'),
    resultsCount: document.getElementById('results-count'),
    eraChips: document.querySelectorAll('[data-era]'),
    categoryChips: document.querySelectorAll('[data-cat]'),

    // Modal
    receiptModal: document.getElementById('receipt-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalDate: document.getElementById('modal-date'),
    modalMerchant: document.getElementById('modal-merchant'),
    modalDesc: document.getElementById('modal-desc'),
    modalAmount: document.getElementById('modal-amount'),
    modalMode: document.getElementById('modal-mode'),
    modalTracks: document.getElementById('modal-tracks'),
    modalHours: document.getElementById('modal-hours'),
    modalTopArtist: document.getElementById('modal-top-artist'),
    modalMood: document.getElementById('modal-mood'),
    modalMusicNarrative: document.getElementById('modal-music-narrative'),
    modalRelatedPills: document.getElementById('modal-related-pills')
  };

  /* ==========================================================================
     1. Initialize Hero Profile & Stats
     ========================================================================== */
  function initHero() {
    if (DOM.statStreams) DOM.statStreams.textContent = profile.stats.totalStreams.toLocaleString('en-IN');
    if (DOM.statHours) DOM.statHours.textContent = `${profile.stats.totalHours.toLocaleString('en-IN')} hrs`;
    if (DOM.statTxns) DOM.statTxns.textContent = profile.stats.totalTxnsRecorded.toLocaleString('en-IN');
    if (DOM.statTopArtist) DOM.statTopArtist.textContent = profile.stats.topArtist;
    if (DOM.profileTagline) DOM.profileTagline.textContent = `${profile.era} • ${profile.tagline}`;
  }

  /* ==========================================================================
     2. Journey Visual (2013-2024 Horizontal Timeline)
     ========================================================================== */
  function initJourneyTimeline() {
    if (!DOM.timelineBarsGrid || !journeyTimeline) return;
    DOM.timelineBarsGrid.innerHTML = '';

    const maxHours = 900; // 2020 peak is 881.3 hrs

    journeyTimeline.forEach(item => {
      const col = document.createElement('div');
      col.className = 'timeline-year-col';

      const barPercent = Math.max(3, Math.round((item.hours / maxHours) * 100));

      col.innerHTML = `
        <div class="bar-track" aria-hidden="true">
          <div class="bar-fill" style="height: ${barPercent}%;" title="${item.year}: ${item.hours} hrs streamed"></div>
        </div>
        <div class="bar-hours-label">${item.hours}h</div>
        <button class="year-selector-btn" aria-label="Year ${item.year}, ${item.hours} hours streamed. ${item.chapterName}. Click to open chapter.">
          ${item.year}
        </button>
        <div class="year-spend-label ${item.isDataGap ? 'spend-gap' : ''}">
          ${escapeHTML(item.spend)}
        </div>
      `;

      // Clicking year button selects chapter
      const btn = col.querySelector('.year-selector-btn');
      btn.addEventListener('click', () => {
        if (item.chapterIndex !== null && typeof item.chapterIndex === 'number') {
          setChapter(item.chapterIndex);
          const chSection = document.getElementById('chapters-section');
          if (chSection) chSection.scrollIntoView({ behavior: 'smooth' });
        }
      });

      DOM.timelineBarsGrid.appendChild(col);
    });

    // Chapter band buttons listener
    if (DOM.timelineBandsTrack) {
      const bandBtns = DOM.timelineBandsTrack.querySelectorAll('.band-btn');
      bandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const chIdx = btn.getAttribute('data-ch');
          if (chIdx !== 'null' && chIdx !== null) {
            setChapter(parseInt(chIdx, 10));
            const chSection = document.getElementById('chapters-section');
            if (chSection) chSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }
  }

  /* ==========================================================================
     3. Initialize 5 Life Chapters Stepper & Controls
     ========================================================================== */
  function initChapters() {
    if (!DOM.chapterStepper) return;
    DOM.chapterStepper.innerHTML = '';

    chapters.forEach((chapter, index) => {
      const stepBtn = document.createElement('button');
      stepBtn.className = `step-btn ${index === 0 ? 'active' : ''}`;
      stepBtn.setAttribute('role', 'tab');
      stepBtn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      stepBtn.setAttribute('id', `tab-ch-${index}`);
      stepBtn.setAttribute('aria-controls', 'chapter-content-box');
      stepBtn.innerHTML = `
        <span class="step-number">CHAPTER ${chapter.number}</span>
        <span class="step-title">${chapter.title}</span>
        <span class="step-dates">${chapter.dateRange}</span>
      `;

      stepBtn.addEventListener('click', () => {
        setChapter(index);
      });

      DOM.chapterStepper.appendChild(stepBtn);
    });

    // Prev / Next Button listeners
    if (DOM.prevChapterBtn) {
      DOM.prevChapterBtn.addEventListener('click', () => {
        if (currentChapterIndex > 0) setChapter(currentChapterIndex - 1);
      });
    }

    if (DOM.nextChapterBtn) {
      DOM.nextChapterBtn.addEventListener('click', () => {
        if (currentChapterIndex < chapters.length - 1) setChapter(currentChapterIndex + 1);
      });
    }

    // Keyboard Arrow Navigation for Chapters
    document.addEventListener('keydown', (e) => {
      if (DOM.receiptModal && DOM.receiptModal.classList.contains('active')) return;
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;

      if (e.key === 'ArrowRight' && currentChapterIndex < chapters.length - 1) {
        setChapter(currentChapterIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentChapterIndex > 0) {
        setChapter(currentChapterIndex - 1);
      }
    });

    renderChapter(0);
  }

  function setChapter(index) {
    currentChapterIndex = index;
    renderChapter(index);

    // Update stepper tabs
    const buttons = DOM.chapterStepper.querySelectorAll('.step-btn');
    buttons.forEach((btn, i) => {
      const isActive = i === index;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    // Update active state on timeline chapter bands
    if (DOM.timelineBandsTrack) {
      const bandBtns = DOM.timelineBandsTrack.querySelectorAll('.band-btn');
      bandBtns.forEach(b => {
        const chAttr = b.getAttribute('data-ch');
        b.classList.toggle('active', chAttr !== null && parseInt(chAttr, 10) === index);
      });
    }
  }

  function renderChapter(index) {
    const ch = chapters[index];
    if (!ch) return;

    if (DOM.chBadge) DOM.chBadge.textContent = `CH ${ch.number}`;
    if (DOM.chTitle) DOM.chTitle.textContent = ch.title;
    if (DOM.chDates) DOM.chDates.textContent = ch.dateRange;
    if (DOM.chStepCounter) DOM.chStepCounter.textContent = `Chapter ${index + 1} of ${chapters.length}`;

    // Render "What the Data Says" (Real Numbers Only)
    if (DOM.chDataList) {
      DOM.chDataList.innerHTML = '';
      ch.whatDataSays.forEach(fact => {
        const li = document.createElement('li');
        if (fact.toLowerCase().includes('data gap') || fact.includes('available nahi hai')) {
          li.className = 'data-gap-alert';
          li.innerHTML = `<strong>⚠️ Notice:</strong> ${escapeHTML(fact)}`;
        } else {
          li.textContent = fact;
        }
        DOM.chDataList.appendChild(li);
      });
    }

    // Render "The Story" (Narrative Interpretation)
    if (DOM.chStoryText) {
      DOM.chStoryText.textContent = `"${ch.theStory}"`;
    }

    // Update button states
    if (DOM.prevChapterBtn) DOM.prevChapterBtn.disabled = index === 0;
    if (DOM.nextChapterBtn) DOM.nextChapterBtn.disabled = index === chapters.length - 1;
  }

  /* ==========================================================================
     4. Pattern Discovery: 24-Hour Listening Clock (SVG Dial)
     ========================================================================== */
  function initListeningClock() {
    if (!DOM.clockSvgWrapper || !clockData) return;

    const size = 320;
    const center = size / 2; // 160
    const innerRadius = 50;
    const maxBarLength = 80;
    const maxHourSpend = 420; // 406.5 hrs max at 23:00

    // Build SVG elements
    let raysSVG = '';
    let labelsSVG = '';

    clockData.hours.forEach(h => {
      // 24 hours: 360 deg / 24 = 15 deg per hour.
      // Hour 0 is top (-90 degrees).
      const angleDeg = (h.hour * 15) - 90;
      const angleRad = (angleDeg * Math.PI) / 180;

      const barLen = Math.max(8, (h.hoursPlayed / maxHourSpend) * maxBarLength);
      const x1 = center + innerRadius * Math.cos(angleRad);
      const y1 = center + innerRadius * Math.sin(angleRad);
      const x2 = center + (innerRadius + barLen) * Math.cos(angleRad);
      const y2 = center + (innerRadius + barLen) * Math.sin(angleRad);

      const strokeColor = h.isLateNight ? '#B3261E' : '#1C1F26';
      const strokeWidth = h.isLateNight ? 4.5 : 3.5;

      raysSVG += `
        <line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" 
              x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" 
              stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round">
          <title>${h.label} (${h.hour.toString().padStart(2, '0')}:00 IST): ${h.hoursPlayed} hrs (${h.tracks} tracks) ${h.isLateNight ? '[LATE NIGHT]' : '[DAYTIME]'}</title>
        </line>
      `;

      // Labels every 3 hours (12A, 3A, 6A, 9A, 12P, 3P, 6P, 9P)
      if (h.hour % 3 === 0) {
        const labelRadius = innerRadius + maxBarLength + 16;
        const lx = center + labelRadius * Math.cos(angleRad);
        const ly = center + labelRadius * Math.sin(angleRad) + 4; // slight vertical centering
        labelsSVG += `
          <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" 
                text-anchor="middle" font-family="'Courier Prime', monospace" font-size="10" font-weight="700" fill="#5B616B">
            ${h.label}
          </text>
        `;
      }
    });

    const svgMarkup = `
      <svg viewBox="0 0 ${size} ${size}" class="clock-dial-svg" role="img" aria-label="24-Hour listening clock radial chart showing streaming distribution in Indian Standard Time">
        <!-- Background guide circles -->
        <circle cx="${center}" cy="${center}" r="${innerRadius}" fill="#FAFAF8" stroke="#D8DBD4" stroke-width="1" />
        <circle cx="${center}" cy="${center}" r="${innerRadius + maxBarLength}" fill="none" stroke="#D8DBD4" stroke-width="1" stroke-dasharray="2 3" />
        
        <!-- Late night highlight arc (from 23:00 to 05:00) -->
        <circle cx="${center}" cy="${center}" r="${innerRadius + maxBarLength + 4}" fill="none" stroke="#B3261E" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6" />

        <!-- 24 Hour rays -->
        ${raysSVG}

        <!-- 3-Hour text markers -->
        ${labelsSVG}

        <!-- Center Hub Text -->
        <circle cx="${center}" cy="${center}" r="${innerRadius - 4}" fill="#FAFAF8" />
        <text x="${center}" y="${center - 6}" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="9" font-weight="700" fill="#B3261E">24H DIAL (IST)</text>
        <text x="${center}" y="${center + 10}" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="12" font-weight="700" fill="#1C1F26">5,341 HRS</text>
      </svg>
    `;

    DOM.clockSvgWrapper.innerHTML = svgMarkup;
  }

  /* ==========================================================================
     5. Cross-Dataset Relationships (5 Same-Day Connected Moments)
     ========================================================================== */
  function initConnectedMoments() {
    if (!DOM.connectionsList || !connectedMoments) return;
    DOM.connectionsList.innerHTML = '';

    connectedMoments.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'connection-card';
      card.setAttribute('aria-label', `Connected moment on ${item.date}: ${item.title}`);

      card.innerHTML = `
        <!-- Left: Financial Receipt -->
        <div class="conn-col conn-receipt-side">
          <div class="conn-side-tag">[FINANCIAL RECEIPT]</div>
          <div class="conn-date">${item.date}</div>
          <div class="conn-merchant">${escapeHTML(item.receipt.merchant)}</div>
          <div class="conn-amount">${item.receipt.amount}</div>
          <div class="conn-meta">
            <span>${escapeHTML(item.receipt.category)}</span>
            <span>•</span>
            <span>${escapeHTML(item.receipt.mode)}</span>
          </div>
          <p class="conn-desc">${escapeHTML(item.receipt.description)}</p>
        </div>

        <!-- Center: Synchronicity Bridge -->
        <div class="conn-center-bridge" aria-hidden="true">
          <span class="sync-tag">SAME-DAY SYNC</span>
          <div class="sync-line"></div>
        </div>

        <!-- Right: Connected Music Stream -->
        <div class="conn-col conn-music-side">
          <div class="conn-side-tag">[SPOTIFY STREAMING]</div>
          <div class="conn-date">${item.date}</div>
          <div class="conn-music-title">${escapeHTML(item.music.highlightTrack)}</div>
          <div class="conn-artist">${escapeHTML(item.music.topArtist)}</div>
          <div class="conn-stats-row">
            <span>${item.music.listeningHours}</span>
            <span>•</span>
            <span>${item.music.tracksCount} streams</span>
            <span class="conn-mood-stamp">${escapeHTML(item.music.mood)}</span>
          </div>
          <p class="conn-narrative">${escapeHTML(item.music.narrative)}</p>
        </div>
      `;

      DOM.connectionsList.appendChild(card);
    });
  }

  /* ==========================================================================
     6. Receipts Explorer (Search, Filter, Thermal Card Grid)
     ========================================================================== */
  function initReceiptsExplorer() {
    // Search listener
    if (DOM.receiptSearch) {
      DOM.receiptSearch.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderReceipts();
      });
    }

    // Era Filter Chips
    DOM.eraChips.forEach(chip => {
      chip.addEventListener('click', () => {
        DOM.eraChips.forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-checked', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-checked', 'true');
        activeEra = chip.getAttribute('data-era');
        renderReceipts();
      });
    });

    // Category Filter Chips
    DOM.categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        DOM.categoryChips.forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-checked', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-checked', 'true');
        activeCategory = chip.getAttribute('data-cat');
        renderReceipts();
      });
    });

    renderReceipts();
  }

  function renderReceipts() {
    if (!DOM.receiptsContainer) return;

    // Filter logic
    const filtered = receipts.filter(rcpt => {
      if (activeEra !== 'All' && rcpt.era !== activeEra) return false;
      if (activeCategory !== 'All' && rcpt.category !== activeCategory) return false;

      if (searchQuery) {
        const matchMerchant = rcpt.merchant.toLowerCase().includes(searchQuery);
        const matchDesc = rcpt.description.toLowerCase().includes(searchQuery);
        const matchCat = rcpt.category.toLowerCase().includes(searchQuery);
        const matchMode = rcpt.mode.toLowerCase().includes(searchQuery);
        const matchDate = rcpt.date.includes(searchQuery);
        const matchTrack = rcpt.connectedMusic.highlightTrack.toLowerCase().includes(searchQuery);
        const matchArtist = rcpt.connectedMusic.topArtist.toLowerCase().includes(searchQuery);

        if (!matchMerchant && !matchDesc && !matchCat && !matchMode && !matchDate && !matchTrack && !matchArtist) {
          return false;
        }
      }

      return true;
    });

    // Update Results count
    if (DOM.resultsCount) {
      DOM.resultsCount.textContent = `Showing ${filtered.length} of ${receipts.length} receipts`;
    }

    // Empty state check
    if (filtered.length === 0) {
      DOM.receiptsContainer.innerHTML = `
        <div class="empty-state" role="alert">
          <p style="font-size: 1.15rem; margin-bottom: 0.5rem; font-weight: 700;">[NO RECEIPTS FOUND]</p>
          <p>Try clearing your search query or selecting "All Eras" / "All Categories".</p>
        </div>
      `;
      return;
    }

    // Render cards
    DOM.receiptsContainer.innerHTML = '';
    filtered.forEach(rcpt => {
      const card = document.createElement('article');
      card.className = 'receipt-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View receipt from ${rcpt.merchant} on ${rcpt.date}, amount ₹${rcpt.amount.toLocaleString('en-IN')}`);

      card.innerHTML = `
        <div>
          <div class="receipt-header-row">
            <h4 class="receipt-merchant">${escapeHTML(rcpt.merchant)}</h4>
            <span class="receipt-era-tag">${escapeHTML(rcpt.category)}</span>
          </div>
          
          <div class="receipt-body">
            <p class="receipt-desc">${escapeHTML(rcpt.description)}</p>
            <div class="receipt-row">
              <span>Date:</span>
              <span>${rcpt.date}</span>
            </div>
            <div class="receipt-row">
              <span>Mode:</span>
              <span>${escapeHTML(rcpt.mode)}</span>
            </div>
          </div>
        </div>

        <div>
          <div class="receipt-amount">
            <span>TOTAL</span>
            <span>₹${rcpt.amount.toLocaleString('en-IN')}</span>
          </div>

          <div class="receipt-footer-action">
            <span class="receipt-audio-hint">
              ${escapeHTML(rcpt.connectedMusic.topArtist)}
            </span>
            <button class="receipt-inspect-btn" tabindex="-1" aria-hidden="true">
              Inspect Moment →
            </button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openModal(rcpt, card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(rcpt, card);
        }
      });

      DOM.receiptsContainer.appendChild(card);
    });
  }

  /* ==========================================================================
     7. Accessible Receipt Detail Modal & Related Moments Jumps
     ========================================================================== */
  function initModal() {
    if (!DOM.receiptModal) return;

    if (DOM.modalCloseBtn) {
      DOM.modalCloseBtn.addEventListener('click', closeModal);
    }

    DOM.receiptModal.addEventListener('click', (e) => {
      if (e.target === DOM.receiptModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!DOM.receiptModal.classList.contains('active')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = DOM.receiptModal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  function openModal(receipt, triggerElement) {
    if (triggerElement) lastFocusedElement = triggerElement;

    if (DOM.modalDate) DOM.modalDate.textContent = `${receipt.date} • ${receipt.era}`;
    if (DOM.modalMerchant) DOM.modalMerchant.textContent = receipt.merchant;
    if (DOM.modalDesc) DOM.modalDesc.textContent = receipt.description;
    if (DOM.modalAmount) DOM.modalAmount.textContent = `₹${receipt.amount.toLocaleString('en-IN')}`;
    if (DOM.modalMode) DOM.modalMode.textContent = receipt.mode;

    // Spotify connected listening data
    const music = receipt.connectedMusic;
    if (DOM.modalTracks) DOM.modalTracks.textContent = `${music.tracksCount} tracks`;
    if (DOM.modalHours) DOM.modalHours.textContent = music.listeningHours;
    if (DOM.modalTopArtist) DOM.modalTopArtist.textContent = music.topArtist;
    if (DOM.modalMood) DOM.modalMood.textContent = music.mood;
    if (DOM.modalMusicNarrative) {
      DOM.modalMusicNarrative.innerHTML = `
        <strong>${escapeHTML(music.highlightTrack)}:</strong> ${escapeHTML(music.narrative)}
      `;
    }

    // Populate Related Receipts in same category or period
    renderRelatedReceipts(receipt);

    DOM.receiptModal.classList.add('active');
    DOM.receiptModal.setAttribute('aria-hidden', 'false');

    if (DOM.modalCloseBtn) {
      setTimeout(() => DOM.modalCloseBtn.focus(), 50);
    }
    document.body.style.overflow = 'hidden';
  }

  function renderRelatedReceipts(currentReceipt) {
    if (!DOM.modalRelatedPills) return;
    DOM.modalRelatedPills.innerHTML = '';

    // Find other receipts from same category or era
    const related = receipts.filter(r => r.id !== currentReceipt.id && (r.category === currentReceipt.category || r.era === currentReceipt.era)).slice(0, 4);

    if (related.length === 0) {
      DOM.modalRelatedPills.innerHTML = '<span style="font-size: 0.8125rem; color: var(--ink-muted);">No other receipts archived in this category.</span>';
      return;
    }

    related.forEach(rel => {
      const chip = document.createElement('button');
      chip.className = 'related-receipt-chip';
      chip.setAttribute('aria-label', `Jump to related receipt from ${rel.merchant} on ${rel.date}`);
      chip.innerHTML = `<strong>${rel.date}</strong>: ${escapeHTML(rel.merchant)} (₹${rel.amount.toLocaleString('en-IN')}) →`;

      chip.addEventListener('click', () => {
        // Switch modal to this related receipt
        openModal(rel, lastFocusedElement);
      });

      DOM.modalRelatedPills.appendChild(chip);
    });
  }

  function closeModal() {
    if (!DOM.receiptModal) return;
    DOM.receiptModal.classList.remove('active');
    DOM.receiptModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  // Utility to prevent XSS
  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     Bootstrap Application
     ========================================================================== */
  function init() {
    initHero();
    initJourneyTimeline();
    initChapters();
    initListeningClock();
    initConnectedMoments();
    initReceiptsExplorer();
    initModal();
    console.log('Your Life, In Receipts — Stage 2 initialized successfully.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
