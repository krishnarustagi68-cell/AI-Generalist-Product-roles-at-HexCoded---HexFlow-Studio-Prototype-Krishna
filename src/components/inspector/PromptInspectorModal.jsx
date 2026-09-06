import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles, 
  Cpu, 
  Layers 
} from 'lucide-react';

export function PromptInspectorModal({ isOpen, onClose, nodes, edges }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Derive compiled prompt and latent parameters from current nodes
  const scriptNode = nodes.find((n) => n.type === 'script_scene');
  const characterNode = nodes.find((n) => n.type === 'character_anchor');
  const cameraNode = nodes.find((n) => n.type === 'camera_optics');
  const lightingNode = nodes.find((n) => n.type === 'lighting_grade');
  const motionNode = nodes.find((n) => n.type === 'motion_dynamics');
  const magnificNode = nodes.find((n) => n.type === 'magnific_enhancer');

  const compiledPositivePrompt = `(${scriptNode?.data.slugline || 'INT. SCENE'}, ${scriptNode?.data.mood || 'Cinematic'}:1.25), (${characterNode?.data.name || 'Lead Actor'}:1.35), ${characterNode?.data.wardrobeLock || 'wardrobe'}, ${cameraNode?.data.focalLength || '35mm anamorphic'}, ${cameraNode?.data.dof || 'f/1.8'}, ${lightingNode?.data.preset || 'Kodak Vision3 500T'}, ${lightingNode?.data.keyLight || 'Key Light'}, atmospheric ${motionNode?.data.particles || 'particles'}, cinematic photorealistic, 8k resolution, masterpiece <lora:${characterNode?.data.loraModel || 'Actor'}:${(characterNode?.data.identityWeight || 95) / 100}>`;

  const compiledNegativePrompt = `(cgi, 3d render, cartoon, plastic skin, morphing face, extra fingers, deformed eyes, erratic camera shake, oversaturated colors, blurry, watermark, bad anatomy:1.4)`;

  const technicalPayload = {
    sampler: 'Euler Ancestral',
    steps: 35,
    cfg_scale: 6.5,
    seed: 84920491,
    seed_pinned: true,
    resolution: [3840, 1606],
    aspect_ratio: '2.39:1',
    latent_continuity_lock: {
      face_ip_adapter_weight: (characterNode?.data.identityWeight || 95) / 100,
      wardrobe_token_embedding: characterNode?.data.wardrobeLock || 'locked',
      temporal_coherence_loss: (motionNode?.data.temporalStability || 92) / 100
    },
    camera_motion_vector: {
      trajectory: cameraNode?.data.cameraMotion || 'Dolly In',
      euler_pitch: -1.2,
      euler_yaw: 0.8,
      zoom_rate: 1.05
    },
    magnific_relight_pass: {
      enabled: !!magnificNode,
      creativity: (magnificNode?.data.creativity || 35) / 100,
      resemblance: (magnificNode?.data.resemblance || 88) / 100,
      hdr_relight: true
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify({
      positive_prompt: compiledPositivePrompt,
      negative_prompt: compiledNegativePrompt,
      ...technicalPayload
    }, null, 2));
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
          padding: '16px 22px',
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
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Terminal size={17} color="#8b5cf6" />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Compiled Prompt & Latent Math Inspector
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Real-time mathematical compilation of the visual node graph into token weights & ControlNet vectors
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn-icon">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '22px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Positive Prompt */}
          <div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>COMPILED POSITIVE TOKEN WEIGHTS (DAG DERIVED)</span>
            </div>
            <div style={{
              padding: '12px 14px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              lineHeight: '1.6',
              color: '#6ee7b7'
            }}>
              {compiledPositivePrompt}
            </div>
          </div>

          {/* Negative Prompt */}
          <div>
            <div style={{ fontSize: '11px', color: '#f43f5e', fontWeight: 700, marginBottom: '6px' }}>
              NEGATIVE SAFETY & ARTIFACT FILTER
            </div>
            <div style={{
              padding: '10px 14px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              lineHeight: '1.6',
              color: '#fda4af'
            }}>
              {compiledNegativePrompt}
            </div>
          </div>

          {/* Latent & Motion Math JSON */}
          <div>
            <div style={{ fontSize: '11px', color: '#06b6d4', fontWeight: 700, marginBottom: '6px' }}>
              DIFFUSION SAMPLER & VECTOR CONFIGURATION
            </div>
            <pre style={{
              margin: 0,
              padding: '14px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              lineHeight: '1.5',
              color: '#a5f3fc',
              overflow: 'auto',
              maxHeight: '200px'
            }}>
              <code>{JSON.stringify(technicalPayload, null, 2)}</code>
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 22px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.01)'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Tokens: 148 / 225 • ControlNet Anchors: Active
          </div>
          <button onClick={handleCopy} className="btn-secondary" style={{ padding: '7px 16px', fontSize: '12px' }}>
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span>{copied ? 'Copied Prompt Math!' : 'Copy Full Payload'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
