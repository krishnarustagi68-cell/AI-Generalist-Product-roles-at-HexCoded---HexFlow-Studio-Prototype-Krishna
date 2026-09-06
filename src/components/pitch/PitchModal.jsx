import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Target, 
  Compass, 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageSquare, 
  Award,
  Layers
} from 'lucide-react';

export function PitchModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const discordPitchMessage = `Hi Jivesh,

Saw your email regarding opening product roles for HexCoded and built something around your creative professional users:

**HexFlow Studio: Agentic Node Director & Continuity Canvas**
- Live Demo: [YOUR_DEPLOYED_URL_HERE]
- GitHub Repo: [YOUR_GITHUB_REPO_URL_HERE]

**Why I built this for HexCoded:**
Filmmakers, editors, and ad agencies love generative AI, but they hate the current tool extremes: either simplistic "prompt-and-pray" textboxes with terrible character drift, or ComfyUI's messy spaghetti wires.

HexFlow unifies both needs into a creative suite:
1. **Designer-Grade Node Studio:** Clean nodes for Scene, Character Anchors, 35mm/85mm Camera Optics, Kodak 500T Color Grading, and Magnific 4K Hallucination.
2. **Agentic Co-Director:** An AI copilot that doesn't just chat—it programmatically reasons, constructs, and rewires the node graph from natural language.
3. **Shot Continuity Matrix:** Multi-shot validation locking facial embeddings and wardrobe tokens across sequential shots (solving the #1 headache with Runway/LTX).
4. **Cinematic Timeline & 2.39:1 CinemaScope Player:** Instant sequence scrub, camera movement overlays, and ComfyUI / HexCoded API payload export.

This is the exact feature set and product vision I would love to own and scale at HexCoded. Would love to get your thoughts and chat!

Best,
Krishna`;

  const handleCopy = () => {
    navigator.clipboard.writeText(discordPitchMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="glass-panel-elevated"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '840px',
          maxWidth: '95vw',
          maxHeight: '90vh',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={18} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Product Pitch & Roadmap for Jivesh (HexCoded)
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Strategic positioning, user persona alignment, and ready-to-send Discord / Email message
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn-icon">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Executive Summary Card */}
          <div className="glass-card" style={{ padding: '16px', borderLeft: '3px solid #8b5cf6' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#c4b5fd', marginBottom: '6px' }}>
              The Product Hypothesis
            </div>
            <p style={{ fontSize: '12px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              Creative professionals (filmmakers, editors, commercial agencies) don't want toy prompt boxes. They need <strong>granular camera optics, lighting control, and multi-shot character continuity</strong>. HexFlow transforms HexCoded from an AI generator into a full-fledged <strong>Agentic Video Directing Suite</strong>.
            </p>
          </div>

          {/* 4 Pillars Table */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            <div className="glass-card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={14} /> 1. Designer-First Node Canvas
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                Replaces ComfyUI's intimidating developer interface with a modern, elegant visual pipeline. Nodes for scene scripts, 35mm/85mm lenses, Kodak color grading, and Magnific upscaling.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> 2. Agentic Co-Director
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                A conversational copilot that operates directly on the canvas graph. Ask to switch lenses, lock identity, or build an entire 3-shot sequence and watch the agent create and wire nodes in real time.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} /> 3. Shot Continuity Engine
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                The #1 pain point for agencies. Binds facial LoRA embeddings, wardrobe tokens, and lighting seeds across sequential shots, guaranteeing 98%+ consistency without manual inpainting.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={14} /> 4. Production Interoperability
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                Generates instant ComfyUI JSON, HexCoded API payloads, and director call sheets. Fits seamlessly alongside existing studio pipelines and render farms.
              </p>
            </div>
          </div>

          {/* Discord Message for Jivesh */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquare size={14} color="#8b5cf6" />
                <span>Ready-to-Send Message for Jivesh (Discord: jivesh92 / Email: hexcoded@agentmail.to)</span>
              </div>
              <button onClick={handleCopy} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }}>
                {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copied ? 'Copied!' : 'Copy Message'}</span>
              </button>
            </div>

            <textarea
              readOnly
              rows={8}
              value={discordPitchMessage}
              style={{
                width: '100%',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: '#e2e8f0',
                background: 'rgba(0, 0, 0, 0.45)',
                lineHeight: '1.5'
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'rgba(255, 255, 255, 0.01)'
        }}>
          <button onClick={onClose} className="btn-primary" style={{ padding: '8px 20px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
