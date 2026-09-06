import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Compass, 
  FileText,
  BarChart3,
  Users
} from 'lucide-react';

export function ProductSpecModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('thesis');

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="glass-panel-elevated"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '920px',
          maxWidth: '96vw',
          maxHeight: '92vh',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(139, 92, 246, 0.4)'
            }}>
              <BookOpen size={18} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                HexFlow: Product Architecture & 1-Page PRD
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Product Thinking, Persona Breakdown, Engineering Trade-offs, and Competitive Moats
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn-icon">
            <X size={16} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          padding: '10px 24px',
          gap: '8px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(0, 0, 0, 0.25)'
        }}>
          {[
            { id: 'thesis', label: '1. The Problem & Thesis', icon: Target },
            { id: 'persona', label: '2. User Persona & Journey', icon: Users },
            { id: 'competitive', label: '3. Competitive Moats', icon: BarChart3 },
            { id: 'metrics', label: '4. North Star Metrics', icon: TrendingUp },
            { id: 'tech', label: '5. Engineering Trade-offs', icon: Cpu }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={isActive ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '6px 12px', fontSize: '11px' }}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* TAB 1: THESIS */}
          {activeTab === 'thesis' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="glass-card" style={{ padding: '16px', borderLeft: '3px solid #8b5cf6' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#c4b5fd', marginBottom: '6px' }}>
                  The Core Market Disconnect
                </div>
                <p style={{ fontSize: '12px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                  Generative video today is dominated by <strong>toy interfaces</strong> (single prompt-boxes like Runway or Pika) and <strong>engineering monoliths</strong> (ComfyUI with 60 tangled nodes). Creative professionals—commercial directors, editors, and boutique agencies—cannot deliver client work with either. They don't generate single random 4-second clips; they create <strong>coherent sequences with camera coverage, eyelines, wardrobe continuity, and consistent lighting</strong>.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                <div className="glass-card" style={{ padding: '14px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#f43f5e', marginBottom: '6px' }}>
                    1. The Character Drift Tax
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    In tools like Runway Gen-3 or Sora, generating Shot 2 of the same actor morphs their facial bone structure and wardrobe by 30%. Editors spend hours manually inpainting or give up entirely.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '14px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b', marginBottom: '6px' }}>
                    2. Prompt-and-Pray vs Camera Optics
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    Typing "cinematic lighting" produces generic stock imagery. Directors think in focal lengths (35mm Anamorphic vs 85mm Prime), shutter angles (180°), and key-to-fill lighting ratios (4:1).
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '14px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#06b6d4', marginBottom: '6px' }}>
                    3. Siloed Post-Production
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    Upscalers like Magnific or Krea operate in separate browser tabs disconnected from the editor's timeline. HexFlow integrates Magnific detail passes directly into the DAG pipeline.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERSONA & JOURNEY */}
          {activeTab === 'persona' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="glass-card" style={{ padding: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#06b6d4', marginBottom: '8px' }}>
                  Target Persona: The Agency Video Director / Commercial Editor ("Maya")
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px', lineHeight: '1.6' }}>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Her Reality:</strong>
                    <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      <li>Produces 15s to 60s commercial spots for luxury, fashion, and tech brands.</li>
                      <li>Has a tight 48-hour turn-around from storyboard to client cut.</li>
                      <li>Uses DaVinci Resolve and Adobe Premiere daily; comfortable with nodes and timelines.</li>
                    </ul>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Her Frustrations with AI:</strong>
                    <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      <li><em>"ComfyUI crashes when my team shares node graphs."</em></li>
                      <li><em>"Midjourney gives me beautiful stills, but I can't direct camera movement."</em></li>
                      <li><em>"Runway changes the model's dress between the wide and close-up shot."</em></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* User Journey Map */}
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                The Ideal End-to-End Workflow in HexFlow:
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px'
              }}>
                {[
                  { step: '01. Story Pitch', desc: 'Maya types or pastes script. Agentic Director parses characters & scene beats.' },
                  { step: '02. Identity Anchor', desc: 'Maya uploads or locks 1 character face LoRA. Node enforces 98%+ identity retention.' },
                  { step: '03. Camera & Grade', desc: 'Sets 35mm anamorphic lenses, 4:1 key:fill lighting ratio, and Kodak 500T stock.' },
                  { step: '04. Timeline & Export', desc: 'Reviews 3-shot cut in CinemaScope, trims audio, and exports ComfyUI/HexCoded payload.' }
                ].map((item, idx) => (
                  <div key={idx} className="glass-card" style={{ padding: '12px', background: 'rgba(0,0,0,0.3)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#8b5cf6', marginBottom: '4px' }}>{item.step}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COMPETITIVE MOATS */}
          {activeTab === 'competitive' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Competitive Teardown: Why HexFlow Beats Existing Tools
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  textAlign: 'left'
                }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-medium)', color: 'var(--text-primary)' }}>
                      <th style={{ padding: '10px' }}>Product Feature</th>
                      <th style={{ padding: '10px', color: '#8b5cf6' }}>HexFlow (HexCoded)</th>
                      <th style={{ padding: '10px' }}>ComfyUI</th>
                      <th style={{ padding: '10px' }}>LTX Studio</th>
                      <th style={{ padding: '10px' }}>Runway Gen-3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>Workflow Mental Model</td>
                      <td style={{ padding: '10px', color: '#10b981' }}>Director Node Canvas + Timeline</td>
                      <td style={{ padding: '10px' }}>Engineering DAG (Messy Wires)</td>
                      <td style={{ padding: '10px' }}>Script Storyboard</td>
                      <td style={{ padding: '10px' }}>Single Prompt Box</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>Character Identity Lock</td>
                      <td style={{ padding: '10px', color: '#10b981' }}>Latent Anchor Node (98% Lock)</td>
                      <td style={{ padding: '10px' }}>Manual IP-Adapter / LoRA</td>
                      <td style={{ padding: '10px' }}>Partial Actor Tokens</td>
                      <td style={{ padding: '10px', color: '#f43f5e' }}>Severe Character Drift</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>AI Co-Director</td>
                      <td style={{ padding: '10px', color: '#10b981' }}>Programmatically mutates canvas</td>
                      <td style={{ padding: '10px', color: '#f43f5e' }}>None</td>
                      <td style={{ padding: '10px' }}>Rigid Script Suggestions</td>
                      <td style={{ padding: '10px', color: '#f43f5e' }}>None</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>Integrated Detail Upscale</td>
                      <td style={{ padding: '10px', color: '#10b981' }}>Magnific Node in Pipeline</td>
                      <td style={{ padding: '10px' }}>Complex Multi-Node Tiling</td>
                      <td style={{ padding: '10px', color: '#f43f5e' }}>None</td>
                      <td style={{ padding: '10px' }}>Generic 1080p Upscale</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px', fontWeight: 600, color: 'var(--text-primary)' }}>Target User</td>
                      <td style={{ padding: '10px', color: '#10b981' }}>Creative Agencies & Filmmakers</td>
                      <td style={{ padding: '10px' }}>AI Engineers / Hobbyists</td>
                      <td style={{ padding: '10px' }}>Writers / Storyboarders</td>
                      <td style={{ padding: '10px' }}>General Creators / TikTok</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: METRICS */}
          {activeTab === 'metrics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                North Star & Guardrail Metrics for HexCoded
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                <div className="glass-card" style={{ padding: '14px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>NORTH STAR METRIC</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#10b981', marginTop: '4px' }}>
                    Time-to-Approved-Cut (TTAC)
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                    The total elapsed time from opening the script to exporting a client-accepted sequence. Reducing this from 14 hours to 45 minutes is HexFlow's core value proposition.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '14px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>RETENTION DRIVER</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#06b6d4', marginTop: '4px' }}>
                    Asset Anchor Reusability
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                    Percentage of character, wardrobe, and lighting nodes reused across multiple projects by the same agency workspace. High reuse = high platform lock-in.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '14px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>UNIT ECONOMICS GUARDRAIL</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b', marginTop: '4px' }}>
                    Draft-to-Master Compute Ratio
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                    Keeping fast draft renders (720p 8-step) cheap so users explore freely, while monetizing heavy 4K Magnific passes (40-step diffusion + HDR relighting) on export.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TECHNICAL TRADE-OFFS */}
          {activeTab === 'tech' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Key Technical & Architectural Trade-offs
              </div>

              <div className="glass-card" style={{ padding: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#c4b5fd', marginBottom: '4px' }}>
                  Trade-off 1: Client-Side Graph DAG vs Server-Side Execution
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  <strong>Decision:</strong> Run the graph state, real-time Bezier calculations, and UI updates entirely on the client (React + pure SVG). Only send serialized execution recipes to the GPU cluster upon "Run Pipeline".  
                  <strong>Benefit:</strong> Instant 60 FPS graph editing with zero network lag, while preventing wasteful GPU invocations on every node parameter tweak.
                </p>
              </div>

              <div className="glass-card" style={{ padding: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#c4b5fd', marginBottom: '4px' }}>
                  Trade-off 2: LoRA Fine-Tuning vs Zero-Shot IP-Adapter Latent Injection
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  <strong>Decision:</strong> Support both via the Character Anchor Node. For immediate turnaround, use IP-Adapter facial embedding vectors (instant, no training). For enterprise recurring talent, load dedicated LoRA safetensors.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.01)'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Prepared by Krishna • Candidate for AI Product Role at HexCoded
          </div>
          <button onClick={onClose} className="btn-primary" style={{ padding: '8px 22px' }}>
            Back to Studio
          </button>
        </div>
      </div>
    </div>
  );
}
