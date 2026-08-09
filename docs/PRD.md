You are a senior product engineer, frontend architect, UI/UX designer, and performance engineer.

We are building a production-ready web application for Hackathon/HackerHouse Goa called:

"Builder ID Generator"

The goal is to create a fast, visually distinctive Builder ID card for participants.

IMPORTANT:
This is a hackathon project with a real deadline.

Do NOT overengineer.
Do NOT build unnecessary features.
Do NOT turn this into Canva.
Do NOT create a generic dashboard.
Do NOT add authentication, databases, APIs, AI features, or complex infrastructure unless a requirement below actually needs them.

The final product should feel:
- Fast
- Premium
- Experimental
- Goa/HackerHouse-native
- Slightly chaotic and self-aware
- Extremely easy to use
- Mobile-first
- Production-ready

The most important priorities are:

1. Working product
2. Speed
3. Visual quality
4. Smooth UX
5. Reliable card generation
6. Mobile experience
7. Maintainable architecture

==================================================
1. PRODUCT CONCEPT
==================================================

The application allows a HackerHouse Goa participant to create a personalized Builder ID.

Basic flow:

LANDING
   ↓
CREATE BUILDER ID
   ↓
SELECT SOLO / TEAM
   ↓
SELECT TEAM
   ↓
ENTER / CONFIRM IDENTITY
   ↓
UPLOAD PHOTO
   ↓
CHOOSE TEMPLATE
   ↓
CHOOSE THEME / STYLE
   ↓
LIVE PREVIEW
   ↓
GENERATE BUILDER ID
   ↓
DOWNLOAD / SHARE
   ↓
OPTIONAL:
   - Generate Team Frame
   - View Public Builder Card
   - Verify Builder ID

The core experience should be possible in well under one minute.

The final card should feel like something a participant would actually WANT to share.

==================================================
2. DESIGN DIRECTION
==================================================

Use the provided VALORANT website screenshot as VISUAL INSPIRATION ONLY.

Study its design principles:
- Strong visual hierarchy
- Large typography
- High contrast
- Full-screen visual sections
- Bold imagery
- Strong card layouts
- Sharp/structured UI
- Minimal navigation
- Strong CTA
- Cinematic presentation
- Controlled animations
- Clear spacing
- Premium visual polish

DO NOT copy:
- VALORANT logos
- Riot Games branding
- VALORANT artwork
- Agents
- Exact layouts
- Exact assets
- Copyrighted visual elements

The final visual identity must belong to HackerHouse Goa.

The product should feel like:

"Goa + hackers + builders + experimental internet culture"

rather than:

"generic SaaS dashboard"

==================================================
3. HH GOA VISUAL IDENTITY
==================================================

The interface should feel native to HackerHouse Goa.

Use visual inspiration from:
- Goa
- Beach culture
- Nightlife
- Hackers
- Builders
- Experimental tech
- Internet culture
- Indie software
- Community
- Chaos
- Creative coding

Possible visual language:
- Dark backgrounds
- Warm Goa-inspired accents
- Tropical visual elements used carefully
- Grain/noise textures
- Bold typography
- Experimental layouts
- Sticker-like elements
- Brutalist details
- Slightly broken UI moments
- Handwritten/marker-style accents where appropriate
- Unexpected micro-interactions

Do NOT make it look like a tourism website.

Do NOT overuse:
- palm trees
- beaches
- sunsets
- tropical gradients
- generic startup illustrations

The Goa identity should feel subtle, modern and culturally integrated into the product.

==================================================
4. CORE FEATURE — PHOTO UPLOAD
==================================================

Implement:

- Drag & drop
- File picker
- Mobile camera/gallery selection where supported
- JPG
- JPEG
- PNG
- HEIC/HEIF where browser support allows

Handle:
- Portrait images
- Landscape images
- Square images
- Extremely large images
- Different aspect ratios

Automatically:
- Resize large images for preview
- Crop/fill according to template
- Preserve important visual content
- Prevent distortion
- Keep processing fast

Optional background removal may be implemented if it can be done reliably without making the application slow.

IMPORTANT:
Background removal is OPTIONAL.

Do not sacrifice core performance for it.

Prefer client-side image processing wherever practical.

Uploaded images should NOT be permanently stored unless absolutely necessary.

==================================================
5. TEAM SELECTION & VERIFICATION
==================================================

Support:

SOLO

or

TEAM

If TEAM is selected:

Show searchable team selection.

Example:

[ Search your team... ]

Team:
Phantom AI

The selected team must be validated against available team/member data.

The application must prevent arbitrary users from claiming an unrelated team.

The card should display verified team identity.

Example:

TEAM
PHANTOM AI
✓ VERIFIED

For MVP, team/member data may be stored in a static JSON configuration if backend verification is not required.

Design the architecture so this can later be replaced with a database/API without rewriting the entire frontend.

==================================================
6. BUILDER ID TEMPLATE SYSTEM
==================================================

Create a reusable template architecture.

Do NOT hardcode every template directly into the UI.

Templates should be configuration-driven.

Each template should define:
- Card dimensions
- Background
- Typography
- Photo position
- Name position
- Role position
- Team position
- Builder title position
- ID position
- QR position
- Decorative elements
- Accent colors
- Optional metadata

Initial templates should be DISTINCT.

Example directions:

1. GOA
2. MINIMAL
3. DARK
4. CHAOTIC
5. EXPERIMENTAL

Each should feel meaningfully different.

Do not create five copies of the same design with different colors.

Architecture must allow:

ADMIN
  ↓
Enable template
Disable template
Add template
Remove template
Modify template configuration

without changing the core rendering engine.

==================================================
7. THEME & STYLE CUSTOMIZATION
==================================================

Allow users to choose:

- Theme
- Primary color
- Accent color
- Visual style
- Layout variation where supported

Possible styles:

GOA
MINIMAL
DARK
CHAOTIC
EXPERIMENTAL

Do not expose 50 design controls.

The user should choose from curated design systems.

The application should preserve visual quality automatically.

Users should not easily be able to create an ugly card.

==================================================
8. PERSONALIZED BUILDER IDENTITY
==================================================

The system should generate a Builder identity based on participant information.

Display:

- Name
- Stack / role
- Team
- Builder ID
- Builder Class / Builder Title
- Relevant HackerHouse Goa identity

Examples:

"THE SYSTEM BREAKER"

"THE FULL STACK MENACE"

"THE SHIP-IT ENGINEER"

"THE DEBUGGING WIZARD"

"THE CHAOS BUILDER"

These titles should feel:
- Fun
- Slightly absurd
- Hacker-oriented
- Shareable
- Self-aware

Do NOT make them cringe or overly corporate.

If deterministic rules are easier and more reliable than AI, use deterministic rules.

Do NOT call an AI API just to generate a funny title.

==================================================
9. LIVE CARD PREVIEW
==================================================

This is one of the most important features.

The card must update immediately when the user changes:

- Name
- Role
- Team
- Photo
- Template
- Theme
- Accent
- Builder title

No page reload.

No "Apply changes" button.

No unnecessary backend request.

Target:
Near-instant perceived response.

The preview must match the final exported card.

==================================================
10. CARD GENERATION
==================================================

Generate the final Builder ID in under approximately 2 seconds under normal conditions.

The exported card must:
- Match the preview
- Be high resolution
- Preserve typography
- Preserve image quality
- Preserve layout
- Preserve QR code if present
- Have correct dimensions

Preferred architecture:

USER INPUT
    ↓
LOCAL STATE
    ↓
TEMPLATE RENDERER
    ↓
LIVE PREVIEW
    ↓
EXPORT RENDERER
    ↓
PNG

Avoid unnecessary server-side rendering.

==================================================
11. HIGH-QUALITY EXPORT
==================================================

Primary export format:

PNG

Requirements:
- High resolution
- Optimized file size
- Correct aspect ratio
- No blurry text
- No missing images
- No layout shift

Primary CTA:

[ DOWNLOAD BUILDER ID ]

Optional:

[ DOWNLOAD HIGH QUALITY ]

If PDF export is useful for printing, keep it secondary.

==================================================
12. X SHARING
==================================================

Implement one-click sharing to X.

The share flow should create a pre-filled post.

Example:

"Just got my Builder ID at HackerHouse Goa.

#FrameInGoa"

The user should still be able to edit the text before posting.

Do not automatically post without user action.

If direct API integration creates unnecessary complexity, use a share intent/deep-link approach.

==================================================
13. OPTIONAL TEAM FRAME GENERATOR
==================================================

After generating an individual card:

Show:

"BUILDING WITH PEOPLE?"

[ CREATE TEAM FRAME ]

Allow the user to add teammates.

Generate a combined visual containing:
- Team name
- Team identity
- Member photos
- Member names
- Individual Builder titles
- HackerHouse Goa branding

Keep the first implementation simple.

Do not build a complex collaborative editor.

==================================================
14. BUILDER ID VERIFICATION
==================================================

Optional but architecturally supported.

Each generated Builder ID may have:

Unique Builder ID

Example:

HHG-26-A7F42

Optional QR code.

QR can point to:

/verify/{builderId}

Verification page should show:

✓ VERIFIED BUILDER

Name
Team
Role
Builder ID
Event
Status

Important:

Do not claim an ID is verified unless it actually exists in the configured participant/team data.

==================================================
15. PUBLIC BUILDER CARD
==================================================

Optional shareable profile.

Example:

/builder/HHG-26-A7F42

Display:
- Photo
- Name
- Builder title
- Stack
- Team
- Builder ID
- HackerHouse Goa identity
- Generated card

Keep this lightweight.

Do not turn it into a social network.

==================================================
16. CREATIVE UI + MICROCOPY
==================================================

The interface should contain occasional personality.

Examples:

Loading:

"Teaching pixels how to behave..."

"Compiling your builder aura..."

"Negotiating with the renderer..."

Error:

"Well. That broke."

"The pixels have unionized."

"Your photo defeated our crop algorithm."

Success:

"Identity acquired."

"You're officially builder-shaped."

"Card generated. Go cause problems."

Use this sparingly.

The UI should still feel professional.

Do NOT make every button a joke.

==================================================
17. ANIMATION
==================================================

Use subtle, purposeful motion.

Good:
- Template hover
- Card transition
- Preview update
- Upload progress
- Generate state
- Success animation
- Page transitions

Avoid:
- Heavy particle effects
- Constant animations
- Huge video backgrounds
- CPU-intensive WebGL unless absolutely necessary
- Animations that interfere with usability

Performance always wins over visual gimmicks.

==================================================
18. MOBILE-FIRST DESIGN
==================================================

Design mobile FIRST.

Most users will likely create their Builder ID from a phone.

Mobile flow:

LANDING
 ↓
CREATE
 ↓
FORM
 ↓
PHOTO
 ↓
TEMPLATE
 ↓
PREVIEW
 ↓
GENERATE
 ↓
SHARE

The preview must remain prominent.

Use:
- Bottom sheets
- Collapsible controls
- Sticky generate button
- Large touch targets
- Native file/camera picker
- Minimal typing where possible

Desktop should enhance the experience, not be the foundation.

==================================================
19. PERFORMANCE & SCALABILITY
==================================================

Performance is a PRODUCT REQUIREMENT.

Target:

Initial page load:
< 2 seconds on a good connection

Template switching:
< 100 ms perceived

Preview updates:
Near instant

Normal image processing:
< 500 ms where practical

Final generation:
~2 seconds or less

Optimize:
- Images
- Fonts
- JavaScript bundles
- Template assets
- Lazy loading
- Code splitting
- Client-side processing

Avoid:
- Huge dependencies
- Unnecessary API calls
- Re-rendering the entire application on every keystroke
- Uploading original photos unnecessarily
- Heavy animation libraries for trivial effects

Architecture should be capable of supporting thousands of simultaneous users.

Prefer static hosting + CDN + client-side generation wherever possible.

==================================================
20. PRIVACY
==================================================

Uploaded photos are personal data.

Default behavior:

Process locally wherever possible.

Do not permanently store photos unless explicitly required.

If storage is introduced:
- Clearly define why it exists
- Minimize retention
- Avoid storing unnecessary originals
- Use secure storage
- Do not expose private uploads publicly

==================================================
21. ADMIN CONFIGURATION
==================================================

Create an architecture that allows configuration of:

- Templates
- Themes
- Teams
- Team members
- Builder title rules
- Event metadata
- Branding

For MVP, configuration can be JSON/static data.

Example:

/config/templates.json
/config/teams.json
/config/builderTitles.json
/config/event.json

The important thing is separation of configuration from rendering logic.

==================================================
22. RECOMMENDED TECH STACK
==================================================

Use the simplest reliable stack.

Preferred:

Frontend:
React + Vite

Styling:
Tailwind CSS

State:
React state initially.
Use Zustand only if genuinely necessary.

Icons:
Lucide React

Rendering:
HTML/CSS preview + Canvas-based export
OR a suitable canvas rendering library if it materially simplifies reliable export.

Image processing:
Browser APIs / lightweight libraries.

QR:
Lightweight client-side QR library.

Backend:
Only if required.

Potential backend:
Node.js / Express or serverless API.

Do NOT introduce:
- Microservices
- Kubernetes
- Complex queues
- Redis
- unnecessary databases
- unnecessary authentication

unless a real requirement appears.

==================================================
23. PROJECT STRUCTURE
==================================================

Use a clean architecture similar to:

src/
  components/
    landing/
    builder/
    preview/
    templates/
    upload/
    sharing/
    verification/

  pages/
    Home/
    Builder/
    Verify/
    PublicBuilder/

  templates/
    goa/
    minimal/
    dark/
    chaotic/
    experimental/

  config/
    templates/
    teams/
    event/
    builderTitles/

  hooks/
    useBuilder/
    useImage/
    useExport/

  utils/
    imageProcessing/
    export/
    validation/
    sharing/

  data/

  App.jsx
  main.jsx

Keep components modular but DO NOT over-componentize.

==================================================
24. ACCESSIBILITY
==================================================

Implement:
- Keyboard accessibility
- Proper labels
- Visible focus states
- Good contrast
- Accessible buttons
- Screen-reader-friendly form labels
- Error messages that clearly explain the problem

Do not sacrifice accessibility for aesthetics.

==================================================
25. ERROR HANDLING
==================================================

Handle:

Invalid image
Unsupported format
Huge image
Image processing failure
Missing required information
Invalid team
Export failure
Network failure where applicable

Errors should be:
- Clear
- Short
- Human
- Occasionally humorous

But always actionable.

Example:

"Your image is too large to process smoothly.
Try another image."

[ CHOOSE ANOTHER ]

==================================================
26. SECURITY
==================================================

Never trust client-provided team/member information if a backend verification system exists.

Validate:
- IDs
- Team membership
- Uploaded files
- File types
- File sizes
- Public verification identifiers

Prevent:
- arbitrary team claims
- malicious file uploads
- predictable private identifiers where sensitive
- unnecessary data exposure

==================================================
27. DEVELOPMENT STRATEGY
==================================================

Do NOT build everything simultaneously.

Build in this order:

PHASE 1 — Foundation

- Project setup
- Routing
- Design system
- Global styles
- Responsive shell

PHASE 2 — Core Builder

- Form
- Photo upload
- Template system
- Live preview

PHASE 3 — Generation

- Export
- High-resolution PNG
- Performance optimization

PHASE 4 — Identity

- Team selection
- Team validation
- Builder title
- Builder ID

PHASE 5 — Sharing

- X sharing
- Public builder card
- QR verification

PHASE 6 — Team

- Team frame generator

PHASE 7 — Production

- Error handling
- Cross-browser testing
- Mobile testing
- Performance testing
- Deployment

Do not start with backend infrastructure.

==================================================
28. ACCEPTANCE CRITERIA
==================================================

The application is considered successful only if:

1. A user can open the website and understand what it does immediately.

2. A user can create a Builder ID without instructions.

3. Photo upload works reliably.

4. Different image orientations are handled correctly.

5. Templates can be switched instantly.

6. Team selection works.

7. Invalid team selection is rejected when verification is enabled.

8. Builder identity is generated correctly.

9. Preview updates immediately.

10. Final card matches the preview.

11. Final PNG is high quality.

12. Generation normally completes in approximately 2 seconds or less.

13. Mobile experience is excellent.

14. X sharing works.

15. The UI feels distinctively HackerHouse Goa.

16. The application does not feel like a generic SaaS dashboard.

17. The application remains usable on slower devices.

18. Uploaded photos are not unnecessarily stored.

19. The application handles errors gracefully.

20. The deployed application works reliably on modern Chrome, Safari and Firefox.

==================================================
29. DEMO EXPERIENCE
==================================================

The ideal hackathon demo should take approximately 30–45 seconds.

Example:

Open website.

Hero says:

"BUILD YOUR IDENTITY."

Click:

[ CREATE BUILDER ID ]

Choose:

TEAM

Select:

PHANTOM AI

Upload photo.

Choose:

CHAOTIC

Card instantly changes.

Builder identity appears:

"THE CHAOS BUILDER"

Click:

[ GENERATE ]

Card appears.

Click:

[ DOWNLOAD ]

Then:

[ SHARE TO X ]

Optionally:

[ CREATE TEAM FRAME ]

The judge should immediately understand:
- What the product does
- Why it is useful
- Why it is different
- Why the experience is technically impressive

==================================================
30. WHAT NOT TO BUILD
==================================================

Unless explicitly required, DO NOT build:

- Full authentication system
- Social network
- Chat system
- AI chatbot
- Complex admin dashboard
- Canva-style freeform editor
- 100 templates
- Real-time collaboration
- Payment system
- Notifications
- Complex analytics
- Microservices
- Kubernetes
- Overcomplicated database architecture

Every feature must justify its existence.

==================================================
31. ENGINEERING PRINCIPLE
==================================================

Use this rule throughout development:

"Make the simplest thing that works, then make it fast, then make it beautiful."

Do not optimize architecture for imaginary future requirements.

Build for the actual hackathon.

==================================================
32. FINAL QUALITY BAR
==================================================

Before considering the project complete, ask:

Does it work?

Is it fast?

Does it look genuinely good?

Does it feel like HackerHouse Goa?

Can someone use it without instructions?

Does the generated card look professional?

Does it work on a phone?

Can we demo it without fear?

Would a participant actually want to share the result?

If the answer to any of these is NO, fix that before adding another feature.

==================================================
33. YOUR ROLE DURING DEVELOPMENT
==================================================

Do not blindly implement my instructions.

Act as a senior engineer.

If a requested feature:
- creates unnecessary complexity,
- hurts performance,
- introduces avoidable dependencies,
- conflicts with mobile-first UX,
- creates security/privacy problems,
- or is unnecessary for the MVP,

tell me clearly and recommend a simpler alternative.

When making technical decisions, prioritize:

1. Reliability
2. Performance
3. Simplicity
4. Maintainability
5. UX
6. Visual polish
7. Future extensibility

Do not over-engineer.

==================================================
34. FIRST TASK
==================================================

Before writing large amounts of code:

1. Analyze the requirements above.
2. Propose the final MVP architecture.
3. Identify the smallest viable tech stack.
4. Define the folder structure.
5. Define the data models for:
   - Builder
   - Team
   - Template
   - Theme
   - Builder ID
6. Define the rendering/export strategy.
7. Identify potential performance bottlenecks.
8. Identify which features should be MVP vs optional.
9. Create a concise implementation roadmap.
10. Then begin implementation.

Do not start by generating hundreds of lines of code.

First establish the architecture and implementation plan.

After the plan is approved, implement the product incrementally and test each major feature before moving to the next.

FINAL PRINCIPLE:

Build something that feels like a real HackerHouse Goa product, not a college CRUD project with a fancy background.

Fast.
Distinctive.
Useful.
Shareable.
Reliable.
