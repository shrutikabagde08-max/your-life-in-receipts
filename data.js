// "Your Life, In Receipts" - Data Layer (Stage 1)
// Pre-aggregated from raw datasets without modifying original files.
// Strictly zero PII (no card numbers, no real names, no street addresses, no DOB).

window.LIFE_DATA = {
  profile: {
    name: "Arjun Verma",
    isFictional: true,
    tagline: "Fictional persona created from 11+ years of actual digital footprints",
    era: "2013 – 2024",
    stats: {
      totalStreams: 149860,
      totalHours: 5341.5,
      totalTxnsRecorded: 12728,
      topArtist: "The Beatles (336.2 hrs)",
      topPlatform: "Android (93.3% of listening)"
    }
  },

  // 5 Life Chapters with strict separation between "What the data says" and "The story"
  chapters: [
    {
      id: "chapter-1",
      number: "01",
      title: "The Commute & The Dream",
      dateRange: "2015 – 2017",
      vibeColor: "#38bdf8", // Sky blue
      whatDataSays: [
        "Daily Household Transactions record 1,180 expenses during this period totaling ₹8,42,160.",
        "Transportation is the top daily recurring spend category, with hundreds of repeated entries for 'Place 5 to Place 0' and 'Place 2 to Permanent Residence' train and auto rides.",
        "Disciplined savings: Public Provident Fund (PPF) transfers of ₹25,000 to ₹50,000 logged alongside modest daily snacks (₹30–₹60).",
        "Spotify records 35,542 tracks streamed (1,152 hours) during these 3 years.",
        "Over 93% of all streams were on an Android mobile device, peaking between 05:00 AM and 08:00 AM IST (morning commute).",
        "Top streamed artists: The Beatles (83.5 hrs), John Mayer (56.0 hrs), The Rolling Stones (21.4 hrs)."
      ],
      theStory: "In the early years of corporate life, every day begins before dawn with the rhythmic clatter of local trains and cutting chai at the platform. With basic earphones plugged into an Android phone, morning transit becomes a personal concert hall. The Beatles and John Mayer turn crowded train coaches into quiet moments of ambition, while disciplined savings lay the foundation for the future."
    },
    {
      id: "chapter-2",
      number: "02",
      title: "Milestones & Subscriptions",
      dateRange: "2018",
      vibeColor: "#34d399", // Emerald
      whatDataSays: [
        "In January 2018, three installment payments labeled 'Two Wheeler Bikedelux' totaling over ₹1,40,000 appear in the transactions log.",
        "On 18 January 2018, a ₹50,330 installment and a 'Fresh veggie pizza' expense coincide with 78 consecutive streams of The Killers and Brandon Flowers on Spotify.",
        "Digital entertainment subscriptions start appearing: first Netflix recharge (₹199), Kindle Unlimited, Audible, and an Edtech learning course (₹63,733).",
        "Spotify logs 14,817 tracks streamed in 2018 (526 listening hours).",
        "Top artists of 2018: The Beatles (51.0 hrs), Paul McCartney (29.4 hrs), Bob Dylan (23.7 hrs), The Killers (17.6 hrs)."
      ],
      theStory: "Independence arrives on two wheels. The purchase of a personal motorcycle marks a major life milestone, celebrated with pizza and energetic indie-rock victory anthems on full blast. At the same time, life shifts into the subscription age—OTT platforms replace cable TV, and professional upskilling investments signal growing career momentum."
    },
    {
      id: "chapter-3",
      number: "03",
      title: "The Lockdown Sanctuary",
      dateRange: "2019 – 2021",
      vibeColor: "#a78bfa", // Purple
      whatDataSays: [
        "Receipts Data Gap: Is period ke liye receipt data available nahi hai.",
        "Spotify streaming reached an all-time record peak in 2020: 24,280 tracks played (881 hours), up 63% from 2019.",
        "A major device transition occurred: Android phone headphone usage dropped while 'Cast to device' (smart home speakers) and Windows PC listening surged.",
        "In 2020 alone, The Killers was played for 100.0 hours (the highest single-artist yearly total in the entire 11-year dataset).",
        "Cinematic instrumental soundtracks surged: Howard Shore's 'The Lord of the Rings' scores recorded 46.6 hours of playback during 2020–2021."
      ],
      theStory: "While physical receipts paused, acoustic receipts reached fever pitch. Confined indoors during nationwide lockdowns, music became a sanctuary and an emotional lifeline. From endless high-tempo loops of The Killers keeping spirits up, to sweeping orchestral film scores filling the quiet living room, sound transformed solitary isolation into expansive cinematic worlds."
    },
    {
      id: "chapter-4",
      number: "04",
      title: "The Jet-Set & Digital Multi-Facet",
      dateRange: "2022 – 2023",
      vibeColor: "#f59e0b", // Amber
      whatDataSays: [
        "Digital credit card records resume in April 2022 in the IndiaTransact dataset, recording 8,245 transactions totaling over ₹4.1 Crores through 2023.",
        "Spending is concentrated across four categories: Travel (₹1.20 Cr total), Entertainment (₹1.15 Cr total), Online Shopping (₹1.15 Cr total), and Fitness & Medical (₹97.8 Lakh total).",
        "Dataset Discrepancy Note: The IndiaTransact raw dataset contains 5,046 transactions tagged with an automated 'is_fraud' classification marker.",
        "Spotify shows 27,225 streams (925 hours) across 2022–2023.",
        "Top artists shifted: Spanish singer-songwriter Joaquín Sabina became #1 in 2022 (40.2 hrs), followed by The Killers (44.9 hrs across both years), Bob Dylan (20.1 hrs), and Howard Shore."
      ],
      theStory: "Post-lockdown life erupts with pent-up energy. Travel flights, resort stays, and entertainment weekends reflect a newly liberated digital lifestyle. The soundtrack shifts to soulful European ballads and classic folk, reflecting a broader horizon and the fast pace of modern digital spending."
    },
    {
      id: "chapter-5",
      number: "05",
      title: "Mindful Harmony",
      dateRange: "2024",
      vibeColor: "#f472b6", // Rose pink
      whatDataSays: [
        "IndiaTransact records 2,022 transactions in early 2024 totaling ₹79 Lakhs before concluding in April 2024.",
        "Steady spending observed in health, fitness clubs, and curated lifestyle shopping.",
        "Spotify logs 9,870 streams (354 hours) through December 2024.",
        "John Mayer returns to the #1 artist spot (25.3 hrs), bookending an 11-year cycle that started with him in 2013.",
        "ABBA enters the top artists list for the first time in the user's history with 16.1 hours of streaming."
      ],
      theStory: "A decade later, life settles into a mature and joyful rhythm. The restless travel of previous years gives way to balanced wellness and peace of mind. Listening comes full circle: returning to acoustic favorites with John Mayer and embracing uninhibited joyful pop with ABBA, closing an extraordinary eleven-year digital autobiography."
    }
  ],

  // Curated, fully sanitized receipts for the Receipts Explorer
  // Zero PII: Card numbers, real names, exact street addresses, and DOB are completely stripped
  receipts: [
    {
      id: "rcpt-01",
      date: "2015-05-03",
      era: "Household Era (2015-2018)",
      category: "Investments",
      merchant: "Public Provident Fund",
      amount: 25000,
      mode: "Bank Transfer",
      description: "Monthly disciplined retirement investment transfer",
      connectedMusic: {
        date: "2015-05-03",
        tracksCount: 14,
        topArtist: "The Beatles",
        highlightTrack: "Here Comes The Sun",
        listeningHours: "0.8 hrs",
        mood: "Optimistic & Disciplined",
        narrative: "Transferring savings for the future while acoustic Beatles tracks played during evening downtime."
      }
    },
    {
      id: "rcpt-02",
      date: "2016-08-15",
      era: "Household Era (2015-2018)",
      category: "Food & Snacks",
      merchant: "Station Tea & Snack Stall",
      amount: 60,
      mode: "Cash",
      description: "Idli medu vada breakfast after early morning commute",
      connectedMusic: {
        date: "2016-08-15",
        tracksCount: 22,
        topArtist: "Elvis Presley",
        highlightTrack: "Can't Help Falling in Love",
        listeningHours: "1.1 hrs",
        mood: "Warm & Nostalgic",
        narrative: "Early morning Android headphone listening during a quiet Independence Day morning commute."
      }
    },
    {
      id: "rcpt-03",
      date: "2017-07-28",
      era: "Household Era (2015-2018)",
      category: "Healthcare",
      merchant: "City Medical & Clinic",
      amount: 3297,
      mode: "Cash & Card",
      description: "Doctor consultation, pharmacy medicines, and return train ticket",
      connectedMusic: {
        date: "2017-07-28",
        tracksCount: 369,
        topArtist: "The Beatles & Pink Floyd",
        highlightTrack: "Comfortably Numb",
        listeningHours: "10.4 hrs",
        mood: "Emotional Comfort & Stress Relief",
        narrative: "A record listening peak: 369 tracks streamed across 10.4 hours as emotional armor during a stressful medical appointment."
      }
    },
    {
      id: "rcpt-04",
      date: "2018-01-18",
      era: "Household Era (2015-2018)",
      category: "Vehicles & Transport",
      merchant: "Two Wheeler Showroom",
      amount: 50330,
      mode: "Bank Transfer",
      description: "Second installment for Two Wheeler Bikedelux + Veggie pizza celebration",
      connectedMusic: {
        date: "2018-01-18",
        tracksCount: 78,
        topArtist: "The Killers & Brandon Flowers",
        highlightTrack: "All These Things That I've Done",
        listeningHours: "4.8 hrs",
        mood: "Triumphant & High-Energy",
        narrative: "Celebrating the bike milestone with hot pizza and 78 consecutive tracks of high-voltage indie rock."
      }
    },
    {
      id: "rcpt-05",
      date: "2018-09-19",
      era: "Household Era (2015-2018)",
      category: "Subscriptions",
      merchant: "Netflix India",
      amount: 199,
      mode: "Online Bank",
      description: "1 Month Netflix mobile streaming subscription",
      connectedMusic: {
        date: "2018-09-19",
        tracksCount: 42,
        topArtist: "The Beatles",
        highlightTrack: "Revolution",
        listeningHours: "2.3 hrs",
        mood: "Modernizing & Curious",
        narrative: "The week of cord-cutting: activating first streaming subscriptions alongside evening study tracks."
      }
    },
    {
      id: "rcpt-06",
      date: "2022-04-25",
      era: "Digital Era (2022-2024)",
      category: "Travel & Flights",
      merchant: "Airlines & Transit Hub",
      amount: 18450,
      mode: "Credit Card",
      description: "Flight reservation for post-lockdown summer getaway",
      connectedMusic: {
        date: "2022-04-25",
        tracksCount: 43,
        topArtist: "The Rolling Stones",
        highlightTrack: "Start Me Up",
        listeningHours: "2.4 hrs",
        mood: "Adrenaline & Wanderlust",
        narrative: "Packing bags and booking flights with classic rock energizing the return of open travel."
      }
    },
    {
      id: "rcpt-07",
      date: "2022-10-25",
      era: "Digital Era (2022-2024)",
      category: "Entertainment",
      merchant: "Festival Retail & Electronics",
      amount: 45200,
      mode: "Credit Card",
      description: "Diwali festival family gifts, lights, and home tech",
      connectedMusic: {
        date: "2022-10-25",
        tracksCount: 108,
        topArtist: "Howard Shore & Ennio Morricone",
        highlightTrack: "The Fellowship Theme",
        listeningHours: "4.8 hrs",
        mood: "Cinematic & Grand",
        narrative: "A festive shopping spree soundtracked by sweeping orchestral film scores played on home speakers."
      }
    },
    {
      id: "rcpt-08",
      date: "2023-06-09",
      era: "Digital Era (2022-2024)",
      category: "Fitness & Health",
      merchant: "Wellness & Health Club",
      amount: 16500,
      mode: "Credit Card",
      description: "Annual gym and wellness program membership pass",
      connectedMusic: {
        date: "2023-06-09",
        tracksCount: 33,
        topArtist: "Band of Horses",
        highlightTrack: "The Funeral",
        listeningHours: "2.3 hrs",
        mood: "Focused & Mindful",
        narrative: "Committing to physical health and fitness with immersive indie rock powering workout sessions."
      }
    },
    {
      id: "rcpt-09",
      date: "2023-09-24",
      era: "Digital Era (2022-2024)",
      category: "Shopping",
      merchant: "Online Digital Retailer",
      amount: 41165,
      mode: "Credit Card",
      description: "Premium noise-canceling audio headphones",
      connectedMusic: {
        date: "2023-09-24",
        tracksCount: 220,
        topArtist: "The Killers",
        highlightTrack: "When You Were Young",
        listeningHours: "12.7 hrs",
        mood: "Obsessive Audiophile",
        narrative: "An intense 12.7-hour listening marathon (220 tracks) testing brand new audio gear."
      }
    },
    {
      id: "rcpt-10",
      date: "2024-03-09",
      era: "Digital Era (2022-2024)",
      category: "Travel & Flights",
      merchant: "Heritage Stays & Resorts",
      amount: 28900,
      mode: "Credit Card",
      description: "Weekend wellness retreat in quiet nature lodge",
      connectedMusic: {
        date: "2024-03-09",
        tracksCount: 52,
        topArtist: "ABBA & John Mayer",
        highlightTrack: "Dancing Queen",
        listeningHours: "3.1 hrs",
        mood: "Joyful & Relaxed",
        narrative: "Soaking in weekend sunlight with upbeat ABBA classics and mellow John Mayer acoustic rhythms."
      }
    }
  ],

  // 1. JOURNEY VISUAL: Horizontal timeline 2013-2024 with 5 chapter bands, listening hours & spending
  journeyTimeline: [
    { year: 2013, streams: 185, hours: 3.2, spend: "No logs", spendVal: 0, chapterIndex: null, chapterName: "Pre-Tracking" },
    { year: 2014, streams: 23, hours: 0.5, spend: "No logs", spendVal: 0, chapterIndex: null, chapterName: "Pre-Tracking" },
    { year: 2015, streams: 2809, hours: 14.5, spend: "₹3.8 Lakhs", spendVal: 380000, chapterIndex: 0, chapterName: "Ch 1: The Commute" },
    { year: 2016, streams: 6413, hours: 62.1, spend: "₹4.9 Lakhs", spendVal: 490000, chapterIndex: 0, chapterName: "Ch 1: The Commute" },
    { year: 2017, streams: 26320, hours: 218.4, spend: "₹5.6 Lakhs", spendVal: 560000, chapterIndex: 0, chapterName: "Ch 1: The Commute" },
    { year: 2018, streams: 14817, hours: 526.0, spend: "₹5.2 Lakhs", spendVal: 520000, chapterIndex: 1, chapterName: "Ch 2: Milestones" },
    { year: 2019, streams: 14927, hours: 532.1, spend: "No receipt data", isDataGap: true, spendVal: 0, chapterIndex: 2, chapterName: "Ch 3: Sanctuary" },
    { year: 2020, streams: 24280, hours: 881.3, spend: "No receipt data", isDataGap: true, spendVal: 0, chapterIndex: 2, chapterName: "Ch 3: Sanctuary" },
    { year: 2021, streams: 22991, hours: 825.4, spend: "No receipt data", isDataGap: true, spendVal: 0, chapterIndex: 2, chapterName: "Ch 3: Sanctuary" },
    { year: 2022, streams: 16202, hours: 580.1, spend: "₹1.67 Crores", spendVal: 16700000, chapterIndex: 3, chapterName: "Ch 4: Jet-Set" },
    { year: 2023, streams: 11023, hours: 384.2, spend: "₹2.43 Crores", spendVal: 24300000, chapterIndex: 3, chapterName: "Ch 4: Jet-Set" },
    { year: 2024, streams: 9870, hours: 354.2, spend: "₹0.79 Crores", spendVal: 7900000, chapterIndex: 4, chapterName: "Ch 5: Harmony" }
  ],

  // 2. PATTERN DISCOVERY: 24-Hour Listening Clock (IST) with Late-Night vs Daytime split
  clockData: {
    hours: [
      { hour: 0, label: "12 AM", hoursPlayed: 359.2, tracks: 8039, isLateNight: true },
      { hour: 1, label: "1 AM", hoursPlayed: 365.0, tracks: 9513, isLateNight: true },
      { hour: 2, label: "2 AM", hoursPlayed: 333.0, tracks: 9790, isLateNight: true },
      { hour: 3, label: "3 AM", hoursPlayed: 276.9, tracks: 8595, isLateNight: true },
      { hour: 4, label: "4 AM", hoursPlayed: 313.0, tracks: 9486, isLateNight: true },
      { hour: 5, label: "5 AM", hoursPlayed: 365.2, tracks: 10986, isLateNight: false },
      { hour: 6, label: "6 AM", hoursPlayed: 346.9, tracks: 10357, isLateNight: false },
      { hour: 7, label: "7 AM", hoursPlayed: 298.9, tracks: 8963, isLateNight: false },
      { hour: 8, label: "8 AM", hoursPlayed: 282.3, tracks: 8885, isLateNight: false },
      { hour: 9, label: "9 AM", hoursPlayed: 262.3, tracks: 7546, isLateNight: false },
      { hour: 10, label: "10 AM", hoursPlayed: 223.2, tracks: 6458, isLateNight: false },
      { hour: 11, label: "11 AM", hoursPlayed: 236.1, tracks: 7746, isLateNight: false },
      { hour: 12, label: "12 PM", hoursPlayed: 183.5, tracks: 5737, isLateNight: false },
      { hour: 13, label: "1 PM", hoursPlayed: 105.5, tracks: 3316, isLateNight: false },
      { hour: 14, label: "2 PM", hoursPlayed: 73.9, tracks: 2030, isLateNight: false },
      { hour: 15, label: "3 PM", hoursPlayed: 47.8, tracks: 1409, isLateNight: false },
      { hour: 16, label: "4 PM", hoursPlayed: 36.2, tracks: 1141, isLateNight: false },
      { hour: 17, label: "5 PM", hoursPlayed: 26.8, tracks: 677, isLateNight: false },
      { hour: 18, label: "6 PM", hoursPlayed: 38.3, tracks: 993, isLateNight: false },
      { hour: 19, label: "7 PM", hoursPlayed: 98.9, tracks: 2466, isLateNight: false },
      { hour: 20, label: "8 PM", hoursPlayed: 125.9, tracks: 3111, isLateNight: false },
      { hour: 21, label: "9 PM", hoursPlayed: 199.9, tracks: 4641, isLateNight: false },
      { hour: 22, label: "10 PM", hoursPlayed: 336.5, tracks: 8450, isLateNight: false },
      { hour: 23, label: "11 PM", hoursPlayed: 406.5, tracks: 9525, isLateNight: true }
    ],
    lateNightSummary: {
      totalHours: 2053.6,
      percentage: "38.4%",
      topArtists: ["The Beatles (141.9h)", "The Killers (108.1h)", "John Mayer (83.6h)", "Bob Dylan (61.6h)", "Howard Shore (48.6h)"],
      description: "Between 11:00 PM and 5:00 AM IST, over 38% of all listening took place. Playlists shifted from daytime indie-rock to contemplative acoustic sessions and orchestral film scores."
    },
    daytimeSummary: {
      totalHours: 3287.9,
      percentage: "61.6%",
      topArtists: ["The Beatles (194.3h)", "The Killers (186.2h)", "John Mayer (117.8h)", "The Strokes (53.2h)", "The Rolling Stones (57.5h)"],
      description: "Daytime listening (5:00 AM to 11:00 PM IST) powered train commutes, morning walks, and focused afternoon desk work."
    }
  },

  // 3. RELATIONSHIPS: 5 Same-Day Examples (Receipt + Music side-by-side)
  connectedMoments: [
    {
      id: "conn-1",
      date: "2017-07-28",
      title: "Emotional Coping & Hospital Train",
      receipt: {
        merchant: "City Medical & Clinic",
        category: "Healthcare",
        amount: "₹3,297",
        mode: "Cash & Card",
        description: "Doctor consultation, pharmacy prescriptions, and return train ticket."
      },
      music: {
        tracksCount: 369,
        listeningHours: "10.4 hrs",
        topArtist: "The Beatles & Pink Floyd",
        highlightTrack: "Comfortably Numb",
        mood: "Emotional Armor",
        narrative: "A stressful day of clinic checkups and crowded train journeys back home. Earphones stayed plugged in for 10.4 straight hours as musical solace."
      }
    },
    {
      id: "conn-2",
      date: "2018-01-18",
      title: "The Two-Wheeler Victory Anthem",
      receipt: {
        merchant: "Two Wheeler Showroom",
        category: "Vehicles & Transport",
        amount: "₹50,330",
        mode: "Bank Transfer",
        description: "Second installment for Two Wheeler Bikedelux plus fresh pizza celebration."
      },
      music: {
        tracksCount: 78,
        listeningHours: "4.8 hrs",
        topArtist: "The Killers & Brandon Flowers",
        highlightTrack: "All These Things That I've Done",
        mood: "Milestone Celebration",
        narrative: "Personal independence on two wheels was celebrated with hot pizza and 78 consecutive tracks of high-voltage indie rock on repeat."
      }
    },
    {
      id: "conn-3",
      date: "2018-09-19",
      title: "Cord-Cutting & The Streaming Shift",
      receipt: {
        merchant: "Netflix India",
        category: "Subscriptions",
        amount: "₹199",
        mode: "Online Bank",
        description: "First monthly mobile streaming subscription and mobile data booster pack."
      },
      music: {
        tracksCount: 42,
        listeningHours: "2.3 hrs",
        topArtist: "The Beatles",
        highlightTrack: "Revolution",
        mood: "Digital Transition",
        narrative: "Transitioning from physical broadcast and cable TV to on-demand streaming, soundtracked by late-evening focus tracks."
      }
    },
    {
      id: "conn-4",
      date: "2022-10-25",
      title: "Festive Grandeur & Symphonic Binge",
      receipt: {
        merchant: "Festival Retail & Electronics",
        category: "Entertainment",
        amount: "₹2,54,993",
        mode: "Credit Card",
        description: "Diwali festival family gifts, home electronics, and festive hospitality."
      },
      music: {
        tracksCount: 108,
        listeningHours: "4.8 hrs",
        topArtist: "Howard Shore & Ennio Morricone",
        highlightTrack: "The Fellowship Theme",
        mood: "Cinematic Grandeur",
        narrative: "High-value festive shopping matched note-for-note with sweeping cinematic film orchestrations on home smart speakers."
      }
    },
    {
      id: "conn-5",
      date: "2023-07-02",
      title: "Monsoon Wanderer & Open Road",
      receipt: {
        merchant: "Western Ghats Stays & Travel",
        category: "Travel & Flights",
        amount: "₹17,150",
        mode: "Credit Card",
        description: "Flight reservation and rain retreat booking in the Western Ghats."
      },
      music: {
        tracksCount: 184,
        listeningHours: "11.4 hrs",
        topArtist: "The Killers & John Mayer",
        highlightTrack: "Runaways",
        mood: "Wanderlust Harmony",
        narrative: "Packing bags for a monsoon road trip accompanied by 184 tracks across 11.4 continuous hours of driving anthems."
      }
    }
  ]
};

console.log("Life Receipts Data loaded. Chapters:", window.LIFE_DATA.chapters.length, "| Receipts:", window.LIFE_DATA.receipts.length, "| Timeline:", window.LIFE_DATA.journeyTimeline.length);
