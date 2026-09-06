// Preset templates and metadata for HexFlow Studio

export const INITIAL_TEMPLATES = {
  cyberpunk_noir: {
    id: 'cyberpunk_noir',
    title: 'Neo-Noir: The Rain Sequence',
    genre: 'Cinematic Thriller / Ad',
    aspectRatio: '2.39:1 (Anamorphic)',
    nodes: [
      {
        id: 'node-1',
        type: 'script_scene',
        title: 'Scene 01: The Wet Diner',
        x: 60,
        y: 80,
        data: {
          slugline: 'INT. SHINJUKU NOIR DINER - NIGHT',
          prompt: 'Rain splashes against steam-fogged glass. Neon kanji signs bleed electric magenta and cyan onto wet vinyl counter. Detective Ren stands in worn leather trenchcoat, cigarette smoke drifting past amber lamp.',
          mood: 'Melancholic / Suspenseful',
          pacing: 'Slow Burn (24 FPS)'
        }
      },
      {
        id: 'node-2',
        type: 'character_anchor',
        title: 'Character Anchor: Det. Ren',
        x: 420,
        y: 40,
        data: {
          name: 'Detective Ren',
          identityWeight: 96,
          wardrobeLock: 'Distressed Black Trenchcoat, Charcoal Turtleneck',
          expression: 'Weary, Intense Gaze',
          image: '/assets/actor_anchor.jpg',
          loraModel: 'Ren_Cinematic_v2.safetensors'
        }
      },
      {
        id: 'node-3',
        type: 'camera_optics',
        title: 'Optics: 35mm Anamorphic',
        x: 420,
        y: 350,
        data: {
          focalLength: '35mm Anamorphic T1.9',
          shotType: 'Medium Close-Up (Profile)',
          cameraMotion: 'Slow Dolly In + Subtle Handheld Drift',
          dof: 'f/1.8 Shallow Focus',
          streakFlare: 'Horizontal Cyan Anamorphic Streak'
        }
      },
      {
        id: 'node-4',
        type: 'lighting_grade',
        title: 'Lighting: Kodak 500T Noir',
        x: 780,
        y: 80,
        data: {
          preset: 'Kodak Vision3 500T / Neon Noir',
          keyLight: 'Cyan Neon Exterior (70%)',
          fillLight: 'Warm Tungsten Table Lamp (30%)',
          grain: 65,
          halation: 40
        }
      },
      {
        id: 'node-5',
        type: 'motion_dynamics',
        title: 'Atmospheric Physics & FX',
        x: 780,
        y: 360,
        data: {
          particles: 'Window Rain Drops & Wispy Cigarette Smoke',
          motionIntensity: 45,
          fps: 24,
          temporalStability: 92
        }
      },
      {
        id: 'node-6',
        type: 'magnific_enhancer',
        title: 'Magnific Detail Pass (4K)',
        x: 1140,
        y: 120,
        data: {
          upscaleFactor: '4x Ultra-Res',
          creativity: 35,
          resemblance: 88,
          hdrRelight: true,
          microPores: 'High Detail Hallucination'
        }
      },
      {
        id: 'node-7',
        type: 'render_output',
        title: 'Master Render Output',
        x: 1480,
        y: 200,
        data: {
          resolution: '3840 x 1606 (2.39:1 CinemaScope)',
          format: 'ProRes 422 HQ / MP4',
          duration: '4.8s',
          previewImage: '/assets/detective_rain.jpg',
          renderProgress: 100,
          status: 'ready'
        }
      }
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', sourcePort: 'out', targetPort: 'in' },
      { id: 'e1-3', source: 'node-1', target: 'node-3', sourcePort: 'out', targetPort: 'in' },
      { id: 'e2-4', source: 'node-2', target: 'node-4', sourcePort: 'out', targetPort: 'in' },
      { id: 'e3-5', source: 'node-3', target: 'node-5', sourcePort: 'out', targetPort: 'in' },
      { id: 'e4-6', source: 'node-4', target: 'node-6', sourcePort: 'out', targetPort: 'in' },
      { id: 'e5-6', source: 'node-5', target: 'node-6', sourcePort: 'out', targetPort: 'in' },
      { id: 'e6-7', source: 'node-6', target: 'node-7', sourcePort: 'out', targetPort: 'in' }
    ],
    timelineShots: [
      {
        id: 'shot-1',
        name: 'Shot 01: Establishing Diner',
        thumbnail: '/assets/detective_rain.jpg',
        camera: 'Wide Exterior / Rain Streak',
        duration: '3.5s',
        focalLength: '24mm',
        continuityScore: '98.4%'
      },
      {
        id: 'shot-2',
        name: 'Shot 02: Det. Ren Profile',
        thumbnail: '/assets/actor_anchor.jpg',
        camera: 'Medium Close-Up (Anamorphic)',
        duration: '4.2s',
        focalLength: '50mm',
        continuityScore: '99.1%'
      },
      {
        id: 'shot-3',
        name: 'Shot 03: Match Light & Smoke',
        thumbnail: '/assets/detective_rain.jpg',
        camera: 'Extreme Close-Up (Eye / Flame)',
        duration: '2.8s',
        focalLength: '85mm Macro',
        continuityScore: '97.6%'
      }
    ]
  },

  luxury_perfume: {
    id: 'luxury_perfume',
    title: 'Haute Couture: Golden Dunes Ad',
    genre: 'Commercial / Fashion Film',
    aspectRatio: '16:9 (Commercial)',
    nodes: [
      {
        id: 'node-lp-1',
        type: 'script_scene',
        title: 'Scene 01: The Desert Horizon',
        x: 60,
        y: 120,
        data: {
          slugline: 'EXT. SAHARA DUNES - GOLDEN HOUR',
          prompt: 'Sweeping endless golden sand ripples. Supermodel walks gracefully as champagne silk gown catches the desert wind. Sunset rim lighting illuminates golden dust particles.',
          mood: 'Luxe / Ethereal / Sensual',
          pacing: 'Smooth Flow (60 FPS Slow-Mo)'
        }
      },
      {
        id: 'node-lp-2',
        type: 'character_anchor',
        title: 'Talent Anchor: Elena (Model)',
        x: 420,
        y: 80,
        data: {
          name: 'Elena Laurent',
          identityWeight: 98,
          wardrobeLock: 'Champagne Silk Haute Couture Gown, Gold Bangles',
          expression: 'Confident, Ethereal Turn',
          image: '/assets/luxury_desert.jpg',
          loraModel: 'Elena_Vogue_Editorial_v1.safetensors'
        }
      },
      {
        id: 'node-lp-3',
        type: 'camera_optics',
        title: 'Optics: 85mm Cooke Anamorphic',
        x: 420,
        y: 380,
        data: {
          focalLength: '85mm T2.0 Prime',
          shotType: 'Tracking Medium Full Shot',
          cameraMotion: 'Orbiting Steadicam (60fps to 24fps ramp)',
          dof: 'f/1.4 Creamy Bokeh',
          streakFlare: 'Warm Golden Sunlight Flaring across Lens'
        }
      },
      {
        id: 'node-lp-4',
        type: 'lighting_grade',
        title: 'Grade: 24K Sunset Radiance',
        x: 780,
        y: 120,
        data: {
          preset: 'Fujifilm Eterna / Golden Glow',
          keyLight: 'Low Horizon Sun Backlight (90%)',
          fillLight: 'Large Gold Bounce Reflector (40%)',
          grain: 20,
          halation: 60
        }
      },
      {
        id: 'node-lp-5',
        type: 'magnific_enhancer',
        title: 'Magnific Silk & Fabric Pass',
        x: 1140,
        y: 180,
        data: {
          upscaleFactor: '4x Studio Master',
          creativity: 25,
          resemblance: 95,
          hdrRelight: true,
          microPores: 'Fabric Weave & Silk Sheen Hallucination'
        }
      },
      {
        id: 'node-lp-6',
        type: 'render_output',
        title: 'Commercial 4K Master',
        x: 1480,
        y: 220,
        data: {
          resolution: '3840 x 2160 (16:9 4K UHD)',
          format: 'Apple ProRes 4444 XQ',
          duration: '5.2s',
          previewImage: '/assets/luxury_desert.jpg',
          renderProgress: 100,
          status: 'ready'
        }
      }
    ],
    edges: [
      { id: 'elp-1', source: 'node-lp-1', target: 'node-lp-2', sourcePort: 'out', targetPort: 'in' },
      { id: 'elp-2', source: 'node-lp-1', target: 'node-lp-3', sourcePort: 'out', targetPort: 'in' },
      { id: 'elp-3', source: 'node-lp-2', target: 'node-lp-4', sourcePort: 'out', targetPort: 'in' },
      { id: 'elp-4', source: 'node-lp-3', target: 'node-lp-5', sourcePort: 'out', targetPort: 'in' },
      { id: 'elp-5', source: 'node-lp-4', target: 'node-lp-5', sourcePort: 'out', targetPort: 'in' },
      { id: 'elp-6', source: 'node-lp-5', target: 'node-lp-6', sourcePort: 'out', targetPort: 'in' }
    ],
    timelineShots: [
      {
        id: 'shot-lp-1',
        name: 'Shot 01: Wind & Silk Trail',
        thumbnail: '/assets/luxury_desert.jpg',
        camera: 'Tracking Wide (Low Angle)',
        duration: '4.0s',
        focalLength: '35mm',
        continuityScore: '99.2%'
      },
      {
        id: 'shot-lp-2',
        name: 'Shot 02: Perfume Bottle Reflection',
        thumbnail: '/assets/luxury_desert.jpg',
        camera: 'Macro 100mm / Amber Flares',
        duration: '3.2s',
        focalLength: '100mm Macro',
        continuityScore: '98.7%'
      }
    ]
  }
};

export const NODE_TYPES_CONFIG = {
  script_scene: {
    label: 'Script & Scene',
    category: 'Concept',
    color: '#8b5cf6',
    badge: 'badge-purple',
    description: 'Defines scene slugline, story narrative beat, and pacing.'
  },
  character_anchor: {
    label: 'Character Anchor',
    category: 'Continuity',
    color: '#06b6d4',
    badge: 'badge-cyan',
    description: 'Enforces strict facial, wardrobe, and actor identity retention across shots.'
  },
  camera_optics: {
    label: 'Optics & Camera Rig',
    category: 'Cinematography',
    color: '#f59e0b',
    badge: 'badge-amber',
    description: 'Configures focal length, anamorphic squeeze, camera movement & depth of field.'
  },
  lighting_grade: {
    label: 'Lighting & Color Grade',
    category: 'Post-Production',
    color: '#ec4899',
    badge: 'badge-purple',
    description: 'Applies film stock emulations (Kodak 500T), neon setups, and key/fill light balance.'
  },
  motion_dynamics: {
    label: 'Motion Dynamics & FX',
    category: 'Simulation',
    color: '#3b82f6',
    badge: 'badge-cyan',
    description: 'Controls temporal coherence, speed ramps, and atmospheric particle physics.'
  },
  magnific_enhancer: {
    label: 'Magnific Detail Pass',
    category: 'Enhancement',
    color: '#10b981',
    badge: 'badge-emerald',
    description: 'Regional hallucination, micro-texture upscaling, and HDR relighting pass.'
  },
  render_output: {
    label: 'Master Render Output',
    category: 'Export',
    color: '#ef4444',
    badge: 'badge-amber',
    description: 'Compiles graph into video render payload, preview player, and multi-format master.'
  }
};

export const QUICK_DIRECTOR_PROMPTS = [
  {
    title: 'Generate Neo-Noir 3-Shot Flow',
    description: 'Instantiate a 3-shot rain sequence with 35mm anamorphic rig and Kodak 500T grade.',
    action: 'BUILD_NEO_NOIR'
  },
  {
    title: 'Switch Camera to 85mm Close-Up',
    description: 'Swap current wide lens to an intimate 85mm f/1.4 portrait prime with creamy bokeh.',
    action: 'SWITCH_85MM'
  },
  {
    title: 'Lock Character Elena Consistency',
    description: 'Set facial lock to 99% and bind wardrobe token across all connected scene nodes.',
    action: 'LOCK_CONTINUITY'
  },
  {
    title: 'Attach Magnific 4K Hallucination Pass',
    description: 'Insert high-frequency detail relighting node before the master render output.',
    action: 'ATTACH_MAGNIFIC'
  },
  {
    title: 'Export ComfyUI & HexCoded API Payload',
    description: 'Compile all nodes and socket wires into an execution graph JSON for production.',
    action: 'EXPORT_GRAPH'
  }
];
