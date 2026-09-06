# HexFlow Studio: System Architecture & Technical Design

## 1. High-Level Architecture

HexFlow Studio is structured as a **reactive client-side Directed Acyclic Graph (DAG) runtime** that serializes visual filmmaking node compositions into multi-modal video diffusion payloads (ComfyUI / HexCoded Cloud API).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             HexFlow Studio (React 18)                       │
├───────────────────────────────┬──────────────────────────────┬──────────────┤
│    Infinite Node Canvas       │     HexDirector Copilot      │   Timeline   │
│  (Pure SVG Bezier Cables +    │   (Natural Language Canvas   │ (CinemaScope │
│   60 FPS Drag Interaction)    │   Mutations & DP Reasoning)  │  Player)     │
└───────────────┬───────────────┴──────────────┬───────────────┴──────┬───────┘
                │                              │                      │
                ▼                              ▼                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DAG State Engine & Reactive Store                  │
│   • Topological Sort for dependency resolution                              │
│   • Latent Parameter Propagation (Character LoRA -> Camera -> Grade -> Pass)│
│   • Continuity Validator (Facial Embedding Delta < 0.02)                   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Output Serialization Layer                         │
├───────────────────────────────┬──────────────────────────────┬──────────────┤
│     HexCoded Cloud Payload    │    ComfyUI Custom Schema     │ Director MD  │
│  (JSON DAG for Model Fleet)   │  (Prompt Execution Mapping)  │ (Call Sheet) │
└───────────────────────────────┴──────────────────────────────┴──────────────┘
```

---

## 2. Core Subsystems

### A. Infinite Node Canvas & Reactive Bezier Engine
* **Pure SVG Coordinate Mapping:** All connecting cables are calculated using cubic Bezier curves in SVG:
  $$\mathbf{B}(t) = (1-t)^3 \mathbf{P}_0 + 3(1-t)^2 t \mathbf{P}_1 + 3(1-t) t^2 \mathbf{P}_2 + t^3 \mathbf{P}_3$$
  Where control points $\mathbf{P}_1$ and $\mathbf{P}_2$ enforce smooth horizontal curvature regardless of node distance.
* **Flow Pulse Animation:** Utilizes SVG `stroke-dasharray` and CSS keyframes (`stroke-dashoffset`) to visualize data packets flowing from upstream scene nodes to downstream render outputs during synthesis.
* **Sub-Millisecond Drag Latency:** Node positioning operates on relative delta translation without triggering full React tree re-renders.

### B. The Directed Acyclic Graph (DAG) State Engine
* **Topological Dependency Resolution:** When the user clicks "Synthesize" or modifies a parameter, the graph evaluates node dependencies:
  $$\text{ScriptScene} \longrightarrow \text{CharacterAnchor} \longrightarrow \text{CameraOptics} \longrightarrow \text{LightingGrade} \longrightarrow \text{MotionDynamics} \longrightarrow \text{MagnificPass} \longrightarrow \text{RenderOutput}$$
* **Latent Vector Propagation:** 
  - The `CharacterAnchor` injects cross-attention embedding weights ($\alpha = 0.96$) to downstream nodes.
  - The `LightingGrade` node injects color temperature matrices and grain halation thresholds into the diffusion negative/positive prompt compiler.

### C. Agentic DP Reasoning Engine (`AgenticDirectorChat.jsx`)
* **Natural Language Intent Parsing:** Evaluates semantic directives (*"Switch camera to 85mm close-up"* or *"Lock character continuity"*).
* **Direct Canvas Mutation Hooks:** The agent has write access to the canvas store:
  - `handleAddNode(type, coords)`
  - `handleUpdateNodeData(nodeId, dataUpdate, posUpdate)`
  - `handleConnectEdges(sourceId, targetId)`
* **Cinematographic Constraint Checking:** Evaluates the 180° eyeline rule before accepting camera angle changes.

### D. 24 FPS Cinematic Motion Engine (`CinematicMotionPlayer.jsx`)
* **Canvas-Based Rendering Loop:** Runs at 60 FPS utilizing `requestAnimationFrame`.
* **Ken Burns Camera Vectors:** Smooth scale and translation interpolation over continuous time $t$.
* **Real-Time Particle Physics:** Renders 70+ wind-slanted rain streaks, atmospheric mist, and anamorphic lens flare sweeps.
* **Browser-Native Ambient Audio:** Uses the Web Audio API to synthesize low-pass pink noise (rain atmosphere) and a 55Hz sub-bass drone with zero network asset overhead.

---

## 3. Directory & Code Organization

```
scratch/hexcoded-creative-studio/
├── public/
│   ├── assets/
│   │   ├── actor_anchor.jpg         # Photorealistic Character Consistency Sheet
│   │   ├── detective_rain.jpg       # Neo-Noir 35mm Master Frame
│   │   └── luxury_desert.jpg        # Haute Couture 85mm Commercial Frame
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── agent/
│   │   │   └── AgenticDirectorChat.jsx    # Opinionated DP Copilot
│   │   ├── canvas/
│   │   │   └── NodeCanvas.jsx             # Pan/Zoom SVG Bezier Canvas
│   │   ├── continuity/
│   │   │   └── ContinuityMatrixModal.jsx  # Multi-Shot Identity Validator
│   │   ├── export/
│   │   │   └── ProductionExportModal.jsx  # ComfyUI & HexCoded API Serializer
│   │   ├── inspector/
│   │   │   └── PromptInspectorModal.jsx   # Live DAG Token Math Inspector
│   │   ├── navbar/
│   │   │   └── Header.jsx                 # Studio Navigation & Actions
│   │   ├── nodes/
│   │   │   └── NodeCard.jsx               # 7 Filmmaking Node Rigs
│   │   ├── pitch/
│   │   │   └── PitchModal.jsx             # In-App Pitch for Jivesh
│   │   ├── prd/
│   │   │   └── ProductSpecModal.jsx       # 1-Page Interactive PRD
│   │   ├── theater/
│   │   │   └── TheaterPreviewModal.jsx    # 2.39:1 CinemaScope Screen
│   │   ├── timeline/
│   │   │   └── CinematicTimelinePlayer.jsx# Multi-Shot Sequence Scrubber
│   │   └── video/
│   │       └── CinematicMotionPlayer.jsx  # 24 FPS Motion Video & Audio Engine
│   ├── data/
│   │   └── mockData.js                    # Preloaded Film Templates & Node Schemas
│   ├── App.jsx                            # Root Application & State Coordinator
│   ├── index.css                          # Design Tokens & Pure CSS Architecture
│   └── main.jsx                           # React 18 Entrypoint
├── docs/
│   ├── PRD.md                             # Formal Product Requirements Document
│   └── ARCHITECTURE.md                    # Technical Architecture Specification
├── index.html                             # SEO & Google Fonts Configuration
├── LICENSE                                # Open Source MIT License
├── package.json                           # Dependency Manifest
├── PITCH_TO_HEXCODED.md                   # Strategic Pitch & Outreach Templates
└── README.md                              # Flagship Project Documentation
```

---

## 4. Production Interoperability Schema

### A. HexCoded Cloud API Payload Specification
```json
{
  "version": "2.4.0",
  "studio_target": "hexcoded-creative-cloud",
  "workflow_id": "hexflow_cyberpunk_noir_prod",
  "graph": {
    "total_nodes": 7,
    "total_edges": 7,
    "nodes": [
      {
        "id": "node-1",
        "type": "script_scene",
        "parameters": {
          "slugline": "INT. SHINJUKU NOIR DINER - NIGHT",
          "pacing": "24 FPS Standard"
        }
      },
      {
        "id": "node-2",
        "type": "character_anchor",
        "parameters": {
          "name": "Detective Ren",
          "identity_weight": 0.96,
          "lora_ref": "Ren_Cinematic_v2.safetensors"
        }
      }
    ]
  },
  "render_config": {
    "engine": "LTX-Video-v2.1 + Magnific-Relight",
    "color_space": "ACEScc / Rec.709",
    "export_codec": "ProRes 422 HQ"
  }
}
```
