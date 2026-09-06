import React from 'react';
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  SlidersHorizontal 
} from 'lucide-react';

export function ContinuityMatrixModal({ isOpen, onClose, shots }) {
  if (!isOpen) return null;

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
        {/* Modal Header */}
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
              background: 'rgba(6, 182, 212, 0.15)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={18} color="#06b6d4" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Shot Continuity & Identity Matrix
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Automated multi-shot validation for character facial embedding, wardrobe tokens & lighting coherence
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn-icon">
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Score Banner */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                FACIAL IDENTITY MATCH
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#06b6d4', fontFamily: 'var(--font-mono)' }}>
                98.4%
              </div>
              <div style={{ fontSize: '10px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '2px' }}>
                <CheckCircle2 size={11} /> 0.02 Drift Delta (Optimal)
              </div>
            </div>

            <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-subtle)', borderRight: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                WARDROBE & TEXTURE LOCK
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#8b5cf6', fontFamily: 'var(--font-mono)' }}>
                97.1%
              </div>
              <div style={{ fontSize: '10px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '2px' }}>
                <CheckCircle2 size={11} /> Trenchcoat & Turtleneck Locked
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                LIGHTING & COLOR PALETTE
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                96.5%
              </div>
              <div style={{ fontSize: '10px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '2px' }}>
                <CheckCircle2 size={11} /> Kodak 500T Stock Synchronized
              </div>
            </div>
          </div>

          {/* Side by Side Shot Continuity Comparison */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
              Sequence Shot Analysis
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {shots.map((shot, idx) => (
                <div key={shot.id} className="glass-card" style={{ padding: '12px' }}>
                  <div style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img
                      src={shot.thumbnail}
                      alt={shot.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      background: 'rgba(0,0,0,0.75)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '9px',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      SHOT #{idx + 1}
                    </div>
                  </div>

                  <div style={{ marginTop: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {shot.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {shot.camera}
                    </div>
                  </div>

                  <div style={{
                    marginTop: '10px',
                    padding: '8px',
                    borderRadius: '6px',
                    background: 'rgba(0,0,0,0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    fontSize: '10px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Face Anchor:</span>
                      <span style={{ color: '#06b6d4', fontWeight: 600 }}>LoRA Verified</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Wardrobe:</span>
                      <span style={{ color: '#8b5cf6', fontWeight: 600 }}>Trenchcoat Bound</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Grade Stability:</span>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>{shot.continuityScore}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Director Tip Alert */}
          <div style={{
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <Sparkles size={18} color="#8b5cf6" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '11px', lineHeight: '1.5', color: '#c4b5fd' }}>
              <strong>HexFlow Continuity Guarantee:</strong> By piping the <code>CharacterAnchorNode</code> into every camera setup, HexFlow binds latent identity vectors across generation seeds. This completely eliminates the character morphing issues common in vanilla Runway Gen-3 or Sora workflows.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'rgba(255, 255, 255, 0.01)'
        }}>
          <button onClick={onClose} className="btn-primary" style={{ padding: '8px 20px' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
