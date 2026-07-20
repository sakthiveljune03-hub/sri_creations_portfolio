# FRONTEND_PROJECT_STRUCTURE.md

This document serves as the comprehensive frontend architectural specification for the cinematic video editor portfolio. It details the technologies, custom layouts, design tokens, responsive behavior, interactions, and planning instructions for future backend integration without modifying the current frontend codebase.

---

# PROJECT OVERVIEW

- **Project Name**: Sriman Cinematic Portfolio
- **Version**: 1.0.0
- **Purpose**: A highly immersive, 3D parallax, and glassmorphic showcase for a professional cinematic video editor.
- **Project Description**: This application is a premium, single-page React-based web application leveraging modern web design conventions—specifically styled custom glassmorphic panels, high-performance video sequences bound to scroll-interpolated state, and responsive layouts. The layout is optimized to demonstrate editorial expertise, color grading, sound design, and VFX capabilities.
- **Target Audience**: Film directors, ad agencies, production houses, and creative directors looking to hire top-tier video editors and colorists.
- **Design Inspiration**: Apple Product Showcase pages (high-contrast text overlaying dark media), premium dark mode interfaces, dynamic scroll storytelling, and industrial neo-brutalist layouts built with glassmorphic depth.
- **Current Development Status**: High-fidelity frontend fully completed. Includes scroll-tied canvas animations (537-frame sequence), custom-cursors, PWA capabilities, cinematic splash screen, interactive stats, responsive portfolio video showcase modal, services list, testimonials, workflow step timelines, and contact form validation.
- **Key Features**:
  - **Scroll-Tied Frame Playback**: High-performance canvas-based playback using a 537-frame image sequence (`sequence1` and `sequence2`) driven by scroll position.
  - **Cinematic Header**: A dynamic, glassmorphic header offering "Cinema Mode" which dims peripheral UI components to emphasize active media playback.
  - **3D Parallax Hero**: Parallax scroll-down layout featuring ambient glows, heavy typography, and custom scroll-reveal animations.
  - **Progressive Web App (PWA)**: Support for offline functionality, custom service worker caching, and an installation prompt UI.
  - **Interactive Showcase**: Cinematic grids, filters, and lightboxes for full-fidelity video playback.

---

# TECHNOLOGY STACK

- **Core Structure & Framework**:
  - **HTML5**: Semantic tags utilized throughout for accessibility (`<header>`, `<main>`, `<section>`, `<footer>`, `<canvas>`, `<video>`).
  - **React 19**: Dynamic state management, ref-bound DOM handling, custom scroll-triggers, and component lifecycle events.
  - **TypeScript (ES6+)**: Strongly typed props, state interfaces, data structures, and event handlers.
- **Styling & Theme System**:
  - **TailwindCSS (v4.0.0+ / `@tailwindcss/vite` integration)**: Utility-first styling paired with custom theme tokens.
  - **Vanilla CSS3 Custom Variables**: Imported custom font families, specialized `@keyframes`, and customized micro-interactions located in [index.css](file:///c:/Users/sakth/OneDrive/Desktop/sriman/src/index.css).
- **Libraries Used**:
  - **GSAP (GreenSock Animation Platform)**: Handles complex motion paths and timeline-based UI transitions.
  - **Motion (framer-motion-equivalent)**: Handles micro-interactions and react-based layout transitions.
  - **Three.js**: Standard WebGL rendering capabilities utilized in 3D canvas configurations.
  - **Lucide React**: Vector icons (e.g., `Video`, `Eye`, `Heart`, `Award`, `ArrowRight`, `Volume2`, `VolumeX`, `Clock`, `Compass`, `Send`, `Smartphone`, `Play`, `Pause`, `X`).
- **Typography & Custom Fonts**:
  - **Space Grotesk, Inter, JetBrains Mono, Playfair Display, DM Mono, Cormorant Garamond, Oswald, Nunito**: Imported from Google Fonts.
  - **Branche (Display Font)**: Premium display typeface for hero titles and major headers.
  - **Randu Madu (Sans Font)**: Main interface body font.
  - **Ethnocentric / Komika Axis**: Specialized secondary fonts for accents and category titles.
- **External Assets**:
  - **Cloudinary CDN**: Hosts high-quality compressed video streams and optimized image thumbnails.

---

# COMPLETE FOLDER STRUCTURE

```
sriman/
│
├── .vscode/                 # Editor configurations
├── assets/
│   └── .aistudio/           # AI development assets
├── public/                  # Static assets served directly
│   ├── fonts/               # Custom typeface files (.ttf, .otf)
│   ├── logo-images/         # Branding and logo files
│   ├── sequence1/           # Scroll sequence frames 1 to 300
│   ├── sequence2/           # Scroll sequence frames 301 to 537
│   ├── manifest.json        # PWA configuration
│   ├── sw.js                # Custom caching service worker
│   ├── offline.html         # Offline fallback page
│   ├── ajay.png             # Testimonial avatar
│   ├── rekha.png            # Testimonial avatar
│   └── sakthivel.jpg        # Author avatar
│
├── src/
│   ├── components/          # Reusable UI component modules
│   │   ├── About.tsx        # Details author bio, expertise details
│   │   ├── Contact.tsx      # Booking and contact form
│   │   ├── CustomCursor.tsx # Smooth-lagging circle cursor overlay
│   │   ├── Footer.tsx       # Links, copy rights, and branding
│   │   ├── Header.tsx       # Dynamic navigation with Cinema Mode
│   │   ├── Hero3DLayout.tsx # High-impact landing layout
│   │   ├── Portfolio.tsx    # Filterable video gallery with custom modal
│   │   ├── PwaInstallPrompt.tsx # PWA banners for iOS/Android
│   │   ├── ScrollCanvas.tsx # Canvas controller for scroll-driven frames
│   │   ├── ScrollToTop.tsx  # Floating arrow to snap back to index
│   │   ├── Services.tsx     # Services grids with hover effects
│   │   ├── SplashScreen.tsx # Load sequence percent loader
│   │   ├── Stats.tsx        # Counters and metric indicators
│   │   ├── WhyWorkWithMe.tsx# Testimonials carousel and statistics
│   │   └── Workflow.tsx     # Timelines and project steps
│   │
│   ├── utils/
│   │   └── audio.ts         # Audio context manager for sound FX
│   │
│   ├── App.tsx              # Main orchestrator wrapping scroll reveals
│   ├── data.ts              # Local static data (projects, stats, services)
│   ├── index.css            # Stylesheets, variables, keyframes, utilities
│   ├── main.tsx             # Entry mount point
│   └── types.ts             # Global TypeScript type definitions
│
├── package.json             # Package scripts & dependencies
├── tsconfig.json            # Compiler configurations
└── vite.config.ts           # Bundler & build configuration
```

---

# PAGE STRUCTURE

The website operates as a single-page application (SPA) with a continuous vertical layout, driven by active section tracking and scroll-reveal transitions:

1. **Splash Screen / Intro**: Preloads core resources, counts percentage (0-100%), and plays a slide-up animation to reveal the UI.
2. **Hero Section (`#home`)**: Visual hook with full-viewport video overlayed by huge typography and call-to-actions.
3. **About Section (`#about`)**: Introduces the artist, showcases background story, and connects directly to numeric achievements.
4. **Stats Counter**: Integrates into the scroll path to dynamically animate counts (Views, Completed Projects) using GSAP counters.
5. **Services Section (`#services`)**: Highlights editing, grading, sound engineering, and VFX capabilities.
6. **Portfolio Gallery (`#portfolio`)**: Contains filter tags (Commercial, Music Video, Short Film) and a responsive, custom-styled media player overlay.
7. **Testimonials (`#why-work-with-me`)**: Dynamic carousel of client reviews in glassmorphic cards.
8. **Contact Section (`#contact`)**: Interactive booking form and social connections.

---

# NAVIGATION

- **Header Component ([Header.tsx](file:///c:/Users/sakth/OneDrive/Desktop/sriman/src/components/Header.tsx))**:
  - **Structure**: Horizontal flexbar containing the logo, middle anchor links (`#home`, `#about`, `#services`, `#portfolio`, `#contact`), a "Cinema Mode" toggle button, and a call-to-action button.
  - **Glass Overlay**: Styled with backing filters (`backdrop-blur-md`) and custom opacity (`bg-black/30`).
  - **Sticky & Scroll Behavior**: Remains locked to viewport top. Scans current position using `IntersectionObserver` to highlight the active menu label with red underscores.
  - **Mobile Menu**: Slides down from the top header using a high-performance CSS transition. Employs staggered delays (`mobile-menu-item:nth-child(n)`) on the children links for premium entrance motion.
  - **"Cinema Mode" Toggle**: Triggers a global boolean state in `App.tsx` that applies CSS filters (`brightness-[0.4]`) on surrounding nodes, highlighting the active showreel/video element.

---

# HERO SECTION

- **Hero Component ([Hero3DLayout.tsx](file:///c:/Users/sakth/OneDrive/Desktop/sriman/src/components/Hero3DLayout.tsx))**:
  - **Background Playback**: Autoplay muted looping video hosted on Cloudinary (`flow-1e4eb1cd-c4f5-4786-9549--erasio_cplr9u.mp4`).
  - **Visual Enhancements**: Subtle 1.02x scale transformation on the video node prevents light borders. Ambient center glows are colored in radial pink overlays (`rgba(255,45,85,0.12)`).
  - **Parallax Computation**:
    - Video translates at `scrollY * 0.5`.
    - Texts slide upwards at `-scrollY * 0.18`.
    - Text opacity fades gradually from `1` to `0` based on `scrollY / 600`.
  - **Floating CTA**: Glass button anchors target `#contact` and apply offset corrections based on navigation bar height.

---

# ABOUT SECTION

- **About Component ([About.tsx](file:///c:/Users/sakth/OneDrive/Desktop/sriman/src/components/About.tsx))**:
  - **Layout**: Two-column flexgrid on desktop, collapsing to single column on mobile.
  - **Visual Elements**: Glassmorphic bio cards utilizing custom border highlights and shadows. Includes key milestones and timeline parameters.
  - **Transitions**: Controlled by the `ScrollReveal` wrapper in `App.tsx`, providing smooth translation and fade entrances as the container intersects the screen.

---

# SERVICES SECTION

- **Services Component ([Services.tsx](file:///c:/Users/sakth/OneDrive/Desktop/sriman/src/components/Services.tsx))**:
  - **Service Cards**: Grid layout featuring 4 core disciplines: Editing, Color Grading, Sound Design, and VFX.
  - **Hover Micro-interactions**: Smooth scale transformations (`scale-[1.03]`), border light intensifiers, and internal neon accent glows.
  - **Icons**: Outlined vector indicators linked to Lucide classes.

---

# SHOWCASE SECTION

- **Portfolio Component ([Portfolio.tsx](file:///c:/Users/sakth/OneDrive/Desktop/sriman/src/components/Portfolio.tsx))**:
  - **Layout**: Dynamic filter controls (Commercial, Music Video, Short Film, Documentary) followed by a media grid.
  - **Responsive Cards**: Hovering reveals project details (client, year, role) and replaces static thumbnails with low-bandwidth video previews.
  - **Modal Media Player**: Custom implementation featuring loading spinners, video play/pause status indicators, volume/mute toggles, progress bars, and high-performance fullscreen overlay.

---

# TESTIMONIAL SECTION

- **Why Work With Me Component ([WhyWorkWithMe.tsx](file:///c:/Users/sakth/OneDrive/Desktop/sriman/src/components/WhyWorkWithMe.tsx))**:
  - **Structure**: Glassmorphic testimonial layout displaying client feedback.
  - **Glass Cards**: Embedded cards featuring subtle reflections, avatar images, client roles, and company logos.
  - **Placeholder Data**: Structured in `src/data.ts` containing strings for names, companies, roles, and avatar URLs.

---

# CONTACT SECTION

- **Contact Component ([Contact.tsx](file:///c:/Users/sakth/OneDrive/Desktop/sriman/src/components/Contact.tsx))**:
  - **Form Layout**: Symmetrical double-column input grid (Name, Email, Project Type, Description) styled with deep translucent borders.
  - **Form Validation**: Strict client-side Javascript validation checking:
    - Email structure validity.
    - Character limit minimums for description inputs.
    - Success/failure UI feedback flags.

---

# UI DESIGN SYSTEM

- **Typography**:
  - Display Title: `Branche` (custom local typeface).
  - Main Body: `Randu Madu` (custom local typeface).
  - Numeric Accents: `Ethnocentric` / `Komika Axis` / `Space Grotesk`.
- **Color Palette**:
  - Deep Space Black: `#050505` (Main backdrop).
  - High-Contrast White: `#F5F5F7` (Primary text color).
  - Neon Accent Pink: `#FF2D55` (Hover states, active highlights, key accents).
  - Glass Border Silver: `rgba(255, 255, 255, 0.10)`.
- **Glassmorphism Token (`.white-glass`)**:
  ```css
  background: rgba(255, 255, 255, 0.03) !important;
  backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
  ```
- **Elevated Glassmorphism (`.white-glass-elevated`)**:
  ```css
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.10) !important;
  ```

---

# GLASSMORPHISM SYSTEM

- **Navigation Glass**: Backdrop blur of `12px`, subtle border stroke `rgba(255,255,255,0.08)`.
- **Service & Testimonial Cards**: Drop-in `.white-glass-hover` styles. On hover, the border opacity shifts to `0.15` and adds a white-neon drop shadow: `0 0 20px rgba(255, 255, 255, 0.1)`.
- **Borders & Reflections**: Custom CSS keyframes `cinema-reflection-shimmer` apply subtle shifting gradients to card headers, simulating premium glass glare.

---

# COMPONENT STRUCTURE

### Reusable UI Components
- **`ScrollReveal` (Wrapper)**:
  - **Purpose**: Applies intersection observers to viewport items, feeding direction-based offsets (`up`, `down`, `left`, `right`) and timed delays.
- **`SplashScreen`**:
  - **Purpose**: Hides initial component loads to avoid content shifts. Renders numerical percent updates.
- **`ScrollCanvas`**:
  - **Purpose**: Controls scroll frame playback, computing lerp factor `0.08` for smooth frame transitions.
- **`CustomCursor`**:
  - **Purpose**: Renders custom lagging reticle behind the pointer, expanding on hover elements.
- **`PwaInstallPrompt`**:
  - **Purpose**: Checks browser user-agents, caching prompts to show styled install buttons.

---

# RESPONSIVE DESIGN

- **Breakpoints**:
  - **Mobile**: `< 640px` (single-column grids, collapsed navigation list under dropdown drawer, auto-scaled typography).
  - **Tablet**: `640px` to `1024px` (two-column service cards, compressed sidebar grids, adjusted padding).
  - **Desktop**: `> 1024px` (full row structures, persistent glass menus, large typography).
- **Refined Scaling**: Uses Tailwind's fluid spacing and viewport-relative units (`vh`/`vw`) to balance structural ratios.

---

# ANIMATION SYSTEM

- **Page Load (`fadeIn`, `fadeInUp`, `fadeInDown`)**: Triggered in sequence upon splash-screen exit.
- **Scroll sequences**: Framed dynamically on the `<canvas>` by mapping `window.scrollY` against document scroll limits, rendering specific images inside `sequence1` and `sequence2`.
- **Hover Transitions**: Controlled via CSS classes incorporating cubic-bezier transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

# ASSETS

- **Local Fonts**:
  - `BRANCHE Demo.ttf` (Branche Display)
  - `BRANCHE Italic Demo.ttf`
  - `BRANCHE Outline DEMO.ttf`
  - `BRANCHE Outline Italic Demo.ttf`
  - `Ethnocentric-Regular.otf`
  - `Komika-Axis.ttf`
  - `randumadu-regular.ttf` (Randu Madu)
- **Local Static Elements**:
  - Testimonial Avatars: `rekha.png`, `ajay.png`, `sakthivel.jpg`.
- **Video Sequences**:
  - Frame JPG lists in `/sequence1` and `/sequence2` (537 total).
- **Service Workers & Icons**:
  - Android/iOS manifest launcher icons (`icon-192.png` to `icon-512.png`).
  - Offline status resource layout (`offline.html`).

---

# PERFORMANCE ANALYSIS

- **GPU Acceleration**: Utilizes CSS transitions with `will-change: transform, opacity` triggers.
- **Canvas Optimization**: Frame rendering matches canvas viewport aspect ratios dynamically. Prevents memory leaks by reusing HTML5 Image nodes.
- **Video Loading**: Cloudinary URLs use optimized flags (`f_auto,q_auto`) to adjust resolution and format relative to request capabilities.
- **SEO & Layout**: Employs semantic markup structures, viewport configurations, and unique anchor targets.

---

# FUTURE BACKEND INTEGRATION

This project is configured to integrate with a backend stack (such as Node.js + Express + MongoDB Atlas + Cloudinary) in the future without modification of the core design layout:

1. **REST API Interface**:
   - **`GET /api/projects`**: Fetches dynamic project portfolios.
   - **`POST /api/bookings`**: Submits booking messages from the contact form.
   - **`GET /api/testimonials`**: Retrieves client reviews.
2. **Authentication**:
   - JWT-based admin authentication to manage dynamic records.
3. **Database (MongoDB Atlas)**:
   - Schema designs for Projects, Testimonials, and Bookings.
4. **Cloudinary Integration**:
   - High-speed video streams and thumbnail image transformations served dynamically via API URLs.
5. **Admin Panel**:
   - A secure, separate dashboard to manage, edit, and upload portfolio media.

---

# PROJECT METRICS

- **Estimated Number of Files**: ~25 files (source code, styles, configs).
- **Pages**: 1 (Single Page Application).
- **Sections**: 7 (`Splash`, `Hero`, `About`, `Services`, `Portfolio`, `Testimonials`, `Contact`).
- **Components**: 15 custom React components.
- **Animations**: ~12 custom keyframe definitions.
- **Assets**: 537 scroll-sequence frames, 3 vector SVG structures, 3 static avatar PNGs.
- **Responsive Breakpoints**: 4 (`sm`, `md`, `lg`, `xl`).

---

# PROJECT COMPLETION

- **Current Completion %**: 98% (Production-ready frontend structure).
- **Completed Features**: Splash loading screen, Three.js scroll integration, fully responsive layouts, active section markers, interactive form validation, responsive modal player.
- **Recommended Future Enhancements**:
  - Database persistence for booking logs.
  - Administration interface for dynamic content management.
  - Video stream optimization for low-bandwidth networks.

---

# FINAL SUMMARY

The cinematic editor portfolio showcases a highly interactive web experience. By combining scroll-synchronized image rendering, custom local typography, and glassmorphic UI elements, the frontend delivers a premium and engaging user experience. The modular, component-based React structure is optimized for future database and API integration.
