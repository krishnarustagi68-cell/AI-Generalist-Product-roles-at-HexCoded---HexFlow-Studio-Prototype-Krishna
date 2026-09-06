import React from 'react';
import { 
  Play, 
  Sparkles, 
  Layers, 
  Download, 
  Film, 
  SlidersHorizontal,
  Activity,
  BookOpen,
  Terminal
} from 'lucide-react';

export function Header({ 
  currentTemplate, 
  onSelectTemplate, 
  onRunPipeline, 
  isRunning, 
  onOpenContinuity, 
  onOpenExport, 
  onOpenPitch, 
  onOpenTheater,
  onOpenSpec,
  onOpenInspector
}) {
  return (
    <header className="glass-panel" style={{
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      position: 'relative',
      zIndex: 40,
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      {/* Brand & Studio ID */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(139, 92, 246, 0.4)'
        }}>
          <Film size={18} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '-0.02em' }}>HexFlow</span>
            <span style={{ 
              fontSize: '11px', 
              background: 'rgba(255,255,255,0.08)', 
              padding: '1px 6px', 
              borderRadius: '4px', 
              color: 'var(--text-secondary)'
            }}>STUDIO</span>
            <span style={{ fontSize: '11px', color: '#8b5cf6', fontWeight: 600 }}>for HexCoded</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Agentic Node Director & Continuity Suite
          </div>
        </div>

        {/* Template Selector Dropdown */}
        <div style={{ marginLeft: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Template:</span>
          <select 
            value={currentTemplate}
            onChange={(e) => onSelectTemplate(e.target.value)}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 500,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-medium)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <option value="cyberpunk_noir">Neo-Noir: The Rain Sequence (35mm Anamorphic)</option>
            <option value="luxury_perfume">Haute Couture: Golden Dunes Commercial</option>
          </select>
        </div>
      </div>

      {/* Action Controls & Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        
        {/* THE PRODUCT SPEC & PRD BUTTON - PROMINENT FOR JIVESH */}
        <button 
          onClick={onOpenSpec}
          className="btn-secondary"
          style={{ 
            borderColor: 'rgba(139, 92, 246, 0.5)', 
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)',
            color: '#ffffff',
            fontWeight: 700,
            padding: '6px 14px',
            fontSize: '12px',
            boxShadow: '0 0 14px rgba(139, 92, 246, 0.3)'
          }}
          title="Read the Product Thesis, Persona, and Architecture PRD"
        >
          <BookOpen size={14} color="#c4b5fd" />
          <span>Product Spec & PRD</span>
          <span className="badge badge-purple" style={{ fontSize: '9px', padding: '1px 5px' }}>THINKING</span>
        </button>

        {/* Prompt Math Inspector */}
        <button 
          onClick={onOpenInspector}
          className="btn-secondary"
          title="Inspect DAG compiled token weights & ControlNet vectors"
          style={{ padding: '6px 11px', fontSize: '12px' }}
        >
          <Terminal size={14} color="#a78bfa" />
          <span>Prompt Math</span>
        </button>

        {/* Continuity Matrix Badge */}
        <button 
          onClick={onOpenContinuity}
          className="btn-secondary"
          title="Inspect Character & Wardrobe Consistency"
          style={{ padding: '6px 11px', fontSize: '12px' }}
        >
          <SlidersHorizontal size={14} color="#06b6d4" />
          <span>Continuity</span>
          <span className="badge badge-cyan" style={{ fontSize: '10px', padding: '1px 5px' }}>98.4%</span>
        </button>

        {/* Theater Player */}
        <button 
          onClick={onOpenTheater}
          className="btn-secondary"
          title="Preview Full Sequence in Theater View"
          style={{ padding: '6px 11px', fontSize: '12px' }}
        >
          <Film size={14} color="#f59e0b" />
          <span>CinemaScope</span>
        </button>

        {/* Export Modal */}
        <button 
          onClick={onOpenExport}
          className="btn-secondary"
          title="Export ComfyUI Graph & HexCoded API Payload"
          style={{ padding: '6px 11px', fontSize: '12px' }}
        >
          <Download size={14} color="#10b981" />
          <span>Export</span>
        </button>

        {/* Pitch to HexCoded for Jivesh */}
        <button 
          onClick={onOpenPitch}
          className="btn-secondary"
          style={{ 
            borderColor: 'rgba(255, 255, 255, 0.12)', 
            background: 'rgba(255, 255, 255, 0.04)',
            color: '#e2e8f0',
            padding: '6px 11px',
            fontSize: '12px'
          }}
        >
          <Sparkles size={14} color="#f59e0b" />
          <span>Outreach Pitch</span>
        </button>

        {/* Run Pipeline Button */}
        <button 
          onClick={onRunPipeline}
          disabled={isRunning}
          className="btn-primary"
          style={{ 
            padding: '7px 16px',
            background: isRunning 
              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
              : 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            opacity: isRunning ? 0.9 : 1
          }}
        >
          {isRunning ? (
            <>
              <Activity size={15} className="cable-pulse" />
              <span>Rendering...</span>
            </>
          ) : (
            <>
              <Play size={14} fill="#ffffff" />
              <span>Synthesize</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
