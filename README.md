# Your Life, In Receipts

> An interactive digital autobiography reconstructing 11+ years of financial receipts and Spotify streaming history.

Built strictly with **plain HTML5, CSS3, and modern Vanilla JavaScript**.
- No frameworks (No React, Vue, or Angular)
- No build step or bundlers (No Webpack, Vite, or npm scripts)
- No backend, database, or external API calls
- Only external resource: Google Fonts (typography)
- 100% Privacy-Preserving (Zero personal identifiable information)

---

## The Core Idea

Most expense trackers display dry pie charts, while music streaming apps give you a once-a-year generic recap. **"Your Life, In Receipts"** bridges the emotional gap between what was spent and what was felt.

By cross-referencing **12,728 recorded financial transactions** with **149,860 Spotify listening sessions (~5,341 hours)**, this project reconstructs the life story of an ordinary fictional character (**Arjun Verma**).

The experience follows a clear narrative flow:
```
Raw Datasets ──▶ Analytical Insights ──▶ Cross-Dataset Relationships ──▶ Human Story
```

---

## Key Insights & Data Discoveries

1. **The Train Commute Era (2015 – 2017)**:
   - Daily Household Transactions show repetitive suburban train commutes (`Place 5 to Place 0`).
   - Over **93% of all streams** occurred on an Android mobile device, heavily concentrated between **05:00 AM and 08:00 AM IST**.
   - Commute soundtrack: *The Beatles* (83.5 hrs), *John Mayer* (56.0 hrs), *The Rolling Stones* (21.4 hrs).
   - Disciplined savings: Regular ₹25,000–₹50,000 Public Provident Fund (PPF) transfers alongside ₹30–₹60 platform snacks.

2. **The Bike Milestone & The Subscription Shift (2018)**:
   - On **18 January 2018**, a ₹50,330 installment for a "Two Wheeler Bikedelux" and a pizza celebration coincided with **78 consecutive streams** of *The Killers* and *Brandon Flowers*.
   - The same year marked the arrival of OTT cord-cutting: first Netflix mobile plan (₹199), Kindle Unlimited, and an Edtech learning certification (₹63,733).

3. **The Lockdown Sanctuary (2019 – 2021)**:
   - **Data Gap Disclosure**: There are no financial expenditure logs recorded in the datasets between October 2018 and March 2022. This is clearly marked as a data gap, not zero spending.
   - **Listening Surge**: Spotify streams reached an all-time record peak in 2020 (**24,280 streams**, 881 hours).
   - **Device Shift**: Usage switched from mobile headphones to *Cast to Device* (home smart speakers) and desktop PC.
   - *The Killers* was streamed for **100.0 hours** in 2020 alone, and *Howard Shore's* sweeping orchestral scores (*The Lord of the Rings*) logged **46.6 hours** of playback during curfews.

4. **The Jet-Set Digital Multi-Facet (2022 – 2023)**:
   - High-value credit card records resume in April 2022 across four sectors: Travel (₹1.20 Cr total), Entertainment (₹1.15 Cr total), Online Shopping (₹1.15 Cr total), and Fitness/Medical (₹97.8L total).
   - Listening shifted to Spanish ballad master *Joaquín Sabina* (#1 in 2022 with 40.2 hrs) and classic folk (*Bob Dylan*).
   - *Dataset Note*: IndiaTransact contains 5,046 automated fraud classification markers, reflecting modern digital credit monitoring.

5. **Mindful Harmony (2024)**:
   - *John Mayer* returned to the #1 artist spot (25.3 hrs), bookending an 11-year cycle that started with him in 2013.
   - *ABBA* made its first-ever top-5 appearance (16.1 hrs) during a spring wellness recharge.

---

## How the Large Datasets Were Summarized (Without Changing Originals)

The original datasets were kept untouched on my local machine (they are not included in this repo because of their size):
- `spotify_history.csv`: **149,860 rows (~21.3 MB)**
- `Daily Household Transactions.csv`: **2,461 rows (~190 KB)**
- `Augmented_IndiaTransactMultiFacet2024.csv`: **10,267 rows (~2.5 MB)**

### The Local Stream-Processing Strategy:
1. **Zero Modification Rule**: The files in `raw data/` were **never modified, renamed, or deleted**.
2. **Local Stream-Processing**: A local Node.js stream script read the CSV files in constant memory:
   - Timestamps were shifted to Indian Standard Time (IST, UTC+5:30) to identify true commute and late-night hours.
   - Aggregated annual stream counts, artist listening hours, skip counts, and daily listening totals.
   - Isolated direct cross-dataset coincidences (same-day financial expenses matched with Spotify listening surges).
3. **Lightweight Browser Data Layer (`data.js`)**:
   - The ~24 MB of raw CSV records was compiled into a structured JavaScript file (`data.js`) of approximately **20 KB**.
   - `data.js` attaches directly to `window.LIFE_DATA`, allowing the frontend to run locally without server setups, CORS restrictions, or build steps.
4. **Privacy Stripping**:
   - Sensitive columns (`cc_num`, `first`, `last`, `street`, `dob`, customer IDs) were discarded during processing. Only sanitized merchant categories, dates, and amounts are displayed.

---

## Implemented Features

### 1. Visual Journey (2013 – 2024 Horizontal Timeline)
- Horizontal timeline tracking annual Spotify listening hours against financial outlays.
- 5 chapter bands demarcated across the timeline (`Pre-Tracking`, `Ch 01: The Commute`, `Ch 02: Milestones`, `Ch 03: Lockdown Sanctuary`, `Ch 04: The Jet-Set`, `Ch 05: Mindful Harmony`).
- **2019–2021 explicitly stamped as `[NO RECEIPT DATA]`**.
- Interactive: Clicking any chapter band or annual column selects that chapter and smoothly scrolls to it.

### 2. 5 Life Chapters (The Continuous Receipt Tape)
- Styled as an unrolling continuous receipt tape with perforated coupon tabs.
- Each chapter displays two strictly labelled panels:
  - **[DATA] What the Data Says**: Factual numbers, hours, and data gap disclosures.
  - **[NARRATIVE] The Story**: Human interpretation of that life phase.
- Accessible previous/next buttons and keyboard arrow key navigation.

### 3. Pattern Discovery (24-Hour Listening Clock)
- Radial SVG clock mapping listening distribution across all 24 hours of the day (IST).
- **Late-Night (11 PM – 5 AM IST)** highlighted in accent stamp red:
  - Accounts for **2,053.6 hours (38.4% of total listening)**.
  - Top Late-Night Artists: The Beatles (141.9h), The Killers (108.1h), John Mayer (83.6h), Bob Dylan (61.6h), Howard Shore (48.6h).
- **Daytime (5 AM – 11 PM IST)**:
  - Accounts for **3,287.9 hours (61.6% of total listening)**.
  - Top Daytime Artists: The Beatles, The Killers, John Mayer, The Strokes, The Rolling Stones.

### 4. Cross-Dataset Relationships (Connected Moments)
- **5 Same-Day Verified Instances** displayed side-by-side (Receipt + Music):
  1. *2017-07-28*: Hospital Consultation + 10.4h of The Beatles / Pink Floyd (Emotional Coping).
  2. *2018-01-18*: Two-Wheeler Motorcycle Installment (₹50,330) + 78 streams of The Killers & Brandon Flowers (Milestone Celebration).
  3. *2018-09-19*: Netflix First Subscription (₹199) + Study & Tech Tracks (Digital Shift).
  4. *2022-10-25*: Diwali Festive Shopping (₹2,54,993) + Howard Shore / Ennio Morricone film scores (Festive Grandeur).
  5. *2023-07-02*: Monsoon Travel Booking (₹17,150) + 11.4h road-trip playlist (Wanderlust Harmony).

### 5. Receipts Explorer & Related Moments
- Keyword search and multi-facet filtering by Era and Category.
- Thermal paper receipt aesthetic with jagged sawtooth edges and monospace typography.
- **Related Receipts**: Inside the receipt modal, jump links show other receipts from the same category or era. Clicking any related receipt immediately inspects that moment while keeping the focus trap intact.

---

## Technical Stack

- **HTML5**: Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`), ARIA labels, role dialogs.
- **CSS3**: Paper & Ink design system (`#EEF0EE` page, `#FAFAF8` receipts, `#1C1F26` ink, `#5B616B` muted, `#B3261E` accent stamp red), sawtooth jagged edges, dashed dividers, responsive down to 360px.
- **JavaScript**: Pure Vanilla ES6+, zero external libraries (only Google Fonts is loaded for typography), modular structure.

---

## How to Test Locally

Because this project is built entirely with plain HTML, CSS, and JavaScript, no installation or build step is required:

1. Download or clone this repository.
2. Double-click **`index.html`** (or open it with Chrome / Firefox / Edge).
3. **Key interactions to verify**:
   - **Journey Timeline**: Click any chapter band or year button to jump to that chapter.
   - **Listening Clock**: Hover over radial bars on the 24-hour dial to view hourly stream counts.
   - **Connected Moments**: Review the 5 same-day paired cards.
   - **Receipts Explorer**: Search for `"train"`, `"netflix"`, or `"bike"`. Click a receipt to open the modal, then click any related receipt chip to jump between moments.
   - **Keyboard Navigation**: Use Tab to cycle through elements, Left/Right arrow keys to switch chapters, Escape to close the modal.
