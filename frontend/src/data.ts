/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, StatItem, ServiceItem, WorkflowStep, Testimonial } from "./types";

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "midnight-run",
    title: "",
    client: "",
    category: "",
    thumbnail: "https://res.cloudinary.com/xdzjp4sb/video/upload/f_auto,q_auto,so_0/v1784570393/3_h1eblx.jpg",
    videoUrl: "https://res.cloudinary.com/xdzjp4sb/video/upload/f_auto,q_auto/v1784570393/3_h1eblx.mp4",
    duration: "",
    year: "",
    description: "",
    skills: []
  },
  {
    id: "ethereal-echoes",
    title: "",
    client: "",
    category: "",
    thumbnail: "https://res.cloudinary.com/xdzjp4sb/video/upload/f_auto,q_auto,so_0/v1784570385/5_gptcxl.jpg",
    videoUrl: "https://res.cloudinary.com/xdzjp4sb/video/upload/f_auto,q_auto/v1784570385/5_gptcxl.mp4",
    duration: "",
    year: "",
    description: "",
    skills: []
  },
  {
    id: "shadows-of-kyoto",
    title: "",
    client: "",
    category: "",
    thumbnail: "https://res.cloudinary.com/xdzjp4sb/video/upload/f_auto,q_auto,so_0/v1784570371/2_krfg1k.jpg",
    videoUrl: "https://res.cloudinary.com/xdzjp4sb/video/upload/f_auto,q_auto/v1784570371/2_krfg1k.mp4",
    duration: "",
    year: "",
    description: "",
    skills: []
  },
  {
    id: "cyberpunk-2088",
    title: "",
    client: "",
    category: "",
    thumbnail: "https://res.cloudinary.com/xdzjp4sb/video/upload/f_auto,q_auto,so_0/v1784570362/1_oawul6.jpg",
    videoUrl: "https://res.cloudinary.com/xdzjp4sb/video/upload/f_auto,q_auto/v1784570362/1_oawul6.mp4",
    duration: "",
    year: "",
    description: "",
    skills: []
  },
  {
    id: "last-summit",
    title: "",
    client: "",
    category: "",
    thumbnail: "https://res.cloudinary.com/xdzjp4sb/video/upload/f_auto,q_auto,so_0/v1784570358/4_cgknvs.jpg",
    videoUrl: "https://res.cloudinary.com/xdzjp4sb/video/upload/f_auto,q_auto/v1784570358/4_cgknvs.mp4",
    duration: "",
    year: "",
    description: "",
    skills: []
  },
  {
    id: "acoustic-session",
    title: "The Woods Session",
    client: "Wildwood Records",
    category: "Music Video",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-playing-acoustic-guitar-close-up-41584-large.mp4",
    duration: "4:10",
    year: "2025",
    description: "An intimate, single-take feel acoustic performance recorded live. Employs seamless invisible speed morph cuts, lens flares, and warm, golden-hour film grain layers.",
    skills: ["Invisible Cuts", "Film Grain", "Dual-System Sync", "Golden Hour Warmth"]
  }
];

export const STATS: StatItem[] = [
  {
    value: "1000+",
    numericValue: 1000,
    suffix: "+",
    label: "Videos Completed",
    icon: "Video"
  },
  {
    value: "45M+",
    numericValue: 45,
    suffix: "M+",
    label: "Combined Views",
    icon: "Eye"
  },
  {
    value: "98%",
    numericValue: 98,
    suffix: "%",
    label: "Client Retention",
    icon: "HeartHandshake"
  },
  {
    value: "6+",
    numericValue: 6,
    suffix: "+",
    label: "Years of Craft",
    icon: "Award"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "cinematic-editing",
    title: "🎬 CINEMATIC VIDEO EDITING",
    description: "Transform raw footage into visually stunning cinematic stories with professional pacing, color grading, sound design, and seamless transitions.",
    listTitle: "Perfect For",
    listItems: [
      "Cinematic Reels",
      "Instagram Reels",
      "Content Creator Reels",
      "YouTube Shorts",
      "Travel Videos",
      "Lifestyle Videos"
    ],
    extendedDetails: [
      "Cinematic Color Grading",
      "Smooth Transitions",
      "Motion Graphics",
      "Sound Design",
      "Subtitle Integration"
    ],
    icon: "Film"
  },
  {
    id: "photography",
    title: "📸 PHOTOGRAPHY",
    description: "Capturing timeless moments with creativity, precision, and attention to detail for personal, commercial, and event needs.",
    listTitle: "Photography Services",
    listItems: [
      "Portrait Photography",
      "Event Photography",
      "Product Photography",
      "Lifestyle Photography",
      "Social Media Photography"
    ],
    extendedDetails: [
      "Professional Editing",
      "Color Enhancement",
      "High-Resolution Delivery",
      "Social Media Ready Formats"
    ],
    icon: "Camera"
  },
  {
    id: "poster-design",
    title: "🎨 POSTER DESIGN & CREATIVE BRANDING",
    description: "Creating visually striking posters and promotional creatives that communicate your message effectively and strengthen your brand identity.",
    listTitle: "Design Services",
    listItems: [
      "Event Posters",
      "Business Posters",
      "Product Promotions",
      "Social Media Creatives",
      "Brand Campaign Designs"
    ],
    extendedDetails: [
      "Premium Visual Design",
      "Brand Consistency",
      "Print & Digital Formats",
      "High-Quality Assets"
    ],
    icon: "Palette"
  },
  {
    id: "wedding-shoots",
    title: "💍 WEDDING & EVENT SHOOTS",
    description: "Preserving your special moments with cinematic storytelling and professional event coverage that creates memories for a lifetime.",
    listTitle: "Services Include",
    listItems: [
      "Pre-Wedding Shoots",
      "Pre-Wedding Editing",
      "Wedding Highlights",
      "Engagement Films",
      "Event Coverage"
    ],
    extendedDetails: [
      "Cinematic Storytelling",
      "Drone Footage Integration",
      "Color Grading",
      "Highlight Reels",
      "Full Event Film Delivery"
    ],
    icon: "Heart"
  },
  {
    id: "traditional-production",
    title: "🎥 TRADITIONAL VIDEO PRODUCTION",
    description: "Authentic and elegant traditional videos crafted to preserve cultural moments and celebrations with professional quality.",
    listTitle: "Suitable For",
    listItems: [
      "Traditional Ceremonies",
      "Family Functions",
      "Religious Events",
      "Cultural Celebrations"
    ],
    extendedDetails: [
      "Multi-Camera Coverage",
      "Professional Audio Sync",
      "Smooth Editing",
      "High-Quality Final Output"
    ],
    icon: "Video"
  },
  {
    id: "model-videos",
    title: "👑 MODEL & PORTFOLIO VIDEOS",
    description: "Professional model videos designed to showcase personality, style, and presence for portfolios, fashion brands, and social media campaigns.",
    listTitle: "Ideal For",
    listItems: [
      "Fashion Models",
      "Personal Branding",
      "Portfolio Shoots",
      "Social Media Campaigns"
    ],
    extendedDetails: [
      "Cinematic Editing",
      "Creative Transitions",
      "Professional Color Grading",
      "Reels Optimized Delivery"
    ],
    icon: "User"
  },
  {
    id: "business-ads",
    title: "🚀 BUSINESS ADVERTISEMENT VIDEOS",
    description: "Create impactful promotional videos that help businesses increase visibility, attract customers, and build stronger brands.",
    listTitle: "Business Video Types",
    listItems: [
      "Product Advertisements",
      "Brand Promotions",
      "Corporate Videos",
      "Store Launch Videos",
      "Social Media Campaigns"
    ],
    extendedDetails: [
      "Brand Storytelling",
      "Motion Graphics",
      "Product Highlights",
      "Conversion-Focused Editing"
    ],
    icon: "Activity"
  },
  {
    id: "content-creation",
    title: "🎙️ CONTENT CREATION & STORYTELLING",
    description: "Creating engaging content that captures attention, builds emotional connections, and transforms ideas into memorable visual stories across digital platforms.",
    listTitle: "Perfect For",
    listItems: [
      "Personal Branding",
      "Content Creators",
      "Influencers",
      "YouTube Creators",
      "Instagram Creators",
      "Business Storytelling",
      "Brand Narratives",
      "Social Media Campaigns"
    ],
    extendedDetails: [
      "Story Development",
      "Content Strategy",
      "Visual Storytelling",
      "Script Planning",
      "Creative Direction",
      "Audience Engagement Optimization",
      "Platform-Specific Content Planning",
      "Narrative Structure Development"
    ],
    icon: "Mic"
  },
  {
    id: "short-films",
    title: "🎞️ SHORT FILM PRODUCTION",
    description: "From concept to final cut, bringing stories to life through cinematic filmmaking and creative visual storytelling.",
    listTitle: "Production Services",
    listItems: [
      "Script Visualization",
      "Cinematic Editing",
      "Color Grading",
      "Sound Design",
      "Final Mastering"
    ],
    extendedDetails: [
      "Professional Post Production",
      "Cinematic Look Development",
      "Audio Enhancement",
      "Festival Ready Delivery"
    ],
    icon: "Film"
  }
];

export const WORKFLOW: WorkflowStep[] = [
  {
    step: "01",
    title: "Media Ingest & Triage",
    duration: "Day 1-2",
    description: "Offloading footage, transcoding to high-performance editing codecs (ProRes), synchronizing audio, and cataloging clips with metatags.",
    deliverables: ["ProRes Transcodes", "Audio Sync Checks", "Timeline Sub-clip Bin Organization"]
  },
  {
    step: "02",
    title: "The Assembly Cut",
    duration: "Day 3-5",
    description: "Structuring the main narrative spine. Putting together the rough sequence of scenes to lock down the overarching story and pacing.",
    deliverables: ["A-Roll Story Skeleton", "Basic Narrative Flow Pitch", "Rough Audio Music Temp Tracks"]
  },
  {
    step: "03",
    title: "Fine Cut & Polish",
    duration: "Day 6-9",
    description: "Carving out frame-precise cuts. Tuning transitions, implementing dynamic speed-ramps, matching split edits, and locking the picture.",
    deliverables: ["Locked Picture Cut", "Frame-Precise Visual Flow", "Complete Sound Cues Map"]
  },
  {
    step: "04",
    title: "Sound Design & Color Grading",
    duration: "Day 10-12",
    description: "The cinematic magic. Applying custom LUTs, matching lighting tones, laying down layers of rich Foley sound effects, and balancing the audio mix.",
    deliverables: ["DaVinci Resolve graded color pass", "Loudness-balanced stereo mix", "Ambient SFX master"]
  },
  {
    step: "05",
    title: "VFX & Final Delivery",
    duration: "Day 13-14",
    description: "Adding glowing titles, cinematic motion elements, matching aspect ratio overlays, and exporting pristine ProRes & Web-optimized masters.",
    deliverables: ["Master ProRes 422 HQ", "YouTube/Vimeo 4K H.264 exports", "Social media vertical cutdowns (9:16)"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ajay Kumar",
    role: "Creative Director",
    company: "Aether Automotive",
    avatar: "/ajay.png",
    content: "Sriman completely re-invented our visual output. His pacing is phenomenal and his color grading is world-class. He took 4TB of disjointed supercar footage and delivered a sleek, pulse-pounding masterpiece that immediately went viral."
  },
  {
    name: "Rekha Shree",
    role: "Independent Filmmaker",
    company: "Horizon Docs",
    avatar: "/rekha.png",
    content: "An absolute master of slow cinema and storytelling. Sriman did the Foley and color mastering for my Japan documentary. His attention to detail—from the wind blowing through trees to the soft lantern glows—was breathtaking."
  },
  {
    name: "Sakthivel Rajendhiran",
    role: "Producer & DJ",
    company: "Neon Pulse Records",
    avatar: "/sakthivel.jpg",
    content: "I've worked with dozens of editors, but Sriman stands out. He edits music videos like he is playing an instrument. The cuts hit perfectly, the morphs are incredibly seamless, and the final look is pure cinematic candy."
  }
];

export const EDITING_RIG = {
  cpu: "Apple M3 Max (16-Core)",
  gpu: "40-Core GPU, Ray Tracing",
  ram: "128GB Unified Memory",
  storage: "8TB High-Speed SSD (7.4 GB/s)",
  monitoring: "Pro Display XDR (HDR 1600 nits) + Flanders Scientific DM240",
  audio: "Genelec 8030C Studio Monitors + Sennheiser HD600",
  software: [
    { name: "DaVinci Resolve Studio", level: 98, color: "from-[#FF2D55] to-[#D8B56A]" },
    { name: "Adobe Premiere Pro", level: 95, color: "from-[#FF2D55] to-[#FF3C78]" },
    { name: "Adobe After Effects", level: 90, color: "from-[#D8B56A] to-[#bfa05d]" },
    { name: "Avid Media Composer", level: 85, color: "from-[#D8B56A] to-[#FF2D55]" }
  ]
};
