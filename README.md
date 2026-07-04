# XLChess Homepage Hero Redesign

This repository contains the homepage hero section redesign for **XLChess**, submitted as a Stage 2 Technical Assessment.

---

## 1. Setup and Installation

### Prerequisites
* **Node.js**: Version 18.x or higher is required.
* **npm**: Version 9.x or higher is required.

### Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/rajverma04/XL-Chess_Redesign
   ```
2. Navigate to the project directory:
   ```bash
   cd xlchess-redesign/XL-Chess_Redesign
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the local site.

5. Build the optimized production bundle:
   ```bash
   npm run build
   ```
6. Start the production server:
   ```bash
   npm start
   ```

---

## 2. Technologies and Libraries Used

* **Next.js (v16.2.6)**: The application framework, utilizing the Next.js App Router for structure, routing, and server-side optimization.
* **React (v19)**: The core JavaScript UI rendering library.
* **React Chessboard (v5.10.0)**: Used as the visual interface for rendering the chessboard and supporting user dragging and clicking on coordinates.
* **Motion for React (v12.4.2)**: Used to manage component entrance animations, micro-interactions, and visual transitions.
* **GSAP (v3.15.0)**: Used for high-fidelity timeline-based animations and entrance staggers.
* **Lenis (v1.3.25)**: Handles smooth scrolling animations across the landing page elements.
* **Lucide React**: Provides the icon library for controls (e.g. Hint, Undo, Reset).
* **Zustand**: Present in dependencies for general store scaffolding.
* **Tailwind CSS & Tailwind Merge**: Used to implement utility classes and safely merge responsive CSS rules.

---

## 3. Design Decisions

* **Option 3 — Redesign Approach**: The layout was fully redesigned to establish a modern, immersive, and premium visual identity suitable for a state-of-the-art online chess platform.
* **Dark Navy Visual Foundation & Violet Brand Accent**: A dark theme was chosen to create a premium "cyber-intellectual" visual backdrop, minimizing eye strain during chess play, with violet gradients highlighting action zones.
* **Subtle Grid Background**: Represents the coordinates system of a chess board, reinforcing the core gaming theme across the landing page.
* **Typography and Visual Hierarchy**: Large, bold headings coupled with clear CTA action hierarchies immediately capture user attention and guide them towards interaction points.
* **Chess-Focused Product Identity**: Placing an interactive daily puzzle card directly in the hero area engages users instantly with the core product offering.
* **Daily Puzzle Card as an Interactive Product Preview**: Rather than presenting a static graphic, the daily puzzle behaves as an interactive sandbox to immediately demonstrate the quality of the UI.
* **Consistent Visual Language**: Design elements (borders, backdrop blurs, gradients) flow naturally from the Hero section into the Contact and Footer areas.

---

## 4. Assumptions

* The technical assessment scope focuses on recreating, improving, or redesigning the XLChess homepage hero section.
* This submission uses Option 3 — Redesign.
* The goal is to communicate the experience of a modern online chess platform through a polished hero experience.
* The Daily Puzzle is intentionally implemented as a lightweight interactive product preview.
* The Daily Puzzle is not intended to be a complete playable chess game.
* Full chess rule validation, legal move calculation, chess engine analysis, multiplayer functionality, authentication, and backend services are outside the current hero-section assessment scope.
* The displayed tactical chess position is used as presentation data for the product preview.

---

## 5. Trade-offs Considered

### Lightweight Puzzle Preview Instead of a Full Chess Engine
The assessment focuses on the homepage hero redesign. Integrating a complete chess engine or Stockfish integration directly on the landing page would introduce additional implementation complexity, heavy bundle and asset size overhead (~1.5MB+), engine process lifecycle management, worker/WASM integration complexity, and additional testing requirements. These costs do not directly improve the primary hero-section redesign goal. Therefore, the Daily Puzzle uses lightweight local React state and predefined presentation data to communicate the product experience. This was an intentional scope and engineering decision to prioritize load speed and code maintainability.

### Local State Instead of Global State
The puzzle preview interaction is fully isolated to the hero area. Introducing Redux, Zustand, or another global state solution would add unnecessary complexity. Local React state is sufficient for managing square selection, hint feedback, lightweight interaction history, and reset behavior.

### One Animation System
The micro-interactions and status animations inside the puzzle preview use Motion for React. Restricting preview interaction animations to one system keeps runtime overhead low and simplifies future layout changes.

---

## 6. What I Would Improve with Additional Time

### Dynamic Daily Puzzle Experience
With additional development time, the current lightweight Daily Puzzle preview could be extended into a real dynamic puzzle experience. 

A future implementation could include:
* Fetching a daily tactical puzzle from a dedicated chess puzzle API.
* Loading the puzzle position dynamically from a JSON payload.
* Validating legal chess moves using `chess.js`.
* Validating the expected tactical solution sequence against user inputs.
* Providing accurate move feedback and animations.
* Supporting real undo and puzzle reset behavior.
* Optionally integrating Stockfish in a Web Worker for post-puzzle analysis and evaluation. 

Using Web Workers would ensure that the engine analysis runs outside the main UI thread, preserving interface responsiveness. This future architecture would turn the current visual product preview into a real chess learning feature.
