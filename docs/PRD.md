# Product Requirements Document (PRD)
## Project: HexFlow Studio (AI Node Director & Continuity Canvas)
**Author:** Krishna  
**Target Organization:** HexCoded (Creative Studio Team)  
**Status:** In Review / Functional Prototype Live  
**Target Delivery:** Q1 MVP -> Q4 Enterprise NLE Bridge  

---

### 1. Strategic Context & Vision
Creative professionals (commercial directors, film editors, VFX artists, and agencies) represent the highest lifetime-value (LTV) cohort in generative media. However, current generative video platforms cater primarily to consumer novelty rather than professional craft:
* **The "Prompt-and-Pray" Bottleneck:** Textboxes force creators to guess seed numbers and adjectives instead of specifying standard cinematic coverage (180° shutter rule, 35mm anamorphic compression, 4:1 key-to-fill ratios).
* **The Character Drift Penalty:** Video diffusion models generate stunning single shots, but fail completely when cutting to a reverse angle or close-up of the same actor.
* **The Post-Production Chasm:** Detail enhancers (like Magnific) and video generators (like LTX Studio) operate as disconnected web apps, forcing manual round-tripping.

**HexFlow Studio** bridges this chasm by providing an opinionated **Node-Based Director Studio** paired with an **Agentic Director of Photography (DP) Copilot** that programmatically constructs, manages, and executes multi-shot film graphs with guaranteed continuity.

---

### 2. User Persona: "Maya" (Agency Commercial Video Editor)
* **Demographics:** 29, Senior Video Editor & AI Creative Technologist at a mid-sized digital advertising agency.
* **Workflow Environment:** Dual-monitor setup running DaVinci Resolve, Adobe Premiere, and ComfyUI.
* **Core Job-to-be-Done (JTBD):** Turn a client storyboard and script into a 30-second broadcast-ready commercial spot within 48 hours.
* **Pain Points with Current Tools:**
  1. *"Every time I prompt a close-up, the model changes the actor's jacket and facial features."*
  2. *"ComfyUI gives me node control, but wiring 40 math nodes to get a simple dolly shot is an engineering nightmare."*
  3. *"Runway and Pika give me random outputs with zero repeatability."*

---

### 3. Core Functional Requirements

#### FR-1: Modular Cinematography Node Graph
* The canvas must represent video generation as a **Directed Acyclic Graph (DAG)** of cinematic decisions.
* Nodes must cover:
  1. `ScriptSceneNode`: Slugline, narrative action lines, mood tokens, and pacing (24 FPS standard).
  2. `CharacterAnchorNode`: Facial consistency lock with reference turn-around embeddings, identity retention weight (0-100%), and wardrobe token locking.
  3. `CameraOpticsNode`: Focal length selector (18mm, 24mm, 35mm Anamorphic, 50mm, 85mm Prime, 100mm Macro), aperture/DOF profile, and motion trajectory.
  4. `LightingGradeNode`: Film stock emulation (Kodak Vision3 500T, Fujifilm Eterna), key/fill lighting balance, grain, and halation.
  5. `MotionDynamicsNode`: Atmospheric particle simulation (Rain, Smoke, Embers), camera speed curves, and temporal stability.
  6. `MagnificEnhancerNode`: Regional hallucination, micro-texture upscaling, and HDR relighting pass.
  7. `RenderOutputNode`: Multi-resolution CinemaScope preview, format/codec selector (ProRes 422 HQ), and video synthesis simulation.

#### FR-2: Opinionated Agentic Co-Director (DP Engine)
* The agent must not act as a generic customer support chatbot. It must act as an experienced **Director of Photography (DP)**.
* The agent must evaluate cinematography rules:
  - **180-Degree Rule:** Validates camera position when cutting between shots.
  - **Focal Length Compression:** Explains spatial depth and background blur implications.
  - **Direct Canvas Mutations:** Must programmatically add, update, and wire nodes upon user command.

#### FR-3: Shot Continuity Matrix
* Multi-shot inspector measuring:
  - Facial identity vector variance ($<0.02$ drift threshold).
  - Wardrobe token seed binding.
  - Lighting color temperature stability.

#### FR-4: Storyboard Timeline & 2.39:1 CinemaScope Player
* Non-linear timeline scrubber displaying shot durations, camera motion cues, and audio waveform tracks.
* Letterboxed theater playback with simulated camera motion, director HUD overlays, and shot switching.

#### FR-5: Production Interoperability
* One-click export to:
  1. **HexCoded Creative Studio API JSON**
  2. **ComfyUI Pipeline Schema**
  3. **Director Call Sheet & Storyboard Markdown**

---

### 4. Non-Functional Requirements & Architecture

| Metric | Target | Rationale |
| :--- | :--- | :--- |
| **Canvas Frame Rate** | 60 FPS | Smooth pan/zoom and Bezier wire updates on all modern displays. |
| **Graph DAG Serialization** | $<50\text{ms}$ | Rapid JSON compilation for GPU render dispatch. |
| **Bundle Size** | $<300\text{KB}$ (gzipped) | Instant page load without heavy WebGL engine overhead. |
| **State Persistence** | LocalStorage + JSON Export | Zero data loss during creative sessions. |

---

### 5. Success Metrics (KPIs)

* **Primary (North Star):** **Time-to-Approved-Cut (TTAC)** — Target reduction from 14 hours to 45 minutes for a 3-shot commercial sequence.
* **Secondary (Retention):** **Asset Reuse Rate** — $>65\%$ of character and lighting nodes reused across multiple projects within an agency workspace.
* **Guardrail (Compute Efficiency):** **Draft-to-Master Compute Ratio** — Cheap 720p 8-step preview iterations vs. monetized 4K Magnific export passes.
